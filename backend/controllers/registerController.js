const User = require('../models/User');
const mongoose = require('mongoose');

const handleNewUser = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Empty request" });
  const { uid } = req.user;
  
  console.log(`uid: ${uid}, email: ${email}`);
  
  
  try {
    let foundUser = await User.findOne({uid});
    if (foundUser) return res.status(409).send('user already exists');
    
    const username = `@user_${uid.slice(0,5)}`;
    const newUser = await User.create({
      uid,
      email,
      username,
      roles: ['User']
    });
    if (newUser) {
      console.log(newUser);
      res.status(201).json({
        uid: newUser.uid,      
	      email: newUser.email,
        username: newUser.username,
				roles: newUser.roles
      });
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { handleNewUser }