import { Document } from 'mongoose';
import { IRide } from '../ride/ride.interface';
import { INotification } from '../notification/notification.interface';

export interface IUser extends Document {
  id: string;
  job: string;
  firstname: string;
  lastname: string;
  email: string;
  isDeleted?: boolean;
}
