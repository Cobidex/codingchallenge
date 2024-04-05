import { config } from 'dotenv';
import express from 'express';
import getMovies from '../controllers/movieController.js';

config();
const movieRouter = express.Router();

movieRouter.route('/movies').get(getMovies);

//movieRouter.route('/movies/search').get(searchMovies);

//movieRouter.route('/movies/:id').get(getMovieById);

export default movieRouter;
