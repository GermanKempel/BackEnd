import * as usersService from "../services/users.service.js";
import UsersDto from "../dao/DTOs/users.dto.js";
import CustomError from '../middlewares/errors/CustomError.js';
import EErrors from '../middlewares/errors/enums.js';
import { generateUserErrorInfo } from '../middlewares/errors/info.js';
import logger from '../utils/loggers.js';

const saveUser = async (req, res) => {
  const user = req.body;
  if (!user.first_name || !user.password || !user.email) {
    throw CustomError.createError({
      name: 'IncompleteUserError',
      cause: generateUserErrorInfo(user),
      message: 'Error trying to save user',
      code: EErrors.INVALID_TYPE_ERROR
    });
  }
  const savedUser = await usersService.saveUser(user);
  res.send({ status: "success", user: savedUser });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAllUsers();
    res.send({ status: "success", users });
  } catch (error) {
    logger.info('Error trying to get all users', error);
    res.status(500).send({ status: "error", message: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await usersService.getUserByEmail(email);
    res.send({ status: "success", user });
  } catch (error) {
    logger.info('Error trying to get user by email', error);
    res.status(500).send({ status: "error", message: error.message });
  }
};

const getUserDTO = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await usersService.getUserByEmail(email);
    const userDTO = new UsersDto(user);
    res.send({ status: "success", user: userDTO });
  } catch (error) {
    logger.info('Error trying to get user by email', error);
    res.status(500).send({ status: "error", message: error.message });
  }
};

export {
  saveUser,
  getAllUsers,
  getUserByEmail,
  getUserDTO
}
