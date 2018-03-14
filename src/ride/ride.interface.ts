import * as mongoose from 'mongoose';
import { IUser } from '../user/user.interface';

export interface IRide extends mongoose.Document {
  driver: mongoose.Schema.Types.ObjectId | IUser;
  maxRiders: number;
  riders: mongoose.Schema.Types.ObjectId[] | IUser[];
  from: string;
  to: string;
  departureDate: Date;
  creationDate: Date;
  active: boolean;
}
