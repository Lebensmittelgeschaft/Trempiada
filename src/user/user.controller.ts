import { userService } from './user.service';
import { INotification } from '../notification/notification.interface';
import { IRide } from '../ride/ride.interface';
import { IUser } from './user.interface';

export class userController {

  static getAll() {
    return userService.getAll({ isDeleted: false });
  }

  static getById(id: string) {
    return userService.getOneByProps({ _id: id });
  }

  static save(user: IUser) {
    return userService.save(user);
  }

  static updateById(id: string, update: any) {
    return userService.updateById(id, update);
  }

  static deleteById(id: string) {
    return this.updateById(id, { isDeleted: true });
  }
}
