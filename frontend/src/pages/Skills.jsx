import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { 
  Code, 
  Database, 
  Cloud, 
  Palette, 
  Globe, 
  Cpu,
  Heart,
  Users,
  Target,
  Lightbulb,
  BookOpen,
  Trophy
} from 'lucide-react';
import { skills } from '../data/mock';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState({});

  const skillCategories = [
    {
      name: 'Programming Languages',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      skills: skills.technical['Programming Languages'],
      levels: [90, 85, 80]
    },
    {
      name: 'Web Technologies',
      icon: Globe,
      color: 'from-green-500 to-emerald-500',
      skills: skills.technical['Web Technologies'],
      levels: [95, 90, 85, 88, 92, 87, 83]
    },
    {
      name: 'Databases',
      icon: Database,
      color: 'from-orange-500 to-red-500',
      skills: skills.technical['Databases'],
      levels: [85, 80, 88]
    },
    {
      name: 'Cloud & DevOps',
      icon: Cloud,
      color: 'from-purple-500 to-pink-500',
      skills: skills.technical['Cloud & DevOps'],
      levels: [80, 75, 70, 85, 82]
    },
    {
      name: 'ML Libraries',
      icon: Cpu,
      color: 'from-indigo-500 to-purple-500',
      skills: skills.technical['ML Libraries'],
      levels: [75, 80, 78, 70]
    },
    {
      name: 'Tools & IDEs',
      icon: BookOpen,
      color: 'from-teal-500 to-blue-500',
      skills: skills.technical['Tools & IDEs'],
      levels: [90, 85, 80]
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    // Animate skill progress bars
    setTimeout(() => {
      const animated = {};
      skillCategories.forEach((category, categoryIndex) => {
        category.skills.forEach((skill, skillIndex) => {
          setTimeout(() => {
            setAnimatedSkills(prev => ({
              ...prev,
              [`${categoryIndex}-${skillIndex}`]: category.levels[skillIndex] || 75
            }));
          }, (categoryIndex * 200) + (skillIndex * 100));
        });
      });
    }, 500);
  }, []);

  const softSkillsData = [
    { name: 'Problem Solving', icon: Lightbulb, description: 'Analytical thinking and creative solutions' },
    { name: 'Team Collaboration', icon: Users, description: 'Effective communication and teamwork' },
    { name: 'Critical Thinking', icon: Target, description: 'Logical analysis and decision making' },
    { name: 'Communication', icon: Heart, description: 'Clear and effective interpersonal skills' },
    { name: 'Leadership', icon: Trophy, description: 'Guiding teams and taking initiative' }
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
          <div className={`text-center max-w-4xl mx-auto ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Technical <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Skills</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
              A comprehensive overview of my technical expertise and professional capabilities
            </p>
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
              Technical Expertise
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skillCategories.map((category, categoryIndex) => {
                const IconComponent = category.icon;
                return (
                  <Card
                    key={category.name}
                    className={`hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}
                    style={{ animationDelay: `${categoryIndex * 0.1}s` }}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                            {category.name}
                          </CardTitle>
                          <CardDescription className="text-gray-600 dark:text-gray-400">
                            {category.skills.length} skills
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        {category.skills.map((skill, skillIndex) => {
                          const skillKey = `${categoryIndex}-${skillIndex}`;
                          const level = animatedSkills[skillKey] || 0;
                          return (
                            <div key={skill} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  {skill}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {level}%
                                </span>
                              </div>
                              <Progress 
                                value={level} 
                                className="h-2"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Soft Skills */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
              Soft Skills & Attributes
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {softSkillsData.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <Card
                    key={skill.name}
                    className={`text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-white dark:bg-gray-900 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}
                    style={{ animationDelay: `${0.5 + (index * 0.1)}s` }}
                  >
                    <CardContent className="p-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-6">
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        {skill.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {skill.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Additional Soft Skills */}
            <div className={`text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Additional Competencies</h3>
              <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                {skills.soft.map((skill, index) => (
                  <Badge
                    key={skill}
                    className={`px-4 py-2 text-sm bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-200 hover:scale-105 transition-transform duration-200 animate-bounce-in`}
                    style={{ animationDelay: `${1 + (index * 0.1)}s` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Summary */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Skills Summary
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {Object.keys(skills.technical).reduce((acc, key) => acc + skills.technical[key].length, 0)}+
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Technical Skills</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    {skills.soft.length}+
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Soft Skills</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    3+
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Years Learning</p>
                </CardContent>
              </Card>
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
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-slide-in-up { animation: slide-in-up 0.8s ease-out forwards; }
        .animate-bounce-in { animation: bounce-in 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Skills;