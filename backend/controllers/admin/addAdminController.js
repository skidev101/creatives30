const User = require('../../models/User');
const mongoose = require('mongoose');

const createNewAdmin = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send("Empty request");
  
  
  console.log(`email: ${email}`);
  
  
  try {
    const foundUser = await User.findOne({email});
    if (!foundUser) return res.status(404).json({
			message: 'user not found'
    });
    if (foundUser.roles.includes("Admin")) return res.status(409).json({
			message: 'user is already an admin'
    });
    
    const newAdmin = await User.findOneAndUpdate(
			{email}, 
			{$addToSet: { roles:  "Admin" }}, 
			{new: true}
	  );
    
    console.log(newAdmin);
    
    res.status(200).send({
			message: `user ${foundUser.username} with email ${email} is now an Admin`
    });
		
		
  } catch(err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
}

module.exports = { createNewAdmin }