import mongoProductsDao from './dbManagers/products.dao.js'
import mongoCartsDao from './dbManagers/carts.dao.js'
import mongoUsersDao from './dbManagers/users.dao.js'
import memoryProductsDao from './fileManagers/products.dao.js'
import memoryCartsDao from './fileManagers/carts.dao.js'

const MongoProductsDao = new mongoProductsDao();
const MongoCartsDao = new mongoCartsDao();
const MongoUsersDao = new mongoUsersDao();

const MemoryProductsDao = new memoryProductsDao();
const MemoryCartsDao = new memoryCartsDao();


export const PRODUCTSDAO = config.persistance === 'MEMORY' ? MemoryProductsDao : MongoProductsDao;
export const CARTSDAO = config.persistance === 'MEMORY' ? MemoryCartsDao : MongoCartsDao;
export const USERSDAO = config.persistance === 'MEMORY' ? MemoryUsersDao : MongoUsersDao;

// export const PRODUCTSDAO = MongoProductsDao;
// export const CARTSDAO = MongoCartsDao;
// export const USERSDAO = MongoUsersDao;