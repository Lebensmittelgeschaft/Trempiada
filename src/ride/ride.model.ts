import { Schema, model } from 'mongoose';
import { IRide } from './ride.interface';

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
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

rideSchema.pre('validate', function (this: IRide, next) {
  if (this.riders.length <= this.maxRiders) {
    next();
  }

  next(new Error(`Ride is full.`));
});

const ride = model<IRide>('Ride', rideSchema);
export { ride as Ride };
