# Authentication Flows Documentation

This document outlines the authentication flows in the Hebrew Learning platform.

## Table of Contents
1. [Registration Flow](#registration-flow)
2. [Email Verification Flow](#email-verification-flow)
3. [Login Flow](#login-flow)
4. [Token Refresh Flow](#token-refresh-flow)
5. [Password Reset Flow](#password-reset-flow)

## Registration Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    participant EmailService

    User->>Frontend: Enter registration details
    Frontend->>Frontend: Validate input
    Frontend->>Backend: POST /api/auth/register
    Backend->>Backend: Validate request
    Backend->>Database: Check if email exists
    alt Email exists
        Database-->>Backend: User found
        Backend-->>Frontend: 409 Conflict
        Frontend-->>User: Email already registered
    else Email doesn't exist
        Backend->>Backend: Hash password
        Backend->>Database: Create user
        Backend->>Backend: Generate verification token
        Backend->>EmailService: Send verification email
        Backend-->>Frontend: 201 Created
        Frontend-->>User: Check email for verification
    end
```

## Email Verification Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database

    User->>Frontend: Click verification link
    Frontend->>Backend: GET /api/verification/verify/:token
    Backend->>Backend: Validate token
    Backend->>Database: Check token exists & not expired
    alt Token valid
        Backend->>Database: Update user verified status
        Backend->>Database: Delete verification token
        Backend-->>Frontend: 200 Success
        Frontend-->>User: Email verified, proceed to login
    else Token invalid/expired
        Backend-->>Frontend: 400 Bad Request
        Frontend-->>User: Invalid/expired token
        Frontend->>Backend: POST /api/verification/resend
        Backend->>Backend: Generate new token
        Backend->>EmailService: Send new verification email
        Backend-->>Frontend: 200 Success
        Frontend-->>User: New verification email sent
    end
```

## Login Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database

    User->>Frontend: Enter login credentials
    Frontend->>Frontend: Validate input
    Frontend->>Backend: POST /api/auth/login
    Backend->>Database: Find user by email
    alt User not found
        Backend-->>Frontend: 401 Unauthorized
        Frontend-->>User: Invalid credentials
    else User found
        Backend->>Backend: Verify password
        alt Password incorrect
            Backend-->>Frontend: 401 Unauthorized
            Frontend-->>User: Invalid credentials
        else Password correct
            alt Email not verified
                Backend-->>Frontend: 403 Forbidden
                Frontend-->>User: Please verify email
            else Email verified
                Backend->>Backend: Generate JWT
                Backend-->>Frontend: 200 Success + JWT
                Frontend->>Frontend: Store JWT
                Frontend-->>User: Login successful
            end
        end
    end
```

## Token Refresh Flow

```mermaid
sequenceDiagram
    participant Frontend
    participant Backend
    participant Database

    Frontend->>Backend: POST /api/auth/refresh
    Note over Frontend,Backend: Send refresh token in HTTP-only cookie
    Backend->>Backend: Validate refresh token
    alt Token valid
        Backend->>Database: Check user exists
        alt User exists
            Backend->>Backend: Generate new access token
            Backend-->>Frontend: 200 Success + New tokens
            Frontend->>Frontend: Store new access token
        else User not found
            Backend-->>Frontend: 401 Unauthorized
            Frontend->>Frontend: Clear tokens
        end
    else Token invalid/expired
        Backend-->>Frontend: 401 Unauthorized
        Frontend->>Frontend: Clear tokens
    end
```

## Password Reset Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    participant EmailService

    User->>Frontend: Request password reset
    Frontend->>Backend: POST /api/auth/forgot-password
    Backend->>Database: Find user by email
    alt User found
        Backend->>Backend: Generate reset token
        Backend->>Database: Save reset token
        Backend->>EmailService: Send reset email
        Backend-->>Frontend: 200 Success
        Frontend-->>User: Check email for reset link
    else User not found
        Backend-->>Frontend: 200 Success
        Note over Backend,Frontend: Same response to prevent email enumeration
        Frontend-->>User: Check email for reset link
    end

    User->>Frontend: Click reset link
    Frontend->>Backend: GET /api/auth/reset-password/:token
    Backend->>Backend: Validate token
    alt Token valid
        Frontend-->>User: Show reset password form
        User->>Frontend: Enter new password
        Frontend->>Backend: POST /api/auth/reset-password
        Backend->>Backend: Hash new password
        Backend->>Database: Update password
        Backend->>Database: Clear reset token
        Backend-->>Frontend: 200 Success
        Frontend-->>User: Password updated
    else Token invalid/expired
        Backend-->>Frontend: 400 Bad Request
        Frontend-->>User: Invalid/expired token
    end
```

## Security Considerations

### JWT Token Security
- Access tokens are short-lived (15 minutes)
- Refresh tokens are longer-lived (7 days)
- Tokens are stored in HTTP-only cookies
- CSRF protection is implemented
- Secure and SameSite flags are set in production

### Password Security
- Passwords are hashed using bcrypt
- Minimum password requirements enforced
- Rate limiting on auth endpoints
- Account lockout after failed attempts

### Email Security
- Verification required for new accounts
- Secure reset password flow
- Rate limiting on email endpoints
- No email enumeration possible

## Implementation Details

### JWT Token Structure
```javascript
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "userId": "uuid",
    "email": "user@example.com",
    "iat": 1516239022,
    "exp": 1516239922
  }
}
```

### HTTP-Only Cookie Configuration
```javascript
{
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
}
```

### Error Response Format
```javascript
{
  "error": {
    "code": "AUTH_ERROR",
    "message": "Detailed error message",
    "status": 401
  }
}
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user

### Email Verification
- `GET /api/verification/verify/:token` - Verify email
- `POST /api/verification/resend` - Resend verification email

### Password Reset
- `POST /api/auth/forgot-password` - Request password reset
- `GET /api/auth/reset-password/:token` - Validate reset token
- `POST /api/auth/reset-password` - Reset password

## Environment Variables
```env
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
CLIENT_URL=http://localhost:5174
```

## Best Practices

1. **Token Management**
   - Store tokens in HTTP-only cookies
   - Implement token refresh mechanism
   - Clear tokens on logout
   - Validate tokens on every request

2. **Password Security**
   - Use strong password hashing
   - Implement password complexity rules
   - Rate limit authentication attempts
   - Secure password reset flow

3. **Error Handling**
   - Use consistent error formats
   - Don't leak sensitive information
   - Log authentication failures
   - Implement proper error responses

4. **Email Security**
   - Verify email addresses
   - Rate limit email sending
   - Use secure SMTP connection
   - Implement email templates
