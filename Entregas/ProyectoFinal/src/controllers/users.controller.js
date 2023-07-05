import {
  saveUser as saveUserService,
  getAllUsers as getAllUsersService,
  getUserByEmail as getUserByEmailService
} from "../services/users.service.js";

const saveUser = async (req, res) => {
  const user = req.body;
  await saveUserService(user);
  res.send(user)
}

const getAllUsers = async (req, res) => {
  const users = await getAllUsersService();
  res.send(users);
}

const getUserByEmail = async (req, res) => {
  const email = req.params.email;
  const user = await getUserByEmailService(email);
  if (!user) {
    res.status(404).send({ status: 'error', message: 'User not found' });
    return;
  }
  res.send(user);
}

export {
  saveUser,
  getAllUsers,
  getUserByEmail
}
