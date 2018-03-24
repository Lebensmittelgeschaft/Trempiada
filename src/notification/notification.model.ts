import { Schema, model } from 'mongoose';
import { INotification } from './notification.interface';

const notificationSchema = new Schema({
  user: {
    type: String,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

const notification = model<INotification>('Notification', notificationSchema);
export { notification as Notification };
