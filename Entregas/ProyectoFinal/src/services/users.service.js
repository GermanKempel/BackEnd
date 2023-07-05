import { USERSDAO } from "../dao/index.js";

const saveUser = async (user) => {
  await USERSDAO.save(user);
  return user;
}

const getAllUsers = async () => {
  return await USERSDAO.getAll();
}

const getUserByEmail = async (email) => {
  return await USERSDAO.getByEmail(email);
}

export {
  saveUser,
  getAllUsers,
  getUserByEmail
}
