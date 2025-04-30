const User = require('../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const forgotPassword = async (req, res) => {
	const { email, newPwd } = req.body;
	if (!pwd) return res.status(400).json({ message: empty request });
	
	
	try {
		const hashedPwd = await bcrypt.hash(newPwd, 10);
		const updatedUser = await User.findOneAndUpdate({ email }, { password: hashedPwd }, { new: true });
		res.status(200).json({
			message: 'password updated successfully',
		});
		console.log(updatedUser);
		
	} catch (err) {
		console.error(err);
		res.status(500).send('internal server error');
	}
}

module.exports = { forgotPassword }