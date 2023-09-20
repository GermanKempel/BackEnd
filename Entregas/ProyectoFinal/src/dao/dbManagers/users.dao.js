import userModel from './models/users.model.js';

export default class UsersDao {
  constructor() {
    console.log('Working Users with DB')
  }

  getAll = async () => {
    const users = await userModel.find().lean();
    return users;
  }

  getById = async (userId) => {
    const user = await userModel.findById(userId).lean();
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

  update = async (userId, user, uploadDocuments) => {
    const result = await userModel.updateOne({ _id: userId }, user, uploadDocuments);
    return result;
  }

  updateRole = async (userId, role) => {
    const result = await userModel.updateOne({ _id: userId }, { role });
    return result;
  }
  updateToPremium = async (userId) => {
    const result = await userModel.updateOne({ _id: userId }, { premium: true });
    return result;
  }

  delete = async (userId) => {
    const result = await userModel.deleteOne({ _id: userId });
    return result;
  }

  deleteAll = async () => {
    const result = await userModel.deleteMany();
    return result;
  }
}

