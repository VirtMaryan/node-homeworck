module.exports = {
  EMAIL_REGEXP: new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/),
  PASSWORD_REGEXP: new RegExp(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/),
  CURRENT_YEAR: new Date().getFullYear()
}
