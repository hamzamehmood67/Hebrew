# HebrewLearn Platform

A modern web application for learning Hebrew, featuring interactive lessons, practice exercises, and a community-driven learning environment.

## Features

- 🔐 **Secure Authentication System**
  - JWT-based authentication
  - Token refresh mechanism
  - Session management with auto-logout
  - Protected routes

- 📚 **Learning Features**
  - Interactive courses
  - Practice exercises
  - Reading materials
  - Live classes
  - Community forums
  - Language exchange
  - Progress tracking

## Tech Stack

- **Frontend**
  - React with TypeScript
  - Vite for build tooling
  - Zustand for state management
  - React Router for navigation
  - Tailwind CSS for styling
  - Framer Motion for animations
  - Axios for API requests

- **UI Components**
  - Radix UI primitives
  - Custom component library
  - Responsive design
  - Modern UI/UX

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/hebrewlearn.git
cd hebrewlearn
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Create a `.env` file in the project root:
```env
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Project Structure

```
project/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── auth/          # Authentication components
│   │   ├── layout/        # Layout components
│   │   └── ui/            # UI component library
│   ├── pages/             # Page components
│   │   ├── auth/          # Authentication pages
│   │   ├── practice/      # Practice-related pages
│   │   └── ...
│   ├── services/          # API services
│   ├── store/             # State management
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
├── public/                # Static assets
└── ...
```

## Authentication System

### Features

1. **Token Management**
   - JWT token storage in localStorage
   - Automatic token injection in API requests
   - Token refresh mechanism for expired tokens
   - Token cleanup on logout

2. **Session Management**
   - Automatic session timeout (30 minutes)
   - Activity tracking (mouse/keyboard)
   - Secure session persistence

3. **Protected Routes**
   - Route protection with auth checks
   - Redirect to login with return paths
   - Loading states for auth checks

### Usage

```typescript
// Protect a route
<Route 
  path="/protected" 
  element={
    <ProtectedRoute>
      <ProtectedComponent />
    </ProtectedRoute>
  } 
/>

// Use auth store
const { isAuthenticated, user, login, logout } = useAuthStore();

// Make authenticated API requests
const response = await api.getUserProfile();
```

## Development Guidelines

1. **State Management**
   - Use Zustand for global state
   - Use React Query for server state
   - Keep component state local when possible

2. **TypeScript**
   - Define types in `/types` directory
   - Use strict type checking
   - Avoid `any` types

3. **Styling**
   - Use Tailwind CSS utility classes
   - Follow BEM naming for custom CSS
   - Use CSS modules for component styles

4. **Testing**
   - Write unit tests for utilities
   - Write integration tests for components
   - Test auth flows thoroughly

## TODO

1. **Features**
   - [ ] Add email verification
   - [ ] Implement password reset
   - [ ] Add OAuth providers
   - [ ] Add two-factor authentication

2. **Improvements**
   - [ ] Add error boundaries
   - [ ] Implement retry logic for failed requests
   - [ ] Add offline support
   - [ ] Improve loading states

3. **Documentation**
   - [ ] Add API documentation
   - [ ] Add component storybook
   - [ ] Add contribution guidelines
   - [ ] Add deployment guide

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
