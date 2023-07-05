import mongoProductsDao from './dbManagers/products.dao.js'
import mongoCartsDao from './dbManagers/carts.dao.js'
import mongoUsersDao from './dbManagers/users.dao.js'

const MongoProductsDao = new mongoProductsDao();
const MongoCartsDao = new mongoCartsDao();
const MongoUsersDao = new mongoUsersDao();

// export const PRODUCTSDAO = config.persistance === 'MEMORY' ? MemoryProductsDao : MongoProductsDao;

export const PRODUCTSDAO = MongoProductsDao;
export const CARTSDAO = MongoCartsDao;
export const USERSDAO = MongoUsersDao;