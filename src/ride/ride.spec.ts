import 'mocha';
import { expect } from 'chai';
import { Ride } from './ride.model';
import { IRide } from './ride.interface';
import * as mongoose from 'mongoose';
import { config } from '../config';
import { rideService } from './ride.service';
import { userService } from '../user/user.service';
import { User } from '../user/user.model';
import { IUser } from '../user/user.interface';
import { rideController } from './ride.controller';
import { Notification } from '../notification/notification.model';

(<any>mongoose).Promise = Promise;
mongoose.connect(config.mongodbUrl, (err) => {
  if (err) {
    console.error(`Error connection to ${config.mongodbUrl}. ${err}`);
  } else {
    console.log(`Succeesfully connected to: ${config.mongodbUrl}`);
  }
});

const driverid = '21';
const riders: string[] = [];
const rides: IRide[] = [];

before('Clear rides DB.', async () => {
  try {
    await Ride.remove({});
    await User.remove({});
    await Notification.remove({});
  } catch (err) {
    console.error(err);
  }
});

describe('Ride Service', () => {

  it('Should create test users.', async () => {
    const driver = new User({
      _id: driverid,
      job: 'Jobnik',
      firstname: 'Bob',
      lastname: 'boB',
      email: 'Bob@bob.bob',
    });

    const ridersToTest = [new User({
      _id: '22',
      job: 'BobniK',
      firstname: 'Or',
      lastname: 'Li',
      email: 'Bob@bob.bob',
      isDeleted: false,
    }),
      new User({
        _id: '23',
        job: 'Bobnik',
        firstname: 'asd',
        lastname: 'dsa',
        email: 'Bob@bob.bob',
        isDeleted: true,
      })];

    expect(await userService.create(driver)).to.exist;
    await Promise.all(ridersToTest.map(async (u) => {
      const rider = await userService.create(u);
      expect(rider).to.exist;
      riders.push((rider as IUser).id);
    }));
  });

  it('Should create test rides.', async () => {
    const ridesToTest = [new Ride({
      driver: driverid,
      maxRiders: 4,
      riders: [{ rider: '22' }],
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
      }),
      new Ride({
        driver: driverid,
        maxRiders: 4,
        riders: [],
        from: 'תל אביב',
        to: 'ראשון לציון',
        departureDate: new Date(Date.now() - 10000000000),
        isDeleted: false,
      }),
      new Ride({
        driver: driverid,
        maxRiders: 4,
        riders: [],
        from: 'רמת אביב',
        to: 'תל אביב',
        departureDate: new Date(Date.now() + 20000000000),
        isDeleted: false,
      }),
    ];
    await Promise.all(ridesToTest.map(async (r) => {
      const ride = await rideService.create(r);
      expect(ride).to.exist;
      rides.push(ride);
    }));
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
    const ride = await rideService.getOneByProps(
      { _id: rides[0].id }, 'riders');
    expect(ride).to.exist;
    expect((<IRide>ride).id).to.equal(rides[0].id);
    expect(ride).to.have.property('driver', rides[0].driver);
    expect(ride).to.have.property('maxRiders', rides[0].maxRiders);
    expect(ride).to.have.property('to', rides[0].to);
    expect(ride).to.have.property('from', rides[0].from);
    expect((<IRide>ride).departureDate.getTime()).to.equal(rides[0].departureDate.getTime());
    expect((<IRide>ride).creationDate.getTime()).to.equal(rides[0].creationDate.getTime());
    expect(ride).to.have.property('isDeleted', rides[0].isDeleted);
    expect(ride).to.have.property('riders');
    expect((<IRide>ride).riders).to.have.length(rides[0].riders.length);
  });

  it('Should delete ride.', async () => {
    const ride = await rideService.deleteById(rides[0].id);
    expect(ride).to.exist;
  });
});

describe('Ride Controller', () => {
  let ride: IRide | null;

  it('Should get all active rides', async () => {
    const activeRides = await rideController.getAll();
    expect(activeRides).to.exist;
    expect(activeRides).to.have.length(rides.filter(
      r => r.departureDate >= new Date() && !r.isDeleted).length - 1);
  });

  it('Should add rider to ride', async () => {
    ride = await rideController.addRider(rides[3].id, riders[1]);
    expect(ride).to.exist;
    expect(ride).to.have.property('riders');
    expect((<IRide>ride).riders).to.have.length(rides[3].riders.length + 1);

    it('Should get rider', async () => {
      expect(await userService.getOneByProps(
        { _id: (<IUser>((<IRide>ride).riders[1].rider)).id })).to.exist;
    });
  });

  it('Should update ride', async () => {
    const ride = await rideController.updateById(
      rides[0].id, { maxRiders: rides[0].maxRiders - 1 });
    expect(ride).to.exist;
    expect(ride).to.have.property('maxRiders', rides[0].maxRiders - 1);
  });

  /*it('Should remove rider from ride', async () => {
    const newRide = await rideController.deleteRider(rides[1].id,
       (<string>(<IRide>ride).riders[0].rider));
    expect(newRide).to.exist;
    expect((<IRide>newRide).riders).to.have.length(rides[1].riders.length);
  });*/
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
