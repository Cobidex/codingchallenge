import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import morgan from 'morgan';
import movieRouter from './routes/movieRoutes.js';
import globalErrorHandling from './errors/errorHandler.js';
import foodTrucksRouter from './routes/foodTruckRoutes.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Expres API for movies-foodtruck',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from third party APIs.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

const app = express();

app.use(cors());

app.set('trust proxy', 3);

app.use(limiter);

app.use(morgan('tiny'));
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/foodtrucks', foodTrucksRouter);

app.use(globalErrorHandling);
export default app;
