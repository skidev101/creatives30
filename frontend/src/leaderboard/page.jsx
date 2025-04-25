import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { saveLeaderboardData, setCurrentVersion } from '../action';
import { authFetch } from '../utils/auth';

export default function LeaderboardPage() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const leaderboard = useSelector((state) => state.leaderboard);
  const [timeRange, setTimeRange] = useState('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState('');
  const [displayData, setDisplayData] = useState({
    data: [],
    page: 1,
    limit: 10,
    totalProjects: 0,
    versions: []
  });
  const currentVersion = leaderboard.currentVersion;
console.log ("c", currentVersion)
  const fetchLeaderboard = async () => {
    
    try {
      setLoading(true);
      setError(null);
      
      const versionParam = selectedVersion ? `&ver=${selectedVersion.replace('v', '')}` : '';
      const url = `https://xen4-backend.vercel.app/leaderboard?page=${currentPage}&limit=${rowsPerPage}${versionParam}`;

      const response = await authFetch(url);
      
      if (!response.ok) {
        if (response.status === 404) {
          const emptyData = {
            data: [],
            page: currentPage,
            limit: rowsPerPage,
            totalProjects: 0,
            versions: [...new Set([selectedVersion, ...displayData.versions])]
          };
          
          dispatch(saveLeaderboardData(selectedVersion, emptyData));
          setDisplayData(emptyData);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.data || data.data.length === 0) {
        const emptyData = {
          ...data,
          data: [],
          versions: [...new Set([selectedVersion, ...displayData.versions])]
        };
        
        dispatch(saveLeaderboardData(selectedVersion, emptyData));
        setDisplayData(emptyData);
        return;
      }

      const versions = [...new Set(data.data.map(user => `v${user.version}`))];
      const versionKey = selectedVersion || versions[versions.length - 1];

      dispatch(saveLeaderboardData(versionKey, {
        ...data,
        versions,
        timestamp: Date.now()
      }));

      setDisplayData({
        ...data,
        versions
      });
      
      if (!selectedVersion) {
        setSelectedVersion(versionKey);
        dispatch(setCurrentVersion(versionKey));
      }
    } catch (err) {
      if (err.message.includes('404') || err.message.includes('No projects')) {
        const emptyData = {
          data: [],
          page: currentPage,
          limit: rowsPerPage,
          totalProjects: 0,
          versions: [...new Set([selectedVersion, ...displayData.versions])]
        };
        
        dispatch(saveLeaderboardData(selectedVersion, emptyData));
        setDisplayData(emptyData);
      } else {
        setError(err.message);
        console.error('Fetch error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (leaderboard.versions[currentVersion]) {
      setDisplayData(leaderboard.versions[currentVersion]);
      setSelectedVersion(leaderboard.currentVersion);
    }
    // if (leaderboard.currentVersion && leaderboard.versions[leaderboard.currentVersion]) {
    //   setDisplayData(leaderboard.versions[leaderboard.currentVersion]);
    //   setSelectedVersion(leaderboard.currentVersion);
    // }
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    if (selectedVersion) {
      if (leaderboard.versions[selectedVersion]) {
        setDisplayData(leaderboard.versions[selectedVersion]);
      } else {
        fetchLeaderboard();
      }
    }
  }, [selectedVersion, currentPage]);

  const handleVersionChange = (event) => {
    const version = event.target.value;
    setSelectedVersion(version);
    setCurrentPage(1);
    dispatch(setCurrentVersion(version));
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    setCurrentPage(1);
  };

  const availableVersions = [
    ...new Set([
      ...displayData.versions,
      ...leaderboard.allVersions,
      ...leaderboard.currentVersion,
      selectedVersion 
    ])
  ].sort((a, b) => parseInt(b.substring(1)) - parseInt(a.substring(1)));

  const filteredUsers = displayData.data.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayUsers = filteredUsers.map(user => ({
    ...user,
    displayProjects: timeRange === 'weekly' 
      ? Math.floor(user.projectCount * 0.3) 
      : user.projectCount
  }));

  const sortedUsers = [...displayUsers].sort((a, b) => b.displayProjects - a.displayProjects);
  const pageCount = Math.ceil(displayData.totalProjects / rowsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);
console.log("v",availableVersions)
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
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="w-full md:w-64 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-md border ${darkMode ? 'bg-[#1a1a1a] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <select
            value={selectedVersion}
            onChange={handleVersionChange}
            disabled={loading}
            className={`px-3 py-2 rounded-md border ${darkMode ? 'bg-[#1a1a1a] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {availableVersions.length > 0 ? (
              availableVersions.map(version => (
                <option key={version} value={version}>{version}</option>
              ))
            ) : (
              <option value="">No versions available</option>
            )}
          </select>

          <div className={`flex rounded-md border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
            <button
              onClick={() => handleTimeRangeChange('all')}
              className={`px-3 py-1 ${timeRange === 'all' ? (darkMode ? 'bg-red-800 text-white' : 'bg-blue-600 text-white') : (darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700')} rounded-l-md`}
            >
              All Time
            </button>
            <button
              onClick={() => handleTimeRangeChange('weekly')}
              className={`px-3 py-1 ${timeRange === 'weekly' ? (darkMode ? 'bg-red-800 text-white' : 'bg-blue-600 text-white') : (darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700')} rounded-r-md`}
            >
              Week
            </button>
          </div>
        </div>
      </div>
    
      <div className={`rounded-[14px] border ${darkMode ? 'border-gray-700 bg-[#1a1a1a]' : 'border-gray-200 bg-white'} mb-6 overflow-x-auto w-full`}>
        {sortedUsers.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={darkMode ? 'bg-[#2a2a2a]' : 'bg-gray-50'}>
              <tr>
                <th className={`px-4 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase`}>Rank</th>
                <th className={`px-4 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase`}>Name</th>
                <th className={`px-4 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase`}>Projects</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {sortedUsers.map((user, index) => (
                <tr key={user.uid} className={darkMode ? (index % 2 === 0 ? 'bg-[#222]' : 'bg-[#1a1a1a]') : (index % 2 === 0 ? 'bg-white' : 'bg-gray-50')}>
                  <td className={`px-4 py-4 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                  <td className={`px-4 py-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    <Link to={`/user/${user.username}`} className="hover:underline">
                      {user.username}
                    </Link>
                  </td>
                  <td className={`px-4 py-4 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {user.displayProjects}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={`p-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            No projects found in this version yet.
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, displayData.totalProjects)} of {displayData.totalProjects} entries
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-md ${darkMode ? 'text-gray-300 hover:bg-gray-800 disabled:text-gray-600' : 'text-gray-700 hover:bg-gray-100 disabled:text-gray-400'}`}
          >
            <FiChevronLeft />
          </button>

          {Array.from({ length: Math.min(5, pageCount) }, (_, i) => {
            let pageNum;
            if (pageCount <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= pageCount - 2) {
              pageNum = pageCount - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-8 h-8 rounded-md ${currentPage === pageNum ? (darkMode ? 'bg-red-800 text-white' : 'bg-blue-600 text-white') : (darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100')}`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(Math.min(pageCount, currentPage + 1))}
            disabled={currentPage === pageCount || pageCount === 0}
            className={`p-2 rounded-md ${darkMode ? 'text-gray-300 hover:bg-gray-800 disabled:text-gray-600' : 'text-gray-700 hover:bg-gray-100 disabled:text-gray-400'}`}
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}