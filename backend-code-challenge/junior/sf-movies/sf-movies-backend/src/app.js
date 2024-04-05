import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import morgan from 'morgan';
import movieRouter from './routes/movieRoutes.js';
import globalErrorHandling from './errors/errorHandler.js';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

const app = express();

app.use(cors());

app.set('trust proxy', 3);

app.use(limiter);

app.use(helmet.hidePoweredBy());

app.use(morgan('tiny'));
app.use(express.json());
app.use('/api/v1', movieRouter);

app.use(globalErrorHandling);
export default app;
