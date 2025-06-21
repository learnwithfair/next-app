# Full-Stack Next.js with Prisma and PostgreSQL

[![Youtube][youtube-shield]][youtube-url]
[![Facebook][facebook-shield]][facebook-url]
[![Instagram][instagram-shield]][instagram-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

Thanks for visiting my GitHub account!

>A modern blog platform built with Next.js, TypeScript, PostgreSQL, and Prisma ORM. This application provides complete functionality for creating, managing, and displaying blog posts with image upload capabilities.


## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Components](#components)
- [File Upload System](#file-upload-system)
- [Database Schema](#database-schema)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Overview

Postify is a comprehensive blog platform that enables users to create and publish content with rich media support. The application leverages modern web technologies to provide a seamless content management experience.

## Features

- Create and publish blog posts
- Rich text content support
- Image upload and management
- Responsive design
- PostgreSQL database integration
- Type-safe development with TypeScript
- Server-side rendering with Next.js
- RESTful API architecture

## Prerequisites

Before installing Postify, ensure you have the following installed:

- Node.js (version 16.0 or higher)
- npm or yarn package manager
- PostgreSQL (version 12.0 or higher)
- Git

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd next-app
```

2. Install dependencies:
```bash
npm install
```

3. Create environment configuration:
```bash
cp .env.example .env
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://learnwithfair:12345678@localhost:5432/postify_db?schema=public"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

Replace the database credentials with your PostgreSQL configuration.

## Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE postify_db;
```

2. Run Prisma migrations to set up the database schema:
```bash
npx prisma migrate dev --name init
```

3. Generate the Prisma client:
```bash
npx prisma generate
```

4. Verify the setup by inspecting the database:
```bash
npx prisma studio
```
 

5. Push schema changes to database (If above isn't work):
```bash
npx prisma db push
```
 

## Project Structure

```
postify/
├── app/
│   ├── layout.tsx                 # Root layout component
│   ├── page.tsx                   # Homepage
│   ├── posts/
│   │   ├── page.tsx              # Posts listing page
│   │   ├── create/
│   │   │   └── page.tsx          # Post creation form
│   │   └── [id]/
│   │       └── page.tsx          # Individual post view
│   └── api/
│       ├── posts/
│       │   └── route.ts          # Posts API endpoints
│       └── upload/
│           └── route.ts          # File upload endpoint
├── components/
│   ├── Header.tsx                # Navigation header
│   ├── PostCard.tsx              # Post preview component
│   ├── CreatePostForm.tsx        # Post creation form
│   └── ui/
│       ├── Button.tsx            # Reusable button component
│       └── Input.tsx             # Reusable input component
├── lib/
│   ├── prisma.ts                 # Prisma client configuration
│   └── utils.ts                  # Utility functions
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── migrations/               # Database migrations
├── public/
│   ├── uploads/                  # Uploaded images storage
│   └── images/                   # Static images
├── styles/
│   └── globals.css               # Global styles
├── types/
│   └── index.ts                  # TypeScript type definitions
├── .env                          # Environment variables
├── next.config.js                # Next.js configuration
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
└── tailwind.config.js            # Tailwind CSS configuration
```

## API Documentation

### Posts API

#### Create Post
- **Endpoint**: `POST /api/posts`
- **Description**: Creates a new blog post
- **Request Body**:
```json
{
  "title": "Post Title",
  "content": "Post content...",
  "imageUrl": "/uploads/image.jpg"
}
```
- **Response**:
```json
{
  "success": true,
  "post": {
    "id": 1,
    "title": "Post Title",
    "content": "Post content...",
    "imageUrl": "/uploads/image.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Get All Posts
- **Endpoint**: `GET /api/posts`
- **Description**: Retrieves all published posts
- **Response**:
```json
{
  "posts": [
    {
      "id": 1,
      "title": "Post Title",
      "content": "Post content...",
      "imageUrl": "/uploads/image.jpg",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Single Post
- **Endpoint**: `GET /api/posts/[id]`
- **Description**: Retrieves a specific post by ID
- **Parameters**: `id` (number) - Post ID
- **Response**:
```json
{
  "post": {
    "id": 1,
    "title": "Post Title",
    "content": "Post content...",
    "imageUrl": "/uploads/image.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Upload API

#### Upload Image
- **Endpoint**: `POST /api/upload`
- **Description**: Uploads an image file
- **Content-Type**: `multipart/form-data`
- **Request Body**: Form data with `file` field
- **Response**:
```json
{
  "url": "/uploads/filename.jpg"
}
```

## Components

### CreatePostForm Component

Located at `components/CreatePostForm.tsx`, this component handles post creation with the following features:

- Form validation
- Image upload integration
- Rich text editing
- Error handling

Example usage:
```tsx
import CreatePostForm from '@/components/CreatePostForm'

export default function CreatePostPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
      <CreatePostForm />
    </div>
  )
}
```

### PostCard Component

Located at `components/PostCard.tsx`, displays post previews:

```tsx
interface PostCardProps {
  id: number
  title: string
  content: string
  imageUrl?: string
  createdAt: Date
}

export default function PostCard({ id, title, content, imageUrl, createdAt }: PostCardProps) {
  // Component implementation
}
```

## File Upload System

The file upload system is implemented using the following approach:

1. **Frontend**: Uses FormData to send files to the upload endpoint
2. **Backend**: Processes files using Next.js API routes
3. **Storage**: Files are stored in the `public/uploads` directory
4. **Database**: File URLs are stored in the database

### Upload Configuration

File upload settings in `app/api/upload/route.ts`:

```typescript
export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file') as File
  
  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }
  
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  
  const filename = `${Date.now()}-${file.name}`
  const filepath = path.join(process.cwd(), 'public/uploads', filename)
  
  await writeFile(filepath, buffer)
  
  return NextResponse.json({ url: `/uploads/${filename}` })
}
```

## Database Schema

The Prisma schema is defined in `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  imageUrl  String?
  published Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("posts")
}
```

### Schema Updates

To modify the database schema:

1. Update the `schema.prisma` file
2. Create a new migration:
```bash
npx prisma migrate dev --name description_of_changes
```
3. Generate the updated client:
```bash
npx prisma generate
```

## Development

### Running the Development Server

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

### Database Operations

- `npx prisma studio` - Open Prisma Studio for database management
- `npx prisma db push` - Push schema changes to database
- `npx prisma migrate reset` - Reset database and apply all migrations

## Testing

### Manual Testing

1. Navigate to `http://localhost:3000/posts/create`
2. Fill out the post creation form
3. Upload an image
4. Submit the form
5. Verify the post appears on the homepage
6. Check the database for the new post entry

### Database Verification

Use Prisma Studio to verify database operations:
```bash
npx prisma studio
```

## Deployment

### Production Build

Create a production build:
```bash
npm run build
```

### Environment Variables

Ensure all required environment variables are set in your production environment:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

### Database Migration

Run migrations in production:
```bash
npx prisma migrate deploy
```

## Troubleshooting

### Common Issues

#### Database Connection Error
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists

#### File Upload Issues
- Check `public/uploads` directory permissions
- Verify file size limits
- Ensure proper Content-Type headers

#### Build Errors
- Clear `.next` directory: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run type-check`

### Logs and Debugging

Enable debug logging by setting:
```env
DEBUG=prisma:*
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests and linting
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

### Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Write descriptive commit messages



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


---

For additional support or questions, please refer to the project documentation or create an issue in the repository.

## Follow Me

[<img src='https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/github.svg' alt='github' height='40'>](https://github.com/learnwithfair) [<img src='https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/facebook.svg' alt='facebook' height='40'>](https://www.facebook.com/learnwithfair/) [<img src='https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/instagram.svg' alt='instagram' height='40'>](https://www.instagram.com/learnwithfair/) [<img src='https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/twitter.svg' alt='twitter' height='40'>](https://www.twiter.com/learnwithfair/) [<img src='https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/youtube.svg' alt='YouTube' height='40'>](https://www.youtube.com/@learnwithfair)

<!-- MARKDOWN LINKS & IMAGES -->

[youtube-shield]: https://img.shields.io/badge/-Youtube-black.svg?style=flat-square&logo=youtube&color=555&logoColor=white
[youtube-url]: https://youtube.com/@learnwithfair
[facebook-shield]: https://img.shields.io/badge/-Facebook-black.svg?style=flat-square&logo=facebook&color=555&logoColor=white
[facebook-url]: https://facebook.com/learnwithfair
[instagram-shield]: https://img.shields.io/badge/-Instagram-black.svg?style=flat-square&logo=instagram&color=555&logoColor=white
[instagram-url]: https://instagram.com/learnwithfair
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/rahatul-rabbi/
