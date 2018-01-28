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
    let ride = await rideController.getById(rideid);
    let user = await userController.getById(userid);
    if (ride && user) {
      let isRiderFound = false;
      for (let i = 0; i < ride.riders.length && !isRiderFound; i++) {
        if (ride.riders[i]._id === userid) {
          isRiderFound = true;
        }
      }

      if (!isRiderFound) {
        ride.riders.push(user);
        ride = await rideController.updateById(rideid, ride);
      }
    }

    return ride;
  },
};
