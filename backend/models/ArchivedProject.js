const mongoose = require('mongoose');

const archivedProjectSchema = new mongoose.Schema({
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
	projects: [{
		livelink: String,
		day: String,
		repolink: String,
		languages: String,
		framework: String,
		description: String,
		createdAt: String
	}],
	archivedAt: {
			type: Date,
			default: Date.now
	}
})

module.exports = mongoose.model('ArchivedProject', archivedProjectSchema)