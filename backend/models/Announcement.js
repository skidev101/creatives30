const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
	createdBy: {
		type: String,
		required: true
	},
	version: {
		type: Number,
		required: true
	},
	announcement: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})


module.exports = mongoose.model('Announcement', announcementSchema)