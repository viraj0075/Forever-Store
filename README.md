# Fashion Store

## Setup Instructions

### 1. Frontend Setup
The frontend is a modern web application built with **React**, **Vite**, **TypeScript**, **Tailwind CSS**, and **TanStack (Router & Query)**.

1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```

2. Install the project dependencies:
   ```bash
   npm install
   ```

3. (Optional) Run the TypeScript compiler to check for any type errors:
   ```bash
   npx tsc --noEmit
   # Or build the project: npm run build
   ```

4. Start the Vite development server:
   ```bash
   npm run dev
   ```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` directory and add your necessary environment variables (e.g., `PORT`, `DATABASE_URL`, Cloudinary credentials).
4. Start the development server:
   ```bash
   npm run dev
   ```

### 3. Prisma Database Setup
The backend uses Prisma as the ORM. Follow these steps to set up your database connection and schema.

1. Ensure you are in the `Backend` directory:
   ```bash
   cd Backend
   ```
2. If you are setting up Prisma for the very first time in a new environment, initialize it:
   ```bash
   npx prisma init
   ```
3. Push your schema changes to the database and apply migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
4. Generate the Prisma Client to ensure your code can interact with the database:
   ```bash
   npx prisma generate
   ```
