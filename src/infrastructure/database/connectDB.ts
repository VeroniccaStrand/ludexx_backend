import mongoose, { mongo } from 'mongoose';
import { logger } from '../logger.js';

const connectDB = async (): Promise<void> => {
	const mongoURI = process.env.MONGO_URI;

	if (!mongoURI) {
		logger.error('MONGO_URI is not defined in the enviroment variables');
		throw new Error('Database connection failed: Missing MONGO_URI');
	}

	try {
		await mongoose.connect(mongoURI);
		logger.info('Connected to MongoDB');
	} catch (error) {
		logger.error('Failed to connect to MongoDB, { error }');
		throw new Error('Database connection failed');
	}
};

export { connectDB };
