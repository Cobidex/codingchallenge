import { config } from 'dotenv';
import express from 'express';
import getMovies from '../controllers/movieController.js';

config();
const movieRouter = express.Router();

movieRouter.route('/').get(getMovies);

export default movieRouter;
