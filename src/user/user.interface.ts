import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  username: string;
  job: string;
  firstname: string;
  lastname: string;
  ride: {
    ride: mongoose.Schema.Types.ObjectId,
    joinDate: Date,
  }[];
  email: string;
  notifications: mongoose.Schema.Types.ObjectId[];
  active: boolean;
}
