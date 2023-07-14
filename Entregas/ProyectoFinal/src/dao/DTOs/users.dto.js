export default class UsersDto {
  constructor(user) {
    this.name = `${user.name} ${user.lastName}`
    this.email = user.email
    this.age = user.age
  }
}