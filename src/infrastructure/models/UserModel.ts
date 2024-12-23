import mongoose, { Schema, Document, Types } from 'mongoose';

export interface UserModelInterface extends Document {
	googleId: string;
	name: string;
	email: string;
	createdAt: Date;
	_id: Types.ObjectId;
}

const UserSchema = new Schema<UserModelInterface>({
	name: { type: String, required: true },
	email: { type: String, required: true },
	createdAt: { type: Date, required: true },
	googleId: { type: String, unique: true, sparse: true },
});

export const UserModel = mongoose.model<UserModelInterface>('User', UserSchema);
