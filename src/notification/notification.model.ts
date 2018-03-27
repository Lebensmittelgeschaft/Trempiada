import { Schema, model } from 'mongoose';
import { INotification } from './notification.interface';
import { userController } from '../user/user.controller';

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

notificationSchema.pre('validate', async function (this: INotification, next) {
  const user = await userController.getById(typeof this.user === 'string' ?
    this.user : this.user.id);
  if (user) {
    next();
  }

  next(new Error(`Bad request`));
});

notificationSchema.pre('save', function (this: INotification, next) {
  this.creationDate = new Date();
  next();
});

const notification = model<INotification>('Notification', notificationSchema);
export { notification as Notification };
