const User = require('../models/User');
const Projects = require('../models/Project');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const updateProfile = async (req, res) => {
	const { email, pwd, username, profileImgURL } = req.body;
	const { uid } = req.user;
	
	try {
		const hashedPwd = await bcrypt.hash(pwd, 10);
		const user = User.findOne({uid});
		const updatedUser = await user.findOneAndUpdate({uid}, {
			email,
			username,
			password: hashedPwd,
			profileImgURL
		});
		const project = Project.findOne({uid})
		const updatedProject = await project.findOneAndUpdate({uid}, {username});
		res.status(201).send('profile updated successfully')
	} catch (err) {
		console.error(err);
		res.status(500).send('internal server error');
	}
}

module.exports = { updateProfile }