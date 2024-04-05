import axios from 'axios';
import catchAsync from '../errors/catchAsync.js';

const getFoodTrucks = catchAsync(async (req, res) => {
  const { latitude, longitude } = req.query;

  const url = `${process.env.FOODTRUCKS_URL}?$where=within_circle(location, ${latitude}, ${longitude}, ${process.env.RADIUS})`;

  const response = await axios.get(url);

  if (!response)
    return res
      .status(500)
      .json({ status: 'error', error: 'data source unavailable' });

  const { data } = response;

  if (data.length === 0)
    return res
      .status(404)
      .json({ status: 'error', error: 'no foodtruck found' });

  return res.status(200).json({ status: 'success', data });
});

export default getFoodTrucks;
