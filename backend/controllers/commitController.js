const User = require('../models/User');
const Commit = require('../models/Commit');
const VersionHistory = require('../models/VersionHistory');
const mongoose = require('mongoose');
const moment = require('moment');


// const handleCommit = async (req, res) => {
//	//const { uid } = req.body //...for testing purposes
//   const { uid } = req.body;
//   console.log(`uid: ${uid}`);
//   const today = moment().format('DD-MM-YYYY');
//   const yesterday = moment().subtract(1, 'days').format('DD-MM-YYYY');
  
//   try {
//		const foundUser = await User.findOne({uid});
//		if (!foundUser) return res.status(404).json({ message: 'user not found' });
//     const userId = foundUser._id;
  
//     const latestVersionDoc = await VersionHistory.findOne().sort({ version: - 1 });
//     const latestVersion = latestVersionDoc?.version;
    
//     const existingCommit = await Commit.findOne({ userId, date: today, version: latestVersion });
//     if (!existingCommit) {
//			await Commit.create({
//				userId,
//				date: today,
//				version: latestVersion
//			});
//     }
    
//     let userVersion = foundUser.versions.find((v) => v.version === latestVersion);
//     if (!userVersion) {
//	    userVersion = {
//				version: latestVersion,
//				streak: {
//					count: 1,
//					lastCommitDate: today
//				}
//	    };
//	    foundUser.versions.push(userVersion);
//     } else {
//			const lastCommitDate = userVersion.streak?.lastCommitDate;
//			if (lastCommitDate !== today) {
//				const newStreak = lastCommitDate === yesterday ? userVersion.streak.count + 1 : 1;
//				userVersion.streak = {
//					count: newStreak,
//					lastCommitDate: today
//				};
//			}
//     }
//     await foundUser.save();
    
//		const currentVersion = foundUser.versions.find((v) => v.version === latestVersion);
//     return res.status(200).json({
//			message: 'commit logged successfully',
//			date: today,
//			version: latestVersion,
//			streakCount: foundUser?.versions[0].streak.count
//     });
    
//   } catch(err) {
//     console.log(err);
//     res.status(500).send('Internal server error');
//   }
// }


const getCommitHistory = async (req, res) => {
	const { version: requestedVersion } = req.body  //...for testing
  const { uid } = req.user;
  console.log(`uid: ${uid}`);
  const start = moment().subtract(29, 'days');
  
  try {
    const foundUser = await User.findOne({uid});
    if (!foundUser) return res.status(404).json({ message: 'user not found' });
    const userId = foundUser._id;
    
    let version = requestedVersion;
    if (!version) {
	    const latestVersionDoc = await VersionHistory.findOne().sort({ version: - 1 });
      version = latestVersionDoc?.version;
    }
    
    const last30Days = Array.from({ length: 30 }, (_, i) =>
			moment(start).add(i, 'days').format('DD-MM-YYYY')
    );
    
    const commits = await Commit.find({
			userId,
			version,
			date: { $in: last30Days }
    });
    
    const commitDates = commits.map((commit) => commit.date);
    const commitHistory = last30Days.map((date) => ({
			date,
			commits: commitDates.includes(date)
    }));
    
    //const versionData = foundUser.versions[0].find((v) => v.version === version);
    
    return res.status(200).json({
	    version,
	    commitHistory
	  });
    
  } catch(err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
}

module.exports = { getCommitHistory }