// Mock data for Aftab Pathan's Portfolio

export const personalInfo = {
  name: "Aftab Pathan",
  title: "Aspiring Software Engineer",
  location: "Bhopal, Madhya Pradesh, India",
  email: "paftab320@gmail.com",
  phone: "+91 7089036313",
  linkedin: "https://linkedin.com/in/aftab-khan-389282285",
  github: "https://github.com/Aftab0khan021",
  bio: "Passionate software engineer with a strong foundation in computer science and hands-on experience in building clean, efficient, and user-centric software solutions. Currently pursuing B-Tech with expertise in full-stack development and cloud technologies.",
  avatar: "frontend\image\Aftab PAthan.png?usp=drive_link",
  resume: "/resume-aftab-pathan.pdf"
};

export const experiences = [
  {
    id: "exp-1",
    title: "Software Developer Intern",
    company: "Walmart",
    location: "Remote",
    type: "Virtual Internship",
    startDate: "2024-06",
    endDate: "2024-08",
    current: false,
    description: "Designed scalable software modules with clean architecture, built optimized data structures improving runtime efficiency, and created database schemas to enhance data retrieval performance.",
    achievements: [
      "Designed scalable software modules with clean architecture",
      "Built optimized data structures, improving runtime efficiency by 25%",
      "Created database schemas to improve data retrieval performance",
      "Collaborated with cross-functional teams in agile environment"
    ],
    skills: ["Python", "Data Structures", "Algorithm Optimization", "Database Design", "Agile"]
  },
  {
    id: "exp-2",
    title: "Software Development Engineer",
    company: "Accenture",
    location: "Remote",
    type: "Virtual Internship",
    startDate: "2024-03",
    endDate: "2024-05",
    current: false,
    description: "Migrated applications to AWS/GCP cloud infrastructure, improved performance through debugging & optimization, and conducted comprehensive UAT & security testing.",
    achievements: [
      "Migrated applications to AWS/GCP cloud infrastructure",
      "Improved application performance by 30% through debugging & optimization",
      "Conducted UAT & security testing including IAM policies",
      "Implemented CI/CD pipelines for automated deployment"
    ],
    skills: ["AWS", "GCP", "Cloud Migration", "Performance Optimization", "Security Testing", "IAM"]
  }
];

export const projects = [
  {
    id: "project-1",
    title: "Cab-Match",
    description: "A comprehensive cab-sharing platform built with modern web technologies, featuring real-time ride tracking, secure authentication, and interactive maps for seamless user experience.",
    shortDescription: "Cab-sharing platform with real-time tracking and interactive maps",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxtb2JpbGUlMjBhcHB8ZW58MHx8fHwxNzU4OTgwMTUwfDA&ixlib=rb-4.1.0&q=85",
    images: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxtb2JpbGUlMjBhcHB8ZW58MHx8fHwxNzU4OTgwMTUwfDA&ixlib=rb-4.1.0&q=85",
      "https://images.pexels.com/photos/9558775/pexels-photo-9558775.jpeg",
      "https://images.unsplash.com/photo-1503252947848-7338d3f92f31?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMG1vY2t1cHxlbnwwfHx8fDE3NTg5ODAxNDB8MA&ixlib=rb-4.1.0&q=85"
    ],
    liveUrl: "https://cab-match.vercel.app",
    githubUrl: "https://github.com/Aftab0khan021/cab-match",
    technologies: ["React", "FastAPI", "MongoDB Atlas", "JWT", "Maps API", "WebSocket", "Tailwind CSS"],
    features: [
      "Real-time ride tracking with interactive maps",
      "Secure JWT-based authentication system",
      "Role-based access control for riders and drivers",
      "Responsive UI for seamless mobile experience",
      "MongoDB Atlas for scalable data storage",
      "RESTful API architecture with FastAPI"
    ],
    category: "Full-Stack Web Application",
    status: "Completed",
    startDate: "2024-04",
    endDate: "2024-06"
  },
  {
    id: "project-2",
    title: "AI-Resume-Analyser",
    description: "An intelligent resume analysis platform that leverages AI to parse, analyze, and provide insights on resumes. Built with full-stack architecture and deployed on cloud platforms.",
    shortDescription: "AI-powered resume analysis and parsing platform",
    image: "https://images.pexels.com/photos/6625655/pexels-photo-6625655.png",
    images: [
      "https://images.pexels.com/photos/6625655/pexels-photo-6625655.png",
      "https://images.unsplash.com/photo-1585229259079-05ab82f93c7b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMG1vY2t1cHxlbnwwfHx8fDE3NTg5ODAxNDB8MA&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1601972602237-8c79241e468b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxtb2JpbGUlMjBhcHB8ZW58MHx8fHwxNzU4OTgwMTUwfDA&ixlib=rb-4.1.0&q=85"
    ],
    liveUrl: "https://bit.ly/4ncTTHC",
    githubUrl: "https://github.com/Aftab0khan021/ai-resume-analyser",
    technologies: ["React", "FastAPI", "MongoDB Atlas", "Python", "AI/ML", "Pandas", "NumPy", "Vercel", "Render"],
    features: [
      "Intelligent resume parsing and text extraction",
      "AI-powered skills and experience analysis",
      "Interactive dashboard for resume insights",
      "File upload with drag-and-drop functionality",
      "Cloud deployment with environment configurations",
      "RESTful API for seamless frontend integration"
    ],
    category: "AI/ML Web Application",
    status: "Completed",
    startDate: "2024-01",
    endDate: "2024-03"
  }
];

