import * as mongoose from 'mongoose';
import { IRide } from './ride.interface';
import { ride as Ride } from './ride.model';
import { rideRepository } from './ride.repository';

export class rideService {
  static getAll(conditions?: Object, select?: string, populate?: Object[]) {
    return rideRepository.getAll(conditions, select, populate);
  }

  static save(ride: IRide) {
    return rideRepository.save(ride);
  }

  static addRide(ride: IRide) {
    return rideRepository.save(ride);
  }

  static getRide(ride: mongoose.Schema.Types.ObjectId, populate?: Object[], select?: string) {
    return rideRepository.getOneByProps({ _id: ride }, populate, select);
  }

  static disableRide(ride: mongoose.Schema.Types.ObjectId) {
    return rideRepository.updateById(ride, { active: false });
  }

  static addRider(rideid: mongoose.Schema.Types.ObjectId, userid: string) {
    return rideRepository.updateById(rideid, { $push: { riders: userid } },
      [{path: 'riders', model: 'User',}]);
  }

  static removeRider(rideid: mongoose.Schema.Types.ObjectId, userid: string) {
    return rideRepository.updateById(rideid, { $pull: { riders: userid } },
      [{path: 'riders', model: 'User',}]);
  }
}
