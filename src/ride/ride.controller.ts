import { Types } from 'mongoose';
import { rideRepository } from './ride.repository';
import { IRide } from './ride.interface';
import { notificationController } from '../notification/notification.controller';
import { Notification } from '../notification/notification.model';
import { IUser } from '../user/user.interface';

export class rideController {

  static getAll(select?: string) {
    return rideRepository.getAll({
      departureDate: { $gte: new Date() },
      isDeleted: false,
    }, select, 'driver riders.rider');
  }

  static getById(id: Types.ObjectId, select?: string) {
    return rideRepository.getOneByProps({ _id: id }, 'driver riders.rider', select);
  }

  static save(ride: IRide) {
    return rideRepository.save(ride);
  }

  static updateById(id: Types.ObjectId, update: any) {
    return rideRepository.updateById(id, update, 'driver riders.rider');
  }

  static deleteById(id: Types.ObjectId) {
    return rideRepository.deleteById(id);
  }

  static async cancelRide(id: Types.ObjectId) {
    const ride = await this.getById(id);
    if (ride) {
      await this.deleteById(id);
      await Promise.all(ride.riders.map(r => <IUser>r.rider).map(async (rider) => {
        await notificationController.save(new Notification({
          user: rider.id,
          content: `נסיעתך מ ${ride.from} אל ${ride.to}
            בשעה ${ride.departureDate} בוטלה על ידי הנהג.`,
          creationDate: new Date(),
        }));
      }));
    }
  }

  static addRider(rideid: Types.ObjectId, userid: string) {
    return rideRepository.updateById(rideid,
                                     { $push: { riders: { rider: userid, joinDate: new Date() } } },
                                     'driver riders.rider');
  }

  static deleteRider(rideid: Types.ObjectId, userid: string) {
    return rideRepository.updateById(rideid,
                                     { $pull: { riders: { rider: userid } } },
                                     'driver riders.rider');
  }

  static async getRiderActiveRides(id: string) {
    let rides = await rideRepository.getAll({
      departureDate: { $gte: new Date() }, isDeleted: false,
    }, { path: 'riders.rider', model: 'User', match: { _id: id } });

    if (rides) {
      rides = rides.filter((r) => {
        return r.riders.filter((rider) => {
          return rider.rider != null;
        }).length > 0;
      });
    }

    return rides;
  }

  static async getDriverActiveRides(id: string) {
    let rides = await rideRepository.getAll({
      driver: id, departureDate: { $gte: new Date() }, isDeleted: false,
    });

    if (rides) {
      rides = rides.filter((r) => {
        return r.riders.filter((rider) => {
          return rider.rider != null;
        }).length > 0;
      });
    }

    return rides;
  }
}
