import * as mongoose from 'mongoose';
import { userRepository } from './user.repository';
import { INotification } from '../notification/notification.interface';

export class userController {
  static getAllUsers() {
    return userRepository.getAll(undefined, undefined, 'rides.ride');
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

  static async getActiveRides(id: string) {
    const userRides = await userRepository.getOneByProps({ _id: id },
      { path: 'rides.ride', model: 'Ride', match: { active: true } }, '-_id rides');
    if (userRides) {
      return userRides.rides.filter((e) => { return e.ride != null; });
    }
  }
}
