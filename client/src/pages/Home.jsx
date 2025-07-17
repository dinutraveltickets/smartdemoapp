import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SelectBox from '../components/SelectBox';
import api from '../services/api';
import { useToast } from "@/hooks/use-toast";
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  ShoppingCart,
  UserPlus,
  ShoppingBag,
  BarChart3,
  Plus,
  PieChart
} from 'lucide-react';

const Home = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartPeriod, setChartPeriod] = useState('7');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResponse, activitiesResponse] = await Promise.all([
        api.getDashboardStats(),
        api.getRecentActivity(),
      ]);
      
      setStats(statsResponse);
      setActivities(activitiesResponse);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user':
        return <UserPlus className="text-blue-600 text-sm" />;
      case 'order':
        return <ShoppingBag className="text-green-600 text-sm" />;
      case 'report':
        return <BarChart3 className="text-orange-600 text-sm" />;
      default:
        return <BarChart3 className="text-slate-600 text-sm" />;
    }
  };

  const getActivityBgColor = (type) => {
    switch (type) {
      case 'user':
        return 'bg-blue-100';
      case 'order':
        return 'bg-green-100';
      case 'report':
        return 'bg-orange-100';
      default:
        return 'bg-slate-100';
    }
  };

  const getChangeColor = (change) => {
    if (change.startsWith('+')) return 'text-green-600';
    if (change.startsWith('-')) return 'text-red-600';
    return 'text-slate-600';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 bg-slate-200 rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-4 bg-slate-200 rounded w-64 animate-pulse"></div>
          </div>
          <div className="h-10 bg-slate-200 rounded w-32 animate-pulse"></div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-4 bg-slate-200 rounded w-24 mb-2 animate-pulse"></div>
                  <div className="h-8 bg-slate-200 rounded w-20 animate-pulse"></div>
                </div>
                <div className="w-12 h-12 bg-slate-200 rounded-lg animate-pulse"></div>
              </div>
              <div className="mt-4">
                <div className="h-4 bg-slate-200 rounded w-32 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard Home</h1>
          <p className="text-slate-600">Demo! Here's what's happening today.</p>
        </div>
        <Button className="bg-primary-500 hover:bg-primary-600 text-white">
          <Plus className="mr-2 h-4 w-4" />
          New Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                <p className="text-2xl font-semibold text-slate-900">
                  {stats?.revenue || '$0'}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={`font-medium ${getChangeColor(stats?.revenueChange || '+0%')}`}>
                {stats?.revenueChange || '+0%'}
              </span>
              <span className="text-slate-500 ml-2">from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Active Users */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active Users</p>
                <p className="text-2xl font-semibold text-slate-900">
                  {stats?.users || '0'}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={`font-medium ${getChangeColor(stats?.usersChange || '+0%')}`}>
                {stats?.usersChange || '+0%'}
              </span>
              <span className="text-slate-500 ml-2">from last week</span>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Rate */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Conversion Rate</p>
                <p className="text-2xl font-semibold text-slate-900">
                  {stats?.conversion || '0%'}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={`font-medium ${getChangeColor(stats?.conversionChange || '+0%')}`}>
                {stats?.conversionChange || '+0%'}
              </span>
              <span className="text-slate-500 ml-2">from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Average Order Value */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg. Order Value</p>
                <p className="text-2xl font-semibold text-slate-900">
                  {stats?.aov || '$0'}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={`font-medium ${getChangeColor(stats?.aovChange || '+0%')}`}>
                {stats?.aovChange || '+0%'}
              </span>
              <span className="text-slate-500 ml-2">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900">Revenue Trend</h3>
              <SelectBox
                value={chartPeriod}
                onValueChange={setChartPeriod}
                options={[
                  { value: "7", label: "Last 7 days" },
                  { value: "30", label: "Last 30 days" },
                  { value: "90", label: "Last 90 days" },
                ]}
                className="w-36"
              />
            </div>
            {/* Chart Placeholder */}
            <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
              <div className="text-center">
                <PieChart className="text-slate-400 text-3xl mb-2 mx-auto" />
                <p className="text-slate-500">Chart Component</p>
                <p className="text-sm text-slate-400">Revenue trend visualization</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {activities.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  No recent activity
                </div>
              ) : (
                activities.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="flex items-center space-x-3 p-3 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <div className={`w-8 h-8 ${getActivityBgColor(activity.type)} rounded-full flex items-center justify-center`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        {activity.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
