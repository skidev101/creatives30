import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './landing/page';
import Login from './forms/login';
import Signup from './forms/signup';
import ForgetPassword from './forms/forgetpassword';
import SubmitProject from './submitproject/submit';
import Profile from './profile/profile';
import Leaderboard from './leaderboard/leaderboard';
import Project from './projects/project';
import AddAdmin from './admin/managements/page';

import AdminProfile from './admin/profile/page';
import Version from './admin/version/page';
import UserProjectsID from './projects/project';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { clearUser, setUser } from './action';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
  
    useEffect(() => {
      const auth = getAuth();
      let refreshInterval;
  
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          // Set up token refresh
          refreshInterval = setInterval(async () => {
            try {
              await firebaseUser.getIdToken(true);
            } catch (error) {
              console.error('Token refresh failed:', error);
              clearInterval(refreshInterval);
            }
          }, 55 * 60 * 1000);
  
          // Only fetch user data if Firebase user matches Redux user
          if (!user || user.uid !== firebaseUser.uid) {
            try {
              const token = await firebaseUser.getIdToken();
              const response = await fetch('https://xen4-backend.vercel.app/user', {
                headers: { 
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              });
  
              if (!response.ok) throw new Error('Failed to fetch user data');
              
              const userData = await response.json();
              dispatch(setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                ...userData
              }));
            } catch (error) {
              console.error('User data load failed:', error);
              dispatch(clearUser());
            }
          }
        } else {
          // No Firebase user - clear Redux state
          if (user) dispatch(clearUser());
          if (refreshInterval) clearInterval(refreshInterval);
        }
      });
  
      return () => {
        unsubscribe();
        if (refreshInterval) clearInterval(refreshInterval);
      };
    }, [dispatch, user]);

  return (
   
    <Router>
      <Routes>
      <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Signup/>} />
        <Route path="/forgetpassword" element={<ForgetPassword/>} />
        <Route path="/submitproject" element={<SubmitProject/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/leaderboard" element={<Leaderboard/>} />
        <Route path="/user/:username" element={<UserProjectsID/>} />
        <Route path="/addadmins" element={<AddAdmin/>} />
        <Route path="/version" element={<Version/>} />
        <Route path="/adminprofile" element={<AdminProfile/>} />
      </Routes>
     
    </Router>
  );
}

export default App;
