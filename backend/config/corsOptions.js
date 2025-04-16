const whiteList = [
	'http://127.0.0.1:5173',
	'http://localhost:5173',
	'https://creatives30.vercel.app'
];

const corsOptions = {
	origin: (origin, callback) => {
		if (whiteList.includes(origin) || !origin) {
			callback(null, true)
		} else {
			callback(new Error('not allowed by CORS'))
		}
	},
	methods: ['GET', 'POST', 'PUT'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true,
	optionsSuccessStatus: 200
}

module.exports = corsOptions