import mongoose from 'mongoose';
import chai from 'chai';
import UsersDao from '../../src/dao/dbManagers/users.dao.js';

const expect = chai.expect;

await mongoose.connect('mongodb+srv://GermanKempel:GcsLTjZBjYXUT5Ht@cluster0.tnbfe67.mongodb.net/testing?retryWrites=true&w=majority');

let usersDao

describe('UsersDao', () => {
  before(() => {
    usersDao = new UsersDao();
  });

  beforeEach(async () => {
    try {
      await mongoose.connection.collections.users.drop();
    }
    catch (err) {
      console.log(err);
    }
  });

  it('debe devolver todos los usuarios', async () => {
    const users = await usersDao.getAll();
    expect(users).to.be.an('array');
  });

  it('debe agregar un usuario', async () => {
    const user = {
      first_name: 'Test',
      last_name: 'User',
      email: 'test@user.com',
      age: '25',
      password: '1234'
    };

    const newUser = await usersDao.save(user);
    expect(newUser).to.have.property('_id');
    expect(newUser.first_name).to.be.equal(user.first_name);
    expect(newUser.last_name).to.be.equal(user.last_name);
    expect(newUser.email).to.be.equal(user.email);
    expect(newUser.age).to.be.equal(user.age);
    expect(newUser.password).to.be.equal(user.password);
  });

  it('debe obtener un usuario por su id', async () => {
    const user = {
      first_name: 'Test',
      last_name: 'User',
      email: 'test@user.com',
      age: '25',
      password: '1234'
    };

    const newUser = await usersDao.save(user);
    const userById = await usersDao.getById(newUser._id);
    expect(userById).to.have.property('_id');
    expect(userById.first_name).to.be.equal(user.first_name);
    expect(userById.last_name).to.be.equal(user.last_name);
    expect(userById.email).to.be.equal(user.email);
    expect(userById.age).to.be.equal(user.age);
    expect(userById.password).to.be.equal(user.password);
  });

  it('debe obtener un usuario por su email', async () => {
    const user = {
      first_name: 'Test',
      last_name: 'User',
      email: 'test@user.com',
      age: '25',
      password: '1234'
    };

    const newUser = await usersDao.save(user);
    const userByEmail = await usersDao.getByEmail(newUser.email);
    expect(userByEmail).to.have.property('_id');
    expect(userByEmail.first_name).to.be.equal(user.first_name);
    expect(userByEmail.last_name).to.be.equal(user.last_name);
    expect(userByEmail.email).to.be.equal(user.email);
    expect(userByEmail.age).to.be.equal(user.age);
    expect(userByEmail.password).to.be.equal(user.password);
  });

  it('debe actualizar un usuario', async () => {
    const user = {
      first_name: 'Test',
      last_name: 'User',
      email: 'test@user.com',
      age: '25',
      password: '1234'
    };

    const newUser = await usersDao.save(user);

    const userToUpdate = {
      first_name: 'Test Updated',
      last_name: 'User Updated',
      email: 'test@user.com',
      age: '30',
      password: '1234'
    };

    await usersDao.update(newUser._id, userToUpdate);

    const userUpdated = await usersDao.getById(newUser._id);

    expect(userUpdated.first_name).to.be.equal(userToUpdate.first_name);
    expect(userUpdated.last_name).to.be.equal(userToUpdate.last_name);
    expect(userUpdated.email).to.be.equal(userToUpdate.email);
    expect(userUpdated.age).to.be.equal(userToUpdate.age);
    expect(userUpdated.password).to.be.equal(userToUpdate.password);
  });

  it('debe borrar un usuario', async () => {
    const user = {
      first_name: 'Test',
      last_name: 'User',
      email: 'test@user.com',
      age: '25',
      password: '1234'
    };

    const newUser = await usersDao.save(user);
    const deletedUser = await usersDao.delete(newUser._id);

    expect(deletedUser.first_name).to.be.equal(undefined);
    expect(deletedUser.last_name).to.be.equal(undefined);
    expect(deletedUser.email).to.be.equal(undefined);
    expect(deletedUser.age).to.be.equal(undefined);
    expect(deletedUser.password).to.be.equal(undefined);
  });
}
);
