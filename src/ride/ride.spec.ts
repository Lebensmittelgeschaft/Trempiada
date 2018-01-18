import 'mocha';
import { expect } from 'chai';
import { rideController } from './ride.manager';
import { ride as Ride } from './ride.model';
import { IRide } from './ride.interface';
import * as mongoose from 'mongoose';
import { config } from '../config';

(<any>mongoose).Promise = Promise;
mongoose.connect(config.mongodbUrl, { useMongoClient: true }, (err) => {
  if (err) {
    console.log(`Error connection to ${config.mongodbUrl}. ${err}`);
  } else {
    console.log(`Succeesfully connected to: ${config.mongodbUrl}`);
  }
});

before('Clear rides DB.', async () => {
  try {
    await Ride.remove({});
  } catch (err) {
    console.log(err);
  }
});

describe('Ride', () => {
  let rideId: mongoose.Types.ObjectId;
  it('Should create a ride.', async () => {
    const ride = new Ride({
      user: '0',
      maxRiders: 4,
      currentRiders: 1,
      from: 'dolphin',
      to: 'tel aviv',
      departure: 1716179465155,
    });

    const savedRide = await ride.save();
    expect(savedRide).to.exist;
    rideId = savedRide._id;
  });

  it('Should find ride.', async () => {
    const ride = await rideController.getById(rideId);
    expect(ride).to.exist;
    expect(ride).to.have.property('user', '0');
    expect(ride).to.have.property('maxRiders', 4);
    expect(ride).to.have.property('currentRiders', 1);
    expect(ride).to.have.property('from', 'dolphin');
    expect(ride).to.have.property('to', 'tel aviv');
    expect(ride).to.have.property('departure', 1716179465155);
  });

  it('Should update ride.', async () => {
    const updatedRide: Partial<IRide> = {
      to: 'yavne',
    };
    
    const rideResult = await rideController.updateById(rideId, updatedRide);
    expect(rideResult).to.exist;
    expect(rideResult).to.have.property('to', 'yavne');
  });

  it('Should delete ride.', async () => {
    expect(await rideController.deleteById(rideId)).to.exist;
  });
});
