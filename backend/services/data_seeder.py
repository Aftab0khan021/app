from database import get_collection
import logging
from datetime import datetime

# Configure logging
logger = logging.getLogger(__name__)

async def seed_database():
    """
    Seeds or Updates the database with initial data from mock.js.
    Uses 'upsert' to ensure data is added/updated even if the DB is not empty.
    """
    logger.info("Starting Database Sync (Seeding/Updating)...")

    # 1. Personal Info (Update if email matches, or insert if not exists)
    personal_collection = await get_collection("personal_info")
    personal_data = {
        "name": "Aftab Pathan",
        "title": "Aspiring Software Engineer",
        "location": "Bhopal, Madhya Pradesh, India",
        "email": "paftab320@gmail.com",
        "phone": "+91 7089036313",
        "linkedin": "https://linkedin.com/in/aftab-khan-389282285",
        "github": "https://github.com/Aftab0khan021",
        "bio": "Passionate software engineer with a strong foundation in computer science and hands-on experience in building clean, efficient, and user-centric software solutions. Currently pursuing B-Tech with expertise in full-stack development and cloud technologies.",
        "avatar": "/images/aftab.jpg",
        "resume": "/resume-aftab-pathan.pdf",
        "updated_at": datetime.utcnow()
    }
    # Update existing doc with this email, or insert a new one
    await personal_collection.update_one(
        {"email": personal_data["email"]}, 
        {"$set": personal_data}, 
        upsert=True
    )
    logger.info("Synced Personal Info.")

    # 2. Projects
    projects_collection = await get_collection("projects")
    projects_data = [
        {
            "title": "Cab-Match",
            "description": "A comprehensive cab-sharing platform built with modern web technologies, featuring real-time ride tracking, secure authentication, and interactive maps for seamless user experience.",
            "short_description": "Cab-sharing platform with real-time tracking and interactive maps",
            "image": "https://images.unsplash.com/photo-1551650975-87deedd944c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxtb2JpbGUlMjBhcHB8ZW58MHx8fHwxNzU4OTgwMTUwfDA&ixlib=rb-4.1.0&q=85",
            "images": [
                "https://images.unsplash.com/photo-1551650975-87deedd944c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxtb2JpbGUlMjBhcHB8ZW58MHx8fHwxNzU4OTgwMTUwfDA&ixlib=rb-4.1.0&q=85",
                "https://images.pexels.com/photos/9558775/pexels-photo-9558775.jpeg",
                "https://images.unsplash.com/photo-1503252947848-7338d3f92f31?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMG1vY2t1cHxlbnwwfHx8fDE3NTg5ODAxNDB8MA&ixlib=rb-4.1.0&q=85"
            ],
            "live_url": "https://cab-match.vercel.app",
            "github_url": "https://github.com/Aftab0khan021/cab-match",
            "technologies": ["React", "FastAPI", "MongoDB Atlas", "JWT", "Maps API", "WebSocket", "Tailwind CSS"],
            "features": [
                "Real-time ride tracking with interactive maps",
                "Secure JWT-based authentication system",
                "Role-based access control for riders and drivers",
                "Responsive UI for seamless mobile experience",
                "MongoDB Atlas for scalable data storage",
                "RESTful API architecture with FastAPI"
            ],
            "category": "Full-Stack Web Application",
            "status": "completed",
            "start_date": datetime(2024, 4, 1),
            "end_date": datetime(2024, 6, 1),
            "updated_at": datetime.utcnow()
        },
        {
            "title": "AI-Resume-Analyser",
            "description": "An intelligent resume analysis platform that leverages AI to parse, analyze, and provide insights on resumes. Built with full-stack architecture and deployed on cloud platforms.",
            "short_description": "AI-powered resume analysis and parsing platform",
            "image": "https://images.pexels.com/photos/6625655/pexels-photo-6625655.png",
            "images": [
                "https://images.pexels.com/photos/6625655/pexels-photo-6625655.png",
                "https://images.unsplash.com/photo-1585229259079-05ab82f93c7b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMG1vY2t1cHxlbnwwfHx8fDE3NTg5ODAxNDB8MA&ixlib=rb-4.1.0&q=85",
                "https://images.unsplash.com/photo-1601972602237-8c79241e468b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxtb2JpbGUlMjBhcHB8ZW58MHx8fHwxNzU4OTgwMTUwfDA&ixlib=rb-4.1.0&q=85"
            ],
            "live_url": "https://bit.ly/4ncTTHC",
            "github_url": "https://github.com/Aftab0khan021/ai-resume-analyser",
            "technologies": ["React", "FastAPI", "MongoDB Atlas", "Python", "AI/ML", "Pandas", "NumPy", "Vercel", "Render"],
            "features": [
                "Intelligent resume parsing and text extraction",
                "AI-powered skills and experience analysis",
                "Interactive dashboard for resume insights",
                "File upload with drag-and-drop functionality",
                "Cloud deployment with environment configurations",
                "RESTful API for seamless frontend integration"
            ],
            "category": "AI/ML Web Application",
            "status": "completed",
            "start_date": datetime(2024, 1, 1),
            "end_date": datetime(2024, 3, 1),
            "updated_at": datetime.utcnow()
        }
    ]
    
    for project in projects_data:
        # Update project if title matches, otherwise insert
        await projects_collection.update_one(
            {"title": project["title"]}, 
            {"$set": project}, 
            upsert=True
        )
    logger.info("Synced Projects.")

    # 3. Experience
    experience_collection = await get_collection("experiences")
    experience_data = [
        {
            "company": "Walmart",
            "title": "Software Developer Intern",
            "location": "Remote",
            "type": "Virtual Internship",
            "start_date": datetime(2024, 6, 1),
            "end_date": datetime(2024, 8, 1),
            "current": False,
            "description": "Designed scalable software modules with clean architecture, built optimized data structures improving runtime efficiency, and created database schemas to enhance data retrieval performance.",
            "achievements": [
                "Designed scalable software modules with clean architecture",
                "Built optimized data structures, improving runtime efficiency by 25%",
                "Created database schemas to improve data retrieval performance",
                "Collaborated with cross-functional teams in agile environment"
            ],
            "skills": ["Python", "Data Structures", "Algorithm Optimization", "Database Design", "Agile"],
            "updated_at": datetime.utcnow()
        },
        {
            "company": "Accenture",
            "title": "Software Development Engineer",
            "location": "Remote",
            "type": "Virtual Internship",
            "start_date": datetime(2024, 3, 1),
            "end_date": datetime(2024, 5, 1),
            "current": False,
            "description": "Migrated applications to AWS/GCP cloud infrastructure, improved performance through debugging & optimization, and conducted comprehensive UAT & security testing.",
            "achievements": [
                "Migrated applications to AWS/GCP cloud infrastructure",
                "Improved application performance by 30% through debugging & optimization",
                "Conducted UAT & security testing including IAM policies",
                "Implemented CI/CD pipelines for automated deployment"
            ],
            "skills": ["AWS", "GCP", "Cloud Migration", "Performance Optimization", "Security Testing", "IAM"],
            "updated_at": datetime.utcnow()
        }
    ]
    
    for exp in experience_data:
        # Update experience if company and title match
        await experience_collection.update_one(
            {"company": exp["company"], "title": exp["title"]}, 
            {"$set": exp}, 
            upsert=True
        )
    logger.info("Synced Experience.")

    # 4. Skills
    skills_collection = await get_collection("skills")
    
    if await skills_collection.count_documents({}) == 0:
        logger.info("Seeding Skills...")
        skills_data = []
        
        tech_skills = {
            "Programming Languages": ["C/C++", "Python", "JavaScript"],
            "Web Technologies": ["HTML", "CSS", "React", "Bootstrap", "Tailwind CSS", "Node.js", "Express.js"],
            "Databases": ["SQL", "MongoDB", "MongoDB Atlas"],
            "Cloud & DevOps": ["AWS", "GCP", "Docker", "Git", "GitHub"],
            "ML Libraries": ["Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
            "Tools & IDEs": ["VS Code", "Linux", "Windows"]
        }
        
        for category, items in tech_skills.items():
            for skill_name in items:
                skills_data.append({
                    "name": skill_name,
                    "category": category,
                    "level": 85,
                    "created_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow()
                })
        
        soft_skills = ["Problem Solving", "Team Collaboration", "Agile Development", "Critical Thinking", "Communication", "Leadership"]
        for skill_name in soft_skills:
            skills_data.append({
                "name": skill_name,
                "category": "Soft Skills",
                "level": 90,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            })
                
        await skills_collection.insert_many(skills_data)
        logger.info("Synced Skills.")
        
    logger.info("Database Sync Complete!")