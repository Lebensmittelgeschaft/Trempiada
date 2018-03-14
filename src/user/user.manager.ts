import * as mongoose from 'mongoose';
import { user as User } from './user.model';
import { IUser } from './user.interface';

export class userController {
  static getAll(conditions?: Object) {
    return User.find(conditions || {})
    .then((res) => {
      return res;
    }).catch((err) => {
      console.error(err);
      throw err;
    });
  }

  // TODO: Check this function works as intended
  static getOneByConditions(conditions: Object) {
    return User.findOne(conditions).populate({
      path: 'rides',
      model: 'Ride',
      populate: {
        path: 'ride.driver',
        model: 'User',
      },
    })
    .then((res) => {
      return res;
    }).catch((err) => {
      console.log(err);
      throw err;
    });
  }

  static getByUsername(username: string) {
    return this.getOneByConditions({ username });
  }
  
  static save(user: IUser) {
    return user.save()
    .then((res) => {
      return res;
    }).catch((err) => {
      console.error(err);
      throw err;
    });
  }

  static deleteByUsername(username: string) {
    return User.findByIdAndRemove(username)
    .then((res) => {
      return res;
    }).catch((err) => {
      console.error(err);
      throw err;
    });
  }

  static updateByUsername(username: string, user: Partial<IUser>) {
    return User.findOneAndUpdate({ username }, user as Object, { new: true })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }
}
