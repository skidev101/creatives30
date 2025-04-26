const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
	projectId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project',
		required: true
	},
	uid: {
		type: String,
		ref: 'User'
	},
	stars: {
		type: String,
		required: true,
		min: 1,
		max: 5
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})


module.exports = mongoose.model('Rating', ratingSchema)