const User = require('../models/User');
const mongoose = require('mongoose');

const handleLogin = async (req, res) => {
  const { email, pwd } = req.body;
  if (!email || !pwd) return res.status(400).send("Empty request");
  const { uid } = req.user;
  console.log(req.user);
  
  console.log(`uid: ${uid}, email: ${email}, pwd: ${pwd}`);
  
  
  try {
    const foundUser = await User.findOne({uid});
    if (!foundUser) return res.status(404).send('user not found');
    
    res.status(200).json({
			message: 'login successful',
			username: foundUser.username,
			roles: foundUser.roles
    });
		console.log(foundUser);
		
  } catch(err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
}

module.exports = { handleLogin }