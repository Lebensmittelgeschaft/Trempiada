import * as mongoose from 'mongoose';
import { user as User } from './user.model';
import { IUser } from './user.interface';
import { userRepository } from './user.repository';

export class userController {
  static async addUser(user: IUser) {
    return await userRepository.save(user);
  }

  static async getUser(user: string, populate?: Object[], select?: string) {
    return userRepository.getOneByProps({ username: user }, populate, select);
  }

  static async disableUser(user: string) {
    return await userRepository.updateByUsername(user, { active: false });
  }

  static async addRide(user: string, ride: mongoose.Schema.Types.ObjectId) {
    return await userRepository.updateByUsername(user, { $push: { rides: ride } });
  }

  static async removeRide(user: string, ride: mongoose.Schema.Types.ObjectId) {
    return await userRepository.updateByUsername(user, { $pull: { rides: ride } });
  }

  static async getActiveRides(user: string) {
    const userRides = await this.getUser(user,
      [{ path: 'rides.ride', model: 'Ride', match: { active: true } }], 'rides');
    if (userRides) {
      return userRides.rides.filter((e) => { e.ride != null });
    }
  }
}
