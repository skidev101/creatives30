const Rating = require('../models/Rating');
const mongoose = require('mongoose');

const handleRating = async (req, res) => {
	let { projectId } = req.params;
  let { rating } = req.body;
  if (!projectId || !rating) return res.status(400).json({ message: 'Empty request' });
  const { uid } = req.user;
  rating = parseInt(rating);
  projectId = new mongoose.Types.ObjectId(projectId);
  
  console.log(`uid: ${uid}, rating: ${rating}, projectId: ${projectId}`);
  
  
  try {
		const ratingExists = await Rating.findOne({ projectId, uid })
		if (ratingExists) {
			await Rating.findOneAndUpdate({ projectId, uid }, { stars: rating }, { new: true });
			res.status(200).json({ message: 'rating updated successfully' });
		} else {
			const newRating = await Rating.create({
				projectId,
				uid,
				stars: rating
	    });
	    res.status(201).json({ message: 'rating created successfully' });
		}
  } catch(err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
}


const getAverageRating = async (req, res) => {
  let { projectId } = req.params;
  if (!projectId) return res.status(400).json({ message: 'Empty request' });
  projectId = new mongoose.Types.ObjectId(projectId);
  
  console.log(`projectId: ${projectId}`);
  
  
  try {
		 const result = await Rating.aggregate([
			{
				$match: { projectId }
			},
			{
				$group: {
					_id: null,
					averageStars: { $avg: "$stars" },
					totalRatings: { $sum: 1 }
				}
			}
		]);
		const average = result.length > 0 ? Math.min(5, result[0].averageStars) : 0;
		const totalRatings = result.length > 0 ? result[0].totalRatings : 0;
		
		res.status(200).json({
			averageRating: average.toFixed(2),
			totalRatings: totalRatings
		})
  } catch(err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
}

module.exports = {
	handleRating,
	getAverageRating
}