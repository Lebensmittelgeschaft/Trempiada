import * as mongoose from 'mongoose';
import { IRide } from '../ride/ride.interface';

export interface IUser extends mongoose.Document {
  id: string;
  job: string;
  firstname: string;
  lastname: string;
  rides: {
    ride: mongoose.Types.ObjectId | IRide,
    joinDate: Date,
  }[];
  email: string;
  notifications: mongoose.Types.ObjectId[];
  active: boolean;
}
