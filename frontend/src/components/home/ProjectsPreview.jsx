import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowRight, ExternalLink, Github, Eye } from 'lucide-react';
import { projects } from '../../data/mock';

const ProjectsPreview = () => {
  const [visibleProjects, setVisibleProjects] = useState([]);
  const featuredProjects = projects.slice(0, 2);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleProjects(featuredProjects);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-gradient-to-l from-blue-100 to-transparent dark:from-blue-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-purple-100 to-transparent dark:from-purple-900/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore my latest work in full-stack development, AI/ML, and innovative web applications
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {visibleProjects.map((project, index) => (
            <Card 
              key={project.id} 
              className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden ${
                index === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay Buttons */}
                <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <Button
                    size="sm"
                    className="bg-white/90 text-gray-900 hover:bg-white shadow-lg"
                    asChild
                  >
                    <Link to={`/projects/${project.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/90 border-white text-gray-900 hover:bg-white"
                    asChild
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                </div>

                {/* Project Status Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-500 text-white">
                    {project.status}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
                      {project.category}
                    </CardDescription>
                  </div>
                  
                  {/* External Links */}
                  <div className="flex space-x-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {project.shortDescription}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary"
                      className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge variant="outline" className="text-gray-500">
                      +{project.technologies.length - 4} more
                    </Badge>
                  )}
                </div>

                {/* View Project Button */}
                <Link to={`/projects/${project.id}`}>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white group/btn transition-all duration-300"
                  >
                    <span>Explore Project</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center">
          <Link to="/projects">
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group"
            >
              <span>View All Projects</span>
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default ProjectsPreview;