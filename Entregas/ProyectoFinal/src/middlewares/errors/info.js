export const generateProductErrorInfo = (product) => {
  return `One or more properties were imcomplete or not valid.
  List of required properties:
  * title: needs to be a string, received ${product.title}
  * description: needs to be a string, received ${product.description}
  * price: needs to be a number, received ${product.price}
  `
}

export const generateProductNotFoundErrorInfo = (productId) => {
  return `Product with id ${productId} not found
  * Check if the product exists
  * Check if the product id is correct
  * Check if the product id is a number`
}

export const generateProductAlreadyExistsErrorInfo = (productId) => {
  return `Product with id ${productId} already exists
  * Check if the product id is correct`
}

export const generateProductNotValidErrorInfo = (productId) => {
  return `Product with id ${productId} is not valid
  * Check if the product id is correct
  * Check if the product id is a number
  * Check if the product exists`
}

export const generateUserErrorInfo = (user) => {
  return `One or more properties were imcomplete or not valid.
  List of required properties:
  * username: needs to be a string, received ${user.first_name}
  * password: needs to be a string, received ${user.password}
  * email: needs to be a string, received ${user.email}`
}