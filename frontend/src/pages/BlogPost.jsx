import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  BookOpen,
  User,
  Tag,
  Heart,
  MessageCircle,
  Bookmark
} from 'lucide-react';
import { blogPosts, personalInfo } from '../data/mock';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const foundPost = blogPosts.find(p => p.slug === slug);
    setPost(foundPost);
    setIsVisible(true);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Article Not Found</h2>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const relatedPosts = blogPosts.filter(p => 
    p.id !== post.id && 
    p.tags.some(tag => post.tags.includes(tag))
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Link to="/blog">
          <Button variant="ghost" className="mb-6 hover:bg-gray-100 dark:hover:bg-gray-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            {/* Article Header */}
            <div className="text-center mb-12">
              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 px-3 py-1"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
                {post.excerpt}
              </p>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{personalInfo.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className={`transition-all duration-300 ${
                    isLiked ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' : ''
                  }`}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                  {isLiked ? 'Liked' : 'Like'}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`transition-all duration-300 ${
                    isBookmarked ? 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100' : ''
                  }`}
                >
                  <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                  {isBookmarked ? 'Saved' : 'Save'}
                </Button>
                
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative h-64 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* Mock Content - In real implementation, this would be the actual article content */}
              <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p className="text-xl">
                  This is where the full article content would be displayed. In a real implementation, 
                  this content would be stored in the database and rendered from markdown or rich text format.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  Introduction
                </h2>
                
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                  fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                  culpa qui officia deserunt mollit anim id est laborum.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  Key Points
                </h2>
                
                <ul className="space-y-2 ml-6">
                  <li>Understanding the fundamentals of the technology</li>
                  <li>Best practices and implementation strategies</li>
                  <li>Common pitfalls and how to avoid them</li>
                  <li>Real-world applications and use cases</li>
                </ul>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  Conclusion
                </h2>
                
                <p>
                  In conclusion, this topic represents an important aspect of modern software development. 
                  By following the guidelines and best practices outlined in this article, developers can 
                  create more efficient and maintainable solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-700 shadow-lg"
                  />
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {personalInfo.name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 mb-4">
                      {personalInfo.title}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {personalInfo.bio}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <Link to="/about">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                Related Articles
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <Card 
                    key={relatedPost.id} 
                    className={`group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}
                    style={{ animationDelay: `${0.5 + (index * 0.1)}s` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(relatedPost.publishedAt)}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300 mb-3 leading-tight">
                        {relatedPost.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      
                      <Link to={`/blog/${relatedPost.slug}`}>
                        <Button variant="ghost" size="sm" className="w-full justify-between group/btn">
                          <BookOpen className="h-4 w-4" />
                          <span>Read Article</span>
                          <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default BlogPost;