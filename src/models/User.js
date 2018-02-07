import JwtDecode from 'jwt-decode'

export default class User {
  static from (token) {
    try {
      let obj = JwtDecode(token)
      return new User(obj)
    } catch (_) {
      return null
    }
  }

  // The JWT payload is passed as argument to the User's constructor
  constructor ({ uid, admin = null }) {
    this.id = uid
    this.admin = admin
  }

  isAdmin () {
    return this.admin === true
  }
}
