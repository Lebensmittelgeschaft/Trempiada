import * as mongoose from 'mongoose';

export interface INotification extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  content: String;
  type: String;
  active: Boolean;
}
