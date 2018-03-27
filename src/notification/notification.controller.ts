import { Types } from 'mongoose';
import { notificationService } from './notification.service';
import { INotification } from './notification.interface';
import { User } from '../user/user.model';

export class notificationController {
  static save(notificaiton: INotification) {
    return notificationService.save(notificaiton);
  }

  static getAll() {
    return notificationService.getAll({ isRead: false }, { path: 'user', model: User });
  }

  static getById(id: Types.ObjectId) {
    return notificationService.getOneByProps({ _id: id, isRead: false },
      { path: 'user', model: User });
  }

  static deleteById(id: Types.ObjectId) {
    return this.updateById(id, { isRead: true });
  }

  static updateById(id: Types.ObjectId, update: any) {
    return notificationController.updateById(id, update);
  }

  static getUserNotifications(id: string) {
    return notificationService.getAll({ user: id, isRead: false });
  }
}
