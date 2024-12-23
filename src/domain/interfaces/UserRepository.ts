import { User } from '../entities/User.js';

export interface UserRepository {
	findAll(): Promise<User[]>;

	findByGoogleId(googleId: string): Promise<User | null>;
	create(user: Omit<User, 'id'>): Promise<User>;
	update(user: User): Promise<User | null>;
	delete(id: string): Promise<void>;
}
