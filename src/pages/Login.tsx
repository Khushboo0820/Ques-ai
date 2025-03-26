
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side - Gradient background with content */}
      <div className="hidden md:flex flex-col auth-container text-white p-12 justify-center relative overflow-hidden">
        <div className="relative z-10 max-w-md">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight">Ques.AI</span>
          </div>
          
          <h1 className="text-5xl font-display font-bold leading-tight mb-4">
            Your podcast will no longer be just a hobby.
          </h1>
          
          <p className="text-xl opacity-90 mb-8">
            Supercharge Your Distribution using our AI assistant!
          </p>
          
          <div className="absolute bottom-0 right-0 opacity-30">
            <svg className="w-64 h-64 text-white" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M45.3,-64.2C59.6,-55.3,72.8,-42.8,77.9,-27.5C83,-12.3,80,-5.6,76.5,0.8C73,9.2,63.2,18.4,54.5,27.8C45.7,37.2,38.1,46.8,28.2,52.8C18.4,58.8,6.8,61.3,-4.4,60.9C-15.6,60.5,-30.8,57.1,-41.8,49.1C-52.8,41.1,-59.6,28.5,-63.5,14.9C-67.4,1.3,-68.3,-13.2,-62.5,-24.2C-56.7,-35.2,-44.3,-42.6,-32.5,-51.9C-20.7,-61.2,-8.3,-72.5,4.5,-77.8C17.3,-83.1,34.6,-82.5,45.3,-73.1C55.9,-63.8,60.9,-45.6,45.3,-64.2Z" transform="translate(100 100)" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Right side - Login form */}
      <div className="flex flex-col justify-center p-6 sm:p-12 lg:px-16">
        <div className="max-w-md w-full mx-auto">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 mb-2 text-purple-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-center">
              Welcome to <span className="text-purple-500">Ques.AI</span>
            </h2>
          </div>
          
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
