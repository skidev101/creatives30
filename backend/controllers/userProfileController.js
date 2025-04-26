const User = require('../models/User');
const Project = require('../models/Project');
const Commit = require('../models/Commit');
const moment = require('moment');
const mongoose = require('mongoose');

const userProfile = async (req, res) => {
  const { user } = req.params;
  console.log(user);
  
  console.log(`username: ${user}`);
  const start = moment().subtract(29, 'days');
  
  try {
    const foundUser = await User.findOne({ username: user });
    if (!foundUser) return res.status(404).send('user not found');
    const foundUserProjects = await Project.findOne({ username: user });
    const userId = foundUser._id;
    
    const last30Days = Array.from({ length: 30 }, (_, i) =>
			moment(start).add(i, 'days').format('DD-MM-YYYY')
    );
    const commits = await Commit.find({
			userId,
			date: { $in: last30Days }
    });
    const commitDates = commits.map((commit) => commit.date);
    const commitHistory = last30Days.map((date) => ({
			date,
			commits: commitDates.includes(date)
    }));
    
    res.status(200).json({
			user: foundUser.username,
			email: foundUser.email,
			profileImgURL: foundUser.profileImgURL,
			projects: foundUserProjects ? foundUserProjects.projects : [],
			commitHistory: commitHistory
    });
		console.log(foundUser);
		
  } catch(err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
}

module.exports = { userProfile }