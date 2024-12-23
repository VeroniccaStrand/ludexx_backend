import { Request, Response, NextFunction } from 'express';
import { DIContainer } from '../../infrastructure/DIContainer.js';
import { CreateUserDTO } from '../../usecases/user/userDtos/CreateUserDTO.js';
import { AppError } from '../middlewares/errorHandler.js';

export class UserController {
	private createUser = DIContainer.getCreateUserUseCase();

	async create(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			// Validera inkommande data med DTO
			const validatedData = CreateUserDTO.validate(req.body);

			// Skicka vidare validerad data till UseCase
			const user = await this.createUser.execute(validatedData);
			res.status(201).json({ success: true, data: user });
		} catch (err) {
			if (err instanceof AppError) {
				return next(err);
			}

			next(err);
		}
	}
}
