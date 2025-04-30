const User = require('../models/User');
const Commit = require('../models/Commit');
const VersionHistory = require('../models/VersionHistory');
const mongoose = require('mongoose');
const moment = require('moment');


const getCommitHistory = async (req, res) => {
	const { version: requestedVersion } = req.body  //...for testing
  const { uid } = req.body;
  console.log(`uid: ${uid}`);
  
  try {
    const foundUser = await User.findOne({uid});
    if (!foundUser) return res.status(404).json({ message: 'user not found' });
    const userId = foundUser._id;
    
    let version = requestedVersion;
    if (!version) {
	    const latestVersionDoc = await VersionHistory.findOne().sort({ version: - 1 });
      version = latestVersionDoc?.version;
    }
    
    const latestVersionDoc = await VersionHistory.findOne({ version });
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
			version,
			date: { $in: days }
    });
    
    const commitDates = commits.map((commit) => commit.date);
    const commitHistory = days.map((date) => ({
			date,
			commits: commitDates.includes(date)
    }));
    
    //const versionData = foundUser.versions[0].find((v) => v.version === version);
    
    return res.status(200).json({
	    day: currentDay,
	    version,
	    commitHistory
	  });
    
  } catch(err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
}

module.exports = { getCommitHistory }