import * as mongoose from 'mongoose';
import { user as User } from './user.model';
import { IUser } from './user.interface';

export const userController = {
  getAll() {
    return User.find({})
    .then((res) => {
      return res;
    }).catch((err) => {
      console.error(err);
      throw err;
    });
  },
  getByProp(prop: string, value: any) {
    return User.findOne({ prop: value })
    .then((res) => {
      return res;
    }).catch((err) => {
      console.log(err);
      throw err;
    });
  },
  getByUsername(username: string) {
    return this.getByProp('username', username);
  },
  save(user: IUser) {
    return user.save()
    .then((res) => {
      return res;
    }).catch((err) => {
      console.error(err);
      throw err;
    });
  },
  deleteByUsername(username: string) {
    return User.findByIdAndRemove(username)
    .then((res) => {
      return res;
    }).catch((err) => {
      console.error(err);
      throw err;
    });
  },
  updateByUsername(username: string, user: Partial<IUser>) {
    return User.findByIdAndUpdate(username, user as Object, { new: true })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  },
};
