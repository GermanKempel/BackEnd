import UsersDao from "../dao/dbManagers/users.dao.js";

export default class UsersRepository {
  constructor() {
    this.usersDao = new UsersDao();
  }

  getAll = async () => {
    const users = await this.usersDao.getAll();
    return users;
  }

  getById = async (userId) => {
    const user = await this.usersDao.getById(userId);
    return user;
  }

  getByEmail = async (email) => {
    const user = await this.usersDao.getByEmail(email);
    return user;
  }

  save = async (user) => {
    const result = await this.usersDao.save(user);
    return result;
  }

  update = async (userId, user, uploadDocuments) => {
    const result = await this.usersDao.update(userId, user, uploadDocuments);
    return result;
  }

  updateRole = async (userId, role) => {
    const result = await this.usersDao.updateRole(userId, role);
    return result;
  }

  updateToPremium = async (userId) => {
    const result = await this.usersDao.updateToPremium(userId);
    return result;
  }

  delete = async (userId) => {
    const result = await this.usersDao.delete(userId);
    return result;
  }

  deleteAll = async () => {
    const result = await this.usersDao.deleteAll();
    return result;
  }
}