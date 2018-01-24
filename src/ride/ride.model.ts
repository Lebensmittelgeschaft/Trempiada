import * as mongoose from 'mongoose';
import { IRide } from './ride.interface';

const rideSchema = new mongoose.Schema({
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
    type: String,
    required: true,
    ref: 'User',
  }],
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
    required: true,
  },
});

export const ride = mongoose.model<IRide>('Ride', rideSchema);
