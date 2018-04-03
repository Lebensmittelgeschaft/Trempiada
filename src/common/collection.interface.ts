import { Document } from "mongoose";

export interface ICollection<T extends Document> {
  set: T[];
  totalCount: number;
}