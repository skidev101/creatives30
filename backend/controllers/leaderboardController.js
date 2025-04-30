const mongoose = require('mongoose');
const Project = require('../models/Project');
const VersionHistory = require('../models/VersionHistory');
const ArchivedProject = require('../models/ArchivedProject');
const moment = require('moment');

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
		const latestVer = await VersionHistory.findOne().sort({ version: - 1 });
		const startDate = moment(latestVer.startDate);
		const endDate = moment(startDate).add(30, 'days');
		const currentDate = moment();
		let currentDay;
		
		if (currentDate.isBefore(startDate)) {
			currentDay = 0
		} else if (currentDate.isAfter(endDate)) {
			currentDay = 30
		} else {
			currentDay = currentDate.diff(startDate, 'days') + 1;
		}
		
		if (ver) {
			projects = await ArchivedProject.find({version: ver});
		} else {
			projects = await Project.find();
		}
		console.log(projects)
		if (!projects.length) {
			return res.status(404).json({ 
				day: currentDay,
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
			day: currentDay,
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