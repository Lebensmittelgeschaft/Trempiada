import * as mongoose from 'mongoose';
import { IUser } from '../user/user.interface';

export interface IRide extends mongoose.Document {
  id: mongoose.Schema.Types.ObjectId
  driver: string | IUser;
  maxRiders: number;
  riders: string[] | IUser[];
  from: string;
  to: string;
  departureDate: Date;
  creationDate: Date;
  active: boolean;
}
