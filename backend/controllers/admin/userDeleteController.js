const User = require('../models/User');
const Project = require('../models/Project');
const mongoose = require('mongoose');

const deleteUser = async (req, res) => {
	const { email, username } = req.body;
	const param = email || username;
	
	try {
		const foundUser = await User.findOne({ param });
		const foundUserUid = foundUser.uid;
		const deleted = await admin.auth().deleteUser(foundUserUid);
		const dbDelete = await User.findOneAndDelete({ foundUserUid });
		
		res.status(200).json({
			message: `user ${param} deleted successfully`
		})
	} catch (err) {
		console.log(err);
		res.status(500).send('Internal server error');
	}
	
}

module.exports = { deleteUser }