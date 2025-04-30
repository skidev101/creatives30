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
  res.send("Hello world")
})

firebaseInit();



app.use(cors(corsOptions));
app.use(express.json());

app.use('/leaderboard', require('../routes/leaderboard'));
app.use('/users', require('../routes/userProfile'));
app.use('/passwordReset', require('../routes/resetPassword'));

app.use(verifyIdToken);
app.use('/register', require('../routes/register'));
app.use('/login', require('../routes/login'));
app.use('/googleLogin', require('../routes/googleLogin'));
app.use('/githubLogin', require('../routes/githubLogin'));
app.use('/update', require('../routes/update'));
app.use('/project/submit', require('../routes/submit'));
app.use('/user/streak', require('../routes/streak'));
app.use('/user/commitHistory', require('../routes/commitHistory'));
app.use('/project/comment', require('../routes/comments'));
app.use('/project/rate', require('../routes/rating'));
app.use('/bugs', require('../routes/bugReport'));
app.use('/announcements', require('../routes/getAnnouncements'));

// Admin routes
app.use(verifyAdmin);
app.use('/admin/newVersion', require('../routes/admin/newVersion'));
app.use('/admin/addAdmin', require('../routes/admin/addAdmin'));
app.use('/admin/versionStat', require('../routes/admin/versionStat'));
app.use('/admin/allUsers', require('../routes/admin/getUsers'));
app.use('/admin/allAdmins', require('../routes/admin/getAdmins'));
app.use('/admin/user/delete', require('../routes/admin/deleteUser'));
app.use('/admin/user/enable', require('../routes/admin/enable'));
app.use('/admin/user/disable', require('../routes/admin/disable'));
app.use('/admin/createAnnouncement', require('../routes/admin/announce'));

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
    
    
