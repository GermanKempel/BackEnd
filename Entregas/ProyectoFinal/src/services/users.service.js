import { sendMail } from "./mail.services.js";
import { generateToken } from '../utils.js';
import { createHash } from "../utils.js";
import CartsRepository from "../repositories/carts.repository.js";
import UsersRepository from "../repositories/users.repository.js";

const usersRepository = new UsersRepository();
const cartsRepository = new CartsRepository();

const loginUser = async (email, password) => {
  try {
    const user = await usersRepository.getByEmail(email);

    if (!user || !password) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken(user);

    user.last_connection = new Date();

    if (!user.cart) {
      const cart = {
        userId: user._id,
        timestamp: new Date(),
        products: [],
      };
      const createdCart = await cartsRepository.saveCart(cart);
      user.cart = createdCart._id;
    }

    const { _id, ...updatedUser } = user;
    await usersRepository.update(_id, updatedUser);

    const lastUser = await usersRepository.getById(_id);

    return { token, cart: user.cart, user: lastUser };

  } catch (error) {
    throw error;
  }
};

const registerUser = async (userData) => {
  const { email, password } = userData;

  const existingUser = await usersRepository.getByEmail(email);

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hash = createHash(password);
  const newUser = {
    ...userData,
    password: hash,
  };

  const createdUser = await usersRepository.save(newUser);

  return createdUser;
};

const saveUser = async (user) => {
  const result = await usersRepository.save(user);
  return result;
}

const getAllUsers = async () => {
  const users = await usersRepository.getAll();

  const usersData = users.map(user => ({
    id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role

  }));

  return usersData;
}

const getByEmail = async (email) => {
  const user = await usersRepository.getByEmail(email);
  return user;
}

const getUserDTO = async (email) => {
  const user = await getByEmail(email);
  return user;
}

const getById = async (userId) => {
  const user = await usersRepository.getById(userId);
  return user;
}

const update = async (user, uploadDocuments) => {
  const result = await usersRepository.update(user, uploadDocuments);
  return result;
}

const updateRole = async (userId, role) => {
  const result = await usersRepository.updateRole(userId, role);
  return result;
}

const updateToPremium = async (userId) => {
  const result = await usersRepository.updateToPremium(userId);
  return result;
}

const deleteUser = async (userId) => {
  const result = await usersRepository.delete(userId);
  return result;
}
const deleteInactiveUser = async (userId) => {

  const user = await usersRepository.getById(userId);

  const lastConnection = user.last_connection;
  const inactiveTime = Date.now() - lastConnection.getTime();
  const inactiveDays = Math.floor(inactiveTime / (1000 * 60 * 60 * 24));

  if (inactiveDays >= 2) {
    await usersRepository.delete(userId);

    await sendMail({
      to: user.email,
      subject: 'Tu cuenta ha sido suspendida',
      html: 'Tu cuenta ha sido suspendida por inactividad.'
    })
  }
}


const deleteAll = async () => {
  const result = await usersRepository.deleteAll();
  return result;
}

export {
  deleteInactiveUser,
  updateRole,
  updateToPremium,
  getById,
  update,
  getUserDTO,
  saveUser,
  getAllUsers,
  getByEmail,
  deleteUser,
  deleteAll,
  loginUser,
  registerUser
}