const User = require('../models/User');
const mongoose = require('mongoose');

const handleGoogleLogin = async (req, res) => {
  const { uid, email } = req.user;
  console.log(req.user);
  
  console.log(`uid: ${uid}`);
  
  try {
    const foundUser = await User.findOne({uid});
    if (!foundUser) {
			const username = `@user_${uid.slice(0,5)}`;
	    const newUser = await User.create({
	      uid,
	      email,
	      username,
	      roles: ['User'],
	    });
	    if (newUser) {
	      console.log(newUser);
	      res.status(201).json({
	        uid: newUser.uid,      
		      email: newUser.email,
	        username: newUser.username,
					roles: newUser.roles
	      });
	    } else {
				res.status(500).send('an error occured while creating user');
	    }
    } else {
			res.status(200).send(`user ${foundUser.username} with role ${foundUser.roles} is now logged in!`);
			console.log(foundUser);
    }
		
  } catch(err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
}

module.exports = { handleGoogleLogin }