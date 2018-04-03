import { Types } from 'mongoose';
import { INotification } from './notification.interface';
import { Notification } from './notification.model';
import { User } from '../user/user.model';

export class notificationService {

  /**
   * Returns all notifications.
   * @param conditions Query conditions
   * @param populate Paths to populate
   * @param select Paths to select
   */
  static getAll(conditions?: any, populate?: any, select?: string) {
    let notifications = Notification.find(conditions || {}, select || {});
    if (populate) {
      notifications.populate(populate);
    }

    return notifications;
  }

  /**
   * Returns a single notification.
   * @param conditions Query conditions
   * @param populate Paths to populate
   * @param select Paths to select
   */
  static getOneByProps(conditions: any, populate?: any, select?: string) {
    let notification = Notification.findOne(conditions, select || {});
    if (populate) {
      notification = notification.populate(populate);
    }

    return notification;
  }

  /**
   * Creates a notification.
   * @param notification Notification to create
   */
  static create(notification: INotification) {
    return notification.save();
  }

  /**
   * Marks a notification as deleted.
   * @param id Notification id
   */
  static deleteById(id: Types.ObjectId) {
    return Notification.findByIdAndRemove(id);
  }

   /**
   * Updates notification details by id.
   * @param id Notification id
   * @param update Updated notification
   * @param populate Paths to populate
   */
  static updateById(id: Types.ObjectId, update: any, populate?: any) {
    let notification = Notification.findByIdAndUpdate(id, update, { new: true });
    if (populate) {
      notification.populate(populate);
    }

    return notification;
  }
}
