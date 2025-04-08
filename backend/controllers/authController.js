const User = require('../models/User');
const mongoose = require('mongoose');


const handleLogin = async (req, res) => {
  const { uid } = req.user;
  
  try {
    const user = await User.findOne({uid});
    if (!user) return res.status(402).send('user not found');
    res.status(200).send(`user ${user.username} and role${user.roles} is now logged in!`);
  } catch(err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
}

module.exports = { handleLogin }