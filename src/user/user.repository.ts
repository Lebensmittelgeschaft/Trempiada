import * as mongoose from 'mongoose';
import { User } from './user.model';
import { IUser } from './user.interface';

export class userRepository {
  static async getAll(conditions?: Object, select?: string, populate?: Object[]) {
    return await User.find(conditions || {}, select || {}).populate(populate || {});
  }

  static async getOneByProps(conditions: Object, populate?: Object[], select?: string) {
    return await User.findOne(conditions, select || {}).populate(populate || {});
  }

  static save(user: IUser) {
    return user.save();
  }

  static async deleteById(id: string, populate?: Object[]) {
    return await User.findByIdAndRemove(id).populate(populate || {});
  }

  static async updateById(id: string, update: Object, populate?: Object[]) {
    return await User.findByIdAndUpdate(id, update, { new: true }).populate(populate || {});
  }
}
