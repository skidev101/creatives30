const admin = require('firebase-admin');
const User = require('../../models/User');
const Project = require('../../models/Project');
const mongoose = require('mongoose');

const disableUser = async (req, res) => {
	const { email, username } = req.body;
	const query = email ? { email } : { username };
	const value = email || username;
	
	try {
		const foundUser = await User.findOne(query);
		if (!foundUser) return res.status(404).json({ message: "user not found"});
		const uid = foundUser.uid;
		const fbDisable = await admin.auth().updateUser(uid, {
			disabled: true,
		});
		const dbDisable = await User.findOneAndUpdate({ uid }, { disabled: true });
		
		if (fbDisable && dbDisable){
				res.status(200).json({
				message: `user ${value} disabled successfully`
			});
		}
		
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Internal server error' });
	}
	
}

const enableUser = async (req, res) => {
	const { email, username } = req.body;
	const query = email ? { email } : { username };
	const value = email || username;
	
	try {
		const foundUser = await User.findOne(query);
		if (!foundUser) return res.status(404).json({ message: "user not found"});
		const uid = foundUser.uid;
		const fbEnable = await admin.auth().updateUser(uid, {
			disabled: false,
		});
		const dbEnable = await User.findOneAndUpdate({ uid }, { disabled: false });
		
		if (fbEnable && dbEnable){
				res.status(200).json({
				message: `user ${value} enabled successfully`
			});
		}
		
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Internal server error' });
	}
	
}

module.exports = { 
	disableUser,
	enableUser
}