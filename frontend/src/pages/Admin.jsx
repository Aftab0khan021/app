import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Settings, 
  Users, 
  FileText, 
  BarChart3, 
  Shield,
  Database,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const adminSections = [
    {
      id: 'overview',
      name: 'Overview',
      icon: BarChart3,
      description: 'Dashboard overview and analytics'
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: FileText,
      description: 'Manage portfolio projects'
    },
    {
      id: 'blog',
      name: 'Blog Posts',
      icon: FileText,
      description: 'Create and manage blog content'
    },
    {
      id: 'skills',
      name: 'Skills',
      icon: Settings,
      description: 'Update technical skills'
    },
    {
      id: 'experience',
      name: 'Experience',
      icon: Users,
      description: 'Manage work experience'
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: Shield,
      description: 'System configuration'
    }
  ];

  const stats = [
    { label: 'Total Projects', value: '2', change: '+0 this month', color: 'text-blue-600' },
    { label: 'Blog Posts', value: '3', change: '+1 this month', color: 'text-green-600' },
    { label: 'Skills', value: '20+', change: '+2 this month', color: 'text-purple-600' },
    { label: 'Experience', value: '2', change: '+0 this month', color: 'text-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Portfolio Admin
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage your portfolio content and settings
              </p>
            </div>
            <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 px-4 py-2">
              <Database className="h-4 w-4 mr-2" />
              Mock Data Mode
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white">
                  Admin Sections
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {adminSections.map((section) => {
                    const IconComponent = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveTab(section.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                          activeTab === section.id
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-r-2 border-blue-600'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <IconComponent className="h-5 w-5" />
                        <div>
                          <div className="font-medium">{section.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            {section.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat) => (
                    <Card key={stat.label} className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {stat.label}
                        </div>
                        <div className={`text-xs ${stat.color}`}>
                          {stat.change}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Quick Actions */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">
                      Quick Actions
                    </CardTitle>
                    <CardDescription>
                      Common tasks and shortcuts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Button 
                        onClick={() => setActiveTab('projects')}
                        className="h-20 flex flex-col items-center justify-center space-y-2 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                      >
                        <Plus className="h-6 w-6" />
                        <span>Add Project</span>
                      </Button>
                      
                      <Button 
                        onClick={() => setActiveTab('blog')}
                        className="h-20 flex flex-col items-center justify-center space-y-2 bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30"
                      >
                        <Plus className="h-6 w-6" />
                        <span>New Blog Post</span>
                      </Button>
                      
                      <Button 
                        onClick={() => setActiveTab('skills')}
                        className="h-20 flex flex-col items-center justify-center space-y-2 bg-purple-50 text-purple-600 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:hover:bg-purple-900/30"
                      >
                        <Edit className="h-6 w-6" />
                        <span>Update Skills</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab !== 'overview' && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900 dark:text-white flex items-center">
                    {adminSections.find(s => s.id === activeTab)?.icon && 
                      React.createElement(adminSections.find(s => s.id === activeTab).icon, { className: "h-6 w-6 mr-3" })
                    }
                    {adminSections.find(s => s.id === activeTab)?.name}
                  </CardTitle>
                  <CardDescription>
                    {adminSections.find(s => s.id === activeTab)?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-20">
                    <div className="text-gray-400 dark:text-gray-600 mb-4">
                      <Settings className="h-16 w-16 mx-auto mb-4" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Admin Panel Coming Soon
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                      This section will be available once the backend is implemented. 
                      You'll be able to manage your {activeTab} content here.
                    </p>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                      Backend Integration Required
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;