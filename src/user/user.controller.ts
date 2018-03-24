import { userRepository } from './user.repository';
import { INotification } from '../notification/notification.interface';
import { IRide } from '../ride/ride.interface';
import { IUser } from './user.interface';

export class userController {

  static getAll() {
    return userRepository.getAll({ isDeleted: false });
  }

  static getById(id: string) {
    return userRepository.getOneByProps({ _id: id, isDeleted: false });
  }

  static save(user: IUser) {
    return userRepository.save(user);
  }

  static updateById(id: string, update: any) {
    return userRepository.updateById(id, update);
  }

  static deleteById(id: string) {
    return this.updateById(id, { isDeleted: true });
  }
}
