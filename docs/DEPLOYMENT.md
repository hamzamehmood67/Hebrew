# Deployment Documentation

## Heroku Deployment

### Prerequisites
1. Heroku CLI installed
2. Heroku account configured
3. Git repository initialized

### Frontend Deployment Steps
1. Create Heroku app:
   ```bash
   heroku create hebrew-learn-frontend
   ```

2. Configure environment variables:
   ```bash
   heroku config:set VITE_API_URL=your-backend-url
   ```

3. Deploy:
   ```bash
   git push heroku main
   ```

### Backend Deployment Steps
1. Create separate Heroku app:
   ```bash
   heroku create hebrew-learn-backend
   ```

2. Configure environment variables:
   ```bash
   heroku config:set DATABASE_URL=your-database-url
   heroku config:set JWT_SECRET=your-secret
   ```

3. Deploy:
   ```bash
   git push heroku main
   ```

## Database Setup

### Production Database
1. Create database instance
2. Configure connection string
3. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

## Domain Configuration (Namecheap)

### DNS Configuration
1. Add A records pointing to Heroku
2. Configure CNAME records
3. Set up SSL certificates

### Domain Verification
1. Verify DNS propagation
2. Configure SSL certificates
3. Test domain connectivity

## Monitoring

### Performance Monitoring
- Set up New Relic or similar monitoring
- Configure error tracking
- Set up logging

### Security
- Enable CORS
- Configure rate limiting
- Set up firewall rules

## Maintenance

### Backup Procedures
1. Database backups
2. Configuration backups
3. Code repository backups

### Update Procedures
1. Stage updates in development
2. Test in staging environment
3. Deploy to production
4. Monitor for issues
