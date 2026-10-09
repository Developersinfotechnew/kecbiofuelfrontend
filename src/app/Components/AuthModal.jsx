import { useState } from 'react';
import { X, Mail, Lock, User, Loader } from 'lucide-react';

// AuthModal Component - Handles both Login and Signup
export function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const isSignup = mode === 'signup';

  const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const endpoint = isSignup
      ? `${API_URL}/api/auth/register`
      : `${API_URL}/api/auth/login`;

    const body = isSignup
      ? { name: formData.name, email: formData.email, password: formData.password }
      : { email: formData.email, password: formData.password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || (isSignup ? 'Registration failed' : 'Login failed'));
      }

      // Store token & user (both endpoints return the same shape)
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      onLoginSuccess(data.user);
      onClose();
      
      // Reset form after successful submission
      setFormData({ name: '', email: '', password: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const width = 500;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    const popup = window.open(
      `${API_URL}/api/auth/google`,
      'Google Sign In',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    const handleMessage = (event) => {
      // Use API_URL origin for production
      const allowedOrigin = API_URL || 'http://localhost:5000';
      if (event.origin !== allowedOrigin) return;

      if (event.data.error) {
        setError(event.data.error);
        popup?.close();
        window.removeEventListener('message', handleMessage);
        return;
      }

      if (event.data.token && event.data.user) {
        localStorage.setItem('token', event.data.token);
        localStorage.setItem('user', JSON.stringify(event.data.user));
        onLoginSuccess(event.data.user);
        onClose();
        popup?.close();
        window.removeEventListener('message', handleMessage);
      }
    };

    window.addEventListener('message', handleMessage);

    const checkPopup = setInterval(() => {
      if (popup?.closed) {
        clearInterval(checkPopup);
        window.removeEventListener('message', handleMessage);
      }
    }, 1000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'signup' : 'login'));
    setError(null);
    // Reset form when toggling
    setFormData({ name: '', email: '', password: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        style={{ zIndex: 9999 }}
      />

      {/* Modal Container */}
      <div 
        className="fixed inset-0 flex items-center justify-center p-4 z-50"
        style={{ zIndex: 10000 }}
      >
        <div 
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative z-50"
          onClick={(e) => e.stopPropagation()}
          style={{ zIndex: 10001 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-green-600 px-6 pt-4 py-2 text-white flex items-start justify-between z-50">
            <div>
              <h2 className="text-2xl font-bold">
                {isSignup ? 'Create Account' : 'Sign In'}
              </h2>
              <p className="text-white/80 text-sm font-sans mt-1">
                {isSignup
                  ? 'Join to post reviews & comments'
                  : 'Login to post your comments'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
              type="button"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 md:pt-8 md:pb-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 mb-4">
              {isSignup && (
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-3.5 pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter Your Full Name"
                      className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors cursor-text"
                      disabled={isLoading}
                      required={isSignup}
                      autoComplete="name"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3.5 pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter Your Email Address"
                    className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors cursor-text"
                    disabled={isLoading}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3.5 pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors cursor-text"
                    disabled={isLoading}
                    required
                    autoComplete={isSignup ? "new-password" : "current-password"}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    {isSignup ? 'Creating account...' : 'Signing in...'}
                  </>
                ) : (
                  isSignup ? 'Sign Up' : 'Sign In with Email'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-500 font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Google Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              type="button"
              className="w-full py-2.5 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  fill="#4285F4"
                  d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.26h2.908c1.702-1.567 2.684-3.875 2.684-6.616z"
                />
                <path
                  fill="#34A853"
                  d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.26c-.805.54-1.837.86-3.048.86-2.344 0-4.326-1.584-5.034-3.72H.957v2.332A8.997 8.997 0 0 0 9 18z"
                />
                <path
                  fill="#FBBC05"
                  d="M3.966 10.68A5.42 5.42 0 0 1 3.68 9c0-.593.102-1.164.283-1.68H.957v-2.332A8.997 8.997 0 0 0 0 9c0 1.45.348 2.824.957 4.012l2.999-2.332z"
                />
                <path
                  fill="#EA4335"
                  d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.96 11.43 0 9 0 3.477 0 .16 4.02.957 9h3.009c.708-2.136 2.69-3.72 5.034-3.72z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Toggle Login/Signup */}
            <p className="text-center text-sm text-gray-600 mt-4">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={toggleMode}
                className="text-orange-600 font-semibold hover:text-orange-700 underline cursor-pointer"
              >
                {isSignup ? 'Sign in' : 'Sign up here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}