import { User } from '../../domain/entities/User.js';
import { UserRepository } from '../../domain/interfaces/UserRepository.js';
import { UserModel, UserModelInterface } from '../models/UserModel.js';

export class MongoUserRepository implements UserRepository {
	async findAll(): Promise<User[]> {
		const users = await UserModel.find().lean<UserModelInterface[]>();
		return users.map(
			(user) =>
				new User(
					user._id.toString(),
					user.googleId,
					user.name,
					user.email,
					user.createdAt // Säkerställ att detta är Date
				)
		);
	}

	async findByGoogleId(googleId: string): Promise<User | null> {
		const user = await UserModel.findOne({
			googleId,
		}).lean<UserModelInterface | null>();
		if (!user) return null;

		return new User(
			user._id.toString(),
			user.googleId,
			user.name,
			user.email,
			user.createdAt // Typen är Date
		);
	}

	async create(user: User): Promise<User> {
		const newUser = new UserModel({
			name: user.name,
			email: user.email,
			createdAt: user.createdAt, // Rätt typ: Date
			googleId: user.googleId,
		});

		const savedUser = await newUser.save();

		return new User(
			savedUser._id.toString(), // Konverterar ObjectId till string
			savedUser.googleId,
			savedUser.name,
			savedUser.email,
			savedUser.createdAt // Ska vara av typen Date
		);
	}

	async update(user: User): Promise<User | null> {
		const updatedUser = (await UserModel.findByIdAndUpdate(
			user.id,
			{
				name: user.name,
				email: user.email,
				googleId: user.googleId,
			},
			{ new: true }
		)) as UserModelInterface | null; // Lägg till lean

		if (!updatedUser) return null;

		return new User(
			updatedUser._id.toString(),
			updatedUser.googleId,
			updatedUser.name,
			updatedUser.email,
			updatedUser.createdAt
		);
	}

	async delete(id: string): Promise<void> {
		await UserModel.findByIdAndDelete(id);
	}
}
