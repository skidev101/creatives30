import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './landing/page';
import Login from './auth/forms/login';
import Signup from './auth/forms/signup';
import ForgetPassword from './auth/forms/forgetpassword';
import SubmitProject from './submitproject/submit';
import Profile from './profile/profile';
import Leaderboard from './leaderboard/leaderboard';
import Project from './projects/project';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/forgetpassword" element={<ForgetPassword/>} />
        <Route path="/submitproject" element={<SubmitProject/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/leaderboard" element={<Leaderboard/>} />
        <Route path="/projects" element={<Project/>} />
      </Routes>
     
    </Router>
  );
}

export default App;