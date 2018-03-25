import { Types } from 'mongoose';
import { notificationRepository } from './notification.repository';
import { INotification } from './notification.interface';

export class notificationController {
  static save(notificaiton: INotification) {
    return notificationRepository.save(notificaiton);
  }

  static getAll() {
    return notificationRepository.getAll({ isRead: false }, 'user');
  }

  static getById(id: Types.ObjectId) {
    return notificationRepository.getOneByProps({ _id: id, isRead: false }, 'user');
  }

  static deleteById(id: Types.ObjectId) {
    return this.updateById(id, { isRead: true });
  }

  static updateById(id: Types.ObjectId, update: any) {
    return notificationController.updateById(id, update);
  }

  static getUserNotifications(id: string) {
    return notificationRepository.getAll({ user: id, isRead: false });
  }
}
