import * as mongoose from 'mongoose';
import { INotification } from './notification.interface';
import { notificationRepository } from './notification.repository';

export class notificationService {
  static save(notification: INotification) {
    return notificationRepository.save(notification);
  }
}
