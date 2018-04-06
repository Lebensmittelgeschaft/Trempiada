import { userService } from './user.service';
import { INotification } from '../notification/notification.interface';
import { IRide } from '../ride/ride.interface';
import { IUser } from './user.interface';
import { rideService } from '../ride/ride.service';
import { Ride } from '../ride/ride.model';
import { DocumentQuery, Query } from 'mongoose';

export class userController {

  /**
   * Returns all undeleted users.
   */
  static getAll() {
    return userService.getAll({ isDeleted: false });
  }

  /**
   * Returns a specific user by id.
   * @param id User id
   */
  static getById(id: string) {
    return userService.getOneByProps({ _id: id });
  }

  /**
   * Creates a new user in the database.
   * @param user User to save
   */
  static create(user: IUser) {
    return userService.create(user);
  }

  /**
   * Updates a user.
   * @param id User id
   * @param update The updated user
   */
  static updateById(id: string, update: any) {
    return userService.updateById(id, update);
  }

  /**
   * Marks a user as deleted.
   * @param id User id
   */
  static deleteById(id: string) {
    return this.updateById(id, { isDeleted: true });
  }

  /**
   * Returns all rides of a user, where he's either the driver of that ride
   * or a rider in that ride.
   * @param id User id
   */
  static getRides(id: string, select?: string) {
    const condition = {
      $or : [{ riders: { $elemMatch: { rider: id } } }, { driver: id }]
    };
    return [rideService.getAll(condition, undefined, select), Ride.count(condition)];
  }

  /**
   * Returns all active rides of a user, where he's either the driver of that ride
   * or a rider in that ride.
   * @param id User id
   */
  static getActiveRides(id: string, select?: string) {
    const condition = {
      departureDate: { $gte: new Date() }, isDeleted: false,
      $or : [{ riders: { $elemMatch: { rider: id } } }, { driver: id }]
    };
    
    return [rideService.getAll(condition, undefined, select), Ride.count(condition)];
  }
}
