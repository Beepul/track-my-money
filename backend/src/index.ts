import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/error.middleware';
import mainRouter from './routes'
import path from 'path';
import multer from 'multer';
import prisma from './config/prisma.client';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1', mainRouter)
app.use('/api/v1/uploads', express.static(path.join(__dirname, '../', 'uploads')));

app.get('/api/v1/health', (_req: Request, res: Response) => {
    res.json({
        result: null,
        message: "Server health 100%",
        meta: null
    })
})

app.use((_req: Request, _res: Response, next: NextFunction) => {
    next({
        message: 'Route Not Found',
        status: 404,
    })
})

app.use((err: Error, _req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ message: `Multer error: ${err.message}` });
    return;
  }
  next(err); // pass non-multer errors down to errorHandler
});



app.use(errorHandler);

async function startServer() {
  try {
    await prisma.$connect();

    console.log("[DATABASE] Database connected successfully");

    app.listen(port, () => {
      console.log(`[SERVER] Server running on http://localhost:${port}`);
    });

  } catch (error) {
    console.error("[DB ERR] Database connection failed");
    console.error(error);
    process.exit(1);
  }
}

startServer();

// app.listen(port, () => {
//     return console.log(`Server is running on http://localhost:${port}`);
// });




