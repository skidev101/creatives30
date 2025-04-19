const User = require('../../models/User');
const mongoose = require('mongoose');

const getAllAdmins = async (req, res) => {
	let { page = 1, limit = 15 } = req.query;
	page = parseInt(page);
	limit = parseInt(limit);
	
	if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
		return res.status(400).json({ message: 'invalid queries' });
	}
	
	try {
		const totalUsers = await User.countDocuments({ roles: { $in: ['Admin'] } });
		
		const users = await User.find({ roles: { $in: ['Admin'] } })
			.skip((page - 1) * limit)
			.limit(limit)
			.select('username email roles version createdAt')
			.lean();
		
		const sorted = users.map((user) => ({
				username: user.username,
				email: user.email,
				roles: user.roles,
				version: user.version,
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

module.exports = { getAllAdmins }