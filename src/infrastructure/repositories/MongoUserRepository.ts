import { User } from '../../domain/entities/User.js';
import { UserRepository } from '../../domain/interfaces/UserRepository.js';
import { UserModel } from '../models/UserModel.js';

export class MongoUserRepository implements UserRepository {
	async findAll(): Promise<User[]> {
		const users = await UserModel.find();
		return users.map(
			(user) => new User(user.id, user.name, user.email, user.createdAt)
		);
	}

	async findById(id: string): Promise<User | null> {
		const user = await UserModel.findById(id);
		if (!user) return null;
		return new User(user.id, user.name, user.email, user.createdAt);
	}

	async create(user: User): Promise<User> {
		const newUser = new UserModel(user);
		await newUser.save();
		return new User(newUser.id, newUser.name, newUser.email, newUser.createdAt);
	}

	async update(user: User): Promise<User | void> {
		await UserModel.findByIdAndUpdate(user.id, user, { new: true });
	}

	async delete(id: string): Promise<void> {
		await UserModel.findByIdAndDelete(id);
	}
}
