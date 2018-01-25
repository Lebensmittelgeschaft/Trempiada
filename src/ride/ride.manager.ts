import * as mongoose from 'mongoose';
import { IRide } from './ride.interface';
import { ride as Ride } from './ride.model';
import { config } from '../config';

export const rideController = {
  getAll() {
    return Ride.find({})
    .then(async (res) => {
      const resPopulated: IRide[] = [];
      for (let i = 0; i < res.length; i += 1) {
        resPopulated.push(await res[i].populate('driver').populate('riders').execPopulate());
      }

      return resPopulated;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
  },
  async getAllBeforeDeparture() {
    const rides = await rideController.getAll();
    const now = new Date().getTime();
    return rides.filter(r => now < r.departureTime);
  },
  getById(id: mongoose.Types.ObjectId) {
    return Ride.findById(id)   
    .then(async (res) => {
      return await res && (res as IRide).populate('driver').populate('riders').execPopulate();
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
  },
  save(ride: IRide) {
    return ride.save()
    .then(async (res) => {
      return await res.populate('driver').populate('riders').execPopulate();
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
  },
  deleteById(id: mongoose.Types.ObjectId) {
    return Ride.findByIdAndRemove(id)
    .then(async (res) => {
      return await res && (res as IRide).populate('driver').populate('riders').execPopulate();
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
  },
  updateById(id: mongoose.Types.ObjectId, ride: Partial<IRide>) {
    return Ride.findByIdAndUpdate(id, ride as Object, { new: true })
    .then(async (res) => {
      return await res && (res as IRide).populate('driver').populate('riders').execPopulate();
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
  },
};
