const mongoose = require('mongoose');
const User = require('../models/User');
const Project = require('../models/Project');
const VersionHistory = require('../models/VersionHistory');
const Commit = require('../models/Commit');
const path = require('path');
const moment = require('moment');
const { supabase } = require('../supabase');


const uploadToSupabase = async (files, uid) => {
	const urls = [];
	
	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		const fileExt = path.extname(file.originalname);
		const fileName = `projects/project_${uid}_${Date.now()}_${i}_${fileExt}`;
		
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




const handleProjectSubmit = async (req, res) => {
  const { title, livelink, day, repolink, languages, framework, description } = req.body;
  if (!livelink || !day || !languages || !description) return res.status(400).send("Empty request");
  const { uid } = req.user;
  console.log(`uid: ${uid}, title: ${title}, livelink: ${livelink}, languages: ${languages}, description: ${description}`);
  console.log(req);
  
  try {
	  const foundUser = await User.findOne({uid});
	  const username = foundUser.username;
	  console.log(foundUser);
	  
	  let imageUrls = [];
	  if (req.files && req.files.length > 0) {
		  imageUrls = await uploadToSupabase(req.files, uid)
	  }
	  
	  const projectInfo = {
			title,
			livelink,
			day,
			repolink,
			languages,
			framework,
			description,
			images: imageUrls,
			createdAt: new Date()
	}
	  
	  const latestVersion = await VersionHistory.findOne().sort({  version: - 1 });
	  const version = latestVersion ? latestVersion.version : 1;
    let foundUserProjects = await Project.findOne({uid});
    if (!foundUserProjects) {
			foundUserProjects = await Project.create({
				uid,
				username,
				version,
				projects: [projectInfo]
			});
			console.log(foundUserProjects);
    } else {
			foundUserProjects.projects.unshift(projectInfo);
			await foundUserProjects.save();
			console.log(foundUserProjects);
    }
    
    const today = moment().format('DD-MM-YYYY');
	  const yesterday = moment().subtract(1, 'days').format('DD-MM-YYYY');
    const userId = foundUser._id;
    
    const existingCommit = await Commit.findOne({ userId, date: today, version });
    if (!existingCommit) {
			await Commit.create({
				userId,
				date: today,
				version: version
			});
    }
    
    let userVersion = foundUser.versions.find((v) => v.version === version);
    if (!userVersion) {
	    userVersion = {
				version: version,
				streak: {
					count: 1,
					lastCommitDate: today
				}
	    };
	    foundUser.versions.push(userVersion);
    } else {
			const lastCommitDate = userVersion.streak?.lastCommitDate;
			if (lastCommitDate !== today) {
				const newStreak = lastCommitDate === yesterday ? userVersion.streak.count + 1 : 1;
				userVersion.streak = {
					count: newStreak,
					lastCommitDate: today
				};
			}
    }
    await foundUser.save();
    
    
    res.status(200).json({
			message: "project created successfully",
			commit: "success",
			version: version,
			streakCount: foundUser?.versions[0].streak.count,
			projects: foundUserProjects.projects
    });
		console.log(foundUserProjects);
		
  } catch(err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
}

module.exports = { handleProjectSubmit }