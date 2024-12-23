import { User } from '../../domain/entities/User.js';
import { UserRepository } from '../../domain/interfaces/UserRepository.js';
import { AppError } from '../../interface/middlewares/errorHandler.js';
import { CreateUserDTO } from './userDtos/CreateUserDTO.js';

export class CreateUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(data: CreateUserDTO): Promise<User> {
		// Kontrollera om användaren redan finns
		const existingUser = await this.userRepository.findByGoogleId(
			data.googleId
		);

		if (existingUser) {
			throw new AppError('User already exists', 409); // 409 Conflict
		}

		// Skapa ny användare
		const user = new User(
			'', // Placeholder för id (skapas av databasen)
			data.name,
			data.email,
			data.googleId,
			new Date()
		);
		return this.userRepository.create(user);
	}
}
