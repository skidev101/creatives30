const User = require('../models/User');
const Project = require('../models/Project');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const updateProfile = async (req, res) => {
	const { uid, email, pwd, username, profileImgURL } = req.body;
	//const { uid } = req.user;
	
	const updates = {};
	if (email) updates.email = email;
	if (username) updates.username = username;
	if (profileImgURL) updates.profileImgURL = profileImgURL;
	if (pwd) {
		const hashedPwd = await bcrypt.hash(pwd, 10);
		updates.password = hashedPwd;
	}
	
	if (Object.keys(updates).length === 0) {
		return res.status(401).send('invalid request');
	}
	
	try {
		const updatedUser = await User.findOneAndUpdate({uid}, updates, {new: true});
		const updatedProject = await Project.findOneAndUpdate({uid}, {username: updates.username}, {new: true});
		res.status(201).json({updatedUser: updatedUser});
		console.log(updatedUser);
		console.log(updateProfile);
		
	} catch (err) {
		console.error(err);
		res.status(500).send('internal server error');
	}
}

module.exports = { updateProfile }