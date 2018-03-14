import * as mongoose from 'mongoose';
import { IRide } from './ride.interface';
import { IUser } from '../user/user.interface';
import { ride as Ride } from './ride.model';
import { config } from '../config';
import { userController } from '../user/user.manager';
import { user as User } from '../user/user.model';

export class rideController {
  static getAll(conditions: Object) {
    return Ride.find(conditions)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
  }

  static getAllBeforeDeparture() {
    return Ride.find({
      departureDate: { $gte: new Date() },
      active: true,
    }).populate({
      path: 'driver',
      model: 'User',
      populate: {
        path: 'rides.ride',
        model: 'Ride',
      },
    }).populate({
      path: 'riders',
      model: 'User',
      populate: {
        path: 'rides.ride',
        model: 'Ride',
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
  }

  static getAllActive() {
    return Ride.find({
      active: true,
    }).populate({
      path: 'driver',
      model: 'User',
      populate: {
        path: 'rides.ride',
        model: 'Ride',
      },
    }).populate({
      path: 'riders',
      model: 'User',
      populate: {
        path: 'rides.ride',
        model: 'Ride',
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
  }

  static getById(id: mongoose.Schema.Types.ObjectId) {
    return Ride.findById(id).populate({
      path: 'driver',
      model: 'User',
      populate: {
        path: 'rides',
        model: 'Ride',
      },
    })
    .populate({
      path: 'riders',
      model: 'User',
      populate: {
        path: 'rides.ride',
        model: 'Ride',
      },
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  static save(ride: IRide) {
    return ride.save()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  static deleteById(id: mongoose.Schema.Types.ObjectId) {
    return Ride.findByIdAndRemove(id)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  static updateById(id: mongoose.Schema.Types.ObjectId, ride: Partial<IRide>) {
    return Ride.findByIdAndUpdate(id, <Object>ride, { new: true })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  static addRider(rideid: mongoose.Schema.Types.ObjectId, userid: string) {
    return User.findOneAndUpdate({ _id: rideid }, { $push: { riders: userid } })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
  }
}
