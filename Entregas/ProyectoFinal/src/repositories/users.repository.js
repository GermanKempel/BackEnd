import UsersDao from "../dao/dbManagers/users.dao";

export default class UsersRepository {
  constructor() {
    this.usersDao = new UsersDao();
  }

  getAll = async () => {
    const users = await this.usersDao.getAll();
    return users;
  }

  getByEmail = async (email) => {
    const user = await this.usersDao.getByEmail(email);
    return user;
  }

  save = async (user) => {
    const result = await this.usersDao.save(user);
    return result;
  }
}
