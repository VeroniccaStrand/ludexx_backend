import { AppError } from '../../../interface/middlewares/errorHandler.js';

export class CreateUserDTO {
	constructor(
		public id: string,
		public name: string,
		public email: string
	) {}

	static validate(data: any): CreateUserDTO {
		if (!data.id || typeof data.id !== 'string') {
			throw new AppError("Invalid or missing 'id'", 400);
		}
		if (!data.name || typeof data.name !== 'string') {
			throw new AppError("Invalid or missing 'name'", 400);
		}
		if (!data.email || typeof data.email !== 'string') {
			throw new AppError("Invalid or missing 'email'", 400);
		}
		return new CreateUserDTO(data.id, data.name, data.email);
	}
}
