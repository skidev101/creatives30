const User = require('../models/User');
const Project = require('../models/Project');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const { supabase } = require('../supabase');

const uploadToSupabase = async (files, uid) => {
	const urls = [];
	
	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		const fileExt = path.extname(file.originalname);
		const fileName = `project_${uid}_${Date.now()}_${i}_${fileExt}`;
		
		const { error } = await supabase.storage
			.from('creatives30')
			.upload(fileName, file.buffer, {
				contentType: file.mimeType
			});
	
		if (error) {
			console.error(`Error uploading file ${file.originalname}`)
			throw error;
		}
		
		const { data } = supabase.storage.from('creatives30').getPublicUrl(fileName);
		urls.push(data.publicUrl);
	}
	return urls;
}



const updateProfile = async (req, res) => {
	const { email, pwd, username } = req.body;
	const { uid } = req.user;
	
	let imageUrls = [];
  if (req.files && req.files.length > 0) {
	  imageUrls = await uploadToSupabase(req.files, uid)
  }
	
	const updates = {};
	if (email) updates.email = email;
	if (username) updates.username = username;
	if (imageUrls.length > 0) updates.profileImgURL = imageUrls[0];
	if (pwd) {
		const hashedPwd = await bcrypt.hash(pwd, 10);
		updates.password = hashedPwd;
	}
	
	if (Object.keys(updates).length === 0) {
		return res.status(400).send('invalid request');
	}
	
	try {
		const updatedUser = await User.findOneAndUpdate({uid}, updates, {new: true});
		const updatedProject = await Project.findOneAndUpdate({uid}, {username: updates.username}, {new: true});
		res.status(201).json({
			message: 'success',
			updatedUser: updatedUser
		});
		console.log(updatedUser);
		
	} catch (err) {
		console.error(err);
		res.status(500).send('internal server error');
	}
}

module.exports = { updateProfile }