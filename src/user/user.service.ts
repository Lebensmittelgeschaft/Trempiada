import * as mongoose from 'mongoose';
import { User } from './user.model';
import { IUser } from './user.interface';
import { userRepository } from './user.repository';

export class userService {
  
  static getAll(conditions?: any, select?: string, populate?: any) {
    return userRepository.getAll(conditions, select, populate);
  }

  static save(user: IUser) {
    return userRepository.save(user);
  }

  static getById(id: string, populate?: any, select?: string) {
    return userRepository.getOneByProps({ _id: id }, populate, select);
  }

  static update(id: string, update: any, populate?: any) {
    return userRepository.updateById(id, update, populate);
  }

  static addRide(id: string, ride: mongoose.Types.ObjectId) {
    return userRepository.updateById(id, { $push: { rides: { ride, joinDate: new Date() } } });
  }

  static removeRide(id: string, ride: mongoose.Types.ObjectId) {
    return userRepository.updateById(id, { $pull: { rides: { ride } } });
  }

  static async getActiveRides(id: string) {
    // Should remove _id but doesn't do it.
    const userRides = await this.getById(id,
      { path: 'rides.ride', model: 'Ride', match: { active: true } }, '-_id rides');
    if (userRides) {
      return userRides.rides.filter((e) => { return e.ride != null; });
    }
  }
}
