'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Settings, 
  BarChart3, 
  CreditCard, 
  Mail, 
  FileText,
  Plus,
  Search,
  TrendingUp,
  DollarSign
} from 'lucide-react';

interface AdminData {
  overview: {
    totalUsers: number;
    activeSubscriptions: number;
    monthlyRevenue: number;
    totalRevenue: number;
  };
  users: Array<{
    id: string;
    name: string;
    email: string;
    subscriptions: number;
    usage: number;
    status: string;
  }>;
  tools: Array<{
    id: string;
    name: string;
    subscribers: number;
    revenue: number;
    isActive: boolean;
  }>;
}

export default function AdminDashboard() {
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/admin/analytics', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const analytics = await response.json();
        setData({
          overview: analytics.overview,
          users: [], // Will be loaded separately
          tools: [], // Will be loaded separately
        });
      }
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      title: 'Total Users',
      value: data?.overview.totalUsers || 0,
      icon: Users,
      description: 'Registered sellers',
      color: 'text-blue-600',
    },
    {
      title: 'Active Subscriptions',
      value: data?.overview.activeSubscriptions || 0,
      icon: TrendingUp,
      description: 'Active tool subscriptions',
      color: 'text-green-600',
    },
    {
      title: 'Monthly Revenue',
      value: `₹${(data?.overview.monthlyRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      description: 'This month\'s earnings',
      color: 'text-purple-600',
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      icon: BarChart3,
      description: 'Sign-up to paid',
      color: 'text-orange-600',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-indigo-600">SaaSTools</div>
              <Badge className="ml-3 bg-red-100 text-red-800">
                Admin Portal
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage users, tools, and monitor platform performance.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full lg:w-auto lg:grid-cols-6 h-auto p-1">
            <TabsTrigger value="users" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Tools
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="invoicing" className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              Invoicing
            </TabsTrigger>
            <TabsTrigger value="emails" className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              Emails
            </TabsTrigger>
            <TabsTrigger value="cms" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              CMS
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage and monitor all platform users
                  </CardDescription>
                </div>
                <Button size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Search Users
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4" />
                  <p>User management interface would be here</p>
                  <p className="text-sm">Including search, filter, and user details</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Tool Management</CardTitle>
                  <CardDescription>
                    Create, edit, and manage available tools
                  </CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Tool
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Settings className="h-12 w-12 mx-auto mb-4" />
                  <p>Tool management interface would be here</p>
                  <p className="text-sm">Create, edit, disable tools and manage pricing</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reporting</CardTitle>
                <CardDescription>
                  Platform performance and business metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                  <p>Analytics dashboard would be here</p>
                  <p className="text-sm">Charts for revenue, usage, user growth, etc.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Invoicing Tab */}
          <TabsContent value="invoicing">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Manual Invoicing</CardTitle>
                  <CardDescription>
                    Generate and send custom invoices
                  </CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Invoice
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <CreditCard className="h-12 w-12 mx-auto mb-4" />
                  <p>Invoicing system would be here</p>
                  <p className="text-sm">Create custom invoices and send to users</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emails Tab */}
          <TabsContent value="emails">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Email Management</CardTitle>
                  <CardDescription>
                    Manage templates and automation
                  </CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Template
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Mail className="h-12 w-12 mx-auto mb-4" />
                  <p>Email management system would be here</p>
                  <p className="text-sm">Templates, automation, and email campaigns</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CMS Tab */}
          <TabsContent value="cms">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>
                  Edit landing page content and settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4" />
                  <p>CMS editor would be here</p>
                  <p className="text-sm">WYSIWYG editor for landing page content</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}