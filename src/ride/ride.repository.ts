import * as mongoose from 'mongoose';
import { IRide } from './ride.interface';
import { ride as Ride } from './ride.model';
import { config } from '../config';

export class rideRepository {
  static async getAll(conditions?: Object, populate?: Object[]) {
    return Ride.find(conditions || {})
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });

    let ride : IRide[] | null = null;
    if (populate) {
      ride = await Ride.find(conditions || {}).populate(populate);
    } else {
      ride = await Ride.find(conditions || {});
    }

    return user;
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

  static getOneByConditions(conditions: Object) {
    return Ride.findOne(conditions).populate({
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

  static getById(id: mongoose.Schema.Types.ObjectId) {
    return this.getOneByConditions({ _id: id });
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
    return Promise.all([Ride.findByIdAndUpdate(rideid,
                                               { $push: { riders: userid } }, { new: true })
    .populate({
      path: 'riders',
      model: 'User',
    })
    .then((ride) => {
      return ride;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    }),
      User.findOneAndUpdate({ username: userid },
                            { $push: { rides: rideid } }, { new: true })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.error(err);
        throw err;
      }),
    ])
    .then(([ride, user]) => {
      return ride;
    }).catch((err) => {
      console.error(err);
      throw err;
    });
  }

  static removeRider(rideid: mongoose.Schema.Types.ObjectId, userid: string) {
    return Promise.all([
      Ride.findByIdAndUpdate(rideid, { $pull: { riders: userid } }, { new: true })
      .populate({
        path: 'riders',
        model: 'User',
      }).then((ride) => {
        return ride;
      })
      .catch((err) => {
        console.error(err);
        throw err;
      }),
      User.findOneAndUpdate({ username: userid },
                            { $push: { rides: rideid } }, { new: true })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.error(err);
        throw err;
      }),
    ])
    .then(([ride, user]) => {
      return ride;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
  }
}
