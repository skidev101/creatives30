const User = require('../../models/User');
const Project = require('../../models/Project');
const mongoose = require('mongoose');

const getAllUsers = async (req, res) => {
	let { page = 1, limit = 15 } = req.query;
	page = parseInt(page);
	limit = parseInt(limit);
	
	if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
		return res.status(400).json({ message: 'invalid queries' });
	}
	
	try {
		const totalUsers = await User.countDocuments({ roles: { $in: ['User'] } });
		
		const users = await User.find({ roles: { $in: ['User'] } })
			.skip((page - 1) * limit)
			.limit(limit)
			.select('username email roles version createdAt streak')
			.lean();
		console.log(users);
		
		const sorted = users.map((user) => ({
				username: user.username,
				email: user.email,
				roles: user.roles,
				version: user.version,
				createdAt: user.createdAt,
				streak: user.streak
			}));
			
		
		
		res.status(200).json({
			page,
			data: sorted,
			limit,
			totalUsers
		});
		
		
	} catch (err) {
		console.log(err);
		res.status(500).send('internal server error');
	}
}

module.exports = { getAllUsers }