import * as mongoose from 'mongoose';
import { IRide } from '../ride/ride.interface';
import { INotification } from '../notification/notification.interface';

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
  notifications: INotification[];
  isDeleted?: boolean;
}
