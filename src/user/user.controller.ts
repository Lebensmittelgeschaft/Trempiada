import * as mongoose from 'mongoose';
import { userRepository } from './user.repository';
import { INotification } from '../notification/notification.interface';
import { IRide } from '../ride/ride.interface';

export class userController {

  static getAllUsers() {
    return userRepository.getAll({ isDeleted: false });
  }

  static getUser(id: string) {
    return userRepository.getOneByProps({ _id: id, isDeleted: false });
  }

  static pushNotification(id: string, notificaiton: INotification) {
    return userRepository.updateById(id, { $push: { notificaitons: notificaiton } });
  }

  static getNotifications(id: string) {
    return userRepository.getOneByProps({ _id: id }, undefined, 'notifications');
  }

  static markNotificationRead(id: string, notificaiton: mongoose.Types.ObjectId) {
    return userRepository.updateById(id, {});
  }
}
