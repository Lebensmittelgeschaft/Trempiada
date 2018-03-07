import * as mongoose from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new mongoose.Schema(
  {
    username: {
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
    rides: [{
      ride: mongoose.Schema.Types.ObjectId,
      joinDate: Date,
      required: true,
    }],
    email: {
      type: String,
      required: true,
    },
    notifications: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    }],
    active: {
      type: Boolean,
      required: true,
    },
  });

export const user = mongoose.model<IUser>('User', userSchema);
