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

const ride = mongoose.model<IRide>('Ride', rideSchema);
export { ride as Ride };
