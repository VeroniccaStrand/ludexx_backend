import { AppError } from '../../../interface/middlewares/errorHandler.js';

export class CreateUserDTO {
	constructor(
		public name: string,
		public email: string,
		public googleId: string // Valfritt för manuella användare
	) {}

	// Validering av data
	static validate(data: any): CreateUserDTO {
		if (!data.name || typeof data.name !== 'string') {
			throw new AppError("Invalid or missing 'name'", 400);
		}
		if (!data.email || typeof data.email !== 'string') {
			throw new AppError("Invalid or missing 'email'", 400);
		}
		if (data.googleId && typeof data.googleId !== 'string') {
			throw new AppError("Invalid 'googleId'", 400);
		}
		return new CreateUserDTO(data.name, data.email, data.googleId);
	}
}
