/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { FiSearch, FiChevronLeft, FiChevronRight, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import img from '../../assets/image.png';
export default function VersionPage() {
  const darkmode = useSelector((state) => state.darkMode);
   const user = useSelector((state)=> state.user)
  const [versions, setVersions] = useState([
    { id: 'v1', name: 'Version 1', createdAt: new Date('2023-01-01') },
    { id: 'v7', name: 'Version 7', createdAt: new Date('2023-07-01') }
  ]);
  const [activeVersion, setActiveVersion] = useState('v1');
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [newVersionName, setNewVersionName] = useState('');
  const [timeRange, setTimeRange] = useState('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Generate different data based on version
  const generateUsers = (versionId) => {
    const multiplier = versionId === 'v1' ? 1 : 2; // v7 shows higher numbers
    return Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      projects: Math.floor(Math.random() * 10 * multiplier) + 1,
      weeklyProjects: Math.floor(Math.random() * 5 * multiplier) + 1,
    }));
  };

  const [users, setUsers] = useState(generateUsers(activeVersion));

  const handleCreateVersion = () => {
    if (newVersionName.trim()) {
      const newVersion = {
        id: `v${versions.length + 1}`,
        name: newVersionName,
        createdAt: new Date()
      };
      setVersions([...versions, newVersion]);
      setActiveVersion(newVersion.id);
      setUsers(generateUsers(newVersion.id));
      setNewVersionName('');
      setShowVersionModal(false);
    }
  };

  const handleVersionChange = (event) => {
    const newVersion = event.target.value;
    setActiveVersion(newVersion);
    setUsers(generateUsers(newVersion));
    setCurrentPage(1);
  };
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    setCurrentPage(1);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayUsers = filteredUsers.map(user => ({
    ...user,
    displayProjects: timeRange === 'weekly' ? user.weeklyProjects : user.projects,
  }));

  const sortedUsers = [...displayUsers].sort((a, b) => b.displayProjects - a.displayProjects);

  const pageCount = Math.ceil(sortedUsers.length / rowsPerPage);
  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  // ... rest of your existing code (timeRange, search, pagination logic) ...

  return (
    <div className={`w-full max-w-6xl mx-auto mt-4 rounded-[14px] ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-4 md:p-6 font-grotesk`}>
     <div className={`flex items-center justify-between mb-4 border-b w-full ${darkmode ? 'border-neutral-800' : 'border-slate-200'}`}>
  <img
    src={img}
    alt="Profile"
    className="lg:h-15 lg:w-15 h-10 w-10 rounded-full object-cover mb-4"
  />
  <div className="flex flex-col pl-3 flex-grow">
    <p className={`text-sm ${darkmode ? 'text-neutral-100' : 'text-gray-500'}`}>
      Welcome Admin!
    </p>
    <p className={`text-sm ${darkmode ? 'text-neutral-100' : 'text-gray-500'}`}>
      {user?.username || "guest"}
    </p>
  </div>
  <button
  onClick={() => setShowVersionModal(true)}
    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${darkmode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
  >
    
    <FiPlus size={16} />
    New Version
  </button>
</div>
   
      {showVersionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-100">
          <div className={`rounded-[14px] ${darkmode ? 'bg-[#1a1a1a]' : 'bg-white'} p-6 w-full max-w-md`}>
            <h3 className={`text-lg font-bold mb-4 ${darkmode ? 'text-white' : 'text-gray-900'}`}>
              Create New Version
            </h3>
            <input
              type="text"
              value={newVersionName}
              onChange={(e) => setNewVersionName(e.target.value)}
              placeholder="Version name"
              className={`w-full p-2 rounded-md border mb-4 ${darkmode ? 'bg-[#111313] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowVersionModal(false)}
                className={`px-4 py-2 rounded-md ${darkmode ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateVersion}
                className={`px-4 py-2 rounded-md ${darkmode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

   
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="w-full md:w-64 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className={`w-full pl-10 pr-4 py-2 rounded-md border ${darkmode ? 'bg-[#1a1a1a] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <select
              value={activeVersion}
              onChange={handleVersionChange}
              className={`px-3 py-2 rounded-md border ${darkmode ? 'bg-[#1a1a1a] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
            >
              {versions.map(version => (
                <option key={version.id} value={version.id}>{version.name}</option>
              ))}
            </select>
          </div>

          <div className={`flex rounded-md border ${darkmode ? 'border-gray-700' : 'border-gray-300'}`}>
            <button
              onClick={() => handleTimeRangeChange('all')}
              className={`px-3 py-1 ${timeRange === 'all' ? (darkmode ? 'bg-red-800 text-white' : 'bg-blue-600 text-white') : (darkmode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700')} rounded-l-md`}
            >
              All Time
            </button>
            <button
              onClick={() => handleTimeRangeChange('weekly')}
              className={`px-3 py-1 ${timeRange === 'weekly' ? (darkmode ? 'bg-red-800 text-white' : 'bg-blue-600 text-white') : (darkmode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700')} rounded-r-md`}
            >
              Week
            </button>
          </div>
        </div>

      </div>
   <div className={`rounded-[14px] border ${darkmode ? 'border-gray-700 bg-[#1a1a1a]' : 'border-gray-200 bg-white'} mb-6 overflow-x-auto w-full`}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={darkmode ? 'bg-[#2a2a2a]' : 'bg-gray-50'}>
            <tr>
              <th className={`px-4 py-3 text-left text-xs font-medium ${darkmode ? 'text-gray-300' : 'text-gray-700'} uppercase`}>Rank</th>
              <th className={`px-4 py-3 text-left text-xs font-medium ${darkmode ? 'text-gray-300' : 'text-gray-700'} uppercase`}>Name</th>
              <th className={`px-4 py-3 text-left text-xs font-medium ${darkmode ? 'text-gray-300' : 'text-gray-700'} uppercase`}>Projects</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${darkmode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {paginatedUsers.map((user, index) => (
              <tr key={user.id} className={darkmode ? (index % 2 === 0 ? 'bg-[#222]' : 'bg-[#1a1a1a]') : (index % 2 === 0 ? 'bg-white' : 'bg-gray-50')}>
                <td className={`px-4 py-4 ${darkmode ? 'text-gray-300' : 'text-gray-900'}`}>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                <td className={`px-4 py-4 font-medium ${darkmode ? 'text-gray-300' : 'text-gray-900'}`}>
                   <Link to={'/projects'}>
                {user.name} 
                </Link></td>
                <td className={`px-4 py-4 ${darkmode ? 'text-gray-300' : 'text-gray-900'}`}>
                <Link to={'/projects'}>
                {user.displayProjects}
                </Link>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
        <div className={`text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
          Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, sortedUsers.length)} of {sortedUsers.length} entries
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-md ${darkmode ? 'text-gray-300 hover:bg-gray-800 disabled:text-gray-600' : 'text-gray-700 hover:bg-gray-100 disabled:text-gray-400'}`}
          >
            <FiChevronLeft />
          </button>

          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`w-8 h-8 rounded-md ${currentPage === i + 1 ? (darkmode ? 'bg-red-800 text-white' : 'bg-blue-600 text-white') : (darkmode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100')}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(Math.min(pageCount, currentPage + 1))}
            disabled={currentPage === pageCount}
            className={`p-2 rounded-md ${darkmode ? 'text-gray-300 hover:bg-gray-800 disabled:text-gray-600' : 'text-gray-700 hover:bg-gray-100 disabled:text-gray-400'}`}
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

    </div>
  );
}