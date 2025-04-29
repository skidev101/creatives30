const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
	uid: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	version: {
		type: Number,
		required: true
	},
	bugReport: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('Bug', bugSchema)