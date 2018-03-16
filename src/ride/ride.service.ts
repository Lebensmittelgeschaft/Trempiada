import * as mongoose from 'mongoose';
import { IRide } from './ride.interface';
import { Ride } from './ride.model';
import { rideRepository } from './ride.repository';

export class rideService {

  static getAll(conditions?: any, select?: string, populate?: any) {
    return rideRepository.getAll(conditions, select, populate);
  }

  static save(ride: IRide) {
    return rideRepository.save(ride);
  }

  static updateById(id: mongoose.Types.ObjectId, update: any, populate?: any) {
    return rideRepository.updateById(id, update, populate);
  }

  static getById(ride: mongoose.Types.ObjectId, populate?: any, select?: string) {
    return rideRepository.getOneByProps({ _id: ride }, populate, select);
  }

  static deleteById(ride: mongoose.Types.ObjectId) {
    return rideRepository.updateById(ride, { active: false });
  }

  static addRider(rideid: mongoose.Types.ObjectId, userid: string) {
    return rideRepository.updateById(rideid,
                                     { $push: { riders: userid } },
                                     [{ path: 'riders', model: 'User' }]);
  }

  static removeRider(rideid: mongoose.Types.ObjectId, userid: string) {
    return rideRepository.updateById(rideid,
                                     { $pull: { riders: userid } },
                                     [{ path: 'riders', model: 'User' }]);
  }
}
