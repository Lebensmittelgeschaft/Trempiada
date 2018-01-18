import * as mongoose from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new mongoose.Schema(
  {
    _id: String,
    location: String,
    hasCar: Boolean,
  },
  { _id: false });

export const user = mongoose.model<IUser>('user', userSchema);
