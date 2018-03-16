import { userService } from './user.service';

export class userController {
  static getAll() {
    return userService.getAll(undefined, undefined, 'rides.ride notifications');
  }
}
