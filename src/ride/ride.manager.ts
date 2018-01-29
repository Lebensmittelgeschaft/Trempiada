import * as mongoose from 'mongoose';
import { IRide } from './ride.interface';
import { IUser } from '../user/user.interface';
import { ride as Ride } from './ride.model';
import { config } from '../config';
import { userController } from '../user/user.manager';

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
  getById(id: mongoose.Schema.Types.ObjectId) {
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
  deleteById(id: mongoose.Schema.Types.ObjectId) {
    return Ride.findByIdAndRemove(id)
      .then(async (res) => {
        return await res && (res as IRide).populate('driver').populate('riders').execPopulate();
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  },
  updateById(id: mongoose.Schema.Types.ObjectId, ride: Partial<IRide>) {
    return Ride.findByIdAndUpdate(id, ride as Object, { new: true })
      .then(async (res) => {
        return await res && (res as IRide).populate('driver').populate('riders').execPopulate();
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  },
  async addRider(rideid: mongoose.Schema.Types.ObjectId, userid: string) {
    const user = await userController.getById(userid);
    let ride = await rideController.getById(rideid);
    if (ride && user) {
      const rideToUpdate = {
        driver: ride.driver._id as any,
        maxRiders: ride.maxRiders,
        riders: ride.riders.map(r => r._id) as any,
        from: ride.from,
        to: ride.to,
        departureTime: ride.departureTime,
      };

      if (rideToUpdate.riders.indexOf(userid) === -1) {
        rideToUpdate.riders.push(user._id);
        ride = await rideController.updateById(rideid, rideToUpdate as Partial<IRide>);
      }
    }

    return ride;
  },
};
