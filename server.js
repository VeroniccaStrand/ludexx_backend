import express from 'express';
import {
	AppError,
	globalErrorHandler,
} from './src/middlewares/errorHandler.js';
import { logger } from './src/utils/logger.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello Godby');
	
	
});



app.use(globalErrorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
