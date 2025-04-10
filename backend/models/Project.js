const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	uid: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	projects: {
		type: Object
	}
})

module.exports = mongoose.model('Project', projectSchema)