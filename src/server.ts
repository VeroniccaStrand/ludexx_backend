import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import {
	AppError,
	globalErrorHandler,
} from './interface/middlewares/errorHandler.js';


const app = express();
dotenv.config();

const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello Goodby');
});

// Testendpoint för operationellt fel
app.get('/operational-error', (req: Request, res: Response, next: NextFunction) => {
  try {
    // Simulera ett operationellt fel
    throw new AppError('This is an operational error!', 400);
  } catch (err) {
    next(err); // Skicka vidare till felhanteraren
  }
});

// Testendpoint för icke-operationellt fel
app.get('/non-operational-error', (req: Request, res: Response, next: NextFunction) => {
  // Simulera ett icke-operationellt fel
  JSON.parse('Invalid JSON');
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
