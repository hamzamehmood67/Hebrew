import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';

const navItems = [
  { name: 'Courses', path: '/courses' },
  { name: 'Practice', path: '/practice' },
  { name: 'Community', path: '/community' },
  { name: 'Live Classes', path: '/live-classes' },
  { name: 'Tutoring', path: '/tutoring' }
];

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-blue-500 rounded-full blur opacity-50" />
                <BookOpen className="relative h-8 w-8 text-brand-600" />
              </div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-brand-600 to-blue-500 bg-clip-text text-transparent">
                HebrewLearn
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              {navItems.map((item) => (
                <Link key={item.name} to={item.path}>
                  <Button
                    variant="ghost"
                    className={`text-gray-600 hover:text-brand-600 hover:bg-brand-50 ${
                      location.pathname === item.path ? 'bg-brand-50 text-brand-600' : ''
                    }`}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <Link to="/profile">
                    <Button
                      variant="ghost"
                      className={`text-gray-600 hover:text-brand-600 hover:bg-brand-50 ${
                        location.pathname === '/profile' ? 'bg-brand-50 text-brand-600' : ''
                      }`}
                    >
                      Profile
                    </Button>
                  </Link>
                  <Button variant="ghost" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={handleLogin}>
                    Login
                  </Button>
                  <Button variant="primary" onClick={handleSignup}>
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 bg-white"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-gray-600 hover:text-brand-600 hover:bg-brand-50 ${
                      location.pathname === item.path ? 'bg-brand-50 text-brand-600' : ''
                    }`}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile">
                      <Button
                        variant="ghost"
                        className={`w-full justify-start text-gray-600 hover:text-brand-600 hover:bg-brand-50 ${
                          location.pathname === '/profile' ? 'bg-brand-50 text-brand-600' : ''
                        }`}
                      >
                        Profile
                      </Button>
                    </Link>
                    <Button variant="ghost" onClick={handleLogout} className="w-full">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" onClick={handleLogin} className="w-full">
                      Login
                    </Button>
                    <Button variant="primary" onClick={handleSignup} className="w-full">
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}