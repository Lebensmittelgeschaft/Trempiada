import * as mongoose from 'mongoose';
import { IRide } from './ride.interface';
import { ride as Ride } from './ride.model';
import { config } from '../config';

export class rideRepository {
  static async getAll(conditions?: Object, select?: string, populate?: Object[]) {
    return await Ride.find(conditions || {}, select || {}).populate(populate || {});
  }

  static async getOneByProps(conditions: Object, populate?: Object[], select?: string) {
    return await Ride.findOne(conditions, select || {}).populate(populate || {});
  }

  static save(ride: IRide) {
    return ride.save();
  }

  static async deleteById(id: mongoose.Schema.Types.ObjectId, populate?: Object[]) {
    return await Ride.findByIdAndRemove(id).populate(populate || {});
  }

  static async updateById(id: mongoose.Schema.Types.ObjectId, update: Object, populate?: Object[]) {
    return await Ride.findByIdAndUpdate(id, update, { new: true }).populate(populate || {});
  }
}
