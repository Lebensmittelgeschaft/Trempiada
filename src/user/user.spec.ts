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
import { INotification } from '../notification/notification.interface';

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
const notifications: INotification[] = [{
  type: 'Alert',
  content: 'TEST',
  active: true,
  creationDate: new Date(),
},
  {
    type: 'Alert',
    content: 'TEST2',
    active: false,
    creationDate: new Date(),
  }];

before('Clear users test DB.', async () => {
  try {
    await User.remove({});
    await Ride.remove({});
  } catch (err) {
    console.error(err);
  }
});

describe('User Repository', () => {
  it('Should give all users.', async () => {
    expect(await userRepository.getAll()).to.exist;
  });
  
  it('Should create test rides.', async () => {
    try {
      const ridesToTest = [new Ride({
        driver: driverid,
        maxRiders: 4,
        riders: [],
        from: 'תל אביב',
        to: 'ראשון לציון',
        departureDate: new Date(new Date().getTime() + 100000000),
        creationDate: new Date(),
        active: true,
      }),
        new Ride({
          driver: driverid,
          maxRiders: 4,
          riders: [],
          from: 'תל אביב',
          to: 'ראשון לציון',
          departureDate: new Date(new Date().getTime() + 100000000),
          creationDate: new Date(),
          active: false,
        }),
        new Ride({
          driver: driverid,
          maxRiders: 4,
          riders: [],
          from: 'תל אביב',
          to: 'ראשון לציון',
          departureDate: new Date(new Date().getTime() + 100000000),
          creationDate: new Date(),
          active: false,
        })];
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
    try {
      const driver = new User({
        _id: driverid,
        job: 'Jobnik',
        firstname: 'Bob',
        lastname: 'boB',
        ride: [],
        email: 'Bob@bob.bob',
        notifications: [notifications[0]],
        active: true,
      });

      expect(await userRepository.save(driver)).to.exist;
      const ridersToTest = [new User({
        _id: '2',
        job: 'BobniK',
        firstname: 'Or',
        lastname: 'Li',
        ride: [],
        email: 'Bob@bob.bob',
        notifications: [],
        active: true,
      }),
        new User({
          _id: '3',
          job: 'Bobnik',
          firstname: 'asd',
          lastname: 'dsa',
          ride: [],
          email: 'Bob@bob.bob',
          notifications: [],
          active: true,
        })];
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
    const users = await userController.getAllUsers();
  });

  it('Should create notifications.', async () => {
    try {
      await Promise.all(notifications.map(async (n) => {
        expect(await userController.pushNotification('2', notifications[1])).to.exist;
      }));
    } catch (err) {
      console.error(err);
    }
  });

  it('Should add rides to user.', async () => {
    await Promise.all(rides.map(async (r) => {
      expect(await userController.addRide(driverid, r.id)).to.exist;
    }));
  }); 

  it('Should return all active rides of a user.', async () => {
    const rides = await userController.getActiveRides(driverid);
    expect(rides).to.have.length(1);
  }); 
});
