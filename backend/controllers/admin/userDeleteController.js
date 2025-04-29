const admin = require('firebase-admin');
const User = require('../../models/User');
const Project = require('../../models/Project');
const mongoose = require('mongoose');

const deleteUser = async (req, res) => {
	const { email, username } = req.body;
	const query = email ? { email } : { username };
	const value = email || username;
	
	try {
		const foundUser = await User.findOne(query);
		if (!foundUser) return res.status(404).json({ message: "user not found"});
		const foundUserUid = foundUser.uid;
		const [fbDelete, dbDelete] = await Promise.all([
			admin.auth().deleteUser(foundUserUid),
			User.findOneAndDelete({ uid: foundUserUid })
		  ]);
		if (fbDelete && dbDelete){
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