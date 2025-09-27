import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageCircle,
  Github,
  Linkedin,
  Clock,
  CheckCircle,
  Calendar,
  Globe
} from 'lucide-react';
import { personalInfo } from '../data/mock';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: personalInfo.email,
      description: 'Send me an email',
      action: `mailto:${personalInfo.email}`,
      color: 'from-red-500 to-pink-500',
      available: '24/7'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: personalInfo.phone,
      description: 'Call me directly',
      action: `tel:${personalInfo.phone}`,
      color: 'from-green-500 to-emerald-500',
      available: '9 AM - 6 PM IST'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: personalInfo.location,
      description: 'Based in India',
      action: '#',
      color: 'from-blue-500 to-cyan-500',
      available: 'Remote Work'
    }
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: personalInfo.linkedin,
      icon: Linkedin,
      color: 'hover:text-blue-600',
      description: 'Professional network'
    },
    {
      name: 'GitHub',
      url: personalInfo.github || '#',
      icon: Github,
      color: 'hover:text-gray-900 dark:hover:text-white',
      description: 'Code repositories'
    },
    {
      name: 'Email',
      url: `mailto:${personalInfo.email}`,
      icon: Mail,
      color: 'hover:text-red-500',
      description: 'Direct contact'
    }
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
            <div className="flex items-center justify-center space-x-2 mb-6">
              <MessageCircle className="h-8 w-8 text-blue-600" />
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-4 py-2">
                Let's Connect
              </Badge>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Get In <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className={`${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
                <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                      <Send className="h-6 w-6 mr-3 text-blue-600" />
                      Send Message
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Fill out the form below and I'll get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Name *
                          </label>
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            required
                            className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email *
                          </label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            required
                            className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Subject *
                        </label>
                        <Input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="What's this about?"
                          required
                          className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Message *
                        </label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell me about your project or idea..."
                          rows={6}
                          required
                          className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className={`space-y-8 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
                {/* Availability Status */}
                <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-green-600 dark:text-green-400 font-semibold">Available for Projects</span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      Currently accepting new opportunities and collaborations
                    </p>
                    <div className="flex items-center space-x-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>Response time: 24-48 hours</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Methods */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Contact Information
                  </h3>
                  
                  {contactMethods.map((method, index) => {
                    const IconComponent = method.icon;
                    return (
                      <Card 
                        key={method.title} 
                        className={`hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}
                        style={{ animationDelay: `${0.3 + (index * 0.1)}s` }}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-r ${method.color} text-white`}>
                              <IconComponent className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                {method.title}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-400 mb-1">
                                {method.value}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
                                {method.description}
                              </p>
                              <Badge variant="secondary" className="text-xs">
                                {method.available}
                              </Badge>
                            </div>
                            {method.action !== '#' && (
                              <a
                                href={method.action}
                                target={method.action.startsWith('http') ? '_blank' : '_self'}
                                rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                              >
                                <Globe className="h-5 w-5" />
                              </a>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Social Links */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">
                      Connect on Social
                    </CardTitle>
                    <CardDescription>
                      Follow me on social platforms for updates and insights
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      {socialLinks.map((social) => {
                        const IconComponent = social.icon;
                        return (
                          <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex flex-col items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group`}
                          >
                            <IconComponent className={`h-8 w-8 text-gray-500 dark:text-gray-400 ${social.color} transition-colors duration-300 mb-2`} />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              {social.name}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-500 text-center">
                              {social.description}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
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
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out forwards; }
        .animate-slide-in-right { animation: slide-in-right 0.8s ease-out 0.3s forwards; }
        .animate-slide-in-up { animation: slide-in-up 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Contact;