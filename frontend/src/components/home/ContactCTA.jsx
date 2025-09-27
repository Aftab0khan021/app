import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Github,
  Linkedin,
  MessageCircle,
  Sparkles,
  Calendar
} from 'lucide-react';
import { personalInfo } from '../../data/mock';

const ContactCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      action: `mailto:${personalInfo.email}`,
      color: 'from-red-500 to-pink-500',
      description: 'Drop me a line'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personalInfo.phone,
      action: `tel:${personalInfo.phone}`,
      color: 'from-green-500 to-emerald-500',
      description: 'Let\'s have a chat'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect',
      action: personalInfo.linkedin,
      color: 'from-blue-500 to-cyan-500',
      description: 'Professional network'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50/30 to-pink-50/20 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-300/10 to-purple-300/10 rounded-full blur-2xl animate-spin-slow" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-blue-500" />
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-4 py-2">
                Let's Work Together
              </Badge>
              <Sparkles className="h-6 w-6 text-purple-500" />
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Ready to Start Your
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Next Project?
              </span>
            </h2>
            
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              I'm always excited to work on innovative projects and collaborate with amazing teams. 
              Let's discuss how we can bring your ideas to life!
            </p>
          </div>

          {/* Main CTA Card */}
          <div className={`mb-16 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white border-0 shadow-2xl transform hover:scale-105 transition-all duration-500 overflow-hidden relative">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
              </div>
              
              <CardContent className="p-12 relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Content */}
                  <div className="space-y-6">
                    <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                      Have a Project in Mind?
                    </h3>
                    <p className="text-blue-100 text-lg leading-relaxed">
                      Whether it's a web application, mobile app, or AI-powered solution, 
                      I'm here to help turn your vision into reality. Let's create something amazing together!
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link to="/contact">
                        <Button 
                          size="lg" 
                          className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300 group"
                        >
                          <MessageCircle className="h-5 w-5 mr-2" />
                          <span>Get In Touch</span>
                          <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                      
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl transition-all duration-300 group"
                        onClick={() => window.open(personalInfo.resume, '_blank')}
                      >
                        <Calendar className="h-5 w-5 mr-2" />
                        <span>View Resume</span>
                      </Button>
                    </div>
                  </div>
                  
                  {/* Availability Status */}
                  <div className="text-center lg:text-right">
                    <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                      <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-200 font-medium">Available for Projects</span>
                      </div>
                      <p className="text-blue-100 text-sm mb-4">
                        Currently accepting new opportunities
                      </p>
                      <div className="text-2xl font-bold mb-2">24-48 hrs</div>
                      <p className="text-blue-200 text-sm">Average response time</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <Card
                  key={method.label}
                  className={`group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-white dark:bg-gray-900 overflow-hidden ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${0.5 + (index * 0.1)}s` }}
                >
                  <CardContent className="p-8 text-center">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${method.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {method.label}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {method.description}
                    </p>
                    <p className="text-gray-800 dark:text-gray-200 font-medium mb-6">
                      {method.value}
                    </p>
                    
                    {/* Action Button */}
                    <a
                      href={method.action}
                      target={method.action.startsWith('http') ? '_blank' : '_self'}
                      rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      <Button 
                        className={`w-full bg-gradient-to-r ${method.color} hover:shadow-lg transition-all duration-300 text-white group/btn`}
                      >
                        <span>Connect</span>
                        <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Social Links */}
          <div className={`text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Or find me on social platforms</p>
            <div className="flex justify-center space-x-6">
              <a
                href={personalInfo.github || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 transform hover:scale-125"
              >
                <Github className="h-8 w-8" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-all duration-300 transform hover:scale-125"
              >
                <Linkedin className="h-8 w-8" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-gray-500 dark:text-gray-400 hover:text-red-500 transition-all duration-300 transform hover:scale-125"
              >
                <Mail className="h-8 w-8" />
              </a>
            </div>
          </div>
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
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.8s ease-out forwards;
        }
        
        .animate-slide-in-up {
          animation: slide-in-up 0.8s ease-out forwards;
        }
        
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ContactCTA;