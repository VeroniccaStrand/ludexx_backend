import { CreateUserUseCase } from '../usecases/user/CreateUserUseCase.js';
import { MongoUserRepository } from './repositories/MongoUserRepository.js';

class DIContainer {
	private static _userRepository = new MongoUserRepository();

	static getUserRepository() {
		return this._userRepository;
	}

	static getCreateUserUseCase() {
		return new CreateUserUseCase(this.getUserRepository());
	}
}

export { DIContainer };
