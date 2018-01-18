import * as mongoose from 'mongoose';
import { IRide } from './ride.interface';
import { ride as Ride } from './ride.model';
import { config } from '../config';

export const rideController = {
  getAll() {
    return Ride.find({});
  },
  async getAllBeforeDeparture() {
    const rides = await rideController.getAll();
    const now = new Date().getTime();
    return rides ? rides.filter(r => now < r.departure) : null;
  },
  getById(id: mongoose.Types.ObjectId) {
    return Ride.findById(id);
  },
  deleteById(id: mongoose.Types.ObjectId) {
    return Ride.findByIdAndRemove(id);
  },
  updateById(id: mongoose.Types.ObjectId, ride: Partial<IRide>) {
    return Ride.findByIdAndUpdate(id, ride as Object, { new: true });
  },
};
