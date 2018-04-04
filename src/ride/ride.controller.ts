import { Types } from 'mongoose';
import { rideService } from './ride.service';
import { IRide } from './ride.interface';
import { notificationController } from '../notification/notification.controller';
import { Notification } from '../notification/notification.model';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { userController } from '../user/user.controller';
import { constants } from '../config';
import { Ride } from './ride.model';

export class rideController {

  /**
   * Returns all active and undeleted rides with populated fields.
   * Optionally return just a page of the rides.
   * @param page Page number
   * @param size Page size
   * @param select Fields selection of each ride
   */
  static getAll(page?: number, size?: number, search?: string, dateFilter?: Date, select?: string) {
    let condition: object = {
      //departureDate: { $gte: new Date() },
      //isDeleted: false,
      $where: "this.riders.length < this.maxRiders"
    };

    let populate: any = { path: 'driver', model: User };

    condition = { ...condition, ...this.generateSearchConditions(<string>search, <Date>dateFilter) };

    let rides = rideService.getAll(condition, populate, select);

    if (page !== undefined && size !== undefined && page >= 0 && size >= 0) {
      rides = rides.skip(page * size).limit(size);
    }

    return [rides.sort({ departureDate: 1}).exec(), Ride.count(condition).exec()];
  }

  /**
   * Returns a specific ride with populated fields by id.
   * @param id Ride id
   * @param select Field selection
   */
  static getById(id: Types.ObjectId, select?: string) {
    return rideService.getOneByProps({ _id: id },
      { path: 'driver riders.rider', model: User }, select);
  }

  /**
   * Creates a new ride in the database.
   * The driver has limited times he can be in a ride in the same day.
   * @param ride Ride to create
   */
  static async create(ride: IRide) {

    // Get all undeleted rides within range of 24 hours from the new ride's departure time
    // where the new ride's driver is either the driver or a rider in that ride.
    const closeRides = await rideService.getAll({
      departureDate: { 
        $gte: new Date(ride.departureDate.getTime() - constants.DAY_IN_MILLISECONDS / 2),
        $lte: new Date(ride.departureDate.getTime() + constants.DAY_IN_MILLISECONDS / 2),
      },
      isDeleted: false,
      $or : [{ riders: { $elemMatch: { rider: ride.driver } } },
        { driver: ride.driver }], 
    });

    // If there are no more than MAX_RIDES_PER_DAY rides, create a new ride in the database and return it.
    // otherwise return null.
    return (closeRides.length <= constants.MAX_RIDES_PER_DAY && ride.departureDate.getTime() > Date.now()) ? rideService.create(ride) : null;
  }

  /**
   * Updates a ride's details by id, returns the updated ride with populated fields.
   * @param id Ride id
   * @param update Updated ride
   */
  static updateById(id: Types.ObjectId, update: any) {
    return rideService.updateById(id, update, { path: 'driver riders.rider', model: User });
  }

  /**
   * Marks a ride as deleted.
   * @param id Ride id
   */
  static deleteById(id: Types.ObjectId) {
    return rideService.deleteById(id);
  }

  /**
   * Cancels a ride and sends a notification to each of its riders.
   * @param id Ride id
   */
  static async cancelRide(id: Types.ObjectId) {
    
    // Mark the ride as deleted.
    const ride = await this.deleteById(id);
    if (ride) {

      // Create a new notification for each rider of the canceled ride
      // that the ride was canceled.
      await Promise.all(ride.riders.map(r => <IUser>r.rider).map((rider) => {
        notificationController.create(new Notification({
          user: rider.id,
          content: `נסיעתך מ ${ride.from} אל ${ride.to}
            בשעה ${ride.departureDate} בוטלה על ידי הנהג.`,
        }));
      }));
    }

    return ride;
  }

  /**
   * Adds a rider to a ride.
   * The rider has limited times he can be in a ride in the same day.
   * @param rideid Ride id
   * @param userid User id
   */
  static async addRider(rideid: Types.ObjectId, userid: string) {

    // Get the ride by id, in condition that it's active
    // and the user isn't already in that ride.
    const ride = await rideService.getOneByProps({
      _id: rideid,
      isDeleted: false,
      departureDate: { $gte: new Date() },
      riders: { $not: { $elemMatch: { rider: userid } } },
      driver: { $ne: userid }
    });

    if (ride) {
      
      // Get all undeleted rides within range of 24 hours from the new ride's departure time
      // where the new rider is either the driver or a rider in that ride.
      const userRides = await rideService.getAll({
        departureDate: { 
          $gte: new Date(ride.departureDate.getTime() - constants.DAY_IN_MILLISECONDS / 2),
          $lte: new Date(ride.departureDate.getTime() + constants.DAY_IN_MILLISECONDS / 2),
        },
        isDeleted: false,
        $or : [{ riders:  { $elemMatch: { rider: userid } } },
          { driver: userid }], 
      });
      
      // If there are no more than MAX_RIDES_PER_DAY rides, push the rider to the ride's riders
      // collection and return the ride.
      if (userRides.length <= constants.MAX_RIDES_PER_DAY) {
        return rideService.updateById(rideid, {
          $push: { riders: { rider: userid, joinDate: new Date() } }
        });
      }
    }

    return null;
  }

  /**
   * Removes a rider from a ride.
   * @param rideid Ride id
   * @param userid User id
   */
  static removeRider(rideid: Types.ObjectId, userid: string) {
    return rideService.updateById(rideid, { $pull: { riders: { rider: userid } } });
  }

  private static generateSearchConditions(search: string, dateFilter: Date): Object {
    let basicFilter: any[] = [];
    let searchCaseInsensitiveRegex: RegExp = new RegExp(search, 'i');
    if (search && constants.NAME_REGEX.test(search)) {
      basicFilter.push({
        $or: [{
          from: searchCaseInsensitiveRegex
        }, {
          to: searchCaseInsensitiveRegex
        }]
      });
    }
    let departureDateSearch: Date;
    if (dateFilter && dateFilter.toDateString() !== 'Invalid Date') {
      basicFilter.push({
        departureDate: {
          $gte: new Date(dateFilter.getTime() - constants.QUARTER_HOUR_IN_MILLISECONDS),
          $lte: new Date(dateFilter.getTime() + constants.QUARTER_HOUR_IN_MILLISECONDS) }
      });
    }

    return basicFilter.length > 0 ? { $and: basicFilter } : {};
  }
}
