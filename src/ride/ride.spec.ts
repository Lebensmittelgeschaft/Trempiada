import 'mocha';
import * as chai from 'chai';
import { Ride } from './ride.model';
import { IRide } from './ride.interface';
import * as mongoose from 'mongoose';
import { config } from '../config';
import { rideService } from './ride.service';
import { userService } from '../user/user.service'
import { User } from '../user/user.model';
import { IUser } from '../user/user.interface';

(<any>mongoose).Promise = Promise;
mongoose.connect(config.mongodbUrl, { useMongoClient: true }, (err) => {
  if (err) {
    console.log(`Error connection to ${config.mongodbUrl}. ${err}`);
  } else {
    console.log(`Succeesfully connected to: ${config.mongodbUrl}`);
  }
});

const expect = chai.expect;
const driverid = '1';
const riders: string[] = [];
before('Clear rides DB.', async () => {
  try {
    await Ride.remove({});
    it('Should create test users.', async () => {
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

      expect(await userService.save(driver)).to.exist;
      await Promise.all(ridersToTest.map(async (u) => {
        const rider = await userService.save(u);
        expect(rider).to.exist;
        riders.push((rider as IUser).id);
      }));
    });
  } catch (err) {
    console.log(err);
  }
});

describe.skip('Ride', () => {
  let rideId: mongoose.Schema.Types.ObjectId;
  it('Should create a ride.', async () => {
    const ride = new Ride({
      riders,
      driver: driverid,
      maxRiders: 4,
      from: 'dolphin',
      to: 'tel aviv',
      departureTime: 1716179465155,
    });

    let savedRide: IRide;
    expect(savedRide = await rideService.save(ride)).to.exist;
    expect(savedRide).to.exist;
    if (savedRide) {
      rideId = savedRide._id;
    }
  });

  it('Should find ride.', async () => {
    let ride: IRide;
    expect(ride = await rideService.getById(rideId) as IRide).to.exist;
    expect(ride).to.have.property('driver');
    expect(ride.driver).to.exist;
    expect(ride.driver).to.have.property('_id', driverid);
    expect(ride).to.have.property('maxRiders', 4);
    expect(ride).to.have.property('riders');
    expect(ride.riders).to.have.length(riders.length);
    expect(ride.riders[0]).to.have.property('_id', riders[0]);
    expect(ride).to.have.property('from', 'dolphin');
    expect(ride).to.have.property('to', 'tel aviv');
    expect(ride).to.have.property('departureTime', 1716179465155);
  });

  it('Should update ride.', async () => {
    const updatedRide: Partial<IRide> = {
      to: 'yavne',
    };

    let rideResult: IRide;
    expect(rideResult = await rideService.updateById(rideId, { }) as IRide).to.exist;
    expect(rideResult).to.have.property('to', 'yavne');
    expect(rideResult).to.have.property('driver');
    expect(rideResult.driver).to.exist;
    expect(rideResult.driver).to.have.property('_id', driverid);
    expect(rideResult).to.have.property('maxRiders', 4);
    expect(rideResult).to.have.property('riders');
    expect(rideResult.riders).to.have.length(riders.length);
    expect(rideResult.riders[0]).to.have.property('_id', riders[0]);
    expect(rideResult).to.have.property('from', 'dolphin');
    expect(rideResult).to.have.property('departureTime', 1716179465155);
  });

  it('Should add rider to ride.', async () => {
    const ride = await rideService.addRider(rideId, driverid) as IRide;
    expect(ride).to.exist;
    expect(ride.riders).to.have.length(riders.length + 1);
    expect(ride.riders[ride.riders.length - 1]).to.have.property('_id', driverid);
  });

  it.skip('Should delete ride.', async () => {
    let ride: IRide;
    expect(ride = await rideService.deleteById(rideId) as IRide).to.exist;
    expect(ride).to.have.property('driver');
    expect(ride.driver).to.exist;
    expect(ride.driver).to.have.property('_id', driverid);
    expect(ride).to.have.property('maxRiders', 4);
    expect(ride).to.have.property('riders');
    expect(ride.riders).to.have.length(riders.length);
    expect(ride.riders[0]).to.have.property('_id', riders[0]);
    expect(ride).to.have.property('from', 'dolphin');
    expect(ride).to.have.property('to', 'yavne');
    expect(ride).to.have.property('departureTime', 1716179465155);
  });
});
