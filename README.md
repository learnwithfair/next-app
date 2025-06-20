# Next.js with Prisma and PostgreSQL Setup Guide

[![Youtube][youtube-shield]][youtube-url]
[![Facebook][facebook-shield]][facebook-url]
[![Instagram][instagram-shield]][instagram-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

Thanks for visiting my GitHub account!

## Prerequisites

- Node.js installed
- PostgreSQL installed and running
- Next.js project initialized

## Problem Overview

When setting up Prisma with Next.js and PostgreSQL, you may encounter these common errors:

1. `@prisma/client did not initialize yet. Please run "prisma generate" and try to import it again.`
2. `Authentication failed against database server`
3. `PrismaClientInitializationError: Invalid invocation`

## Step-by-Step Solution

### 1. Install Required Dependencies

```bash
npm install prisma @prisma/client
npm install -D prisma
```

### 2. Initialize Prisma (if not already done)

```bash
npx prisma init
```

### 3. Configure Database Connection

Create or update your `.env` file in the project root:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

Example:

```env
DATABASE_URL="postgresql://learnwithfair:12345678@localhost:5432/postify_db"
```

### 4. Set Up PostgreSQL Database

#### Connect to PostgreSQL as superuser:

```bash
psql -U postgres
```

#### Create user and database:

```sql
CREATE USER learnwithfair WITH PASSWORD '12345678';
CREATE DATABASE postify_db OWNER learnwithfair;
GRANT ALL PRIVILEGES ON DATABASE postify_db TO learnwithfair;
```

#### For newer PostgreSQL versions, grant schema privileges:

```sql
\c postify_db
GRANT ALL ON SCHEMA public TO learnwithfair;
\q
```

#### Test the connection:

```bash
psql -U learnwithfair -d postify_db -h localhost
```

### 5. Configure Prisma Schema

Ensure your `prisma/schema.prisma` file is configured correctly:

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
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 6. Create Prisma Client Instance

Create `lib/prisma.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

### 7. Generate Prisma Client

```bash
npx prisma generate
```

### 8. Push Schema to Database

```bash
npx prisma db push
```

### 9. Clear Next.js Cache and Restart

```bash
rm -rf .next
npm run dev
```

## Example Usage in Next.js

Here's how to use Prisma in your Next.js pages:

```typescript
// app/page.tsx
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <main className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-gray-600">{post.content?.slice(0, 100)}...</p>
          </div>
        ))}
      </div>
    </main>
  );
}
```

## Troubleshooting

### Issue: Custom Prisma Client Output Path

If your Prisma generates to a custom path like `app/generated/prisma`, either:

**Option A:** Update your import path:

```typescript
import { PrismaClient } from "../app/generated/prisma";
```

**Option B:** Remove custom output from schema.prisma:

```prisma
generator client {
  provider = "prisma-client-js"
  // Remove this line if present:
  // output = "../app/generated/prisma"
}
```

### Issue: Database Connection Errors

1. Verify PostgreSQL is running
2. Check DATABASE_URL format
3. Ensure user has proper privileges
4. Test connection manually with psql

### Issue: Missing Tables

Run the following to sync your schema:

```bash
npx prisma db push
```

Or for migrations:

```bash
npx prisma migrate dev --name init
```

## Useful Commands

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes to database
npx prisma db push

# Create and apply migrations
npx prisma migrate dev

# View database in browser
npx prisma studio

# Reset database
npx prisma migrate reset
```

## Package.json Scripts

Add these helpful scripts to your `package.json`:

```json
{
  "scripts": {
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:reset": "prisma migrate reset",
    "postinstall": "prisma generate"
  }
}
```

## Environment Variables

Create a `.env.example` file for your team:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Optional: Direct URL for migrations (if using connection pooling)
DIRECT_URL="postgresql://username:password@localhost:5432/database_name"
```

Remember to add `.env` to your `.gitignore` file to keep credentials secure.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

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