export const skills = {
  technical: {
    "Programming Languages": ["C/C++", "Python", "JavaScript"],
    "Web Technologies": ["HTML", "CSS", "React", "Bootstrap", "Tailwind CSS", "Node.js", "Express.js"],
    "Databases": ["SQL", "MongoDB", "MongoDB Atlas"],
    "Cloud & DevOps": ["AWS", "GCP", "Docker", "Git", "GitHub"],
    "ML Libraries": ["Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    "Tools & IDEs": ["VS Code", "Linux", "Windows"]
  },
  soft: ["Problem Solving", "Team Collaboration", "Agile Development", "Critical Thinking", "Communication", "Leadership"]
};

export const education = [
  {
    id: "edu-1",
    degree: "Bachelor of Technology (B-Tech)",
    field: "Computer Science & Engineering",
    institution: "Lakshmi Narian College of Technology Excellence",
    location: "Raisen Road, Bhopal, Madhya Pradesh",
    startDate: "2022",
    endDate: "2026",
    current: true,
    gpa: "8.5/10",
    description: "Comprehensive computer science program covering software engineering, data structures, algorithms, and modern development practices.",
    achievements: [
      "Consistent academic performer with 8.5+ GPA",
      "Active participant in coding competitions",
      "Member of technical societies and programming clubs"
    ]
  }
];

export const certifications = [
  {
    id: "cert-1",
    title: "Web Development",
    issuer: "IBM SkillsBuild",
    date: "2024",
    credentialId: "IBM-WD-2024",
    description: "Comprehensive web development certification covering HTML, CSS, JavaScript, and modern frameworks.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"]
  },
  {
    id: "cert-2",
    title: "Introduction to Artificial Intelligence",
    issuer: "IBM SkillsBuild",
    date: "2024",
    credentialId: "IBM-AI-2024",
    description: "Foundational AI concepts, machine learning algorithms, and practical applications.",
    skills: ["Machine Learning", "AI Concepts", "Python", "Data Analysis"]
  },
  {
    id: "cert-3",
    title: "Cloud Foundation",
    issuer: "AWS Academy",
    date: "2024",
    credentialId: "AWS-CF-2024",
    description: "Core AWS services, cloud computing fundamentals, and best practices.",
    skills: ["AWS", "Cloud Computing", "EC2", "S3", "IAM"]
  },
  {
    id: "cert-4",
    title: "Python Foundation",
    issuer: "Infosys Springboard",
    date: "2023",
    credentialId: "IS-PY-2023",
    description: "Python programming fundamentals, data structures, and object-oriented programming.",
    skills: ["Python", "OOP", "Data Structures", "Algorithms"]
  }
];

