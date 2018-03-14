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

before('Clear users test DB.', async () => {
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
      address: 'tel aviv',
      hasCar: true,
    });

    expect(await userController.save(user)).to.exist;
  });

  it('Should find user.', async () => {
    const user = await userController.getByUsername('0');
    expect(user).to.exist;
  });

  it('Should update user.', async () => {
    const updatedUser: Partial<IUser> = {
      firstname: 'omri',
    };

    const userResult = await userController.updateByUsername('0', updatedUser);
    expect(userResult).to.exist;
  });

  it.skip('Should delete user.', async () => {
    expect(await userController.deleteByUsername('0')).to.exist;
  });
});
