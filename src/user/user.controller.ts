import { userService } from './user.service';
import { INotification } from '../notification/notification.interface';
import { IRide } from '../ride/ride.interface';
import { IUser } from './user.interface';
import { rideService } from '../ride/ride.service';

export class userController {

  static getAll() {
    return userService.getAll({ isDeleted: false });
  }

  static getById(id: string) {
    return userService.getOneByProps({ _id: id });
  }

  static create(user: IUser) {
    return userService.create(user);
  }

  static updateById(id: string, update: any) {
    return userService.updateById(id, update);
  }

  static deleteById(id: string) {
    return this.updateById(id, { isDeleted: true });
  }

  static getRides(id: string) {
    const rides = rideService.getAll({
      $or : [{ riders: { $elemMatch: { rider: id } } }, { driver: id }]
    });

    return rides;
  }

  static getActiveRides(id: string) {
    return this.getRides(id).find({departureDate: { $gte: new Date() }, isDeleted: false});
  }
}
