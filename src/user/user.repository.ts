import { User } from './user.model';
import { IUser } from './user.interface';

export class userRepository {
  
  static getAll(conditions?: any, populate?: any, select?: string) {
    if (populate) {
      return User.find(conditions || {}, select || {}).populate(populate);
    }

    return User.find(conditions || {}, select || {});
  }

  static getOneByProps(conditions: any, populate?: any, select?: string) {
    if (populate) {
      return User.findOne(conditions, select || {}).populate(populate);
    }

    return User.findOne(conditions, select || {});
  }

  static save(user: IUser) {
    return user.save();
  }

  static deleteById(id: string, populate?: any) {
    if (populate) {
      return User.findByIdAndRemove(id).populate(populate);
    }

    return User.findByIdAndRemove(id);
  }

  static updateById(id: string, update: any, populate?: any) {
    if (populate) {
      return User.findByIdAndUpdate(id, update, { new: true }).populate(populate);
    }

    return User.findByIdAndUpdate(id, update, { new: true });
  }
}
