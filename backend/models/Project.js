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
	version: {
		type: Number,
		required: true,
		default: 0
	},
	projects: [{
		title: String,
		livelink: String,
		day: String,
		repolink: String,
		languages: String,
		framework: String,
		description: String,
		images: String,
		createdAt: {
			type: Date,
			default: Date.now
		}
	}]
})

module.exports = mongoose.model('Project', projectSchema)