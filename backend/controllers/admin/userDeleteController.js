const User = require('../models/User');
const Project = require('../models/Project');
const mongoose = require('mongoose');

const deleteUser = async (req, res) => {
	const { email, username } = req.body;
	const query = email ? { email } : { username };
	const value = email || username;
	
	try {
		const foundUser = await User.findOne(query);
		const foundUserUid = foundUser.uid;
		const deleted = await admin.auth().deleteUser(foundUserUid);
		const dbDelete = await User.findOneAndDelete({ uid: foundUserUid });
		
		if (deleted && dbDelete){
				res.status(200).json({
				message: `user ${value} deleted successfully`
			});
		}
		
	} catch (err) {
		console.log(err);
		res.status(500).send('Internal server error');
	}
	
}

module.exports = { deleteUser }