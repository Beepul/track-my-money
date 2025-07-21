import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/error.middleware';
import mainRouter from './routes'
import path from 'path';

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


app.listen(port, () => {
    return console.log(`Server is running on http://localhost:${port}`);
});



app.use(errorHandler);

