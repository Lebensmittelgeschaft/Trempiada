import * as mongoose from 'mongoose';
import { User } from './user.model';
import { IUser } from './user.interface';

export class userRepository {
  
  static getAll(conditions?: Object, select?: string, populate?: Object[]) {
    return User.find(conditions || {}, select || {}).populate(populate || {});
  }

  static getOneByProps(conditions: Object, populate?: Object[], select?: string) {
    return User.findOne(conditions, select || {}).populate(populate || {});
  }

  static save(user: IUser) {
    return user.save();
  }

  static deleteById(id: string, populate?: Object[]) {
    return User.findByIdAndRemove(id).populate(populate || {});
  }

  static updateById(id: string, update: Object, populate?: Object[]) {
    return User.findByIdAndUpdate(id, update, { new: true }).populate(populate || {});
  }
}
