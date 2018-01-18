import { Document } from 'mongoose';

export interface IRide extends Document {
  user: string;
  maxRiders: number;
  currentRiders: number;
  from: string;
  to: string;
  departure: number;
}
