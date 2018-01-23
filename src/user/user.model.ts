import * as mongoose from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new mongoose.Schema(
  {
    _id: String,
    address: String,
    hasCar: Boolean,
  },
  { _id: false });

export const user = mongoose.model<IUser>('user', userSchema);
