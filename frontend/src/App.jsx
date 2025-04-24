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
import { setUser } from './action';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  // Add selector to check if user exists in Redux store
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    const auth = getAuth();
    let refreshInterval;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Set up token refresh every 55 minutes (before 1hr expiration)
        refreshInterval = setInterval(async () => {
          try {
            await user.getIdToken(true);
            console.log('Token refreshed silently');
          } catch (error) {
            console.error('Token refresh failed:', error);
            clearInterval(refreshInterval);
          }
        }, 55 * 60 * 1000);

        // Only fetch user data if not already in Redux or if user changed
        if (!currentUser || currentUser.uid !== user.uid) {
          try {
            const token = await user.getIdToken();
            const response = await fetch('https://xen4-backend.vercel.app/user', {
              headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const userData = await response.json();
            
            dispatch(setUser({
              uid: user.uid,
              email: user.email,
              ...userData
            }));
          } catch (error) {
            console.error('User data load failed:', error);
          }
        }
      } else {
        // User signed out
        if (refreshInterval) clearInterval(refreshInterval);
      }
    });

    return () => {
      unsubscribe();
      if (refreshInterval) clearInterval(refreshInterval);
    };
  }, [dispatch, currentUser]);

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
