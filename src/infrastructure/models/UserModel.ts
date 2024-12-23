import mongoose, { Schema, Document } from 'mongoose';

export interface UserModelInterface extends Document {
	name: string;
	email: string;
	createdAt: Date;
}

const UserSchema = new Schema<UserModelInterface>({
	name: { type: String, required: true },
	email: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model<UserModelInterface>('User', UserSchema);
