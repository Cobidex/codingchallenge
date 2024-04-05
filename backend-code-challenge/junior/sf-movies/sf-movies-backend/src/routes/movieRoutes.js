import { config } from 'dotenv';
import express from 'express';
import getMovies from '../controllers/movieController.js';

config();
const movieRouter = express.Router();

movieRouter.route('/movies').get(getMovies);

export default movieRouter;
