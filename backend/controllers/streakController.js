const User = require('../models/User');
const Commit = require('../models/Commit');
const VersionHistory = require('../models/VersionHistory');
const mongoose = require('mongoose');
const moment = require('moment');

const getUserStreak = async (req, res) => {
	//const { uid } = req.body //...for testing purpose
  const { uid } = req.body;
  console.log(`uid: ${uid}`);
  
  try {
    const foundUser = await User.findOne({uid});
    if (!foundUser) return res.status(404).json({ message: 'user not found' });
    const latestVersionDoc = await VersionHistory.findOne().sort({ version: - 1 });
    const latestVersion = latestVersionDoc.version;
    const foundUserVersion = foundUser.versions.find((v) => v.version === latestVersion);
    console.log(latestVersionDoc);
    console.log(latestVersion);
    console.log(foundUser);
    console.log(foundUserVersion);
    if (!foundUserVersion) return res.status(404).json({ message: 'version not found' });
    
    
    const userId = foundUser._id;
    const today = moment();
    
    const days = [];
    for (let i = 0; i < 30; i++) {
			days.push(today.clone().subtract(i, 'days').format('DD-MM-YYYY'));
    }
    const recentCommits = await Commit.find({
			userId,
			date: { $in: days },
			version: latestVersion
    });
    const commitedDates = recentCommits.map((c) => c.date);
    const activity = days.map((date) => ({
			date,
			commited: commitedDates.includes(date)
    }));
    
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    activity.forEach((day, index) => {
			if (day.commited) {
				currentStreak++;
				tempStreak++;
			} else {
				longestStreak = Math.max(longestStreak, tempStreak);
				tempStreak = 0;
			}
    })
    
    longestStreak = Math.max(longestStreak, tempStreak);
    foundUserVersion.streak.count = currentStreak;
    foundUserVersion.streak.lastCommitDate = today.toDate();
    foundUserVersion.commits = commitedDates;
    
    await foundUser.save();
    
    return res.status(200).json({
			streak: currentStreak,
			longestStreak: longestStreak,
			lastCommit: foundUserVersion.streak.lastCommitDate,
			activity
    })
    
  } catch(err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
}

module.exports = { getUserStreak }