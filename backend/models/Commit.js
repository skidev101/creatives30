const mongoose = require('mongoose');

const commitSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	date: {
		type: String,
		required: true
	},
	version: {
		type: Number,
		required: true
	}
})

commitSchema.index({ userId: 1, date: 1, version: 1 }, { unique: true })

module.exports = mongoose.model('Commit', commitSchema)