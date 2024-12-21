import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const footerLinks = {
  Learning: [
    { name: 'Courses', path: '/courses' },
    { name: 'Live Classes', path: '/live-classes' },
    { name: 'Private Tutoring', path: '/tutoring' },
    { name: 'Study Materials', path: '/study-materials' },
    { name: 'Practice Tests', path: '/practice-tests' }
  ],
  Community: [
    { name: 'Student Forum', path: '/forum' },
    { name: 'Language Exchange', path: '/language-exchange' },
    { name: 'Success Stories', path: '/success-stories' },
    { name: 'Events', path: '/events' },
    { name: 'Blog', path: '/blog' }
  ],
  Support: [
    { name: 'Help Center', path: '/help' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'FAQ', path: '/help#faq' }
  ]
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-brand-500" />
              <span className="text-xl font-bold text-white">HebrewLearn</span>
            </Link>
            <p className="mt-4 text-gray-400">
              Your journey to mastering Hebrew starts here. Join our community of learners worldwide.
            </p>
            <div className="mt-6 flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-gray-400 hover:text-brand-500 transition-colors"
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="hover:text-brand-500 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} HebrewLearn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}