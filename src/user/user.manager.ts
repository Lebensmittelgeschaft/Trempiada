import * as mongoose from 'mongoose';
import { user as User } from './user.model';
import { IUser } from './user.interface';

export const userController = {
  getAll() {
    return User.find({}).then((res) => {
      return res;
    }).catch((err) => {
      return null;
    });
  },
  getById(id: string) {
    return User.findById(id).then((res) => {
      return res;
    }).catch((err) => {
      return null;
    });
  },
  save(user: IUser) {
    if (user && (typeof user._id !== 'string' ||
      typeof user.location !== 'string' ||
      typeof user.hasCar !== 'boolean')) {
      console.log(`Could not save user.`);
      return null;
    }

    return user.save().then((res) => {
      return res;
    }).catch((err) => {
      console.log(err);
      return null;
    });
  },
  deleteById(id: string) {
    return User.findByIdAndRemove(id).then((res) => {
      return res;
    }).catch((err) => {
      console.log(err);
      return null;
    });
  },
  updateById(id: string, user: Partial<IUser>) {
    return User.findByIdAndUpdate(id, user as Object, { new: true })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
};
