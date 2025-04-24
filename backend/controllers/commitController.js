const User = require('../models/User');
const Commit = require('../models/Commit');
const mongoose = require('mongoose');
const moment = require('moment');


const handleCommit = async (req, res) => {
	//const { uid } = req.body ...for testing purposes
  const { uid } = req.user;
  console.log(`uid: ${uid}`);
  const today = moment().format('DD-MM-YYYY');
  const yesterday = moment().subtract(1, 'days').format('DD-MM-YYYY');
  
  try {
		const foundUser = await User.findOne({uid});
		if (!foundUser) return res.status(404).json({ message: 'user not found' });
    const userId = foundUser._id;
    const existingCommit = await Commit.findOne({ userId, date: today});
    
    
		const result = await Commit.updateOne(
			{ userId, date: today },
			{ $setOnInsert: { userId, date: today } },
			{ upsert: true }
		);
		
		if (result.upsertedCount === 1 || result.nModified === 1) {
			const lastCommit = foundUser.streak.lastCommitDate;
			const newStreak = lastCommit === yesterday ? foundUser.streak.count + 1 : 1;
			
			foundUser.streak.count = newStreak;
			foundUser.streak.lastCommitDate = today;
			
			await foundUser.save();
		}
		
    return res.status(200).json({
			message: 'commit logged successfully',
			date: today,
			streakCount: foundUser.streak.count
    });
    
  } catch(err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
}


const getCommitHistory = async (req, res) => {
	//const { uid } = req.body  ...for testing
  const { uid } = req.user;
  console.log(`uid: ${uid}`);
  const start = moment().subtract(29, 'days');
  
  try {
    const foundUser = await User.findOne({uid});
    if (!foundUser) return res.status(404).json({ message: 'user not found' });
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
    
    return res.status(200).json({ commitHistory });
    
  } catch(err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
}

module.exports = { 
	handleCommit,
	getCommitHistory
}