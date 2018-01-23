import * as mongoose from 'mongoose';
import { IRide } from './ride.interface';

const rideSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: 'User',
    required: true,
  },
  maxRiders: {
    type: Number,
    required: true,
  },
  currentRiders: {
    type: Number,
    default: 1,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  departureTime: {
    type: Number,
    default: (new Date()).getTime(),
  },
});

export const ride = mongoose.model<IRide>('Ride', rideSchema);
