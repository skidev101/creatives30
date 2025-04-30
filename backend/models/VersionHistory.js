const mongoose = require('mongoose');

const versionHistorySchema = new mongoose.Schema({
	uid: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	version: {
		type: Number,
		required: true
	},
	startDate: {
		type: String,
		required: true
	},
	createdBy: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('VersionHistory', versionHistorySchema)