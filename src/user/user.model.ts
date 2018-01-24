import * as mongoose from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    hasCar: {
      type: Boolean,
      required: true,
    },
  });

export const user = mongoose.model<IUser>('User', userSchema);
