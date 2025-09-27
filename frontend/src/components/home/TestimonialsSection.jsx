import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { testimonials } from '../../data/mock';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-purple-200/30 dark:from-blue-800/20 dark:to-purple-800/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-purple-200/30 to-pink-200/30 dark:from-purple-800/20 dark:to-pink-800/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What Others <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Say</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Testimonials from colleagues, mentors, and collaborators
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className={`max-w-4xl mx-auto mb-12 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
          <Card className="relative bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-900/50 border-0 shadow-2xl overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-blue-500/20 dark:text-blue-400/20">
              <Quote className="h-16 w-16" />
            </div>

            <CardContent className="p-12 relative">
              {/* Rating */}
              <div className="flex items-center justify-center mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 text-center leading-relaxed italic mb-8">
                "{currentTestimonial.text}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-center space-x-4">
                <Avatar className="h-16 w-16 border-4 border-white dark:border-gray-700 shadow-lg">
                  <AvatarImage src={currentTestimonial.image} alt={currentTestimonial.name} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                    {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {currentTestimonial.position}
                  </p>
                  <Badge variant="secondary" className="mt-1">
                    {currentTestimonial.company}
                  </Badge>
                </div>
              </div>
            </CardContent>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevTestimonial}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 shadow-lg rounded-full p-2"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <Button
                variant="ghost"
                size="sm"
                onClick={nextTestimonial}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 shadow-lg rounded-full p-2"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-3 mb-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-blue-600 w-8'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* All Testimonials Preview */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                index === currentIndex
                  ? 'ring-2 ring-blue-500 shadow-lg'
                  : 'opacity-70 hover:opacity-100'
              } ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${0.5 + (index * 0.1)}s` }}
              onClick={() => setCurrentIndex(index)}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                  "{testimonial.text.slice(0, 100)}..."
                </p>
                <div className="flex items-center mt-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
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
            transform: translateY(30px);
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
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;