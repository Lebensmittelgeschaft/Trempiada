import * as mongoose from 'mongoose';
import { rideRepository } from './ride.repository';
import { IRide } from './ride.interface';

export class rideController {

  static getAllRides() {
    return rideRepository.getAll(undefined, undefined, 'riders');
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
