import { config } from 'dotenv';
import express from 'express';
import getFoodTrucks from '../controllers/foodTrucksController.js';

config();
const foodTrucksRouter = express.Router();

foodTrucksRouter.route('/').get(getFoodTrucks);

export default foodTrucksRouter;
