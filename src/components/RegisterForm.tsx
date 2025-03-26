
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle } from 'lucide-react';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { register } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    try {
      setIsSubmitting(true);
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Email may already be in use.');
    } finally {
      setIsSubmitting(false);
    }
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
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="form-input pl-10"
              required
            />
            <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
          </div>
        </div>
        
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
          <p className="text-xs text-gray-500 px-1">
            Must be at least 8 characters
          </p>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary flex items-center justify-center h-12"
        >
          {isSubmitting ? (
            <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
          ) : (
            'Create Account'
          )}
        </button>
        
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-500 hover:text-purple-700 transition duration-200">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
