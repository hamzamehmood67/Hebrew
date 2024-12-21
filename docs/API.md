# API Documentation

## Authentication Endpoints

### POST /api/auth/signup
Create a new user account.

**Request Body:**
```json
{
  "email": "string",
  "password": "string",
  "username": "string"
}
```

**Response:** 
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "email": "string",
    "username": "string"
  }
}
```

### POST /api/auth/login
Authenticate a user.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

## Learning Endpoints

### GET /api/lessons
Get available lessons.

**Response:**
```json
{
  "lessons": [
    {
      "id": "string",
      "title": "string",
      "type": "alphabet|story|grammar",
      "difficulty": "beginner|intermediate|advanced"
    }
  ]
}
```

### GET /api/practice
Get practice exercises.

### POST /api/progress
Update user progress.

## Game Endpoints

### GET /api/leaderboard
Get current leaderboard.

### POST /api/achievements
Update user achievements.
