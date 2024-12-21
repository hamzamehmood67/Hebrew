import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

/**
 * Props for the ProtectedRoute component
 * @interface ProtectedRouteProps
 */
interface ProtectedRouteProps {
  /** The child components to render when authenticated */
  children: React.ReactNode;
}

/**
 * A wrapper component that protects routes requiring authentication
 * 
 * Features:
 * - Redirects unauthenticated users to login
 * - Preserves the attempted URL for post-login redirect
 * - Shows loading spinner during auth check
 * - Renders children when authenticated
 * 
 * @param {ProtectedRouteProps} props - Component props
 * @returns {JSX.Element} The protected route component
 * 
 * @example
 * ```tsx
 * <Route 
 *   path="/profile" 
 *   element={
 *     <ProtectedRoute>
 *       <ProfilePage />
 *     </ProtectedRoute>
 *   } 
 * />
 * ```
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page but save the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
