const User = require('../models/User');
const Project = require('../models/Project');
const Commit = require('../models/Commit');
const VersionHistory = require('../models/VersionHistory');
const moment = require('moment');
const mongoose = require('mongoose');

const userProfile = async (req, res) => {
  const { user } = req.params;
  
  try {
    const foundUser = await User.findOne({ username: user });
    if (!foundUser) return res.status(404).send('user not found');
    const foundUserProjects = await Project.findOne({ username: user });
    const userId = foundUser._id;
    const latestVersionDoc = await VersionHistory.findOne().sort({ version: - 1 });
    const latestVersion = latestVersionDoc.version;
    const startDate = moment(latestVersionDoc.startDate) 
    const endDate  = moment(startDate).add(30, 'days');
    const currentDate = moment();
    let currentDay;
		
		if (currentDate.isBefore(startDate)) {
			currentDay = 0
		} else if (currentDate.isAfter(endDate)) {
			currentDay = 30
		} else {
			currentDay = currentDate.diff(startDate, 'days') + 1;
		}
    
    const days = [];
    for (let i = 0; i <= currentDate.diff(startDate, 'days'); i++) {
			days.push(startDate.clone().add(i, 'days').format('DD-MM-YYYY'));
    }
    
    const commits = await Commit.find({
			userId,
			version: latestVersion,
			date: { $in: days }
    });
    
    const commitDates = commits.map((commit) => commit.date);
    const commitHistory = days.map((date) => ({
			date,
			commits: commitDates.includes(date)
    }));
    
    res.status(200).json({
			user: foundUser.username,
			email: foundUser.email,
			profileImgURL: foundUser.profileImgURL,
			projects: foundUserProjects ? foundUserProjects.projects : [],
			streaks: foundUser.versions,
			commitHistory: commitHistory,
			day: currentDay
    });
		console.log(foundUser);
		
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { userProfile }