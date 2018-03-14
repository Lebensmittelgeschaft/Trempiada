import * as mongoose from 'mongoose';
import { user as User } from './user.model';
import { IUser } from './user.interface';

export class userRepository {
  static async getAll(conditions?: Object, populate?: Object[]) {
    try {
      let user : IUser[] | null = null;
      if (populate) {
        user = await User.find(conditions || {}).populate(populate);
      } else {
        user = await User.find(conditions || {});
      }

      return user;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async getOneByProps(conditions: Object, populate?: Object[]) {
    try {
      let user : IUser | null = null;
      if (populate) {
        user = await User.findOne(conditions).populate(populate);
      } else {
        user = await User.findOne(conditions);
      }

      return user;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async save(user: IUser) {
    try {
      return user.save();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async deleteByUsername(username: string, populate?: Object[]) {
    try {
      let user: IUser | null;
      if (populate) {
        user =  await User.findByIdAndRemove(username).populate(populate);
      } else {
        user = await User.findByIdAndRemove(username);
      }

      return user;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async updateByUsername(username: string,
                                update: Object,
                                populate?: Object[]) {
    try {
      let user: IUser | null;
      if (populate) {
        user =  await User.findOneAndUpdate({ username }, update, { new: true })
                .populate(populate);
      } else {
        user = await User.findOneAndUpdate({ username }, update, { new: true });
      }

      return user;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
