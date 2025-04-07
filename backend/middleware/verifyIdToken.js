const admin = require('../firebase');

const verifyIdToken = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;
	const idToken = authHeader?.split('Bearer ')[1];
	if (idToken) {
		return res.status(401).send('no token in request');
	}
	
	try {
		const decodedToken = await admin.auth().verifyIdToken(idToken);
		req.user = decodedToken;
		next();
	} catch(err) {
		res.status(401).send('Invalid token');
		console.error(err);
	}
}


export default verifyIdToken