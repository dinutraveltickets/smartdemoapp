import TopNavigation from '../components/TopNavigation';

const Dashboard = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <TopNavigation />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default Dashboard;
