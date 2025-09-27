import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { 
  Search, 
  Calendar, 
  Clock, 
  Eye, 
  ArrowRight,
  BookOpen,
  TrendingUp,
  Star
} from 'lucide-react';
import { blogPosts, blogCategories } from '../data/mock';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    let filtered = blogPosts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => 
        post.tags.some(tag => tag.toLowerCase().includes(selectedCategory.replace('-', ' ')))
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured || post !== featuredPost);

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
            <div className="flex items-center justify-center space-x-2 mb-6">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-4 py-2">
                Tech Blog
              </Badge>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Latest <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Insights</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Thoughts, tutorials, and insights on software development, AI, and technology trends
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {blogCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    {category.name}
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center space-x-2 mb-8">
                <Star className="h-6 w-6 text-yellow-500" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Article</h2>
              </div>
              
              <Card className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-white dark:bg-gray-900 overflow-hidden ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
                <div className="lg:flex">
                  {/* Featured Image */}
                  <div className="lg:w-2/5 relative overflow-hidden">
                    <div className="h-64 lg:h-80 relative">
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Featured Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-yellow-500 text-white px-3 py-1">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>

                      {/* Read Time */}
                      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(featuredPost.publishedAt)}</span>
                      </div>
                      
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300 mb-4 leading-tight">
                        {featuredPost.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                        {featuredPost.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {featuredPost.tags.map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="secondary"
                            className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Read More Button */}
                    <Link to={`/blog/${featuredPost.slug}`}>
                      <Button 
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white group/btn transition-all duration-300"
                      >
                        <BookOpen className="h-5 w-5 mr-2" />
                        <span>Read Full Article</span>
                        <ArrowRight className="h-5 w-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {regularPosts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-gray-400 dark:text-gray-600 mb-4">
                  <Search className="h-16 w-16 mx-auto mb-4" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  No Articles Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-2 mb-12">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Latest Articles</h2>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post, index) => (
                    <Card 
                      key={post.id} 
                      className={`group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-white dark:bg-gray-900 overflow-hidden ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}
                      style={{ animationDelay: `${0.3 + (index * 0.1)}s` }}
                    >
                      {/* Post Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Read Time */}
                        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>

                        {/* Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                          <Link to={`/blog/${post.slug}`}>
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
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                          {post.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent>
                        <CardDescription className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                          {post.excerpt}
                        </CardDescription>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 2).map((tag) => (
                            <Badge 
                              key={tag} 
                              variant="secondary"
                              className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {post.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs text-gray-500">
                              +{post.tags.length - 2}
                            </Badge>
                          )}
                        </div>

                        {/* Read More */}
                        <Link to={`/blog/${post.slug}`}>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-between group/btn hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
                          >
                            <span>Read More</span>
                            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.8s ease-out forwards; }
        .animate-slide-in-up { animation: slide-in-up 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Blog;