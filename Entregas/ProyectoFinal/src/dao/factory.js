import mongoose from "mongoose";
import config from "../config/config.js";

const persistence = config.persistence;

switch (persistence) {
  case "MONGO":
    await mongoose
      .connect(config.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("MongoDB Connected"))
      .catch((err) => console.log(err));
    break;
  case "MEMORY":
    break;
  default:
    throw new Error("Invalid persistence type");
}
