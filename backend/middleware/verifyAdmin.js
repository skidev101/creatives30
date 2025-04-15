const User = require('../models/User');
const mongoose = require('mongoose');

const verifyAdmin = async (req, res, next) => {
	const { uid } = req.user;
	
	try {
		const foundUser = await User.findOne({uid});
		const foundAdmin = foundUser.roles.includes("Admin");
		if (!foundAdmin) return res.status(401).json({message: 'You do not have access to this route'});
		
		next()
	} catch (err) {
		console.log(err);
		res.status(500).json({message: 'Internal server error-verifyAdmin'});
	}
}


module.exports = verifyAdmin;