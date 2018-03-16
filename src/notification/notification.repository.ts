import * as mongoose from 'mongoose';
import { INotification } from './notification.interface';

export class notificationRepository {
  static save(notification: INotification) {
    return notification.save();
  }
}
