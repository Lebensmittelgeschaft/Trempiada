import { User } from './user.model';
import { IUser } from './user.interface';

export class userService {
  
  /**
   * Returns all users.
   * @param conditions Query conditions
   * @param select Paths to select
   */
  static getAll(conditions?: any, select?: string) {
    return User.find(conditions || {}, select || {});
  }

  /**
   * Returns a single user.
   * @param conditions Query conditions
   * @param select Paths to select
   */
  static getOneByProps(conditions: any, select?: string) {
    return User.findOne(conditions, select || {});
  }

  /**
   * Creates a user.
   * @param user User to create
   */
  static create(user: IUser) {
    return user.save();
  }

  /**
   * Updates user details by id.
   * @param id User id
   * @param update Updated user
   */
  static updateById(id: string, update: any) {
    return User.findByIdAndUpdate(id, update, { new: true });
  }
}
