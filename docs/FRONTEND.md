# Frontend Documentation

## Component Structure

### Authentication Components
- `LoginForm`: Handles user login
- `SignupForm`: Handles new user registration

### Layout Components
- `Navbar`: Main navigation component
- `Footer`: Site-wide footer

### Learning Components
- `AlphabetLesson`: Interactive Hebrew alphabet learning
- `StoryLesson`: Story-based learning exercises
- `ConversationPractice`: Speaking practice module
- `ReadingPractice`: Reading comprehension exercises

### Game Components
- `GameCenter`: Central hub for learning games
- `Leaderboard`: Display user rankings
- `WeeklyChallenges`: Weekly learning challenges

## State Management

### Auth Store
```typescript
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}
```

### Lesson Store
```typescript
interface LessonStore {
  currentLesson: Lesson | null;
  progress: Progress;
  updateProgress: (progress: Progress) => void;
}
```

## Routing Structure

- `/`: Home page
- `/dashboard`: User dashboard
- `/practice`: Practice exercises
- `/courses`: Available courses
- `/community`: Community features
- `/profile`: User profile

## Utility Functions

### API Calls
Located in `src/lib/api.ts`
- `fetchUser()`
- `updateProgress()`
- `fetchLessons()`

### Helper Functions
Located in `src/lib/utils.ts`
- `formatDate()`
- `calculateProgress()`
- `validateInput()`
