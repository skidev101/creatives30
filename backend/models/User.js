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
  roles: [{
		type: String,
		enum: ['User', 'Admin'],
		default: ['User']
  }],
  password: {
    type: String,
    select: false
  },
  profileImgURL: {
		type: String
  }
})

module.exports = mongoose.model('User', userSchema)