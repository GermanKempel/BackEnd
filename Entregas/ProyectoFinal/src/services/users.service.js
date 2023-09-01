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

const getUserDTO = async (email) => {
  const user = await getUserByEmail(email);
  return user;
}

const getById = async (id) => {
  const user = await usersRepository.getById(id);
  return user;
}

const update = async (id, user) => {
  const result = await usersRepository.update(id, user);
  return result;
}

const updateToPremium = async (id) => {
  const result = await usersRepository.updateToPremium(id);
  return result;
}

export {
  updateToPremium,
  getById,
  update,
  getUserDTO,
  saveUser,
  getAllUsers,
  getUserByEmail
}