const Project = require('../models/Project');
const VersionHistory = require('../models/VersionHistory');
const ArchivedProject = require('../models/ArchivedProject');
const mongoose = require('mongoose');

const getLeaderboard = async (req, res) => {
	let { ver, page = 1, limit = 15 } = req.query;
	ver = parseInt(ver);
	page = parseInt(page);
	limit = parseInt(limit);
	
	if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
		return res.status(400).json({ message: 'invalid queries' });
	}
	
	try {
		let projects;
		
		if (ver) {
			projects = await ArchivedProject.find({version: ver});
		} else {
			projects = await Project.find();
		}
		console.log(projects)
		if (!projects.length) {
			const latestVer = await VersionHistory.findOne().sort({ version: - 1 });
			return res.status(404).json({ 
				version: latestVer.version,
				data: [],
				message: 'no projects found for this version' 
			});
		}
		
		const sorted = projects
				.map((project) => ({
					username: project.username,
					uid: project.uid,
					version: project.version,
					projectCount: project.projects.length
				}))
				.sort((a, b) => b.projectCount - a.projectCount);
				
		const paginated = sorted.slice((page - 1) * limit, page * limit);
		
		res.status(200).json({
			page,
			data: paginated,
			limit,
			totalProjects: sorted.length
		});
	} catch (err) {
		console.log(err);
		res.status(500).send('internal server error');
	}
	
}

module.exports = { getLeaderboard }