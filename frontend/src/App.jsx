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

function App() {
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
        <Route path="/projects" element={<Project/>} />
        <Route path="/addadmins" element={<AddAdmin/>} />
        <Route path="/version" element={<Version/>} />
        <Route path="/adminprofile" element={<AdminProfile/>} />
      </Routes>
     
    </Router>
  );
}

export default App;