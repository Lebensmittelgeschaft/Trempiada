import { Document, Types } from 'mongoose';

export interface INotification extends Document {
  id: Types.ObjectId;
  user: string;
  content: string;
  isRead?: boolean;
  creationDate: Date;
}
