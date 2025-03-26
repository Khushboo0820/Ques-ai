import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, AlertCircle, Globe } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsSubmitting(true);
      await login(email, password);
      navigate('/landing');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    alert('Google authentication would happen here in a real application');
  };

  return (
    <div className="animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-50 p-3 rounded-md text-red-500 text-sm flex items-center gap-2 animate-slide-up">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
        
        <div className="space-y-1.5">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="form-input pl-10"
              required
            />
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
          </div>
        </div>
        
        <div className="space-y-1.5">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="form-input pl-10"
              required
            />
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <button
              type="button"
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="h-4 w-4 text-purple-500 rounded border-gray-300 focus:ring-purple-500"
            />
            <label htmlFor="remember-me" className="ml-2 text-gray-600">
              Remember me
            </label>
          </div>
          <Link to="/forgot-password" className="text-purple-500 hover:text-purple-700 transition duration-200">
            Forgot password?
          </Link>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary flex items-center justify-center h-12"
        >
          {isSubmitting ? (
            <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
          ) : (
            'Login'
          )}
        </button>
        
        <div className="relative flex items-center justify-center">
          <div className="border-t border-gray-200 flex-grow"></div>
          <span className="mx-4 text-sm text-gray-400">or</span>
          <div className="border-t border-gray-200 flex-grow"></div>
        </div>
        
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="btn-google"
        >
          <Globe size={18} />
          Continue with Google
        </button>
        
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-purple-500 hover:text-purple-700 transition duration-200">
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
