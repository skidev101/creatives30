const admin = require('firebase-admin');

const verifyIdToken = async (req, res) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).send('invalid request');
	}
	
	const idToken = authHeader?.split('Bearer ')[1];
	if (!idToken) {
		return res.status(401).send('no token in request');
	}
	
	try {
		const decodedToken = await admin.auth().verifyIdToken(idToken);
		console.log(decodedToken);
		req.user = decodedToken;
	} catch(err) {
		res.status(401).send('invalid request');
		console.error(err);
	}
}


module.exports = verifyIdToken 