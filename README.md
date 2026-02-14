# CMR Transport Management System

A comprehensive transport document management system built with PayloadCMS 3.0 and Next.js 15. This system enables transport companies (carriers) to upload CMR documents, managers to review and approve them, and customers to access their approved transport documents.

## Features

### Role-Based Access Control
- **Admin**: Full system access and user management
- **Manager**: Review and approve/decline CMR documents, manage companies and users
- **Carrier**: Upload CMR documents for their loads
- **Customer**: View accepted CMR documents for their shipments

### CMR Document Management
- Upload CMR documents (PDF, JPEG, PNG)
- Automatic carrier company association
- Approval workflow (pending → accepted/declined)
- Detailed load information tracking
- Document versioning and audit trail

### Company Management
- Separate carrier and customer companies
- Complete company profiles with contact information
- VAT and registration number tracking
- Address management

## Technology Stack

- **CMS**: PayloadCMS 3.0
- **Framework**: Next.js 15
- **Database**: MongoDB
- **Language**: TypeScript
- **File Storage**: Local file system (configurable to S3/Cloud)

## Prerequisites

- Node.js >= 18.0.0
- MongoDB instance (local or cloud)
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cmr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

   Update `.env` with your settings:
   ```env
   DATABASE_URI=mongodb://localhost:27017/cmr-transport
   PAYLOAD_SECRET=your-secure-secret-key-here
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

## First-Time Setup

1. **Access the admin panel**

   Navigate to `http://localhost:3000/admin`

2. **Create the first admin user**

   You'll be prompted to create an admin account on first launch.

3. **Create companies**

   Before creating users, set up companies:
   - Go to Companies collection
   - Create at least one carrier company (type: "Transport Company")
   - Create at least one customer company (type: "Customer/Shipper")

4. **Create users**

   Create users with appropriate roles:
   - Manager users for approval workflow
   - Carrier users for document upload
   - Customer users for viewing approved documents

## Usage Guide

### For Carriers

1. **Login** to the admin panel
2. Navigate to **CMRs** collection
3. Click **Create New**
4. Fill in the required information:
   - CMR Number (unique identifier)
   - Customer Company
   - Load Details (pickup/delivery addresses, dates, goods description)
   - Upload the CMR document (PDF/image)
5. Submit - status will be set to "Pending"

### For Managers

1. **Login** to the admin panel
2. Navigate to **CMRs** collection
3. Filter by status: "Pending"
4. Review the CMR document and details
5. Update the status:
   - **Accept**: Changes status to "Accepted" (visible to customer)
   - **Decline**: Add a decline reason and change status to "Declined"

### For Customers

1. **Login** to the admin panel
2. Navigate to **CMRs** collection
3. View only accepted CMRs for your company
4. Download/view CMR documents
5. Check load details and delivery information

### For Admins

Full access to all collections:
- Manage users and companies
- Override any CMR status
- View system-wide reports
- Configure system settings

## Data Structure

### User Fields
- Email (unique, authentication)
- Role (admin, manager, carrier, customer)
- Company (relationship)
- First Name, Last Name
- Phone Number

### Company Fields
- Name
- Type (carrier or customer)
- Email, Phone
- Address (street, city, postal code, country)
- VAT Number
- Registration Number

### CMR Fields
- CMR Number (unique)
- Status (pending, accepted, declined)
- Carrier Company (auto-set)
- Customer Company
- Load Details:
  - Pickup Address & Date
  - Delivery Address & Date
  - Goods Description
  - Weight
  - Number of Packages
- Document Upload (PDF/Image)
- Uploaded By (auto-tracked)
- Reviewed By & Review Date (auto-tracked)
- Decline Reason (if declined)
- Notes

## Security Features

- **Authentication**: Built-in PayloadCMS auth
- **Role-based access control**: Granular permissions per collection
- **Document security**: Carriers can only see their own CMRs
- **Customer privacy**: Customers only see accepted documents
- **Audit trail**: Tracks who uploaded and reviewed each CMR
- **Field-level permissions**: Status can only be changed by managers

## File Storage

CMR documents are stored in `/media/cmr-documents` by default.

For production, consider configuring cloud storage:
- AWS S3
- Google Cloud Storage
- Azure Blob Storage

Update the `upload` configuration in `src/collections/CMRs.ts` accordingly.

## Database Backup

Regular MongoDB backups are recommended:

```bash
mongodump --db cmr-transport --out backup/$(date +%Y%m%d)
```

## API Access

PayloadCMS provides REST and GraphQL APIs automatically:

- **REST API**: `http://localhost:3000/api`
- **GraphQL**: `http://localhost:3000/api/graphql`

API documentation available at `http://localhost:3000/api-docs`

## Customization

### Adding Custom Fields

Edit the collection files in `src/collections/`:
- `Users.ts` - User fields
- `Companies.ts` - Company fields
- `CMRs.ts` - CMR document fields

### Modifying Access Control

Update the `access` object in each collection file to customize permissions.

### Email Notifications

Configure SMTP in `.env` to enable:
- Password reset emails
- CMR approval notifications
- New upload alerts

## Development Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run generate:types   # Generate TypeScript types
npm run payload          # Run Payload CLI commands
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript type checking
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check `DATABASE_URI` in `.env`
- Verify network connectivity

### File Upload Issues
- Check write permissions on `/media` directory
- Verify file size limits
- Check file type restrictions

### Permission Errors
- Verify user role assignments
- Check company associations
- Review access control rules in collections

## Production Deployment

1. Set a strong `PAYLOAD_SECRET`
2. Use a production MongoDB instance
3. Configure cloud file storage
4. Set up SSL/HTTPS
5. Configure proper environment variables
6. Set up monitoring and logging
7. Regular database backups

## Support

For issues and questions:
- Check the [PayloadCMS documentation](https://payloadcms.com/docs)
- Review collection access rules in `src/collections/`
- Check MongoDB connection and logs

## License

MIT License - modify and use as needed for your transport business.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with PayloadCMS 3.0 - The best way to build modern backends.
