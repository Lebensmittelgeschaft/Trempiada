import 'mocha';
import { expect } from 'chai';
import * as mongoose from 'mongoose';
import { config } from '../config';
import { Ride } from '../ride/ride.model';
import { User } from '../user/user.model';
import { Notification } from './notification.model';
import { INotification } from './notification.interface';
import { IUser } from '../user/user.interface';
import { notificationRepository } from './notification.repository';
import { userRepository } from '../user/user.repository';

(<any>mongoose).Promise = Promise;
mongoose.connect(config.mongodbUrl, (err) => {
  if (err) {
    console.error(`Error connection to ${config.mongodbUrl}. ${err}`);
  } else {
    console.log(`Succeesfully connected to: ${config.mongodbUrl}`);
  }
});

before('Clear users test DB.', async () => {
  try {
    await User.remove({});
    await Ride.remove({});
    await Notification.remove({});
  } catch (err) {
    console.error(err);
  }
});

const userid = '16';
const testUser = new User({
  _id: userid,
  firstname: 'Omri',
  lastname: 'S',
  job: 'toch',
  email: 'as@dd.werz',
});

const notifications: INotification[] = [
  new Notification({
    user: userid,
    content: 'TEST',
    creationDate: new Date(),
  }),
  new Notification({
    user: userid,
    content: 'TEST2',
    creationDate: new Date(),
  })];

describe('Notification repository', () => {
  it('Should save test user', async () => {
    expect(await userRepository.save(testUser)).to.exist;
  });

  it('Should save notifications', async () => {
    await Promise.all(notifications.map(async (n) => {
      expect(await notificationRepository.save(n)).to.exist;
    }));
  });
});

after('Delete all documents in all collections', async () => {
  try {
    await User.remove({});
    await Ride.remove({});
    await Notification.remove({});
  } catch (err) {
    console.error(err);
  }
});

