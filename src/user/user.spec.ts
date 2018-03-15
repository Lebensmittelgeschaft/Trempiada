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

(<any>mongoose).Promise = Promise;
mongoose.connect(config.mongodbUrl, (err) => {
  if (err) {
    console.log(`Error connection to ${config.mongodbUrl}. ${err}`);
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
  } catch (err) {
    console.log(err);
  }
});

describe('User', () => {
  it('Should give all users.', async () => {
    expect(await userService.getAll()).to.exist;
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
        const ride = await rideService.save(r);
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
        notifications: [],
        active: true,
      });

      expect(await userService.save(driver)).to.exist;
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
        const rider = await userService.save(u);
        expect(rider).to.exist;
      }));
    } catch (err) {
      console.error(err);
    }
  });

  it('Should add rides to user.', async () => {
    rides.forEach(async (v) => {
      expect(await userService.addRide(driverid, v.id)).to.exist;
    });
  }); 

  it('Should return all active rides of a user.', async () => {
    const rides = await userService.getActiveRides(driverid);
  }); 
});
