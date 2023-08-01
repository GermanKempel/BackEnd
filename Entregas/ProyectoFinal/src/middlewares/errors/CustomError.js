export default class CustomError {
  static createError({ name, message, code, cause }) {
    let error = new Error(message, { cause });
    error.name = name;
    error.code = code;
    return error;
  }
}