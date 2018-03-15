import * as mongoose from 'mongoose';
import { User } from './user.model';
import { IUser } from './user.interface';
import { userRepository } from './user.repository';

export class userService {
  
  static getAll(conditions?: Object, select?: string, populate?: Object[]) {
    return userRepository.getAll(conditions, select, populate);
  }

  static save(user: IUser) {
    return userRepository.save(user);
  }

  static getUser(user: string, populate?: Object[], select?: string) {
    return userRepository.getOneByProps({ username: user }, populate, select);
  }

  static disableUser(user: string) {
    return userRepository.updateById(user, { active: false });
  }

  static addRide(user: string, ride: mongoose.Schema.Types.ObjectId) {
    return userRepository.updateById(user, { $push: { rides: {ride, joinDate: new Date()} } });
  }

  static removeRide(user: string, ride: mongoose.Schema.Types.ObjectId) {
    return userRepository.updateById(user, { $pull: { rides: { ride } } });
  }

  static async getActiveRides(user: string) {
    // Needs refactoring.
    const userRides = await this.getUser(user,
      [{ path: 'rides.ride', model: 'Ride', match: { active: true } }], 'rides');
    if (userRides) {
      return userRides.rides.filter((e) => { e.ride != null });
    }
  }
}
