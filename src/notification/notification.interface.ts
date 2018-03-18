import * as mongoose from 'mongoose';

export interface INotification {
  id?: mongoose.Types.ObjectId;
  content: String;
  type: String;
  active: Boolean;
  creationDate: Date;
}
