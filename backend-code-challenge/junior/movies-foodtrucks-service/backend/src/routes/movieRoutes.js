import { config } from 'dotenv';
import express from 'express';
import getMovies from '../controllers/movieController.js';

config();
const movieRouter = express.Router();

/** GET Methods */
/**
 * @openapi
 * '/api/v1/movies/?title={value}':
 *  get:
 *     tags:
 *     - movies Controller
 *     summary: retrieves food truck in proximity radius
 *     querry strings:
 *      content:
 *        application/json:
 *           schema:
 *            type: string
 *            required:
 *              - title
 *     responses:
 *      200:
 *        description: foodtrucks retrieved
 *      404:
 *        description: no data available
 *      500:
 *        description: data source unavailable
 */
movieRouter.route('/').get(getMovies);

export default movieRouter;
