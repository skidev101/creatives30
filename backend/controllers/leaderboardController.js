const mongoose = require('mongoose');
const Project = require('../models/Project');

const getLeaderboard = async (req, res) => {
	try {
		const leaderboard = await Project.find();
		res.send(leaderboard);
	} catch (err) {
		console.error(err);
		res.status(500).send('an error occured while fetching the leaderboard');
	}
}

module.exports = { getLeaderboard }