import { Route, Switch, Redirect } from 'wouter';
import { useAuth } from '../hooks/useAuth.jsx';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import RateMatrix from '../pages/RateMatrix';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Redirect to="/login" />;
};

// Public Route wrapper (redirects authenticated users to dashboard)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return isAuthenticated ? <Redirect to="/dashboard/home" /> : children;
};

const AppRoutes = () => {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/login">
        <PublicRoute>
          <Login />
        </PublicRoute>
      </Route>

      {/* Protected Dashboard Routes */}
      <Route path="/dashboard/home">
        <ProtectedRoute>
          <Dashboard>
            <Home />
          </Dashboard>
        </ProtectedRoute>
      </Route>

      <Route path="/dashboard/reports/ratematrix">
        <ProtectedRoute>
          <Dashboard>
            <RateMatrix />
          </Dashboard>
        </ProtectedRoute>
      </Route>

      {/* Root redirect */}
      <Route path="/">
        <Redirect to="/dashboard/home" />
      </Route>

      {/* Dashboard base redirect */}
      <Route path="/dashboard">
        <Redirect to="/dashboard/home" />
      </Route>
    </Switch>
  );
};

export default AppRoutes;
