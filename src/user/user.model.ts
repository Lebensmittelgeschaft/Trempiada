import * as mongoose from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    hasCar: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false });

export const user = mongoose.model<IUser>('user', userSchema);
