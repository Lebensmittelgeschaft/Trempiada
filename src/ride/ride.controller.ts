import * as mongoose from 'mongoose';
import { rideRepository } from './ride.repository';
import { IRide } from './ride.interface';

export class rideController {

  static getAllRides() {
    return rideRepository.getAll({ isDeleted: false }, undefined, 'riders');
  }

  static getActiveRides() {
    return rideRepository.getAll({ departureDate: { $gte: new Date() }, isDeleted: false }, undefined, 'driver riders');
  }

  static addRide(ride: IRide) {
    return rideRepository.save(ride);
  }

  static deleteRide(id: mongoose.Types.ObjectId) {
    return rideRepository.deleteById(id);
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
