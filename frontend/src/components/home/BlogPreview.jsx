import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowRight, Calendar, Clock, Eye } from 'lucide-react';
import { blogPosts } from '../../data/mock';

const BlogPreview = () => {
  const [isVisible, setIsVisible] = useState(false);
  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 2);
  const latestPost = blogPosts[0];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-gradient-to-l from-purple-100 to-transparent dark:from-purple-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-gradient-to-r from-blue-100 to-transparent dark:from-blue-900/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Latest <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Insights</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Thoughts, tutorials, and insights on software development, AI, and technology trends
          </p>
        </div>

        {/* Blog Layout */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Featured Post */}
          <div className="lg:col-span-2">
            <Card className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden h-full ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
              {/* Featured Post Image */}
              <div className="relative h-64 lg:h-80 overflow-hidden">
                <img
                  src={latestPost.image}
                  alt={latestPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Featured Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-600 text-white px-3 py-1">
                    Featured
                  </Badge>
                </div>

                {/* Read Time */}
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{latestPost.readTime}</span>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <Link to={`/blog/${latestPost.slug}`}>
                    <Button className="bg-white text-gray-900 hover:bg-gray-100">
                      <Eye className="h-4 w-4 mr-2" />
                      Read Article
                    </Button>
                  </Link>
                </div>
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(latestPost.publishedAt)}</span>
                </div>
                <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                  {latestPost.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-400 mb-6 text-lg leading-relaxed">
                  {latestPost.excerpt}
                </CardDescription>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {latestPost.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary"
                      className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Read More Button */}
                <Link to={`/blog/${latestPost.slug}`}>
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white group/btn transition-all duration-300"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Posts */}
          <div className="space-y-6">
            {featuredPosts.slice(1).concat(blogPosts.slice(1, 3)).map((post, index) => (
              <Card 
                key={post.id} 
                className={`group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md bg-white dark:bg-gray-900 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}
                style={{ animationDelay: `${0.2 + (index * 0.1)}s` }}
              >
                <div className="flex space-x-4 p-4">
                  {/* Post Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Post Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>•</span>
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-2 mb-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary"
                          className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Link to={`/blog/${post.slug}`} className="absolute inset-0" />
              </Card>
            ))}

            {/* View All Posts CTA */}
            <Link to="/blog">
              <Button 
                variant="outline" 
                className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 group"
              >
                <span>View All Posts</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
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
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default BlogPreview;