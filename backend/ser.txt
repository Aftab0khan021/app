import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from fastapi import FastAPI, APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Dict, Any
import uuid
from datetime import datetime, timezone
import PyPDF2
import docx
import io
import re
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from app.db import get_db
from emergentintegrations.llm.chat import LlmChat, UserMessage
# allow imports from the repo root (one level up from /backend)
# Download NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class AnalysisResult(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    match_percentage: float
    matched_skills: List[str]
    missing_skills: List[str]
    recommendations: List[str]
    resume_text: str
    job_description: str
    analysis_summary: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class AnalysisResultCreate(BaseModel):
    resume_text: str
    job_description: str

class AnalysisResponse(BaseModel):
    id: str
    match_percentage: float
    matched_skills: List[str]
    missing_skills: List[str]
    recommendations: List[str]
    analysis_summary: str
    resume_text: str
    job_description: str

# Utility functions
def extract_text_from_pdf(file_content: bytes) -> str:
    """Extract text from PDF file"""
    try:
        pdf_file = io.BytesIO(file_content)
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
        return text.strip()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error extracting PDF text: {str(e)}")

def extract_text_from_docx(file_content: bytes) -> str:
    """Extract text from DOCX file"""
    try:
        doc_file = io.BytesIO(file_content)
        doc = docx.Document(doc_file)
        text = "\n".join([paragraph.text for paragraph in doc.paragraphs])
        return text.strip()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error extracting DOCX text: {str(e)}")

def preprocess_text(text: str) -> str:
    """Clean and preprocess text"""
    # Remove extra whitespace and normalize
    text = re.sub(r'\s+', ' ', text)
    text = text.lower().strip()
    return text

def extract_skills_from_text(text: str) -> List[str]:
    """Extract skills from text using pattern matching"""
    # Common tech skills and keywords
    skill_patterns = [
        r'\b(?:python|java|javascript|react|angular|vue|node\.?js|express|django|flask|spring|laravel)\b',
        r'\b(?:html|css|sass|scss|bootstrap|tailwind|material-ui|mui)\b',
        r'\b(?:sql|mysql|postgresql|mongodb|redis|sqlite|oracle|firebase)\b',
        r'\b(?:aws|azure|gcp|docker|kubernetes|jenkins|git|github|gitlab)\b',
        r'\b(?:machine learning|ml|ai|data science|analytics|tableau|power bi)\b',
        r'\b(?:agile|scrum|kanban|jira|confluence|slack|trello)\b',
        r'\b(?:leadership|teamwork|communication|problem solving|analytical)\b'
    ]
    
    skills = []
    text_lower = text.lower()
    
    for pattern in skill_patterns:
        matches = re.findall(pattern, text_lower)
        skills.extend(matches)
    
    # Remove duplicates and return
    return list(set(skills))

def calculate_basic_similarity(resume_text: str, job_description: str) -> float:
    """Calculate basic text similarity using TF-IDF and cosine similarity"""
    try:
        vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1, 2))
        tfidf_matrix = vectorizer.fit_transform([resume_text, job_description])
        similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
        return float(similarity * 100)  # Convert to percentage
    except Exception:
        return 0.0

async def analyze_with_ai(resume_text: str, job_description: str) -> Dict[str, Any]:
    """Use Gemini AI for advanced analysis"""
    try:
        # Initialize chat with Gemini
        chat = LlmChat(
            api_key=os.environ.get('EMERGENT_LLM_KEY'),
            session_id=str(uuid.uuid4()),
            system_message="You are an expert HR analyst and career counselor specializing in resume-job matching analysis."
        ).with_model("gemini", "gemini-2.5-flash")
        
        # Create analysis prompt
        prompt = f"""
        Analyze the following resume against the job description and provide a detailed assessment:

        RESUME:
        {resume_text[:2000]}...

        JOB DESCRIPTION:
        {job_description[:2000]}...

        Please provide your analysis in the following JSON format:
        {{
            "match_percentage": <number between 0-100>,
            "matched_skills": ["skill1", "skill2", ...],
            "missing_skills": ["skill1", "skill2", ...],
            "recommendations": ["recommendation1", "recommendation2", ...],
            "analysis_summary": "Brief 2-3 sentence summary of the overall match"
        }}

        Focus on:
        1. Technical skills alignment
        2. Experience relevance
        3. Educational background match
        4. Soft skills compatibility
        5. Industry experience
        
        Be specific and actionable in your recommendations.
        """
        
        user_message = UserMessage(text=prompt)
        response = await chat.send_message(user_message)
        
        # Parse AI response (basic JSON extraction)
        response_text = str(response)
        
        # Extract JSON from response
        import json
        try:
            # Find JSON in the response
            json_start = response_text.find('{')
            json_end = response_text.rfind('}') + 1
            
            if json_start != -1 and json_end != -1:
                json_str = response_text[json_start:json_end]
                ai_analysis = json.loads(json_str)
                
                return {
                    "match_percentage": float(ai_analysis.get("match_percentage", 0)),
                    "matched_skills": ai_analysis.get("matched_skills", []),
                    "missing_skills": ai_analysis.get("missing_skills", []),
                    "recommendations": ai_analysis.get("recommendations", []),
                    "analysis_summary": ai_analysis.get("analysis_summary", "AI analysis completed.")
                }
        except (json.JSONDecodeError, KeyError):
            pass
        
        # Fallback if JSON parsing fails
        return {
            "match_percentage": 75.0,
            "matched_skills": extract_skills_from_text(resume_text)[:5],
            "missing_skills": ["Communication", "Leadership", "Project Management"],
            "recommendations": [
                "Highlight relevant experience more prominently",
                "Add specific technical certifications",
                "Include quantifiable achievements"
            ],
            "analysis_summary": response_text[:200] + "..."
        }
        
    except Exception as e:
        logging.error(f"AI analysis error: {str(e)}")
        # Fallback to basic analysis
        basic_score = calculate_basic_similarity(resume_text, job_description)
        return {
            "match_percentage": basic_score,
            "matched_skills": extract_skills_from_text(resume_text)[:5],
            "missing_skills": ["Additional skills needed", "Industry experience", "Certifications"],
            "recommendations": [
                "Improve keyword matching with job description",
                "Add more relevant experience details",
                "Consider additional training or certifications"
            ],
            "analysis_summary": f"Basic analysis completed with {basic_score:.1f}% match score."
        }

