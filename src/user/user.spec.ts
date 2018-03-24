import 'mocha';
import { expect } from 'chai';
import { User } from './user.model';
import { IUser } from './user.interface';
import * as mongoose from 'mongoose';
import { config } from '../config';
import { userRepository } from './user.repository';
import { Ride } from '../ride/ride.model';
import { IRide } from '../ride/ride.interface';
import { rideRepository } from '../ride/ride.repository';
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

describe('User Repository', () => {
  it('Should give all users.', async () => {
    try {
      expect(await userRepository.getAll()).to.exist;
    } catch (err) {
      console.error(err);
    }
  });
  
  it('Should create test rides.', async () => {
    const ridesToTest = [new Ride({
      driver: driverid,
      maxRiders: 4,
      riders: [],
      from: 'תל אביב',
      to: 'ראשון לציון',
      departureDate: new Date(new Date().getTime() + 100000000),
      creationDate: new Date(),
      isDeleted: false,
    }),
      new Ride({
        driver: driverid,
        maxRiders: 4,
        riders: [],
        from: 'תל אביב',
        to: 'ראשון לציון',
        departureDate: new Date(new Date().getTime() + 100000000),
        creationDate: new Date(),
        isDeleted: false,
      }),
      new Ride({
        driver: driverid,
        maxRiders: 4,
        riders: [],
        from: 'תל אביב',
        to: 'ראשון לציון',
        departureDate: new Date(new Date().getTime() - 100000000),
        creationDate: new Date(),
        isDeleted: false,
      })];
    try {
      await Promise.all(ridesToTest.map(async (r) => {
        const ride = await rideRepository.save(r);
        expect(ride).to.exist;
        rides.push(ride);
      }));
    } catch (err) {
      console.error(err);
    }
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

    expect(await userRepository.save(driver)).to.exist;
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
    try {
      await Promise.all(ridersToTest.map(async (u) => {
        const rider = await userRepository.save(u);
        expect(rider).to.exist;
      }));
    } catch (err) {
      console.error(err);
    }
  });
});

describe('User Controller', () => {
  it('Should give all users', async () => {
    try {
      const users = await userController.getAll();
    } catch (err) {
      console.error(err);
    }
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
