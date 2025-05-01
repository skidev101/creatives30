const User = require('../models/User');
const Announcement = require('../models/Announcement');
const VersionHistory = require('../models/VersionHistory');
const mongoose = require('mongoose');



const getAllAnnouncements = async (req, res) => {
  try {
	  const latestVersionDoc = await VersionHistory.findOne().sort({  version: - 1 });
	  const latestVersion = latestVersionDoc ? latestVersionDoc.version : null;
    const announcements = await Announcement.find({ version: latestVersion }).sort({ createdAt: - 1 });
    
    res.status(200).json({
			message: 'success',
			announcements: announcements ? announcements : []
    });
		console.log(announcements);
		
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}


module.exports = { getAllAnnouncements }