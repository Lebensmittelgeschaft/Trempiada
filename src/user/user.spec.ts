import 'mocha';
import { expect } from 'chai';
import { userRepository } from './user.repository';
import { user as User } from './user.model';
import { IUser } from './user.interface';
import * as mongoose from 'mongoose';
import { config } from '../config';
import { userController } from './user.controller';

(<any>mongoose).Promise = Promise;
mongoose.connect(config.mongodbUrl, { useMongoClient: true }, (err) => {
  if (err) {
    console.log(`Error connection to ${config.mongodbUrl}. ${err}`);
  } else {
    console.log(`Succeesfully connected to: ${config.mongodbUrl}`);
  }
});

const driverid = '1';
before('Clear users test DB.', async () => {
  try {
    await User.remove({});
    it('Should create a user.', async () => {
      const user = new User({
        username: driverid,
        job: 'Jobnik',
        firstname: 'Bob',
        lastname: 'boB',
        ride: [],
        email: 'Bob@bob.bob',
        notifications: [],
        active: true,
      });
  
      expect(await userRepository.save(user)).to.exist;
    });
  } catch (err) {
    console.log(err);
  }
});

describe('User', () => {
  it('Should return all active rides of a user.', () => {
    userController.getActiveRides(driverid);
  }); 
});
