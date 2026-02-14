# Quick Setup Guide

## Prerequisites Check

Before starting, ensure you have:
- [ ] Node.js 18+ installed (`node --version`)
- [ ] MongoDB installed and running (`mongod --version`)
- [ ] Git installed

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start MongoDB
```bash
# If using local MongoDB
mongod

# Or if using MongoDB as a service (already running)
sudo systemctl start mongod
```

### 3. Configure Environment
The `.env` file is already created with default settings.

**⚠️ IMPORTANT**: For production, change `PAYLOAD_SECRET` to a secure random string!

### 4. Start Development Server
```bash
npm run dev
```

### 5. Access Admin Panel
Open your browser and navigate to:
```
http://localhost:3000/admin
```

### 6. Create Your First Admin User
You'll be prompted to create an admin account:
- Email: your-email@example.com
- Password: (choose a strong password)
- First Name: Your Name
- Last Name: Your Surname
- Company: You'll need to create one first (see below)

## Initial Data Setup

### Step 1: Create Companies

1. Navigate to **Collections → Companies**
2. Create a carrier company:
   - Name: "ABC Transport Ltd"
   - Type: "Transport Company (Carrier)"
   - Email: carrier@abctransport.com
   - Fill in other details

3. Create a customer company:
   - Name: "XYZ Logistics Inc"
   - Type: "Customer/Shipper"
   - Email: customer@xyzlogistics.com
   - Fill in other details

### Step 2: Create Users

1. Navigate to **Collections → Users**
2. Create a manager user:
   - Email: manager@yourdomain.com
   - Role: Manager
   - Company: ABC Transport Ltd
   - First Name, Last Name, etc.

3. Create a carrier user:
   - Email: carrier@yourdomain.com
   - Role: Carrier
   - Company: ABC Transport Ltd
   - First Name, Last Name, etc.

4. Create a customer user:
   - Email: customer@yourdomain.com
   - Role: Customer
   - Company: XYZ Logistics Inc
   - First Name, Last Name, etc.

### Step 3: Test CMR Upload

1. Log out and log in as the carrier user
2. Navigate to **Collections → CMRs**
3. Click **Create New**
4. Fill in:
   - CMR Number: CMR-001
   - Customer Company: XYZ Logistics Inc
   - Load Details
   - Upload a test PDF or image
5. Save

### Step 4: Test Approval Workflow

1. Log out and log in as the manager user
2. Navigate to **Collections → CMRs**
3. Find the pending CMR
4. Change Status to "Accepted"
5. Save

### Step 5: Test Customer View

1. Log out and log in as the customer user
2. Navigate to **Collections → CMRs**
3. You should only see the accepted CMR

## Troubleshooting

### "Cannot connect to MongoDB"
- Check if MongoDB is running: `ps aux | grep mongod`
- Check the DATABASE_URI in `.env`
- Try: `mongosh` to test connection

### "Port 3000 already in use"
- Find and kill the process: `lsof -ti:3000 | xargs kill`
- Or change the port: `npm run dev -- -p 3001`

### "Module not found"
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Next.js cache: `rm -rf .next`

### Permission errors on file upload
- Ensure the media directory exists: `mkdir -p public/media/cmr-documents`
- Check permissions: `chmod -R 755 public/media`

## Default Users Summary

After setup, you'll have:

| Email | Role | Company | Purpose |
|-------|------|---------|---------|
| admin@yourdomain.com | Admin | Any | Full system access |
| manager@yourdomain.com | Manager | ABC Transport | Approve/decline CMRs |
| carrier@yourdomain.com | Carrier | ABC Transport | Upload CMRs |
| customer@yourdomain.com | Customer | XYZ Logistics | View accepted CMRs |

## Next Steps

- [ ] Customize company information
- [ ] Add real users
- [ ] Configure email notifications (optional)
- [ ] Set up cloud storage for documents (for production)
- [ ] Configure SSL/HTTPS (for production)
- [ ] Set up automated backups

## Common Commands

```bash
# Development
npm run dev                 # Start dev server

# Production
npm run build              # Build for production
npm start                  # Start production server

# Database
mongodump --db cmr-transport    # Backup database
mongorestore --db cmr-transport # Restore database

# Maintenance
npm run generate:types     # Regenerate TypeScript types
npm run lint              # Check code quality
```

## Need Help?

- Check the main README.md for detailed documentation
- Review PayloadCMS docs: https://payloadcms.com/docs
- Check collection files in `src/collections/` for access rules

---

Ready to go! 🚀
