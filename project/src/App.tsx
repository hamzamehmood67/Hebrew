import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/navbar';
import { Footer } from './components/layout/footer';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Pages
import HomePage from './pages/home';
import LoginPage from './pages/auth/login';
import SignupPage from './pages/auth/signup';
import CoursesPage from './pages/courses';
import PracticePage from './pages/practice';
import CommunityPage from './pages/community';
import LiveClassesPage from './pages/live-classes';
import TutoringPage from './pages/tutoring';
import StudyMaterialsPage from './pages/study-materials';
import PracticeTestsPage from './pages/practice-tests';
import ForumPage from './pages/forum';
import LanguageExchangePage from './pages/language-exchange';
import SuccessStoriesPage from './pages/success-stories';
import EventsPage from './pages/events';
import BlogPage from './pages/blog';
import HelpCenterPage from './pages/help-center';
import ContactPage from './pages/contact';
import TermsPage from './pages/terms';
import PrivacyPage from './pages/privacy';
import ReadingPage from './pages/reading';
import StoryPage from './pages/reading/[id]';
import ProfilePage from './pages/profile';

import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';

function App() {
  const { checkSession, updateLastActivity } = useAuthStore();

  useEffect(() => {
    // Check session on mount
    checkSession();

    // Set up interval to check session
    const sessionInterval = setInterval(checkSession, 60000); // Check every minute

    // Set up activity listeners
    const handleActivity = () => {
      updateLastActivity();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    return () => {
      clearInterval(sessionInterval);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, [checkSession, updateLastActivity]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/help" element={<HelpCenterPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />

            {/* Protected Routes */}
            <Route path="/courses" element={
              <ProtectedRoute>
                <CoursesPage />
              </ProtectedRoute>
            } />
            <Route path="/practice" element={
              <ProtectedRoute>
                <PracticePage />
              </ProtectedRoute>
            } />
            <Route path="/community" element={
              <ProtectedRoute>
                <CommunityPage />
              </ProtectedRoute>
            } />
            <Route path="/live-classes" element={
              <ProtectedRoute>
                <LiveClassesPage />
              </ProtectedRoute>
            } />
            <Route path="/tutoring" element={
              <ProtectedRoute>
                <TutoringPage />
              </ProtectedRoute>
            } />
            <Route path="/study-materials" element={
              <ProtectedRoute>
                <StudyMaterialsPage />
              </ProtectedRoute>
            } />
            <Route path="/practice-tests" element={
              <ProtectedRoute>
                <PracticeTestsPage />
              </ProtectedRoute>
            } />
            <Route path="/forum" element={
              <ProtectedRoute>
                <ForumPage />
              </ProtectedRoute>
            } />
            <Route path="/language-exchange" element={
              <ProtectedRoute>
                <LanguageExchangePage />
              </ProtectedRoute>
            } />
            <Route path="/success-stories" element={
              <ProtectedRoute>
                <SuccessStoriesPage />
              </ProtectedRoute>
            } />
            <Route path="/events" element={
              <ProtectedRoute>
                <EventsPage />
              </ProtectedRoute>
            } />
            <Route path="/reading" element={
              <ProtectedRoute>
                <ReadingPage />
              </ProtectedRoute>
            } />
            <Route path="/reading/:id" element={
              <ProtectedRoute>
                <StoryPage />
              </ProtectedRoute>
            } />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;