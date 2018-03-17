import * as mongoose from 'mongoose';
import { rideRepository } from './ride.repository';

export class rideController {
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
