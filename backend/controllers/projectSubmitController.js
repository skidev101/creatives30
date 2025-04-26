const User = require('../models/User');
const Project = require('../models/Project');
const VersionHistory = require('../models/VersionHistory');
const mongoose = require('mongoose');

const handleProjectSubmit = async (req, res) => {
  const { uid, title, livelink, day, repolink, languages, framework, description } = req.body;
  if (!livelink || !day || !languages || !description) return res.status(400).send("Empty request");
  //const { uid } = req.user;
  console.log(`uid: ${uid}, title: ${title}, livelink: ${livelink}, languages: ${languages}, description: ${description}`);
  
  const projectInfo = {
		title,
		livelink,
		day,
		repolink,
		languages,
		framework,
		description
	}
  
  try {
	  const foundUser = await User.findOne({uid});
	  const username = foundUser.username;
	  console.log(foundUser);
	  const latestVersion = await VersionHistory.findOne().sort({  version: - 1 });
	  const version = latestVersion ? latestVersion.version : 1;
    const foundUserProjects = await Project.findOne({uid});
    if (!foundUserProjects) {
			const userProjects = await Project.create({
				uid,
				username,
				version,
				projects: [projectInfo]
			});
			res.status(201).json({
				message: "user project created successfully",
				projects: userProjects
			});
			console.log(userProjects);
    } else {
			const existingProject = foundUserProjects.projects.find((project) => project.livelink === livelink);
			if (existingProject) {
				res.status(409).json({message: 'projects already exists'});
				return
			} else {
				foundUserProjects.projects.unshift(projectInfo);
				await foundUserProjects.save();
				console.log(foundUserProjects);
			}
    }
    res.status(200).json({
			message: "user project added successfully",
			projects: foundUserProjects
    });
		console.log(foundUserProjects);
		
  } catch(err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
}

module.exports = { handleProjectSubmit }