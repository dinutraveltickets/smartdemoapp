import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '../hooks/useAuth.jsx';
import { BarChart3, Home, ChevronDown, Bell, User, LogOut, Menu } from 'lucide-react';
import { cn } from "@/lib/utils";

const TopNavigation = () => {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location === path;

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 h-16">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-primary-500 rounded-md flex items-center justify-center">
            <BarChart3 className="text-white text-sm" />
          </div>
          <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {/* Home Menu Item */}
          <Link
            to="/dashboard/home"
            className={cn(
              "flex items-center font-medium transition-colors",
              isActive('/dashboard/home') 
                ? "text-primary-600" 
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Link>

          {/* Reports Menu with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className={cn(
                  "flex items-center font-medium",
                  isActive('/dashboard/reports/ratematrix') 
                    ? "text-primary-600" 
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Reports
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem asChild>
                <Link 
                  to="/dashboard/reports/ratematrix"
                  className="flex items-center"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Rate Matrix
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4 text-slate-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-slate-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  {user?.username || 'John Doe'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-3 border-t border-slate-200 bg-white">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/dashboard/home"
              className={cn(
                "flex items-center font-medium",
                isActive('/dashboard/home') 
                  ? "text-primary-600" 
                  : "text-slate-600"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
            <Link 
              to="/dashboard/reports/ratematrix"
              className={cn(
                "flex items-center font-medium",
                isActive('/dashboard/reports/ratematrix') 
                  ? "text-primary-600" 
                  : "text-slate-600"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Rate Matrix
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default TopNavigation;
