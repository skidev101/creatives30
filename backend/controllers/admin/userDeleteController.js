const admin = require('firebase-admin');
const User = require('../../models/User');
const Project = require('../../models/Project');
const mongoose = require('mongoose');

const deleteUser = async (req, res) => {
  const { email, username } = req.body;
  const query = email ? { email } : { username };
  const value = email || username;
  
  try {
    const foundUser = await User.findOne(query);
    if (!foundUser) {
      return res.status(404).json({ 
        message: "User not found",
      });
    }
    
    const foundUserUid = foundUser.uid;
    
    // Delete from Firebase Auth and MongoDB in parallel
    await Promise.all([
      admin.auth().deleteUser(foundUserUid),
      User.findOneAndDelete({ uid: foundUserUid })
    ]);
    
    // If we get here, both operations succeeded
    return res.status(200).json({
      message: `User ${value} deleted successfully`,
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { deleteUser };