import * as usersService from "../services/users.service.js";
import UsersDto from "../dao/DTOs/users.dto.js";
import CustomError from '../middlewares/errors/CustomError.js';
import EErrors from '../middlewares/errors/enums.js';
import { generateUserErrorInfo } from '../middlewares/errors/info.js';
import logger from '../utils/loggers.js';

const saveUser = async (req, res) => {
  try {
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
  } catch (error) {
    logger.info('Error trying to save user', error);
    res.status(500).send({ status: "error", message: error.message });
  }
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

const getByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await usersService.getByEmail(email);
    res.send({ status: "success", user });
  } catch (error) {
    logger.info('Error trying to get user by email', error);
    res.status(500).send({ status: "error", message: error.message });
  }
};

const getUserDTO = async (req, res) => {
  try {
    const user = req.user;
    const userDTO = new UsersDto(user);
    res.send({ status: "success", user: userDTO });
  } catch (error) {
    logger.info('Error trying to get user by email', error);
    res.status(500).send({ status: "error", message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const userId = req.params.uid;
    const user = await usersService.getById(userId);
    res.send({ status: "success", user });
  } catch (error) {
    logger.info('Error trying to get user by id', error);
    res.status(500).send({ status: "error", message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const user = req.body;
    const uploadDocuments = req.files;
    const updatedUser = await usersService.update(user, uploadDocuments);
    if (uploadDocuments) {
      res.send({ status: "success", message: 'Documents uploaded successfully' });
    }
    res.send({ status: "success", user: updatedUser });
  } catch (error) {
    logger.info('Error trying to update user', error);
    res.status(500).send({ status: "error", message: error.message });
  }
}

const updateRole = async (req, res) => {
  try {
    const userId = req.params.uid;
    const role = req.body.role;
    const user = await usersService.updateRole(userId, role);
    res.send({ status: "success", user, role });
  } catch (error) {
    logger.info('Error trying to update user rol', error);
    res.status(500).send({ status: "error", message: error.message });
  }
}
const updateToPremium = async (req, res) => {
  try {
    const userId = req.params.uid;
    const user = await usersService.getById(userId);

    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found." });
    }
    if (user.role === 'premium') {
      return res.status(400).json({ status: "error", message: "User is already premium." });
    }
    if (
      !user.documents.includes('identificacion') ||
      !user.documents.includes('comprobanteDeDomicilio') ||
      !user.documents.includes('comprobanteDeEstadoDeCuenta')
    ) {
      return res.status(400).json({ status: "error", message: "User has not completed document submission." });
    }

    user.role = 'premium';
    await user.save();

    res.send({ status: "success", user });
  } catch (error) {
    logger.info('Error trying to update user to premium', error);
    res.status(500).send({ status: "error", message: error.message });
  }
}

const deleteAll = async (req, res) => {
  try {
    await usersService.deleteAll();
    res.send({ status: "success", message: 'Users deleted successfully' });
  } catch (error) {
    logger.info('Error trying to delete all users', error);
    res.status(500).send({ status: "error", message: error.message });
  }
}

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.uid;
    const user = await usersService.deleteUser(userId);
    res.send({ status: "success", user });
  } catch (error) {
    logger.info('Error trying to delete user', error);
    res.status(500).send({ status: "error", message: error.message });
  }
}

const deleteInactiveUser = async (req, res) => {
  try {
    const userId = req.params.uid;
    const user = await usersService.deleteInactiveUser(userId);
    res.send({ status: "success", user });
  } catch (error) {
    logger.info('Error trying to delete inactive user', error);
    res.status(500).send({ status: "error", message: error.message });
  }
}

export {
  updateRole,
  updateToPremium,
  update,
  saveUser,
  getAllUsers,
  getByEmail,
  getUserDTO,
  getById,
  deleteAll,
  deleteUser,
  deleteInactiveUser,
}
