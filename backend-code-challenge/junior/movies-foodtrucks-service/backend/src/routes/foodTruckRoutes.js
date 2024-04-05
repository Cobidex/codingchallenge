import { config } from 'dotenv';
import express from 'express';
import getFoodTrucks from '../controllers/foodTrucksController.js';

config();
const foodTrucksRouter = express.Router();

/** GET Methods */
/**
 * @openapi
 * '/api/v1/foodtrucks/?longitude={value}&latitude={value}':
 *  get:
 *     tags:
 *     - foodtrucks Controller
 *     summary: retrieves food truck in proximity radius
 *     querry strings:
 *      content:
 *        application/json:
 *           schema:
 *            type: string
 *            required:
 *              - latitude
 *              - longitude
 *            properties:
 *              latitude:
 *                type: string
 *              longitude:
 *                type: string
 *     responses:
 *      200:
 *        description: foodtrucks retrieved
 *      404:
 *        description: no foodtruck found
 *      500:
 *        description: data source unavailable
 */
foodTrucksRouter.route('/').get(getFoodTrucks);

export default foodTrucksRouter;
