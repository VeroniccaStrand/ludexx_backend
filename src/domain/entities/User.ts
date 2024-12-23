export class User {
	constructor(
		public id: string,
		public googleId: string,
		public name: string,
		public email: string,
		public createdAt: Date
	) {}
}
