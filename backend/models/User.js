const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  uid: { 
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  roles: {
    User: {
      type: Number,
      default: 2010
    },
    Admin: Number
  },
  password: {
    type: String,
    select: false,
    required: true
  },
  picture: {
		type: String
  }
})

module.exports = mongoose.model('User', userSchema)