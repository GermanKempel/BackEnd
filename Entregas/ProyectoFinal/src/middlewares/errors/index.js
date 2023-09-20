import EErrors from "./enums.js";

export default (error, req, res, next) => {
  let statusCode;

  switch (error.code) {
    case EErrors.ROUTING_ERROR:
    case EErrors.PRODUCT_NOT_FOUND:
      statusCode = 404;
      break;
    case EErrors.INVALID_TYPE_ERROR:
    case EErrors.DATABASE_ERROR:
    default:
      statusCode = 500;
      break;
  }

  res.status(statusCode).send({
    status: 'error',
    error: error.name,
    description: error.cause
  });

  next();
}

