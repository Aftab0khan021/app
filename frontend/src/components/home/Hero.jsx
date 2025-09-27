import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Download, 
  Mail, 
  MapPin, 
  ArrowRight,
  Github,
  Linkedin,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { usePersonalInfo } from '../../hooks/useApi';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Software Engineer', 'Full-Stack Developer', 'Problem Solver', 'Tech Enthusiast'];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-300/10 to-purple-300/10 rounded-full blur-2xl animate-spin-slow" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className={`space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              {/* Status Badge */}
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-4 py-2 flex items-center space-x-2 w-fit">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Available for Opportunities</span>
              </Badge>

              {/* Main Title */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                  Hey, I'm{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                    {personalInfo.name.split(' ')[0]}
                  </span>
                </h1>
                
                {/* Animated Subtitle */}
                <div className="h-16 flex items-center">
                  <h2 className="text-2xl lg:text-3xl font-semibold text-gray-600 dark:text-gray-300">
                    <span className="inline-flex items-center space-x-2">
                      <Sparkles className="h-6 w-6 text-blue-500" />
                      <span 
                        key={currentWord}
                        className="animate-fade-in-up bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                      >
                        {words[currentWord]}
                      </span>
                    </span>
                  </h2>
                </div>
              </div>

              {/* Description */}
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                {personalInfo.bio}
              </p>

              {/* Location */}
              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <MapPin className="h-5 w-5" />
                <span>{personalInfo.location}</span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/projects">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-2 group">
                    <span>View My Work</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 px-8 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 group"
                  onClick={() => window.open(personalInfo.resume, '_blank')}
                >
                  <Download className="h-5 w-5 group-hover:animate-bounce" />
                  <span>Resume</span>
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-6 pt-4">
                <a
                  href={personalInfo.github || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 transform hover:scale-110"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors duration-300 transform hover:scale-110"
                >
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Profile Image */}
            <div className={`flex justify-center lg:justify-end ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
              <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-2xl opacity-30 animate-pulse" />
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20" />
                
                {/* Profile Image */}
                <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white/90 text-gray-900 hover:bg-white"
                      onClick={() => window.location.href = `/contact`}
                    >
                      Let's Connect
                    </Button>
                  </div>
                </div>

                {/* Floating Skills */}
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-gray-200 dark:border-gray-700 animate-float">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">React</span>
                </div>
                <div className="absolute top-1/2 -left-6 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-gray-200 dark:border-gray-700 animate-float-delay">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Python</span>
                </div>
                <div className="absolute -bottom-4 right-8 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-gray-200 dark:border-gray-700 animate-float">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AWS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-scroll" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes scroll {
          0% { opacity: 0; transform: translateY(0); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateY(12px); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out 0.3s forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float 3s ease-in-out infinite 1.5s;
        }
        
        .animate-scroll {
          animation: scroll 2s infinite;
        }
        
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;