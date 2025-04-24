const User = require('../models/User');
const Commit = require('../models/Commit');
const mongoose = require('mongoose');
const moment = require('moment');

const getUserStreak = async (req, res) => {
	//const { uid } = req.body ...for testing purpose
  const { uid } = req.user;
  console.log(`uid: ${uid}`);
  
  try {
    const foundUser = await User.findOne({uid});
    if (!foundUser) return res.status(404).json({ message: 'user not found' });
    const userId = foundUser._id;
    const today = moment();
    
    const days = [];
    for (let i = 0; i < 30; i++) {
			days.push(today.clone().add(i, 'days').format('DD-MM-YYYY'));
    }
    const recentCommits = await Commit.find({
			userId,
			date: { $in: days }
    });
    const commitedDates = recentCommits.map((c) => c.date);
    const activity = days.map((date) => ({
			date,
			commited: commitedDates.includes(date)
    }));
    
    return res.status(200).json({
			streak: foundUser.streak.count,
			lastCommit: foundUser.streak.lastCommitDate,
			activity
    })
    
  } catch(err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
}

module.exports = { getUserStreak }