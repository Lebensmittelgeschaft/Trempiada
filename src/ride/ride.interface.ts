import { Document } from 'mongoose';
import { IUser } from '../user/user.interface';

export interface IRide extends Document {
  driver: IUser;
  maxRiders: number;
  riders: [IUser];
  from: string;
  to: string;
  departureTime: number;
}
