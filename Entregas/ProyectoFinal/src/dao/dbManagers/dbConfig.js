import mongoose from "mongoose";
import config from "../../config/config.js";

const URL = config.mongoURL;

try {
  await mongoose.connect(URL);
  console.log("Base de datos conectada");
} catch (error) {
  console.log("Error al conectar a la base de datos");
}