const bcrypt = require('bcrypt') 
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
})

UserSchema.pre('save', function (next) {
  const user = this
  bcrypt.hash(this.password, 10, (error, hash) => {
    user.password = hash
    next()
  })
})

UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email }, (error, user) => {
    if (error) {
      return callback(error);
    }

    if (bcrypt.compareSync(password, user.password)) {
      return callback(null, user);
    } else {
      return callback();
    }
  })
}

const User = mongoose.model('User', UserSchema)

module.exports = User
