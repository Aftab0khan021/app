from database import get_collection
from models.personal import PersonalInfo
import logging
from datetime import datetime  # FIX: Added datetime import

# Configure logging
logger = logging.getLogger(__name__)

async def seed_database():
    """
    Seeds the database with initial data if collections are empty.
    Matches the data from frontend/src/data/mock.js
    """
    logger.info("Checking if database needs seeding...")

    # 1. Personal Info
    personal_collection = await get_collection("personal_info")
    if await personal_collection.count_documents({}) == 0:
        logger.info("Seeding Personal Info...")
        await personal_collection.insert_one({
            "name": "Aftab Pathan",
            "title": "Aspiring Software Engineer",
            "location": "Bhopal, Madhya Pradesh, India",
            "email": "paftab320@gmail.com",
            "phone": "+91 7089036313",
            "linkedin": "https://linkedin.com/in/aftab-khan-389282285",
            "github": "https://github.com/Aftab0khan021",
            "bio": "Passionate software engineer with a strong foundation in computer science and hands-on experience in building clean, efficient, and user-centric software solutions. Currently pursuing B-Tech with expertise in full-stack development and cloud technologies.",
            "avatar": "/images/aftab.jpg",
            "resume": "/resume-aftab-pathan.pdf"
        })

    # 2. Projects
    projects_collection = await get_collection("projects")
    if await projects_collection.count_documents({}) == 0:
        logger.info("Seeding Projects...")
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
                # FIX: Use datetime objects
                "start_date": datetime(2024, 4, 1),
                "end_date": datetime(2024, 6, 1)
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
                # FIX: Use datetime objects
                "start_date": datetime(2024, 1, 1),
                "end_date": datetime(2024, 3, 1)
            }
        ]
        await projects_collection.insert_many(projects_data)

    # 3. Experience
    experience_collection = await get_collection("experiences")
    if await experience_collection.count_documents({}) == 0:
        logger.info("Seeding Experience...")
        experience_data = [
            {
                "company": "Walmart",
                # FIX: Changed 'role' to 'title' to match backend model
                "title": "Software Developer Intern",
                "location": "Remote",
                "type": "Virtual Internship",
                # FIX: Use datetime objects
                "start_date": datetime(2024, 6, 1),
                "end_date": datetime(2024, 8, 1),
                "current": False,
                "description": "Designed scalable software modules with clean architecture, built optimized data structures improving runtime efficiency, and created database schemas to enhance data retrieval performance.",
                "skills": ["Python", "Data Structures", "Algorithm Optimization", "Database Design", "Agile"]
            },
            {
                "company": "Accenture",
                # FIX: Changed 'role' to 'title'
                "title": "Software Development Engineer",
                "location": "Remote",
                "type": "Virtual Internship",
                # FIX: Use datetime objects
                "start_date": datetime(2024, 3, 1),
                "end_date": datetime(2024, 5, 1),
                "current": False,
                "description": "Migrated applications to AWS/GCP cloud infrastructure, improved performance through debugging & optimization, and conducted comprehensive UAT & security testing.",
                "skills": ["AWS", "GCP", "Cloud Migration", "Performance Optimization", "Security Testing", "IAM"]
            }
        ]
        await experience_collection.insert_many(experience_data)

    # 4. Skills
    skills_collection = await get_collection("skills")
    if await skills_collection.count_documents({}) == 0:
        logger.info("Seeding Skills...")
        skills_data = []
        
        # Helper to format skills from your mock structure to DB structure
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
                    "level": 85  # Default level
                })
                
        await skills_collection.insert_many(skills_data)
        
    logger.info("Database seeding complete!")