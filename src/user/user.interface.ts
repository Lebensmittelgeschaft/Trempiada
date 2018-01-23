import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  address: string;
  hasCar: boolean;
}
