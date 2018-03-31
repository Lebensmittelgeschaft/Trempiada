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

  static getById(id: Types.ObjectId, select?: string) {
    return rideService.getOneByProps({ _id: id },
      { path: 'driver riders.rider', model: User }, select);
  }

  static async create(ride: IRide) {
    const closeRides = await rideService.getAll({
      departureDate: { 
        $gte: new Date(ride.departureDate.getTime() - 30 * constants.MINUTES_IN_MILISECONDS),
        $lte: new Date(ride.departureDate.getTime() + 30 * constants.MINUTES_IN_MILISECONDS),
      },
      isDeleted: false,
      $or : [{ riders: { $elemMatch: { rider: ride.driver } } },
        { driver: ride.driver }], 
    });

    return (closeRides.length === 0) ? rideService.create(ride) : null;
  }

  static updateById(id: Types.ObjectId, update: any) {
    // TODO: Check that the user who made the request is the ride's driver.
    return rideService.updateById(id, update, { path: 'driver riders.rider', model: User });
  }

  static deleteById(id: Types.ObjectId) {
    // TODO: Check that the user who made the request is the ride's driver.
    return rideService.deleteById(id);
  }

  static async cancelRide(id: Types.ObjectId) {
    // TODO: Check that the user who made the request is the ride's driver.
    const ride = await this.deleteById(id);
    if (ride) {
      await Promise.all(ride.riders.map(r => <IUser>r.rider).map((rider) => {
        notificationController.create(new Notification({
          user: rider.id,
          content: `נסיעתך מ ${(<IRide>ride).from} אל ${(<IRide>ride).to}
            בשעה ${(<IRide>ride).departureDate} בוטלה על ידי הנהג.`,
          creationDate: new Date(),
        }));
      }));
    }

    return ride;
  }

  static async addRider(rideid: Types.ObjectId, userid: string) {
    const ride = await this.getById(rideid);
    if (ride && !ride.isDeleted && ride.departureDate.getTime() > new Date().getTime()) {
      const userRides = await rideService.getAll({
        departureDate: { 
          $gte: new Date(ride.departureDate.getTime() - 30 * constants.MINUTES_IN_MILISECONDS),
          $lte: new Date(ride.departureDate.getTime() + 30 * constants.MINUTES_IN_MILISECONDS),
        },
        isDeleted: false,
        $or : [{ riders: { $elemMatch: { rider: userid } } },
          { driver: userid }], 
      });
      
      if (userRides.length === 0) {
        return rideService.updateById(rideid,
                                      { $push: { riders: { rider: userid, joinDate: new Date() } } },
                                      { path: 'driver riders.rider', model: User });
      }
    }

    return null;
  }

  static deleteRider(rideid: Types.ObjectId, userid: string) {
    return rideService.updateById(rideid,
                                  { $pull: { riders: { rider: userid } } },
                                  { path: 'driver riders.rider', model: User });
  }
}
