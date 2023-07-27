import config from "../config/config.js";

let Products;
let Carts;
let Users;
let Tickets;

const persistence = config.persistence;

switch (persistence) {
  case "MONGO":
    console.log("Working with mongo");
    const mongoose = await import('mongoose');
    await mongoose.connect(config.mongoURL)
    const { default: mongoProductsDao } = await import('./dbManagers/products.dao.js');
    const { default: mongoCartsDao } = await import('./dbManagers/carts.dao.js');
    const { default: mongoUsersDao } = await import('./dbManagers/users.dao.js');
    const { default: mongoTicketsDao } = await import('./dbManagers/tickets.dao.js');
    Products = mongoProductsDao;
    Carts = mongoCartsDao;
    Users = mongoUsersDao;
    Tickets = mongoTicketsDao;
    break;
  case "MEMORY":
    console.log("Working with memory");
    const { default: memoryProductsDao } = await import('./fileManagers/products.dao.js');
    const { default: memoryCartsDao } = await import('./fileManagers/carts.dao.js');
    Products = memoryProductsDao;
    Carts = memoryCartsDao;
    break;
  default:
    throw new Error("Invalid persistence type");
}

export {
  Products,
  Carts,
  Users,
  Tickets
}