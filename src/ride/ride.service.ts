import { Types } from 'mongoose';
import { IRide } from './ride.interface';
import { Ride } from './ride.model';

export class rideService {

  static getAll(conditions?: any, populate?: any, select?: string) {
    let rides = Ride.find(conditions || {}, select || {});
    if (populate) {
      rides = rides.populate(populate);
    }
    
    return rides;
  }

  static getOneByProps(conditions: any, populate?: any, select?: string) {
    let ride = Ride.findOne(conditions, select || {});
    if (populate) {
      ride = ride.populate(populate);
    }

    return ride;
  }

  static create(ride: IRide) {
    return ride.save();
  }

  static deleteById(id: Types.ObjectId) {
    return this.updateById(id, { isDeleted: true });
  }

  static updateById(id: Types.ObjectId, update: any, populate?: any) {
    let ride = Ride.findByIdAndUpdate(id, update, { new: true });
    if (populate) {
      return ride.populate(populate);
    }

    return ride;
  }
}
