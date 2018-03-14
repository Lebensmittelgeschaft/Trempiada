import * as mongoose from 'mongoose';
import { user as User } from './user.model';
import { IUser } from './user.interface';
import { userRepository } from './user.repository';

export class userController {
  static addRide(user: string, ride: mongoose.Schema.Types.ObjectId) {
    // TODO: Check if ride can be added to user.
    userRepository.updateByUsername(user, { $push: { rides: ride } });
  }
}
