import { Outlet } from 'react-router-dom';
import TopNavigation from '../components/TopNavigation';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <TopNavigation />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
