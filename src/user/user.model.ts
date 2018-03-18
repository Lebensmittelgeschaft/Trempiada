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
    email: {
      type: String,
      required: true,
    },
    notifications: [{
      content: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      active: {
        type: Boolean,
        required: true,
      },
      creationDate: {
        type: Date,
        required: true,
      },
    }],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  });

const user = mongoose.model<IUser>('User', userSchema);
export { user as User };
