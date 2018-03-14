import * as mongoose from 'mongoose';
import { INotification } from './notification.interface';


const notificationSchema = new mongoose.Schema({
  user: {
  	type: mongoose.Schema.Types.ObjectId,
  	required: true,
  },
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
});

export const notification = mongoose.model<INotification>('Notification', notificationSchema);
