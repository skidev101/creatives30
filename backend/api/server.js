require('dotenv').config();
const express = require('express');
const app = express();
const corsOptions = require('../config/corsOptions');
const cors = require('cors');
const dbConn = require('../config/dbConn');
const firebaseInit = require('../firebase');
const verifyIdToken = require('../middleware/verifyIdToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send("Hello world, i am xen4")
})

firebaseInit();



app.use(cors(corsOptions));
app.use(express.json());

app.use('/leaderboard', require('../routes/leaderboard'));
app.use('/users', require('../routes/userProfile'));


//app.use(verifyIdToken);
app.use('/register', require('../routes/register'));
app.use('/login', require('../routes/login'));
app.use('/googleLogin', require('../routes/googleLogin'));
app.use('/githubLogin', require('../routes/githubLogin'));
app.use('/update', require('../routes/update'));
app.use('/submit', require('../routes/submit'));

// Admin routes
//app.use(verifyAdmin);
app.use('/admin/newVersion', require('../routes/admin/newVersion'));
app.use('/admin/addAdmin', require('../routes/admin/addAdmin'));
app.use('/admin/versionStat', require('../routes/admin/versionStat'));
app.use('/admin/allUsers', require('../routes/admin/getUsers'));
app.use('/admin/allAdmins', require('../routes/admin/getAdmins'));
app.use('/admin/deleteUser', require('../routes/admin/deleteUser'));


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
    
    
