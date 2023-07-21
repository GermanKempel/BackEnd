import {
  saveUser as saveUserService,
  getAllUsers as getAllUsersService,
  getUserByEmail as getUserByEmailService
} from "../services/users.service.js";
import UsersDto from "../dao/DTOs/users.dto.js";
import CustomError from '../middlewares/errors/CustomError.js';
import EErrors from '../middlewares/errors/enums.js';
import { generateUserErrorInfo } from '../middlewares/errors/info.js';

const saveUser = async (req, res) => {
  try {
    const user = req.body;
    const { first_name, last_name, email } = user;

    if (!first_name || !last_name || !email) {
      throw new CustomError(EErrors.INVALID_TYPE_ERROR, generateUserErrorInfo(user));
    }

    const savedUser = await saveUserService(user);
    res.send({ status: "success", user: savedUser });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.send({ status: "success", users });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await getUserByEmailService(email);
    res.send({ status: "success", user });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

const getUserDTO = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await getUserByEmailService(email);
    const userDTO = new UsersDto(user);
    res.send({ status: "success", user: userDTO });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

export {
  saveUser,
  getAllUsers,
  getUserByEmail,
  getUserDTO
}