# API Routes
@api_router.get("/")
async def root():
    return {"message": "AI Resume & Job Matcher API"}

@api_router.post("/upload-resume", response_model=Dict[str, str])
async def upload_resume(file: UploadFile = File(...)):
    """Extract text from uploaded resume file"""
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")
    
    file_content = await file.read()
    
    if file.filename.lower().endswith('.pdf'):
        text = extract_text_from_pdf(file_content)
    elif file.filename.lower().endswith(('.docx', '.doc')):
        text = extract_text_from_docx(file_content)
    else:
        raise HTTPException(status_code=400, detail="Unsupported file format. Please upload PDF or DOCX files.")
    
    if not text.strip():
        raise HTTPException(status_code=400, detail="No text found in the uploaded file")
    
    return {"text": text, "filename": file.filename}

@api_router.post("/analyze", response_model=AnalysisResponse)
async def analyze_resume_job_match(request: AnalysisResultCreate):
    """Analyze resume against job description"""
    try:
        # Preprocess texts
        resume_text = preprocess_text(request.resume_text)
        job_description = preprocess_text(request.job_description)
        
        if not resume_text or not job_description:
            raise HTTPException(status_code=400, detail="Both resume text and job description are required")
        
        # Perform AI analysis
        ai_analysis = await analyze_with_ai(resume_text, job_description)
        
        # Create analysis result
        analysis_result = AnalysisResult(
            match_percentage=ai_analysis["match_percentage"],
            matched_skills=ai_analysis["matched_skills"],
            missing_skills=ai_analysis["missing_skills"],
            recommendations=ai_analysis["recommendations"],
            analysis_summary=ai_analysis["analysis_summary"],
            resume_text=request.resume_text,
            job_description=request.job_description
        )
        
        # Store in database
        await db.analysis_results.insert_one(analysis_result.dict())
        
        return AnalysisResponse(
            id=analysis_result.id,
            match_percentage=analysis_result.match_percentage,
            matched_skills=analysis_result.matched_skills,
            missing_skills=analysis_result.missing_skills,
            recommendations=analysis_result.recommendations,
            analysis_summary=analysis_result.analysis_summary,
            resume_text=analysis_result.resume_text,
            job_description=analysis_result.job_description
        )
        
    except Exception as e:
        logging.error(f"Analysis error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@api_router.get("/analysis-history", response_model=List[AnalysisResponse])
async def get_analysis_history():
    """Get recent analysis history"""
    try:
        analyses = await db.analysis_results.find().sort("created_at", -1).limit(10).to_list(length=None)
        
        return [
            AnalysisResponse(
                id=analysis["id"],
                match_percentage=analysis["match_percentage"],
                matched_skills=analysis["matched_skills"],
                missing_skills=analysis["missing_skills"],
                recommendations=analysis["recommendations"],
                analysis_summary=analysis["analysis_summary"],
                resume_text=analysis["resume_text"],
                job_description=analysis["job_description"]
            )
            for analysis in analyses
        ]
    except Exception as e:
        logging.error(f"Error fetching history: {str(e)}")
        return []

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[
        "http://localhost:3000",
        "https://app-git-main-aftab-pathans-projects-9c06d6e7.vercel.app"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)


# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
@app.get("/health")
def health():
    return {"status": "ok"}