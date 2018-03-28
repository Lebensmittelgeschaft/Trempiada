import { Schema, model } from 'mongoose';
import { IRide } from './ride.interface';
import { userController } from '../user/user.controller';

const rideSchema = new Schema({
  driver: {
    type: String,
    ref: 'User',
    required: true,
  },
  maxRiders: {
    type: Number,
    required: true,
  },
  riders: [{
    rider: {
      type: String,
      required: true,
      ref: 'User',
    },
    joinDate: {
      type: Date,
      required: true,
    },
  }],
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  departureDate: {
    type: Date,
    required: true,
  },
  creationDate: {
    type: Date,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

rideSchema.pre('validate', async function (this: IRide, next) {
  const driver = await userController.getById(typeof this.driver === 'string' ?
    this.driver : this.driver.id);
  if (driver &&
      this.riders.length <= this.maxRiders &&
      this.to !== this.from) {
    next();
  }

  next(new Error(`Bad request`));
});

rideSchema.pre('save', function (this: IRide, next) {
  this.creationDate = new Date();
  next();
});

const ride = model<IRide>('Ride', rideSchema);
export { ride as Ride };
