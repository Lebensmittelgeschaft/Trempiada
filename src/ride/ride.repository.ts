import * as mongoose from 'mongoose';
import { IRide } from './ride.interface';
import { Ride } from './ride.model';
import { config } from '../config';

export class rideRepository {

  static getAll(conditions?: Object, select?: string, populate?: Object[]) {
    return Ride.find(conditions || {}, select || {}).populate(populate || {});
  }

  static getOneByProps(conditions: Object, populate?: Object[], select?: string) {
    return Ride.findOne(conditions, select || {}).populate(populate || {});
  }

  static save(ride: IRide) {
    return ride.save();
  }

  static deleteById(id: mongoose.Schema.Types.ObjectId, populate?: Object[]) {
    return Ride.findByIdAndRemove(id).populate(populate || {});
  }

  static updateById(id: mongoose.Schema.Types.ObjectId, update: Object, populate?: Object[]) {
    return Ride.findByIdAndUpdate(id, update, { new: true }).populate(populate || {});
  }
}
