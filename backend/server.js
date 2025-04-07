require('dotenv').config();
const express = require('express');
const app = express();
const corsOptions = require('./config/corsOptions');
const cors = require('cors');
const dbConn = require('./config/dbConn');
const firebaseInit = require('./firebase');
const verifyIdToken = require('./middleware/verifyIdToken');
const PORT = process.env.PORT || 3000;

firebaseInit();

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello world")
})
app.use(verifyIdToken());
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));




dbConn()
    .then(() => {
      console.log('DB connected');
      app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
      })
    })
    .catch((err) => {
      console.log('Error occured while connecting to DB');
      process.exit(1);
    })