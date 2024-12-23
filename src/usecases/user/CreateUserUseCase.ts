import { User } from '../../domain/entities/User.js';
import { UserRepository } from '../../domain/interfaces/UserRepository.js';
import { CreateUserDTO } from './userDtos/CreateUserDTO.js';

export class CreateUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(data: CreateUserDTO): Promise<User> {
		const user = new User(data.id, data.name, data.email);
		return this.userRepository.create(user);
	}
}
