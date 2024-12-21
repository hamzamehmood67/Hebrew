import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';

interface NavbarProps {
  onLogout?: () => void;
  onSettings?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLogout, onSettings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Practice', path: '/practice' },
    { label: 'Reading', path: '/reading' },
    { label: 'Courses', path: '/courses' },
    { label: 'Language Exchange', path: '/language-exchange' },
    { label: 'Success Stories', path: '/success-stories' }
  ];

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">Hebrew Learning</span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            {menuItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button variant="outline" className="text-sm">
                  {item.label}
                </Button>
              </Link>
            ))}
            
            <div className="ml-4 flex items-center space-x-2">
              {isAuthenticated ? (
                <>
                  {onSettings && (
                    <Button variant="outline" onClick={onSettings}>
                      <Settings className="h-4 w-4" />
                    </Button>
                  )}
                  {onLogout && (
                    <Button variant="outline" onClick={onLogout}>
                      <LogOut className="h-4 w-4" />
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="primary">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block"
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    variant="outline"
                    className="w-full text-left justify-start"
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              
              {!isAuthenticated && (
                <>
                  <Link to="/login" className="block" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full text-left justify-start">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup" className="block" onClick={() => setIsOpen(false)}>
                    <Button variant="primary" className="w-full text-left justify-start">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
            {isAuthenticated && (
              <div className="px-2 pt-2 pb-3 border-t">
                {onSettings && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      onSettings();
                      setIsOpen(false);
                    }}
                    className="w-full text-left justify-start mb-2"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                )}
                {onLogout && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      onLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left justify-start"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};