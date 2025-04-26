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
  },
  createdAt: {
		type: Date,
		default: Date.now
  },
  versions: [
		{
			version: Number,
			streak: {
				count: Number,
				lastCommitDate: String
			},
			commits: [String]
		}
	],
  disabled: {
		type: String,
		default: false
  }
})

module.exports = mongoose.model('User', userSchema)