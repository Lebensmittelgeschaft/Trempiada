import { Document, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export interface INotification extends Document {
  id: Types.ObjectId;
  user: string | IUser;
  content: string;
  isRead?: boolean;
  creationDate: Date;
}
