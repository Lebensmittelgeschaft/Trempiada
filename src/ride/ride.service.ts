import { Types } from 'mongoose';
import { IRide } from './ride.interface';
import { Ride } from './ride.model';

export class rideService {

  /**
   * Returns all rides.
   * @param conditions Query conditions
   * @param populate Paths to populate
   * @param select Paths to select
   */
  static getAll(conditions?: any, populate?: any, select?: string) {
    let rides = Ride.find(conditions || {}, select || {});
    if (populate) {
      rides = rides.populate(populate);
    }
    
    return rides;
  }

  /**
   * Returns a single ride.
   * @param conditions Query conditions
   * @param populate Paths to populate
   * @param select Paths to select
   */
  static getOneByProps(conditions: any, populate?: any, select?: string) {
    let ride = Ride.findOne(conditions, select || {});
    if (populate) {
      ride = ride.populate(populate);
    }

    return ride;
  }

  /**
   * Creates a ride.
   * @param ride Ride to create
   */
  static create(ride: IRide) {
    return ride.save();
  }

  /**
   * Marks a ride as deleted.
   * @param id Ride id
   */
  static deleteById(id: Types.ObjectId) {
    return this.updateById(id, { isDeleted: true });
  }

  /**
   * Updates ride details by id.
   * @param id Ride id
   * @param update Updated ride
   * @param populate Paths to populate
   */
  static updateById(id: Types.ObjectId, update: any, populate?: any) {
    let ride = Ride.findByIdAndUpdate(id, update, { new: true });
    if (populate) {
      return ride.populate(populate);
    }

    return ride;
  }
}
