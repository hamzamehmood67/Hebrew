import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/navbar';
import { Footer } from './components/layout/footer';
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
import { useAuthStore } from './store/authStore';
import DashboardPage from './pages/dashboard';

function App() {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    // Optionally redirect to home or login page
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/live-classes" element={<LiveClassesPage />} />
            <Route path="/tutoring" element={<TutoringPage />} />
            <Route path="/study-materials" element={<StudyMaterialsPage />} />
            <Route path="/practice-tests" element={<PracticeTestsPage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/language-exchange" element={<LanguageExchangePage />} />
            <Route path="/success-stories" element={<SuccessStoriesPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/help" element={<HelpCenterPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/reading" element={<ReadingPage />} />
            <Route path="/reading/:id" element={<StoryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;