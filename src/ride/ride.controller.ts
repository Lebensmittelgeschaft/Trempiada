import { Types } from 'mongoose';
import { rideService } from './ride.service';
import { IRide } from './ride.interface';
import { notificationController } from '../notification/notification.controller';
import { Notification } from '../notification/notification.model';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { userController } from '../user/user.controller';
import { constants } from '../config';

export class rideController {

  /**
   * Returns all active and undeleted rides with populated fields.
   * Optionally return just a page of the rides.
   * @param page Page number
   * @param size Page size
   * @param select Fields selection of each ride
   */
  static getAll(page?: number, size?: number, select?: string) {
    let rides = rideService.getAll({
      departureDate: { $gte: new Date() },
      isDeleted: false,
    }, { path: 'driver riders.rider', model: User }, select);

    if(page && size && page > 0 && size > 0) {
      rides = rides.skip((page - 1) * size).limit(size)
    }

    return rides;
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
   * The driver mustn't be a driver or a rider in another ride
   * that is within a range of 30 minutes from this ride.
   * @param ride Ride to create
   */
  static async create(ride: IRide) {

    // Get all undeleted rides within 30 minutes range from the new ride's departure time
    // Where the new ride's driver is either the driver or a rider in that ride.
    const closeRides = await rideService.getAll({
      departureDate: { 
        $gte: new Date(ride.departureDate.getTime() - 30 * constants.MINUTES_IN_MILISECONDS),
        $lte: new Date(ride.departureDate.getTime() + 30 * constants.MINUTES_IN_MILISECONDS),
      },
      isDeleted: false,
      $or : [{ riders: { $elemMatch: { rider: ride.driver } } },
        { driver: ride.driver }], 
    });

    // If there are no such rides, create a new ride in the database and return it.
    // otherwise return null.
    return (closeRides.length === 0) ? rideService.create(ride) : null;
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
   * Rider mustn't be a driver or a rider in another ride
   * that is within a range of 30 minutes from this ride.
   * @param rideid Ride id
   * @param userid User id
   */
  static async addRider(rideid: Types.ObjectId, userid: string) {

    // Get the ride by id, in condition that it's active.
    const ride = await rideService.getOneByProps({ _id: rideid, isDeleted: false, departureDate: { $gte: new Date() } });
    if (ride) {
      // Get all undeleted rides that are within range of 30 minutes from this ride
      // and the new rider is either a driver or a rider in that ride.
      const userRides = await rideService.getAll({
        departureDate: { 
          $gte: new Date(ride.departureDate.getTime() - 30 * constants.MINUTES_IN_MILISECONDS),
          $lte: new Date(ride.departureDate.getTime() + 30 * constants.MINUTES_IN_MILISECONDS),
        },
        isDeleted: false,
        $or : [{ riders: { $elemMatch: { rider: userid } } },
          { driver: userid }], 
      });
      
      // If there are no such rides, push the rider to the ride's riders
      // collection and return the ride.
      if (userRides.length === 0) {
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
}
