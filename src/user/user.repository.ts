import * as mongoose from 'mongoose';
import { user as User } from './user.model';
import { IUser } from './user.interface';

export class userRepository {
  static async getAll(conditions?: Object, select?: string, populate?: Object[]) {
    return await User.find(conditions || {}, select || {}).populate(populate || {});
  }

  static async getOneByProps(conditions: Object, populate?: Object[], select?: string) {

    return await User.findOne(conditions, select || {}).populate(populate || {});
  }

  static async save(user: IUser) {
    return user.save();
  }

  static async deleteByUsername(username: string, populate?: Object[]) {
    return await User.findByIdAndRemove(username).populate(populate || {});
  }

  static async updateByUsername(username: string,
                                update: Object,
                                populate?: Object[]) {
    return await User.findOneAndUpdate({ username }, update, { new: true }).populate(populate || {});
  }
}
