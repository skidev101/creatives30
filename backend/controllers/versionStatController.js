const Project = require('../models/Project');
const VersionHistory = require('../models/VersionHistory');
const ArchivedProject = require('../models/ArchivedProject');
const mongoose = require('mongoose');

const getVersionStatistics = async (req, res) => {
	const { ver } = req.params;
	if (!ver) return res.status(400).json({ message: 'version number is required' });
	
	const foundVersion = await VersionHistory.findOne({ version: ver });
	if (!foundVersion) return res.status(404).json({
		message: `version ${ver} does not exist`
	});
	
	try {
		const foundVersionProjects = await ArchivedProject.aggregate([
			{ 
				$match: { version: ver }
			},
			{
				$addFields: { projectCount: { $size: "$projects" }}
			},
			{
				$sort: { projectCount: - 1 }
			},
			{
				$limit: 3
			}
		]);
		
		const topPerformers = foundVersionProjects.map((project) => ({
			username: project.username,
			projectCount: project.projectCount
		}))
		
		res.status(200).json({
				version: foundVersion.version,
				title: foundVersion.title,
				createdBy: foundVersion.createdBy,
				createdAt: foundVersion.createdAt,
				endedAt: foundVersionProjects[0].archivedAt,
				topPerformers: topPerformers,
				totalProjects: foundVersionProjects.reduce((acc, project) => acc + project.projects.length, 0),
				totalUsers: foundVersionProjects.length
	  });
	  
	  console.log(foundVersion);
	  console.log(foundVersionProjects);
		
	} catch (err) {
		console.log(err);
		res.status(500).send('Internal server error');
	}
}

module.exports = { getVersionStatistics }