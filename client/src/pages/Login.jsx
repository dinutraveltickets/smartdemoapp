import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Textbox from '../components/Textbox';
import { useAuth } from '../hooks/useAuth.jsx';
import { useToast } from "@/hooks/use-toast";
import api from '../services/api';
import { BarChart3 } from 'lucide-react';

const Login = () => {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const response = await api.login({
        username: formData.username,
        password: formData.password,
      });
      
      login(response.user);
      
      toast({
        title: "Success",
        description: "Login successful! Welcome back.",
        variant: "default",
      });
      
      setLocation('/dashboard/home');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <Card className="shadow-lg border border-slate-200">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="text-white text-xl" />
              </div>
              <h1 className="text-2xl font-semibold text-slate-900 mb-2">Welcome Back</h1>
              <p className="text-slate-600">Sign in to your dashboard account</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <Textbox
                id="username"
                label="Username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => handleChange('username', e.target.value)}
                error={errors.username}
                required
              />

              {/* Password Field */}
              <Textbox
                id="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                error={errors.password}
                required
              />

              {/* Login Button */}
              <Button 
                type="submit" 
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 transition-colors"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>

              {/* Additional Options */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <Checkbox 
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleChange('rememberMe', checked)}
                  />
                  <span className="text-slate-600">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-primary-500 hover:text-primary-600 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-slate-600">
          <p>Protected by enterprise security standards</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
