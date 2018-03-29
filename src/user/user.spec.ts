import 'mocha';
import { expect } from 'chai';
import { User } from './user.model';
import { IUser } from './user.interface';
import * as mongoose from 'mongoose';
import { config } from '../config';
import { userService } from './user.service';
import { Ride } from '../ride/ride.model';
import { IRide } from '../ride/ride.interface';
import { rideService } from '../ride/ride.service';
import { userController } from './user.controller';
import { Notification } from '../notification/notification.model';

(<any>mongoose).Promise = Promise;
mongoose.connect(config.mongodbUrl, (err) => {
  if (err) {
    console.error(`Error connection to ${config.mongodbUrl}. ${err}`);
  } else {
    console.log(`Succeesfully connected to: ${config.mongodbUrl}`);
  }
});

const driverid = '10';
const rides: IRide[] = [];

before('Clear users test DB.', async () => {
  try {
    await User.remove({});
    await Ride.remove({});
    await Notification.remove({});
  } catch (err) {
    console.error(err);
  }
});

describe('User Service', () => {
  it('Should give all users.', async () => {
    expect(await userService.getAll()).to.exist;
  });
  
  it('Should create users.', async () => {
    const driver = new User({
      _id: driverid,
      job: 'Jobnik',
      firstname: 'Bob',
      lastname: 'boB',
      email: 'Bob@bob.bob',
      isDeleted: false,
    });

    expect(await userService.create(driver)).to.exist;
    const ridersToTest = [new User({
      _id: '2',
      job: 'BobniK',
      firstname: 'Or',
      lastname: 'Li',
      email: 'Bob@bob.bob',
      isDeleted: false,
    }),
      new User({
        _id: '3',
        job: 'Bobnik',
        firstname: 'asd',
        lastname: 'dsa',
        email: 'Bob@bob.bob',
        isDeleted: false,
      })];
    await Promise.all(ridersToTest.map(async (u) => {
      const rider = await userService.create(u);
      expect(rider).to.exist;
    }));
  });

  it('Should create test rides.', async () => {
    const ridesToTest = [new Ride({
      driver: driverid,
      maxRiders: 4,
      riders: [],
      from: 'תל אביב',
      to: 'ראשון לציון',
      departureDate: new Date(Date.now() + 10000000000),
      isDeleted: false,
    }),
      new Ride({
        driver: driverid,
        maxRiders: 4,
        riders: [],
        from: 'תל אביב',
        to: 'ראשון לציון',
        departureDate: new Date(Date.now() + 10000000000),
        isDeleted: false,
      }),
      new Ride({
        driver: driverid,
        maxRiders: 4,
        riders: [],
        from: 'תל אביב',
        to: 'ראשון לציון',
        departureDate: new Date(Date.now() - 10000000000),
        isDeleted: false,
      })];
    await Promise.all(ridesToTest.map(async (r) => {
      const ride = await rideService.create(r);
      expect(ride).to.exist;
      rides.push(ride);
    }));
  });
});

describe('User Controller', () => {
  it('Should give all users', async () => {
    expect(await userController.getAll()).to.exist;
  });

  it('Should return all active rides of a rider.', async () => {
    const rides = await userController.getUserActiveRides(driverid);
    expect(rides).to.exist;
    expect(rides).to.have.length(rides.filter((r) => {
      return r.driver === driverid && r.departureDate >= new Date() && !r.isDeleted;
    }).length);
  });
});

/*after('Delete all documents in all collections', async () => {
  try {
    await User.remove({});
    await Ride.remove({});
    await Notification.remove({});
  } catch (err) {
    console.error(err);
  }
});*/
