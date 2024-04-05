import { config } from 'dotenv';
import app from './app.js';

const envPath = new URL('../.env', import.meta.url).pathname;

config({ path: envPath });

process.on('uncaughtException', (err) => {
  console.log(err);
  console.log('UNCAUGHT EXCEPTION!!! * Shutting down ...');
  process.exit(1);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err);
  console.log('UNHANDLED REJECTION!!! * Shutting down ...');
  process.exit(1);
});
