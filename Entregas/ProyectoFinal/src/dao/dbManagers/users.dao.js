import userModel from './models/users.model.js';

export default class UsersDao {
  constructor() {
    console.log('Working Users with DB')
  }

  getAll = async () => {
    const users = await userModel.find();
    return users.map(user => user.toObject());
  }

  getById = async (id) => {
    const user = await userModel.findById(id).lean();
    return user;
  }

  getByEmail = async (email) => {
    const user = await userModel.findOne({ email }).lean();
    return user;
  }

  save = async (user) => {
    const result = await userModel.create(user);
    return result;
  }

  update = async (user) => {
    const result = await userModel.updateOne({ _id: user._id }, user);
    return result;
  }
}

