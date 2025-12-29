from database import get_collection
import logging
from datetime import datetime

# Configure logging
logger = logging.getLogger(__name__)

async def seed_database():
    """
    Seeds the database with initial data from mock.js if collections are empty.
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
            "resume": "/resume-aftab-pathan.pdf",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
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
                # Note: Adding -01 to make it a valid full date for the backend model
                "start_date": "2024-04-01", 
                "end_date": "2024-06-01",
                "created_at": datetime.utcnow(),
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
                "start_date": "2024-01-01",
                "end_date": "2024-03-01",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
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
                "role": "Software Developer Intern",
                "location": "Remote",
                "type": "Virtual Internship",
                "start_date": "2024-06",
                "end_date": "2024-08",
                "current": False,
                "description": "Designed scalable software modules with clean architecture, built optimized data structures improving runtime efficiency, and created database schemas to enhance data retrieval performance.",
                "skills": ["Python", "Data Structures", "Algorithm Optimization", "Database Design", "Agile"],
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "company": "Accenture",
                "role": "Software Development Engineer",
                "location": "Remote",
                "type": "Virtual Internship",
                "start_date": "2024-03",
                "end_date": "2024-05",
                "current": False,
                "description": "Migrated applications to AWS/GCP cloud infrastructure, improved performance through debugging & optimization, and conducted comprehensive UAT & security testing.",
                "skills": ["AWS", "GCP", "Cloud Migration", "Performance Optimization", "Security Testing", "IAM"],
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        ]
        await experience_collection.insert_many(experience_data)

    # 4. Skills
    skills_collection = await get_collection("skills")
    if await skills_collection.count_documents({}) == 0:
        logger.info("Seeding Skills...")
        skills_data = []
        
        # Map mock.js structure to DB structure
        tech_skills = {
            "Programming Languages": ["C/C++", "Python", "JavaScript"],
            "Web Technologies": ["HTML", "CSS", "React", "Bootstrap", "Tailwind CSS", "Node.js", "Express.js"],
            "Databases": ["SQL", "MongoDB", "MongoDB Atlas"],
            "Cloud & DevOps": ["AWS", "GCP", "Docker", "Git", "GitHub"],
            "ML Libraries": ["Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
            "Tools & IDEs": ["VS Code", "Linux", "Windows"]
        }
        
        # Flatten technical skills
        for category, items in tech_skills.items():
            for skill_name in items:
                skills_data.append({
                    "name": skill_name,
                    "category": category,
                    "level": 85,  # Default level
                    "created_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow()
                })
        
        # Add soft skills
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

    # 5. Education
    education_collection = await get_collection("education")
    if await education_collection.count_documents({}) == 0:
        logger.info("Seeding Education...")
        education_data = [
            {
                "degree": "Bachelor of Technology (B-Tech)",
                "field": "Computer Science & Engineering",
                "institution": "Lakshmi Narian College of Technology Excellence",
                "location": "Raisen Road, Bhopal, Madhya Pradesh",
                "start_date": "2022-01-01", # Added -01-01 for valid date format
                "end_date": "2026-01-01",
                "current": True,
                "gpa": "8.5/10",
                "description": "Comprehensive computer science program covering software engineering, data structures, algorithms, and modern development practices.",
                "achievements": [
                    "Consistent academic performer with 8.5+ GPA",
                    "Active participant in coding competitions",
                    "Member of technical societies and programming clubs"
                ],
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        ]
        await education_collection.insert_many(education_data)

    # 6. Blog Posts
    blog_collection = await get_collection("blog_posts")
    if await blog_collection.count_documents({}) == 0:
        logger.info("Seeding Blog Posts...")
        blog_data = [
            {
                "title": "Building Scalable Web Applications with React and FastAPI",
                "slug": "building-scalable-web-applications-react-fastapi",
                "excerpt": "Learn how to create robust full-stack applications using React for the frontend and FastAPI for the backend, with practical examples and best practices.",
                "content": "Full blog content would go here...",
                "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
                "tags": ["React", "FastAPI", "Full-Stack", "Web Development"],
                "published_at": "2024-07-15",
                "read_time": "8 min read",
                "featured": True,
                "status": "published",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "title": "Cloud Migration Strategies: AWS vs GCP",
                "slug": "cloud-migration-strategies-aws-vs-gcp",
                "excerpt": "A comprehensive comparison of AWS and GCP for cloud migration, covering costs, services, and implementation strategies.",
                "content": "Full blog content would go here...",
                "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
                "tags": ["AWS", "GCP", "Cloud Migration", "DevOps"],
                "published_at": "2024-07-10",
                "read_time": "12 min read",
                "featured": False,
                "status": "published",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "title": "AI in Resume Analysis: Building Smart Parsing Systems",
                "slug": "ai-resume-analysis-smart-parsing-systems",
                "excerpt": "Explore how AI and machine learning can revolutionize resume parsing and analysis, with practical implementation examples.",
                "content": "Full blog content would go here...",
                "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
                "tags": ["AI", "Machine Learning", "Python", "Resume Analysis"],
                "published_at": "2024-07-05",
                "read_time": "10 min read",
                "featured": True,
                "status": "published",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        ]
        await blog_collection.insert_many(blog_data)

    # 7. Testimonials
    testimonials_collection = await get_collection("testimonials")
    if await testimonials_collection.count_documents({}) == 0:
        logger.info("Seeding Testimonials...")
        testimonials_data = [
            {
                "name": "Rajesh Kumar",
                "position": "Senior Software Engineer",
                "company": "Walmart",
                "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                "text": "Aftab demonstrated exceptional problem-solving skills and delivered clean, scalable code. His ability to optimize data structures significantly improved our application performance.",
                "rating": 5,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "name": "Priya Sharma",
                "position": "Technical Lead",
                "company": "Accenture",
                "image": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
                "text": "Working with Aftab was a pleasure. He quickly adapted to cloud technologies and delivered a 30% performance improvement in our migration project.",
                "rating": 5,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "name": "Dr. Amit Verma",
                "position": "Professor",
                "company": "LNCTE",
                "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
                "text": "Aftab is one of our most dedicated students. His passion for learning and ability to apply theoretical concepts to real-world projects is commendable.",
                "rating": 5,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        ]
        await testimonials_collection.insert_many(testimonials_data)

    logger.info("Database seeding complete!")