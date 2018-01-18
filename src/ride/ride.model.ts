import * as mongoose from 'mongoose';
import { IRide } from './ride.interface';

const rideSchema = new mongoose.Schema({
  user: String,
  maxRiders: Number,
  currentRiders: Number,
  from: String,
  to: String,
  departure: Number,
});

export const ride = mongoose.model<IRide>('ride', rideSchema);
