import mongoose, { Schema, Document } from 'mongoose';
import validator from 'validator';

export interface IUser extends Document {
  email: string;
  fullName: string;
  password: string;
  confirmed: boolean;
  avatar: string;
  confirm_hash?: string;
  last_seen?: Date;
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: 'Email address is required',
    validate: [ validator.isEmail, 'Invalid email' ],
    unique: true
  },
  fullName: {
      type: String,
      required: 'Fullname address is required',
  },
  password: {
      type: String,
      required: 'Password address is required',
  },
  confirmed: {
      type: Boolean,
      default: false,
  },
  avatar: String,
  confirm_hash: String,
  last_seen: Date
}, {
  timestamps: true,
  }
)

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;