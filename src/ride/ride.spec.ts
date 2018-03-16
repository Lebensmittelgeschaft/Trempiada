import 'mocha';
import * as chai from 'chai';
import { Ride } from './ride.model';
import { IRide } from './ride.interface';
import * as mongoose from 'mongoose';
import { config } from '../config';
import { rideService } from './ride.service';
import { userService } from '../user/user.service';
import { User } from '../user/user.model';
import { IUser } from '../user/user.interface';

(<any>mongoose).Promise = Promise;
mongoose.connect(config.mongodbUrl, (err) => {
  if (err) {
    console.log(`Error connection to ${config.mongodbUrl}. ${err}`);
  } else {
    console.log(`Succeesfully connected to: ${config.mongodbUrl}`);
  }
});

const expect = chai.expect;
const driverid = '21';
const riders: string[] = [];
const rides: IRide[] = [];
before('Clear rides DB.', async () => {
  try {
    await Ride.remove({});
    await User.remove({});
  } catch (err) {
    console.log(err);
  }
});

describe('Ride Service', () => {
  it('Should create test rides.', async () => {
    try {
      const ridesToTest = [new Ride({
        driver: driverid,
        maxRiders: 4,
        riders: ['22'],
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
      _id: '22',
      job: 'BobniK',
      firstname: 'Or',
      lastname: 'Li',
      ride: [],
      email: 'Bob@bob.bob',
      notifications: [],
      active: true,
    }),
      new User({
        _id: '23',
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

  it('Should add rider to ride', async () => {
    const ride = await rideService.addRider(rides[1].id, riders[1]);
    expect(ride).to.exist;
    expect(ride).to.have.property('riders');
    expect((<IRide>ride).riders).to.have.length(rides[1].riders.length + 1);

    it('Should get rider', async () => {
      expect(await userService.getById((<IUser>((<IRide>ride).riders[1])).id)).to.exist;
    });
    
    it('Should remove rider from ride', async () => {
      const newRide = await rideService.removeRider(rides[1].id,
         (<IUser>(<IRide>ride).riders[0]).id);
      expect(newRide).to.exist;
      expect((<IRide>newRide).riders).to.have.length(rides[1].riders.length);
    });
  });

  it('Should get all rides', async () => {
    const allRides = await rideService.getAll();
    expect(allRides).to.exist;
    expect(allRides).to.have.length(rides.length);
  });
  
  it('Should update ride source', async () => {
    const updatedRide = await rideService.updateById(rides[1].id, { to: 'רמת אביב' });
    expect(updatedRide).to.exist;
    expect(updatedRide).to.have.property('to', 'רמת אביב');
  });

  it('Should find ride', async () => {
    const ride = await rideService.getById(rides[0].id, { path: 'riders', model: 'User' });
    expect(ride).to.exist;
    expect((<IRide>ride).id).to.equal(rides[0].id);
    expect(ride).to.have.property('driver', rides[0].driver);
    expect(ride).to.have.property('maxRiders', rides[0].maxRiders);
    expect(ride).to.have.property('to', rides[0].to);
    expect(ride).to.have.property('from', rides[0].from);
    expect((<IRide>ride).departureDate.getTime()).to.equal(rides[0].departureDate.getTime());
    expect((<IRide>ride).creationDate.getTime()).to.equal(rides[0].creationDate.getTime());
    expect(ride).to.have.property('active', rides[0].active);
    expect(ride).to.have.property('riders');
    expect((<IRide>ride).riders).to.have.length(rides[0].riders.length);
  });

  it('Should delete ride.', async () => {
    let ride: IRide;
    expect(ride = await rideService.deleteById(rides[0].id) as IRide).to.exist;
    expect(ride).to.have.property('driver');
    expect(ride.driver).to.exist;
    expect(ride.driver).to.equal(driverid);
    expect(ride).to.have.property('maxRiders', 4);
    expect(ride).to.have.property('riders');
    expect(ride.riders).to.have.length(rides[0].riders.length);
    expect(ride.riders[0]).to.equal(rides[0].riders[0]);
    expect(ride).to.have.property('from', rides[0].from);
    expect(ride).to.have.property('to', rides[0].to);
    expect(ride.departureDate.getTime()).to.equal(rides[0].departureDate.getTime());
  });
});
