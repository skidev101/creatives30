const User = require('../models/User');
const mongoose = require('mongoose');

const handleLogin = async (req, res) => {
  const { uid } = req.user;
  console.log(req.user);
  
  console.log(`uid: ${uid}`);
  
  
  try {
    const foundUser = await User.findOne({uid});
    if (!foundUser) return res.status(404).json({ message: 'user not found' });
    
    res.status(200).json({
			message: 'login successful',
			username: foundUser.username,
			roles: foundUser.roles
    });
		console.log(foundUser);
		
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { handleLogin }