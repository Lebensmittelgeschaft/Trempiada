import 'mocha';
import { expect } from 'chai';
import * as mongoose from 'mongoose';
import { config } from '../config';
import { Ride } from '../ride/ride.model';
import { User } from '../user/user.model';
import { Notification } from './notification.model';
import { notificationService } from './notification.service';

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

describe('Notification Service', () => {
  it('Should save notificaiton', async () => {
    const notificaiton = new Notification({
      user: '10',
      type: 'Alert',
      content: 'TEST',
      active: true,
    });

    const savedNotification = notificationService.save(notificaiton);
    expect(savedNotification).to.exist;
  });
});
