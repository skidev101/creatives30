const User = require('../models/User');
const Bug = require('../models/Bug');
const VersionHistory = require('../models/VersionHistory');
const mongoose = require('mongoose');

const reportBug = async (req, res) => {
  const { report, uid } = req.body;
  if (!report) return res.status(400).json({ message: 'Empty request' });
  //const { uid } = req.user;
  console.log(req.user);
  
  console.log(`uid: ${uid}, bug: ${report}`);
  
  
  try {
    const foundUser = await User.findOne({uid});
    if (!foundUser) return res.status(404).json({ message: 'user not found' });
    const reporterUsername = foundUser.username;
    const latestVersionDoc = await VersionHistory.findOne().sort({  version: - 1 });
	  const latestVersion = latestVersionDoc ? latestVersionDoc.version : 1;
    
    const bugReport = await Bug.create({
			uid,
			username: reporterUsername,
			version: latestVersion,
			bugReport: report
    })
    
    res.status(200).json({
			message: 'bug reported successfully',
			username: reporterUsername,
			version: latestVersion,
			bugReport: report
    });
		console.log(bugReport);
		
  } catch(err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
}

const getAllBugs = async (req, res) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: - 1 });
    
    res.status(200).json({
			message: 'success',
			bugs
    });
		console.log(bugs);
		
  } catch(err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
}



module.exports = { 
	reportBug,
	getAllBugs
}