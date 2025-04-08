import { useSelector } from 'react-redux';
import { useState } from 'react';
import { FiSearch, FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';

const StarRating = ({ rating, darkmode }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <FiStar key={`full-${i}`} color={darkmode ? "#FFD700" : "#FFA500"} fill={darkmode ? "#FFD700" : "#FFA500"} />
      ))}
      {hasHalfStar && (
        <div className="relative w-4">
          <FiStar color={darkmode ? "#555" : "#ddd"} />
          <div className="absolute left-0 w-1/2 overflow-hidden">
            <FiStar color={darkmode ? "#FFD700" : "#FFA500"} fill={darkmode ? "#FFD700" : "#FFA500"} />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <FiStar key={`empty-${i}`} color={darkmode ? "#555" : "#ddd"} />
      ))}
    </div>
  );
};

export default function LeaderBoardPage() {
  const darkmode = useSelector((state) => state.darkMode);
  const [version, setVersion] = useState('v1');
  const [timeRange, setTimeRange] = useState('all');
  const [sortBy, setSortBy] = useState('projects');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Simulate more comprehensive data
  const generateUsers = (version) => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      projects: version === 'v1' 
        ? Math.floor(Math.random() * 10) + 1 
        : Math.floor(Math.random() * 20) + 5,
      rating: (Math.random() * 4 + 1).toFixed(1), // Rating between 1.0 and 5.0
      weeklyProjects: Math.floor(Math.random() * 5) + 1,
      weeklyRating: (Math.random() * 2 + 3).toFixed(1), // Weekly rating between 3.0 and 5.0
    }));
  };

  const [users, setUsers] = useState(generateUsers('v1'));

  const handleVersionChange = (event) => {
    const newVersion = event.target.value;
    setVersion(newVersion);
    setUsers(generateUsers(newVersion));
    setCurrentPage(1);
  };

  const handleTimeRangeChange = (newRange) => {
    if (newRange !== null) {
      setTimeRange(newRange);
      setCurrentPage(1);
    }
  };

  const handleSortChange = (event) => {
    const [newSortBy, newSortOrder] = event.target.value.split('-');
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply time range filter
  const timeFilteredUsers = filteredUsers.map(user => {
    if (timeRange === 'weekly') {
      return {
        ...user,
        displayProjects: user.weeklyProjects,
        displayRating: user.weeklyRating
      };
    }
    return {
      ...user,
      displayProjects: user.projects,
      displayRating: user.rating
    };
  });

  // Sort users
  const sortedUsers = [...timeFilteredUsers].sort((a, b) => {
    const valueA = sortBy === 'projects' ? a.displayProjects : parseFloat(a.displayRating);
    const valueB = sortBy === 'projects' ? b.displayProjects : parseFloat(b.displayRating);
    
    if (sortOrder === 'desc') {
      return valueB - valueA;
    }
    return valueA - valueB;
  });

  // Pagination logic
  const pageCount = Math.ceil(sortedUsers.length / rowsPerPage);
  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className={`w-full max-w-6xl mx-auto mt-4  rounded-[14px] ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-4 md:p-6 font-grotesk`}>
      {/* Filters Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Search Input */}
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

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          {/* Version Select */}
          <select
            value={version}
            onChange={handleVersionChange}
            className={`px-3 py-2 rounded-md border ${darkmode ? 'bg-[#1a1a1a] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
          >
            <option value="v1">Version 1</option>
            <option value="v7">Version 7</option>
          </select>

          {/* Time Range Toggle */}
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

          {/* Sort Select */}
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={handleSortChange}
            className={`px-3 py-2 rounded-md border ${darkmode ? 'bg-[#1a1a1a] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
          >
            <option value="projects-desc">Most Projects ↓</option>
            <option value="projects-asc">Fewest Projects ↑</option>
            <option value="rating-desc">Highest Rating ↓</option>
            <option value="rating-asc">Lowest Rating ↑</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className={`rounded-[14px] border ${darkmode ? 'border-gray-700 bg-[#1a1a1a]' : 'border-gray-200 bg-white'} mb-6 overflow-x-auto overflow w-full`}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={darkmode ? 'bg-[#2a2a2a]' : 'bg-gray-50'}>
            <tr>
              <th scope="col" className={`px-4 py-3 text-left text-xs font-medium ${darkmode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider whitespace-nowrap`}>
                Rank
              </th>
              <th scope="col" className={`px-4 py-3 text-left text-xs font-medium ${darkmode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider whitespace-nowrap`}>
                Name
              </th>
              <th scope="col" className={`px-4 py-3 text-left text-xs font-medium ${darkmode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider whitespace-nowrap`}>
                Projects
              </th>
              <th scope="col" className={`px-4 py-3 text-left text-xs font-medium ${darkmode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider whitespace-nowrap`}>
                Rating
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${darkmode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {paginatedUsers.map((user, index) => (
              <tr 
                key={user.id}
                className={darkmode ? (index % 2 === 0 ? 'bg-[#222]' : 'bg-[#1a1a1a]') : (index % 2 === 0 ? 'bg-white' : 'bg-gray-50')}
              >
                <td className={`px-4 py-4 whitespace-nowrap ${darkmode ? 'text-gray-300' : 'text-gray-900'}`}>
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className={`px-4 py-4 whitespace-nowrap ${darkmode ? 'text-gray-300 font-medium' : 'text-gray-900 font-medium'}`}>
                  {user.name}
                </td>
                <td className={`px-4 py-4 whitespace-nowrap ${darkmode ? 'text-gray-300' : 'text-gray-900'}`}>
                  {user.displayProjects}
                </td>
                <td className={`px-4 py-4 whitespace-nowrap ${darkmode ? 'text-gray-300' : 'text-gray-900'}`}>
                  <div className="flex items-center gap-1">
                    <StarRating rating={parseFloat(user.displayRating)} darkmode={darkmode} />
                    <span className="ml-1">{user.displayRating}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
        <div className={`text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
          Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, sortedUsers.length)} of {sortedUsers.length} entries
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-md ${darkmode ? 'text-gray-300 hover:bg-gray-800 disabled:text-gray-600' : 'text-gray-700 hover:bg-gray-100 disabled:text-gray-400'}`}
          >
            <FiChevronLeft />
          </button>
          
          {Array.from({ length: Math.min(3, pageCount) }, (_, i) => {
            let pageNum;
            if (pageCount <= 3) {
              pageNum = i + 1;
            } else if (currentPage <= 2) {
              pageNum = i + 1;
            } else if (currentPage >= pageCount - 1) {
              pageNum = pageCount - 2 + i;
            } else {
              pageNum = currentPage - 1 + i;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-8 h-8 rounded-md ${currentPage === pageNum ? (darkmode ? 'bg-red-800 text-white' : 'bg-blue-600 text-white') : (darkmode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100')}`}
              >
                {pageNum}
              </button>
            );
          })}
          
          {pageCount > 3 && currentPage < pageCount - 1 && (
            <span className={`px-2 ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>...</span>
          )}
          
          {pageCount > 3 && currentPage < pageCount - 1 && (
            <button
              onClick={() => handlePageChange(pageCount)}
              className={`w-8 h-8 rounded-md ${currentPage === pageCount ? (darkmode ? 'bg-red-800 text-white' : 'bg-blue-600 text-white') : (darkmode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100')}`}
            >
              {pageCount}
            </button>
          )}
          
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