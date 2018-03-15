import * as mongoose from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new mongoose.Schema(
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
    rides: [{
      ride: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ride',
        required: true,
      },
      joinDate: { 
        type: Date,
        required: true,
      },
    }],
    email: {
      type: String,
      required: true,
    },
    notifications: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Notification',
      required: true,
    }],
    active: {
      type: Boolean,
      required: true,
    },
  });

const user = mongoose.model<IUser>('User', userSchema);
export { user as User};
