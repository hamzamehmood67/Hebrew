# Database Documentation

## Schema Overview

### User Table
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  username  String   @unique
  password  String
  progress  Progress[]
  achievements Achievement[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Progress Table
```prisma
model Progress {
  id        String   @id @default(uuid())
  userId    String
  lessonId  String
  completed Boolean
  score     Int
  user      User     @relation(fields: [userId], references: [id])
  lesson    Lesson   @relation(fields: [lessonId], references: [id])
}
```

### Lesson Table
```prisma
model Lesson {
  id          String   @id @default(uuid())
  title       String
  type        String
  content     Json
  difficulty  String
  progress    Progress[]
}
```

## Database Operations

### User Operations
- Creating new users
- Updating user progress
- Retrieving user achievements

### Lesson Operations
- Fetching available lessons
- Updating lesson content
- Tracking completion status

### Progress Tracking
- Recording lesson completion
- Updating scores
- Generating progress reports

## Migrations

### Creating Migrations
```bash
npx prisma migrate dev --name init
```

### Applying Migrations
```bash
npx prisma migrate deploy
```

## Database Maintenance

### Backup Procedures
1. Regular automated backups
2. Manual backup before major updates

### Performance Optimization
- Index optimization
- Query optimization
- Regular maintenance tasks
