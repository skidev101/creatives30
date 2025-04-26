const User = require('../../models/User');
const Project = require('../../models/Project');
const VersionHistory = require('../../models/VersionHistory');
const ArchivedProject = require('../../models/ArchivedProject');
const mongoose = require('mongoose');

const createNewVersion = async (req, res) => {
  //const { uid } = req.user;
	const { uid, title } = req.body;
	if (!title) return res.status(400).json({ message: 'empty request' });
	const foundVersionTitle = await VersionHistory.findOne({ title });
	if (foundVersionTitle) return res.status(400).json({
		message: `version with title ${title} already exist`
	});
	
	try {
		const foundAdmin = await User.findOne({uid});
		const username = foundAdmin.username;
		const latestVersion = await VersionHistory.findOne().sort({ version: - 1 });
		const newVersion = (latestVersion && latestVersion.version) ? latestVersion.version + 1 : 1;
		const projectsToArchive = await Project.find({ version: latestVersion ? latestVersion.version : 0});
	  
		
		if (projectsToArchive.length > 0) {
			const ids = projectsToArchive.map((proj) => proj._id)
			for (const project of projectsToArchive) {
				const doc = project.toObject();
				delete doc._id;
				const archivedProjects = await ArchivedProject.create({
					...doc,
					version: newVersion - 1
				});
	    }
	    await Project.deleteMany({_id: { $in: ids }});
		}
		
		const versionLog = await VersionHistory.create({
				uid,
				title,
				version: newVersion,
				createdBy: `Admin ${username}`
	  });
	  
	  console.log(versionLog)
		
		res.status(200).json({
			message: 'version created successfully',
			version: newVersion,
			title: title,
			createdBy: `Admin ${username}`
		})
		
	} catch (err) {
		console.log(err);
		res.status(500).send('Internal server error');
	}
}

module.exports = { createNewVersion }