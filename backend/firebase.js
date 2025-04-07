const admin = require('firebase-admin');
const serviceAccount = JSON.parse(process.env.FIREBASE_ACCOUNT_KEY);

const firebaseInit = () => {
  try {
    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    });
    console.log('firebase initialized');
  } catch (err){
    console.error(err);
  }
}

module.exports = firebaseInit

