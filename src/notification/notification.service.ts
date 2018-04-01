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
    if (populate) {
      return Notification.find(conditions || {}, select || {}).populate(populate);
    }

    return Notification.find(conditions || {}, select || {});
  }

  /**
   * Returns a single notification.
   * @param conditions Query conditions
   * @param populate Paths to populate
   * @param select Paths to select
   */
  static getOneByProps(conditions: any, populate?: any, select?: string) {
    if (populate) {
      return Notification.findOne(conditions, select || {}).populate(populate);
    }

    return Notification.findOne(conditions, select || {});
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
    if (populate) {
      return Notification.findByIdAndUpdate(id, update, { new: true }).populate(populate);
    }

    return Notification.findByIdAndUpdate(id, update, { new: true });
  }
}
