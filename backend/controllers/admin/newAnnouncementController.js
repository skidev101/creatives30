const User = require('../../models/User');
const Announcement = require('../../models/Announcement');
const VersionHistory = require('../../models/VersionHistory');
const mongoose = require('mongoose');

const createAnnouncement = async (req, res) => {
  const { announcement } = req.body;
  if (!announcement) return res.status(400).json({ message: 'Empty request' });
  const { uid } = req.user;
  console.log(req.user);
  
  console.log(`uid: ${uid}, announcement: ${announcement}`);
  
  
  try {
    const foundUser = await User.findOne({uid});
    if (!foundUser) return res.status(404).json({ message: 'user not found' });
    const announcerUsername = foundUser.username;
    const latestVersionDoc = await VersionHistory.findOne().sort({  version: - 1 });
	  const latestVersion = latestVersionDoc ? latestVersionDoc.version : 1;
    
    const newAnnouncement = await Announcement.create({

			createdBy: announcerUsername,

      uid,
			username: announcerUsername,

			version: latestVersion,
			announcement
    })
    
    console.log(newAnnouncement)
    
    res.status(200).json({
			message: 'announcement created successfully',
			username: announcerUsername,
			version: latestVersion,
			announcement: announcement
    });
		console.log(newAnnouncement);
		
  } catch(err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
}

module.exports = { createAnnouncement }