const Rating = require('../models/Rating');
const mongoose = require('mongoose');

const handleRating = async (req, res) => {
	const { projectId } = req.params;
  const { rating } = req.body;
  if (!projectId || !rating) return res.status(400).json({ message: 'Empty request' });
  const { uid } = req.user;
  
  console.log(`uid: ${uid}, rating: ${rating}, projectId: ${projectId}`);
  
  
  try {
		const ratingExists = await Rating.findOne({ projectId, uid })
		if (ratingExists) {
			await Rating.findOneAndUpdate({ projectId }, { stars: rating }, { new: true });
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
	const { projectId } = req.params;
	if (!projectId) return res.status(400).json({ message: 'Empty request' });
	
	try {
	  const ratings = await Rating.find({ projectId });
	  if (!ratings || ratings.length === 0) return res.status(200).json({ averageRating: 0 });
  
	  const starsArray = ratings.map(r => r.stars);
	  console.log('All stars for project:', starsArray);
  
	  // Filter out invalid stars manually if needed
	  const validStars = starsArray.filter(star => star >= 1 && star <= 5);
  
	  if (validStars.length === 0) return res.status(200).json({ averageRating: 0 });
  
	  const total = validStars.reduce((acc, star) => acc + star, 0);
	  const average = total / validStars.length;
  
	  res.json({ averageRating: Number(average.toFixed(2)) });
	} catch (err) {
	  console.log(err);
	  res.status(500).send('Internal server error');
	}
  };
  

module.exports = {
	handleRating,
	getAverageRating
}