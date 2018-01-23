import * as mongoose from 'mongoose';
import { IRide } from './ride.interface';
import { ride as Ride } from './ride.model';
import { config } from '../config';

export const rideController = {
  getAll() {
    return Ride.find({})
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
  },
  async getAllBeforeDeparture() {
    const rides = await rideController.getAll();
    const now = new Date().getTime();
    return rides ? rides.filter(r => now < r.departure) : null;
  },
  getById(id: mongoose.Types.ObjectId) {
    return Ride.findById(id)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
  },
  deleteById(id: mongoose.Types.ObjectId) {
    return Ride.findByIdAndRemove(id)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
  },
  updateById(id: mongoose.Types.ObjectId, ride: Partial<IRide>) {
    return Ride.findByIdAndUpdate(id, ride as Object, { new: true })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
  },
};