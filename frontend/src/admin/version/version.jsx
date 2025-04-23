/* eslint-disable no-unused-vars */

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FiSearch, FiChevronLeft, FiChevronRight, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import img from '../../assets/image.png';
import VersionModal from './modal';
import { getAuth } from 'firebase/auth';
import { saveLeaderboardData, setCurrentVersion } from '../../action';
import LeaderboardPage from '../../leaderboard/test';
export default function VersionPage() {
 
   const user = useSelector((state)=> state.user)
   const dispatch = useDispatch();
   const { darkMode, leaderboard } = useSelector(state => state);
 
 
   // create v
  const [versions, setVersions] = useState([
  ]);
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [newVersionNo, setNewVersionNo] = useState('');
  const [loadingC, setLoadingC] = useState(false)

  //leaderboard
    
 
  const rowsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [displayData, setDisplayData] = useState({
    data: [],
    page: 1,
    limit: 10,
    totalProjects: 0,
    versions: []
  });
  const currentVersion = leaderboard.currentVersion;

  const handleCreateVersion = async () => {
    setLoadingC(true);
    setError(null);
  
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        setError("You must be logged in.");
        setLoadingC(false);
        return;
      }
  
      const idToken = await user.getIdToken();
      const VData = {
        title: newVersionNo,
        user: { uid: user.uid } 
      };
  
      const response = await fetch('https://xen4-backend.vercel.app/admin/newVersion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`, 
        },
        body: JSON.stringify(VData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create version");
      }
  
      const data = await response.json();
      
      // The backend returns the created version info
      const versionNumber = data.version; // This comes from backend
      const versionKey = `v${versionNumber}`;
      const versionTitle = data.title || newVersionNo;
  
      const newVersion = {
        id: versionKey,
        name: versionTitle,
        createdAt: new Date(),
      };
  
      const emptyVersionData = {
        data: [],
        page: 1,
        limit: rowsPerPage,
        totalProjects: 0,
        version: versionNumber, // Match backend structure
        versions: [versionKey] // Initialize with current version
      };
  
      // Update Redux store
      dispatch(saveLeaderboardData(versionKey, emptyVersionData));
      dispatch(setCurrentVersion(versionKey));
      
      // Update local state
      setVersions(prev => [...prev, newVersion]);
      setDisplayData(emptyVersionData);
      setNewVersionNo('');
      setShowVersionModal(false);
  
    } catch (error) {
      console.error('Error creating version:', error);
      setError(error.message || "Failed to create version");
    } finally {
      setLoadingC(false);
    }
  };

 

  
  if (loading) {
    return (
      <div className={`w-full max-w-6xl mx-auto mt-4 rounded-[14px] ${darkMode ? 'bg-[#111313]' : 'bg-white'} p-4 md:p-6 font-grotesk flex justify-center items-center h-64`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`w-full max-w-6xl mx-auto mt-4 rounded-[14px] ${darkMode ? 'bg-[#111313]' : 'bg-white'} p-4 md:p-6 font-grotesk text-center text-red-500`}>
        {error}
      </div>
    );
  }


  return (
    <div className={`w-full max-w-6xl mx-auto mt-4 rounded-[14px] ${darkMode ? 'bg-[#111313]' : 'bg-white'} p-4 md:p-6 font-grotesk`}>
     <div className={`flex items-center justify-between mb-4 border-b w-full ${darkMode ? 'border-neutral-800' : 'border-slate-200'}`}>
  <img
    src={img}
    alt="Profile"
    className="lg:h-15 lg:w-15 h-10 w-10 rounded-full object-cover mb-4"
  />
  <div className="flex flex-col pl-3 flex-grow">
    <p className={`text-sm ${darkMode ? 'text-neutral-100' : 'text-gray-500'}`}>
      Welcome Admin!
    </p>
    <p className={`text-sm ${darkMode ? 'text-neutral-100' : 'text-gray-500'}`}>
      {user?.username || "guest"}
    </p>
  </div>
  <button
  onClick={() => setShowVersionModal(true)}
    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
  >
    
    <FiPlus size={16} />
     {loadingC ? "Creating":"New Version"}
  </button>
</div>
   
      {showVersionModal && (
        <VersionModal 
         darkmode={darkMode}
         showVersionModal={showVersionModal}
         newVersionNo={newVersionNo}
         setNewVersionNo={setNewVersionNo}
         setShowVersionModal={setShowVersionModal}
         handleCreateVersion={handleCreateVersion}
          error={error}
        />
      )}

<LeaderboardPage />
    </div>
  );
}

