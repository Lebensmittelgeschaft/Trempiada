import 'mocha';
import { expect } from 'chai';
import { userController } from './user.manager';
import { user as User } from './user.model';
import { IUser } from './user.interface';
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

before('Clear users DB.', async () => {
  try {
    await User.remove({});
  } catch (err) {
    console.log(err);
  }
});

describe('User', () => {
  it('Should create a user.', async () => {
    const user = new User({
      _id: '0',
      location: 'tel aviv',
      hasCar: true,
    });

    expect(await user.save()).to.exist;
  });

  it('Should find user.', async () => {
    const user = await userController.getById('0');
    expect(user).to.exist;
    expect(user).to.have.property('location', 'tel aviv');
    expect(user).to.have.property('hasCar', true);
  });

  it('Should update user.', async () => {
    const updatedUser: Partial<IUser> = {
      location: 'yavne',
    };

    const userResult = await userController.updateById('0', updatedUser);
    expect(userResult).to.exist;
    expect(userResult).to.have.property('location', 'yavne');
  });

  it('Should delete user.', async () => {
    expect(await userController.deleteById('0')).to.exist;
  });
});
