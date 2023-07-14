import UsersRepository from "../repositories/users.repository.js";

const usersRepository = new UsersRepository();

const saveUser = async (user) => {
  const result = await usersRepository.save(user);
  return result;
}

const getAllUsers = async () => {
  const users = await usersRepository.getAll();
  return users;
}

const getUserByEmail = async (email) => {
  const user = await usersRepository.getByEmail(email);
  return user;
}

export {
  saveUser,
  getAllUsers,
  getUserByEmail
}