require('dotenv').config();
const express = require('express');
const app = express();
const corsOptions = require('../config/corsOptions');
const cors = require('cors');
const dbConn = require('../config/dbConn');
const firebaseInit = require('../firebase');
const verifyIdToken = require('../middleware/verifyIdToken');
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send("Hello world")
})

firebaseInit();



app.use(cors({
  origin: '*'
  // credentials: true,
  // methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());


app.use(verifyIdToken);
app.use('/login', require('../routes/login'));
app.use('/register', require('../routes/register'));




dbConn()
    .then(() => {
      console.log('DB connected');
      app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
        console.log('api server is now online');
      })
    })
    .catch((err) => {
      console.log('Error occured while connecting to DB');
      process.exit(1);
    })
    
    
