import * as mongoose from 'mongoose';
import { userRepository } from './user.repository';
import { INotification } from '../notification/notification.interface';

export class userController {

  static getAllUsers() {
    return userRepository.getAll({ isDeleted: false }, undefined, 'rides.ride');
  }

  static getUser(id: string) {
    return userRepository.getOneByProps({ _id: id, isDeleted: false }, 'rides.ride');
  }
  
  static async getUserActiveRides(id: string) {
    const user = await userRepository.getOneByProps({ _id: id },
      { path: 'rides.ride', model: 'Ride', match: { departureDate: { $gte: new Date() }, isDeleted: false } });
    if (user) {
      user.rides = user.rides.filter((e) => { return e.ride != null; });
      return user;
    }
  }

  static pushNotification(id: string, notificaiton: INotification) {
    return userRepository.updateById(id, { $push: { notificaitons: notificaiton } });
  }

  static addRide(id: string, ride: mongoose.Types.ObjectId) {
    return userRepository.updateById(id, { $push: { rides: { ride, joinDate: new Date() } } });
  }

  static removeRide(id: string, ride: mongoose.Types.ObjectId) {
    return userRepository.updateById(id, { $pull: { rides: { ride } } });
  }

  static getNotifications(id: string) {
    return userRepository.getOneByProps({ _id: id }, undefined, 'notifications');
  }

  static markNotificationRead(id: string, notificaiton: mongoose.Types.ObjectId) {
    return userRepository.updateById(id, {});
  }
}
