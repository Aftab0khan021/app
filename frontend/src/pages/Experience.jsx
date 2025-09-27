import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Calendar, MapPin, Building, CheckCircle, ExternalLink } from 'lucide-react';
import { experiences } from '../data/mock';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50/30 to-pink-50/20 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center max-w-4xl mx-auto ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Professional <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Experience</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
              My journey in software development through internships and collaborative projects
            </p>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />
              
              {/* Experience Items */}
              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <div 
                    key={exp.id} 
                    className={`relative ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg" />
                    
                    {/* Experience Card */}
                    <div className="ml-20">
                      <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                        <CardHeader className="pb-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                {exp.title}
                              </CardTitle>
                              <div className="flex items-center space-x-2 mb-2">
                                <Building className="h-5 w-5 text-blue-600" />
                                <span className="text-lg font-semibold text-blue-600">{exp.company}</span>
                              </div>
                              <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{exp.location}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end space-y-2">
                              <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300">
                                {exp.type}
                              </Badge>
                              {exp.current && (
                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                                  Current
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent>
                          <CardDescription className="text-gray-600 dark:text-gray-400 mb-6 text-lg leading-relaxed">
                            {exp.description}
                          </CardDescription>

                          {/* Key Achievements */}
                          <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                              Key Achievements
                            </h3>
                            <ul className="space-y-3">
                              {exp.achievements.map((achievement, achievementIndex) => (
                                <li key={achievementIndex} className="flex items-start space-x-3">
                                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-400">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Skills Used */}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                              Technologies & Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {exp.skills.map((skill) => (
                                <Badge 
                                  key={skill} 
                                  variant="secondary"
                                  className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-slide-in-up { animation: slide-in-up 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Experience;