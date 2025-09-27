import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Download, 
  Award, 
  GraduationCap,
  Briefcase,
  Code,
  Heart,
  Target,
  Lightbulb,
  Users
} from 'lucide-react';
import { personalInfo, education, certifications, skills } from '../data/mock';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [skillProgress, setSkillProgress] = useState({});

  useEffect(() => {
    setIsVisible(true);
    // Animate skill progress bars
    setTimeout(() => {
      const progress = {
        'Frontend Development': 95,
        'Backend Development': 90,
        'Database Design': 85,
        'Cloud Technologies': 80,
        'AI/ML': 75,
        'Problem Solving': 90
      };
      setSkillProgress(progress);
    }, 1000);
  }, []);

  const highlights = [
    {
      icon: Code,
      title: 'Full-Stack Developer',
      description: 'Expertise in modern web technologies including React, FastAPI, and cloud platforms'
    },
    {
      icon: Lightbulb,
      title: 'Problem Solver',
      description: 'Passionate about finding innovative solutions to complex technical challenges'
    },
    {
      icon: Users,
      title: 'Team Collaborator',
      description: 'Strong communication skills and experience working in agile development teams'
    },
    {
      icon: Target,
      title: 'Goal-Oriented',
      description: 'Focused on delivering high-quality software that meets user needs and business objectives'
    }
  ];

  const values = [
    {
      title: 'Continuous Learning',
      description: 'I believe in staying updated with the latest technologies and best practices in software development.'
    },
    {
      title: 'Quality First',
      description: 'Writing clean, maintainable code and following industry standards is my top priority.'
    },
    {
      title: 'User-Centric Design',
      description: 'Every application I build is designed with the end-user experience in mind.'
    },
    {
      title: 'Innovation',
      description: 'I enjoy exploring new technologies and finding creative solutions to challenging problems.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50/30 to-pink-50/20 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className={`space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                    About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
                  </h1>
                  <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
                    {personalInfo.bio}
                  </p>
                </div>

                {/* Quick Info */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span>{personalInfo.location}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                    <Mail className="h-5 w-5 text-red-500" />
                    <a href={`mailto:${personalInfo.email}`} className="hover:text-red-500 transition-colors">
                      {personalInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                    <Phone className="h-5 w-5 text-green-500" />
                    <span>{personalInfo.phone}</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => window.open(personalInfo.resume, '_blank')}
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Resume
                </Button>
              </div>

              {/* Profile Image */}
              <div className={`flex justify-center lg:justify-end ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-2xl opacity-30 animate-pulse" />
                  <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                    <img
                      src={personalInfo.avatar}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
              What Defines Me
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {highlights.map((highlight, index) => {
                const IconComponent = highlight.icon;
                return (
                  <Card
                    key={highlight.title}
                    className={`text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-6">
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        {highlight.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {highlight.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
              Skills Overview
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(skillProgress).map(([skill, progress], index) => (
                <div key={skill} className={`${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`} style={{ animationDelay: `${0.5 + (index * 0.1)}s` }}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-medium text-gray-900 dark:text-white">{skill}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Education */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                  <GraduationCap className="h-8 w-8 mr-3 text-blue-600" />
                  Education
                </h2>
                
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <Card key={edu.id} className={`hover:shadow-lg transition-all duration-300 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`} style={{ animationDelay: `${index * 0.1}s` }}>
                      <CardHeader>
                        <CardTitle className="text-xl text-gray-900 dark:text-white">{edu.degree}</CardTitle>
                        <CardDescription className="text-blue-600 font-medium">{edu.field}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">{edu.institution}</p>
                        <p className="text-gray-500 dark:text-gray-500 text-sm mb-4">{edu.location}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</Badge>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                            GPA: {edu.gpa}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                  <Award className="h-8 w-8 mr-3 text-purple-600" />
                  Certifications
                </h2>
                
                <div className="space-y-6">
                  {certifications.map((cert, index) => (
                    <Card key={cert.id} className={`hover:shadow-lg transition-all duration-300 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`} style={{ animationDelay: `${index * 0.1}s` }}>
                      <CardHeader>
                        <CardTitle className="text-lg text-gray-900 dark:text-white">{cert.title}</CardTitle>
                        <CardDescription className="text-purple-600 font-medium">{cert.issuer}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{cert.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {cert.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                          {cert.date}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
              My Values
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={value.title} className={`hover:shadow-lg transition-all duration-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${0.8 + (index * 0.1)}s` }}>
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center">
                      <Heart className="h-5 w-5 mr-2 text-red-500" />
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-fade-in-right { animation: fade-in-right 0.8s ease-out 0.3s forwards; }
        .animate-slide-in-up { animation: slide-in-up 0.8s ease-out forwards; }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out forwards; }
        .animate-slide-in-right { animation: slide-in-right 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default About;