export const testimonials = [
  {
    id: "test-1",
    name: "Rajesh Kumar",
    position: "Senior Software Engineer",
    company: "Walmart",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    text: "Aftab demonstrated exceptional problem-solving skills and delivered clean, scalable code. His ability to optimize data structures significantly improved our application performance.",
    rating: 5
  },
  {
    id: "test-2",
    name: "Priya Sharma",
    position: "Technical Lead",
    company: "Accenture",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    text: "Working with Aftab was a pleasure. He quickly adapted to cloud technologies and delivered a 30% performance improvement in our migration project.",
    rating: 5
  },
  {
    id: "test-3",
    name: "Dr. Amit Verma",
    position: "Professor",
    company: "LNCTE",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    text: "Aftab is one of our most dedicated students. His passion for learning and ability to apply theoretical concepts to real-world projects is commendable.",
    rating: 5
  }
];

export const blogPosts = [
  {
    id: "blog-1",
    title: "Building Scalable Web Applications with React and FastAPI",
    slug: "building-scalable-web-applications-react-fastapi",
    excerpt: "Learn how to create robust full-stack applications using React for the frontend and FastAPI for the backend, with practical examples and best practices.",
    content: "Full blog content would go here...",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    tags: ["React", "FastAPI", "Full-Stack", "Web Development"],
    publishedAt: "2024-07-15",
    readTime: "8 min read",
    featured: true
  },
  {
    id: "blog-2",
    title: "Cloud Migration Strategies: AWS vs GCP",
    slug: "cloud-migration-strategies-aws-vs-gcp",
    excerpt: "A comprehensive comparison of AWS and GCP for cloud migration, covering costs, services, and implementation strategies.",
    content: "Full blog content would go here...",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    tags: ["AWS", "GCP", "Cloud Migration", "DevOps"],
    publishedAt: "2024-07-10",
    readTime: "12 min read",
    featured: false
  },
  {
    id: "blog-3",
    title: "AI in Resume Analysis: Building Smart Parsing Systems",
    slug: "ai-resume-analysis-smart-parsing-systems",
    excerpt: "Explore how AI and machine learning can revolutionize resume parsing and analysis, with practical implementation examples.",
    content: "Full blog content would go here...",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    tags: ["AI", "Machine Learning", "Python", "Resume Analysis"],
    publishedAt: "2024-07-05",
    readTime: "10 min read",
    featured: true
  }
];

export const caseStudies = [
  {
    id: "case-1",
    title: "Cab-Match: Revolutionizing Urban Transportation",
    slug: "cab-match-revolutionizing-urban-transportation",
    description: "A deep dive into how Cab-Match addresses urban transportation challenges through innovative technology solutions.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop",
    project: "project-1",
    challenge: "Urban areas face significant transportation challenges including traffic congestion, high costs, and environmental impact.",
    solution: "Developed a comprehensive cab-sharing platform that connects riders with similar routes, reducing costs and environmental impact.",
    results: [
      "30% reduction in individual transportation costs",
      "25% decrease in carbon footprint per ride",
      "Real-time tracking improved user satisfaction by 40%"
    ],
    technologies: ["React", "FastAPI", "MongoDB", "Maps API", "WebSocket"],
    duration: "3 months",
    category: "Transportation Technology"
  }
];

// Blog categories for filtering
export const blogCategories = [
  { id: "all", name: "All Posts", count: 3 },
  { id: "web-development", name: "Web Development", count: 1 },
  { id: "cloud", name: "Cloud", count: 1 },
  { id: "ai-ml", name: "AI & ML", count: 1 }
];

// Project categories for filtering
export const projectCategories = [
  { id: "all", name: "All Projects", count: 2 },
  { id: "full-stack", name: "Full-Stack", count: 1 },
  { id: "ai-ml", name: "AI & ML", count: 1 }
];

export default {
  personalInfo,
  experiences,
  projects,
  skills,
  education,
  certifications,
  testimonials,
  blogPosts,
  caseStudies,
  blogCategories,
  projectCategories
};