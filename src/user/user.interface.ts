import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  location: string;
  hasCar: boolean;
}
