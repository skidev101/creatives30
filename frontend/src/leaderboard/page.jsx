import { useSelector } from 'react-redux';
import { useState } from 'react';
import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function LeaderBoardPage() {
  const darkmode = useSelector((state) => state.darkMode);
  const [version, setVersion] = useState('v1');
  const [timeRange, setTimeRange] = useState('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const generateUsers = (version) => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      projects: version === 'v1'
        ? Math.floor(Math.random() * 10) + 1
        : Math.floor(Math.random() * 20) + 5,
      weeklyProjects: Math.floor(Math.random() * 5) + 1,
    }));
  };

  const [users, setUsers] = useState(generateUsers(version));

  const handleVersionChange = (event) => {
    const newVersion = event.target.value;
    setVersion(newVersion);
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

  return (
    <div className={`w-full max-w-6xl mx-auto mt-4 rounded-[14px] ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-4 md:p-6 font-grotesk`}>
  
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
          <select
            value={version}
            onChange={handleVersionChange}
            className={`px-3 py-2 rounded-md border ${darkmode ? 'bg-[#1a1a1a] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
          >
            <option value="v1">Version 1</option>
            <option value="v7">Version 7</option>
          </select>

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
