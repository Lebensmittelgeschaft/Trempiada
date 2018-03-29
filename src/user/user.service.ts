import { User } from './user.model';
import { IUser } from './user.interface';

export class userService {
  
  static getAll(conditions?: any, select?: string) {
    return User.find(conditions || {}, select || {});
  }

  static getOneByProps(conditions: any, select?: string) {
    return User.findOne(conditions, select || {});
  }

  static create(user: IUser) {
    return user.save();
  }

  static deleteById(id: string) {
    return User.findByIdAndRemove(id);
  }

  static updateById(id: string, update: any) {
    return User.findByIdAndUpdate(id, update, { new: true });
  }
}
