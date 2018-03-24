import { Types } from 'mongoose';
import { rideRepository } from './ride.repository';
import { IRide } from './ride.interface';

export class rideController {

  static getAllRides(select?: string) {
    return rideRepository.getAll({ isDeleted: false }, select, 'driver riders.rider');
  }

  static getActiveRides(select?: string) {
    return rideRepository.getAll({ 
      departureDate: { $gte: new Date() },
      isDeleted: false,
    }, select, 'driver riders.rider');
  }

  static getRide(id: Types.ObjectId) {
    return rideRepository.getOneByProps({ _id: id }, 'driver riders.rider');
  }

  static addRide(ride: IRide) {
    return rideRepository.save(ride);
  }

  static updateRide(id: Types.ObjectId, update: any) {
    return rideRepository.updateById(id, update, 'driver riders.rider');
  }

  static deleteRide(id: Types.ObjectId) {
    return rideRepository.deleteById(id);
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
