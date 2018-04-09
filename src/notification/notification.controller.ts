import { Types } from 'mongoose';
import { notificationService } from './notification.service';
import { INotification } from './notification.interface';
import { User } from '../user/user.model';

export class notificationController {

  /**
   * Returns all unread notifications with populated user field.
   */
  static getAll(populate?: any, select?: string) {
    return notificationService.getAll({ isRead: false }, populate, select);
  }

  /**
   * Returns a specific notification by id.
   * @param id Notification id
   */
  static getById(id: Types.ObjectId, select?: string) {
    return notificationService.getOneByProps({ _id: id },
      { path: 'user', model: User }, select);
  }

  /**
   * Creates a new notification in the database.
   * @param notificaiton Notification to save.
   */
  static create(notificaiton: INotification) {
    return notificationService.create(notificaiton);
  }

  /**
   * Marks a notification as read.
   * @param id Notification id
   */
  static markAsRead(id: Types.ObjectId) {
    return this.updateById(id, { isRead: true });
  }

  /**
   * Updates a notification.
   * @param id Notification id
   * @param update The updated notification
   */
  static updateById(id: Types.ObjectId, update: any) {
    return notificationService.updateById(id, update);
  }

  /**
   * Returns all notifications of a user.
   * @param id User id
   */
  static getUserNotifications(id: string) {
    return notificationService.getAll({ user: id, isRead: false }, undefined, '-__v');
  }
}
