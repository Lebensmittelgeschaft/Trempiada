import * as mongoose from 'mongoose';

export interface INotification {
  content: String;
  type: String;
  active: Boolean;
  creationDate: Date;
}
