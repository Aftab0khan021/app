import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { ArrowRight, Code, Database, Cloud, Cpu, Palette, Globe } from 'lucide-react';
import { useSkills } from '../../hooks/useApi';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const SkillsPreview = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState({});
  const { data: skills, loading, error } = useSkills();

  const getSkillCategories = () => {
    if (!skills?.technical) return [];
    
    return [
      {
        name: 'Programming Languages',
        icon: Code,
        color: 'from-blue-500 to-cyan-500',
        skills: skills.technical['Programming Languages']?.slice(0, 3) || [],
        levels: skills.technical['Programming Languages']?.slice(0, 3).map(s => s.level) || [90, 85, 80]
      },
      {
        name: 'Web Technologies',
        icon: Globe,
        color: 'from-green-500 to-emerald-500',
        skills: skills.technical['Web Technologies']?.slice(0, 3) || [],
        levels: skills.technical['Web Technologies']?.slice(0, 3).map(s => s.level) || [95, 90, 85]
      },
      {
        name: 'Cloud & DevOps',
        icon: Cloud,
        color: 'from-purple-500 to-pink-500',
        skills: skills.technical['Cloud & DevOps']?.slice(0, 3) || [],
        levels: skills.technical['Cloud & DevOps']?.slice(0, 3).map(s => s.level) || [80, 75, 70]
      },
      {
        name: 'Databases',
        icon: Database,
        color: 'from-orange-500 to-red-500',
        skills: skills.technical['Databases'] || [],
        levels: skills.technical['Databases']?.map(s => s.level) || [85, 80]
      }
    ];
  };

  const skillCategories = getSkillCategories();

  useEffect(() => {
    if (skills?.technical) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        // Animate skill progress bars
        setTimeout(() => {
          const animated = {};
          skillCategories.forEach((category, categoryIndex) => {
            category.skills.forEach((skill, skillIndex) => {
              setTimeout(() => {
                setAnimatedSkills(prev => ({
                  ...prev,
                  [`${categoryIndex}-${skillIndex}`]: category.levels[skillIndex] || 0
                }));
              }, (categoryIndex * 100) + (skillIndex * 150));
            });
          });
        }, 500);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [skills]);

  if (loading) return <LoadingSpinner size="lg" text="Loading skills..." />;
  if (error) return <ErrorMessage error={error} />;
  if (!skills) return null;

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Technical <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise across various domains
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.name}
                className={`bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                {/* Category Header */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                    {category.name}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => {
                    const skillKey = `${categoryIndex}-${skillIndex}`;
                    const level = animatedSkills[skillKey] || 0;
                    const skillName = typeof skill === 'string' ? skill : skill.name;
                    return (
                      <div key={skillName} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {skillName}
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
              </div>
            );
          })}
        </div>

        {/* Soft Skills */}
        <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Soft Skills</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {(skills.soft || []).map((skill, index) => (
              <Badge
                key={skill}
                className={`px-4 py-2 text-sm bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-200 hover:scale-105 transition-transform duration-200 animate-bounce-in`}
                style={{ animationDelay: `${0.8 + (index * 0.1)}s` }}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <Link to="/skills">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group"
            >
              <span>Explore All Skills</span>
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
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
        
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-slide-in-up {
          animation: slide-in-up 0.8s ease-out forwards;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default SkillsPreview;