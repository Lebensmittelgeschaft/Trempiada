import * as mongoose from 'mongoose';
import { IRide } from './ride.interface';
import { Ride } from './ride.model';

export class rideRepository {

  static getAll(conditions?: any, select?: string, populate?: any) {
    if (populate) {
      return Ride.find(conditions || {}, select || {}).populate(populate);
    }

    return Ride.find(conditions || {}, select || {});
  }

  static getOneByProps(conditions: any, populate?: any, select?: string) {
    if (populate) {
      return Ride.findOne(conditions, select || {}).populate(populate);
    }

    return Ride.findOne(conditions, select || {});
  }

  static save(ride: IRide) {
    return ride.save();
  }

  static deleteById(id: mongoose.Types.ObjectId, populate?: any) {
    if (populate) {
      return Ride.findByIdAndRemove(id).populate(populate);
    }

    return Ride.findByIdAndRemove(id);
  }

  static updateById(id: mongoose.Types.ObjectId, update: any, populate?: any) {
    if (populate) {
      return Ride.findByIdAndUpdate(id, update, { new: true }).populate(populate);
    }

    return Ride.findByIdAndUpdate(id, update, { new: true });
  }
}
