const User = require('../models/User');
const mongoose = require('mongoose');

const handleLogin = async (req, res) => {
  const {email, pwd} = req.body;
  if (!email || !pwd) return res.status(400).send("Empty request");
  const { uid } = req.user;
  console.log(req.user);
  
  console.log(`uid: ${uid}, email: ${email}, pwd: ${pwd}`);
  
  
  try {
    const user = await User.findOne({uid});
    if (!user) return res.status(402).send('user not found');
    
    if (user) {
      console.log(user);
      res.status(200).send(`user ${username} with role${user.roles} is now logged in!`);
    }

  } catch(err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
}

module.exports = { handleLogin }