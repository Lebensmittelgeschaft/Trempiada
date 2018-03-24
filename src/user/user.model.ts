import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    job: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  });

const user = model<IUser>('User', userSchema);
export { user as User };
