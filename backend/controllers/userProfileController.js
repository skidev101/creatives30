const User = require('../models/User');
const Project = require('../models/Project');
const mongoose = require('mongoose');

const userProfile = async (req, res) => {
  const { user } = req.params;
  console.log(user);
  
  console.log(`username: ${user}`);
  
  
  try {
    const foundUser = await User.findOne({ username: user });
    if (!foundUser) return res.status(404).send('user not found');
    const foundUserProjects = await Project.findOne({ username: user });
    
    res.status(200).json({
			user: foundUser.username,
			email: foundUser.email,
			profileImgURL: foundUser.profileImgURL,
			projects: foundUserProjects ? foundUserProjects.projects : []
    });
		console.log(foundUser);
		
  } catch(err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
}

module.exports = { userProfile }