import { Document, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export interface IRide extends Document {
  id: Types.ObjectId;
  driver: string | IUser;
  maxRiders: number;
  riders: {
    rider: string | IUser,
    joinDate: Date,
  }[];
  from: string;
  to: string;
  departureDate: Date;
  creationDate: Date;
  isDeleted?: boolean;
}
