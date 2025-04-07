const User = require('../models/User');
const mongoose = require('mongoose');


const handleLogin = async (req, res) => {
  const { uid } = req.user;
  
  try {
    const user = await User.findOne({uid});
    if (!user) return res.status(402).send('user not found');
    return res.send(user);
  } catch(err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
}

module.exports = { handleLogin }