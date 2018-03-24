import { Types } from 'mongoose';
import { INotification } from './notification.interface';
import { Notification } from './notification.model';

export class notificationRepository {
  static getAll(conditions?: any, populate?: any, select?: string) {
    if (populate) {
      return Notification.find(conditions || {}, select || {}).populate(populate);
    }

    return Notification.find(conditions || {}, select || {});
  }

  static getOneByProps(conditions: any, populate?: any, select?: string) {
    if (populate) {
      return Notification.findOne(conditions, select || {}).populate(populate);
    }

    return Notification.findOne(conditions, select || {});
  }

  static save(notification: INotification) {
    return notification.save();
  }

  static deleteById(id: Types.ObjectId, populate?: any) {
    if (populate) {
      return Notification.findByIdAndRemove(id).populate(populate);
    }

    return Notification.findByIdAndRemove(id);
  }

  static updateById(id: Types.ObjectId, update: any, populate?: any) {
    if (populate) {
      return Notification.findByIdAndUpdate(id, update, { new: true }).populate(populate);
    }

    return Notification.findByIdAndUpdate(id, update, { new: true });
  }
}
