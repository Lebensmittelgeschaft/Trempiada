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
      rides: [],
      email: 'Bob@bob.bob',
      notifications: [notifications[0]],
      isDeleted: false,
    });

    expect(await userRepository.save(driver)).to.exist;
    const ridersToTest = [new User({
      _id: '2',
      job: 'BobniK',
      firstname: 'Or',
      lastname: 'Li',
      rides: [],
      email: 'Bob@bob.bob',
      notifications: [],
      isDeleted: false,
    }),
      new User({
        _id: '3',
        job: 'Bobnik',
        firstname: 'asd',
        lastname: 'dsa',
        rides: [],
        email: 'Bob@bob.bob',
        notifications: [],
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
      const users = await userController.getAllUsers();
    } catch (err) {
      console.error(err);
    }
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
    try {
      await Promise.all(rides.map(async (r) => {
        expect(await userController.addRide(driverid, r.id)).to.exist;
      }));
    } catch (err) {
      console.error(err);
    }
  }); 

  it('Should return all active rides of a user.', async () => {
    try {
      const user = await userController.getUserActiveRides(driverid);
      expect(user).to.exist;
      expect((<IUser>user).rides).to.have.length(rides.filter((r) => {
        return r.driver == driverid && r.departureDate >= new Date() && !r.isDeleted;
      }).length);
    } catch (err) {
      console.error(err);
    }
  }); 
});

after('Delete all documents from all collections', async () => {
  try {
    await User.remove({});
    await Ride.remove({});
  } catch (err) {
    console.error(err);
  }
});
