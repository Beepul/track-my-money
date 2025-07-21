## Install typescript with node js and express

1. mkdir my-app && cd my-app
2. npm init -y
3. npm install express
4. npm install -D typescript ts-node @types/node @types/express nodemon
5. npx tsc --init - to create a tsconfig.json file
7. edit tsconfig.json file: {
    "compilerOptions": {
        "target": "ES2020",
        "module": "CommonJS",
        "rootDir": "./src",
        "outDir": "./dist",
        "esModuleInterop": true,
        "strict": true,
        "skipLibCheck": true
    }
}
8. Add scripts to package.json: {
    "main": "dist/index.js",
    "type": "commonjs",
    "scripts": {
        "start": "node dist/index.js",
        "build": "tsc",
        "dev": "nodemon --watch src --exec ts-node src/index.ts"
    }
} 


## Install prisma with node js, express, and typescript

1. mkdir my-app && cd my-app
2. npm init -y
3. npm install prisma --save-dev
4. npm install @prisma/client
5. npx prisma init (Initializing Prisma will create schema.prisma and .env file)
6. Configure your database and edit .env with your database connection URL
7. Define your models in schema.prisma and remove output from generator client
8. npx prisma migrate dev --name init (Migrating the database will create actual tables in database)
9. "npx prisma generate" to generate prisma client
10. To use prisma in express app (src/config/prisma.client.ts):
    import { PrismaClient } from '@prisma/client';
    const prisma = new PrismaClient();
    export default prisma;


## Routes
Base route: http://localhost:5000/api/v1
Health Check: http://localhost:5000/api/v1/health
Image route: http://localhost:5000/api/v1/uploads/{filename}
404 route: http://localhost:5000/*

### User Routes
Register: http://localhost:5000/api/v1/user/register
Login: http://localhost:5000/api/v1/user/login
Refresh Token: http://localhost:5000/api/v1/user/refresh-token
Log Out: http://localhost:5000/api/v1/user/log-out
Update Password: http://localhost:5000/api/v1/user/update-password
Update User Info: http://localhost:5000/api/v1/user/update-info
Forget Password: http://localhost:5000/api/v1/user/forget-password
Reset Password: http://localhost:5000/api/v1/user/reset-password


### Transaction Routes
Add transaction: http://localhost:5000/api/v1/transaction
Delete transaction: http://localhost:5000/api/v1/transaction/:id
Get all transaction (type, category, from_date, to_date, title, pagination): http://localhost:5000/api/v1//transaction/?t=wa&ty=INCOME&c=mymusic&fd=2025-07-20T10:26:40.766Z&td=2025-07-20T10:40:40.766Z&limit=10&page=1
Get transaction by id: http://localhost:5000/api/v1/transaction/:id
Edit transaction: http://localhost:5000/api/v1/transaction/:id


### Category Routes
Add Category: http://localhost:5000/api/v1/category
Edit Category: http://localhost:5000/api/v1/category/:id
Delete Category: http://localhost:5000/api/v1/category/:id
Get all Category: http://localhost:5000/api/v1/category
Get Category by id: http://localhost:5000/api/v1/category/:id
Get all category Icons: http://localhost:5000/api/v1/category/icon-list