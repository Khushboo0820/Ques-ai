
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 mr-2 text-purple-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Ques.AI</h1>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 animate-fade-in">
          <div className="pb-5 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Dashboard</h3>
            <p className="mt-2 max-w-4xl text-sm text-gray-500">
              Welcome back, {user?.name}!
            </p>
          </div>
          
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-purple-50 overflow-hidden rounded-lg shadow-sm border border-purple-100">
              <div className="px-4 py-5 sm:p-6">
                <h4 className="text-base font-medium text-purple-800">Total Episodes</h4>
                <p className="mt-1 text-3xl font-semibold text-purple-900">12</p>
              </div>
            </div>
            
            <div className="bg-purple-50 overflow-hidden rounded-lg shadow-sm border border-purple-100">
              <div className="px-4 py-5 sm:p-6">
                <h4 className="text-base font-medium text-purple-800">Total Listens</h4>
                <p className="mt-1 text-3xl font-semibold text-purple-900">3,427</p>
              </div>
            </div>
            
            <div className="bg-purple-50 overflow-hidden rounded-lg shadow-sm border border-purple-100">
              <div className="px-4 py-5 sm:p-6">
                <h4 className="text-base font-medium text-purple-800">Avg. Duration</h4>
                <p className="mt-1 text-3xl font-semibold text-purple-900">24:18</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex items-center justify-center">
            <p className="text-gray-500 text-sm">
              This is a protected dashboard page. You're authenticated with JWT!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
