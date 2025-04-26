const Comment = require('../models/Comment');
const User = require('../models/User');
const mongoose = require('mongoose');

const createNewComment = async (req, res) => {
	const { projectId } = req.params;
  const { uid, comment } = req.body;
  console.log(req.params);
  if (!projectId || !comment) return res.status(400).json({ message: 'Empty request' });
  //const { uid } = req.user;
  
  console.log(`uid: ${uid}, comment: ${comment}, projectId: ${projectId}`);
  
  try {
		const commentor = await User.findOne({ uid });
		if (!commentor) return res.status(404).json({ message: 'user not found' });
		const userId = commentor._id;
    const newComment = await Comment.create({
			projectId,
			userId,
			comment
    });
    
    res.status(201).json({ 
			message: 'comment created successfully',
			newComment
    });
  } catch(err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
}


const getProjectComments = async (req, res) => {
  const { projectId } = req.params;
  if (!projectId) return res.status(400).json({ message: 'Empty request' });
  
  try {
    const comments = await Comment.find({ projectId: new mongoose.Types.ObjectId(projectId) }).populate('userId', 'username').sort({ createdAt: - 1 });
    if (comments.length === 0) return res.status(200).json({ message: 'no comments for this project yet' });
    res.status(200).json(comments);
  } catch(err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
}

module.exports = { 
	createNewComment,
	getProjectComments
}