import * as mongoose from 'mongoose';
import { user as User } from './user.model';
import { IUser } from './user.interface';

export class userRepository {
  static async getAll(conditions?: Object, populate?: Object[]) {
    let user : IUser[] | null = null;
    if (populate) {
      user = await User.find(conditions || {}).populate(populate);
    } else {
      user = await User.find(conditions || {});
    }

    return user;
  }

  static async getOneByProps(conditions: Object, populate?: Object[], select?: string) {
    let user : IUser | null = null;
    user = await User.findOne(conditions, select || {}).populate(populate || {});

    return user;
  }

  static async save(user: IUser) {
    return user.save();
  }

  static async deleteByUsername(username: string, populate?: Object[]) {
    let user: IUser | null;
    if (populate) {
      user =  await User.findByIdAndRemove(username).populate(populate);
    } else {
      user = await User.findByIdAndRemove(username);
    }

    return user;
  }

  static async updateByUsername(username: string,
                                update: Object,
                                populate?: Object[]) {
    let user: IUser | null;
    if (populate) {
      user =  await User.findOneAndUpdate({ username }, update, { new: true })
              .populate(populate);
    } else {
      user = await User.findOneAndUpdate({ username }, update, { new: true });
    }

    return user;
  }
}
