import * as mongoose from 'mongoose';
import { IRide } from '../ride/ride.interface';
import { INotification } from '../notification/notification.interface';

export interface IUser extends mongoose.Document {
  id: string;
  job: string;
  firstname: string;
  lastname: string;
  email: string;
  notifications: INotification[];
  isDeleted?: boolean;
}
