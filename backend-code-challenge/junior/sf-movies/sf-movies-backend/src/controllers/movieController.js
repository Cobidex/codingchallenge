import axios from 'axios';
import catchAsync from '../errors/catchAsync.js';

const getMovies = catchAsync(async (req, res, next) => {
  const response = await axios.get(process.env.MOVIES_URL);

  const { title } = req.query;

  if (!response) {
    return res
      .status(500)
      .json({ status: 'error', error: 'data source unavailable' });
  }

  let { data } = response;

  if (title) {
    data = data.filter((movie) =>
      movie.title.toLowerCase().includes(title.toLowerCase()),
    );
  }

  if (data.length === 0) {
    return res
      .status(404)
      .json({ status: 'error', error: 'no data available' });
  }

  data = data.map((movie) => ({
    title: movie.title,
    locations: movie.locations,
    release_year: movie.release_year,
  }));

  return res.status(200).json({ status: 'success', data });
});

export default getMovies;
