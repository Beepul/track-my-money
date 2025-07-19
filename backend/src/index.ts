import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/error.middleware';
import mainRouter from './routes'
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/api/v1', mainRouter)
app.use('/api/v1/uploads', express.static(path.join(__dirname, '../', 'uploads')));

app.get('/api/v1/health', (req: Request, res: Response) => {
    res.json({
        result: null,
        message: "Server health 100%",
        meta: null
    })
})

// app.all("*", (req: Request, res: Response, next: NextFunction) => {
//   const err = new Error(`Route ${req.originalUrl} not found`) as any;
//   err.status = 404;
//   next(err);
// });


app.listen(port, () => {
    return console.log(`Server is running on http://localhost:${port}`);
});



app.use(errorHandler);