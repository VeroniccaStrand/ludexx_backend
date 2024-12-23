import { User } from '../entities/User.js';

export interface UserRepository {
	create(user: User): Promise<User>;
	findById(id: string): Promise<User | null>;
	findAll(): Promise<User[]>;
	update(user: User): Promise<User | void>;
	delete(id: string): Promise<void>;
}
