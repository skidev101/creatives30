const mongoose = require('mongoose');

const singleProjectSchema = new mongoose.Schema({
	title: String,
	livelink: String,
	day: String,
	repolink: String,
	languages: String,
	framework: String,
	description: String,
	images: [{ type: String }],
	createdAt: {
		type: Date,
		default: Date.now
	}
}); 
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
	projects: [singleProjectSchema]
}, { timestamps: true }); // adds createdAt/updatedAt at root level

module.exports = mongoose.model('Project', projectSchema)
