/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FiPlus, FiCalendar, FiClock, FiCheckCircle, FiXCircle, FiX, FiInfo, FiAward, FiUsers, FiFolder, FiChevronLeft, FiChevronsRight, FiChevronRight } from 'react-icons/fi';
import DetailsModal from './modal';
import { fetchVersion } from './api';

const VersionDetails = () => {
  const darkmode = useSelector((state) => state.darkMode);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [versionStats, setVersionStats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  const pageCount = Math.ceil(versionStats.length / rowsPerPage);
  const paginatedVersion = versionStats.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  useEffect(() => {
    const loadVersionStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchVersion();
        console.log("Version stats:", data);
        console.log("Version stats:", data.version);
        setVersionStats(data);
      
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadVersionStats();
  }, [currentPage]);

  const getStatusBadge = (version) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    
    
    const now = new Date();
    const startDate = new Date(version.createdAt);
    const endDate = version.endedAt ? new Date(version.endedAt) : null;
    
    if (!endDate) {
      return (
        <span className={`${baseClasses} ${darkmode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
          <FiClock className="mr-1" /> Upcoming
        </span>
      );
    } else if (now > endDate) {
      return (
        <span className={`${baseClasses} ${darkmode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'}`}>
          <FiXCircle className="mr-1" /> Closed
        </span>
      );
    } else if (now >= startDate && now <= endDate) {
      return (
        <span className={`${baseClasses} ${darkmode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
          <FiCheckCircle className="mr-1" /> Active
        </span>
      );
    } else {
      return (
        <span className={`${baseClasses} ${darkmode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
          Unknown
        </span>
      );
    }
  };


  const openVersionDetails = (version) => {
    setSelectedVersion(version);
    setShowModal(true);
  };
  if (loading) {
    return (
      <div className={`w-full max-w-6xl mx-auto mt-4 rounded-[14px] ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-4 md:p-6 font-grotesk flex justify-center items-center h-64`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`w-full max-w-6xl mx-auto mt-4 rounded-[14px] ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-4 md:p-6 font-grotesk text-center text-red-500`}>
        {error}
      </div>
    );
  }
  return (
    <div className={`w-full max-w-6xl mx-auto mt-4 rounded-[14px] ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-4 md:p-6 font-grotesk`}>
      
    
      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className={`rounded-lg border ${darkmode ? 'border-neutral-800' : 'border-gray-200'} overflow-hidden`}>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-800">
              <thead className={darkmode ? 'bg-[#1a1a1a]' : 'bg-gray-50'}>
                <tr>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-500'} uppercase`}>Version</th>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-500'} uppercase`}>Status</th>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-500'} uppercase`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedVersion.map((version) => (
                  <tr 
                    key={version.id} 
                    className={`${darkmode ? 'hover:bg-[#222]' : 'hover:bg-gray-50'}`}
                  >
                    <td className={`px-4 py-4 text-sm font-medium ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                      Version {version?.version}
                    </td>
                    <td className="px-4 py-4">
                      {getStatusBadge(version)}
                    </td>
                  
                    <td className="px-4 py-4 text-sm font-medium">
                      <button
                        onClick={() => openVersionDetails(version)}
                        className={`flex items-center gap-1 ${darkmode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                      >
                        <FiInfo size={14} />
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
   <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4 w-full">
          <div className={`text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, versionStats.length)} of {versionStats.length} entries
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${darkmode ? 'text-gray-300 hover:bg-gray-800 disabled:text-gray-600' : 'text-gray-700 hover:bg-gray-100 disabled:text-gray-400'}`}
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
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-md ${currentPage === pageNum ? (darkmode ? 'bg-red-800 text-white' : 'bg-blue-600 text-white') : (darkmode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100')}`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(pageCount, prev + 1))}
              disabled={currentPage === pageCount}
              className={`p-2 rounded-md ${darkmode ? 'text-gray-300 hover:bg-gray-800 disabled:text-gray-600' : 'text-gray-700 hover:bg-gray-100 disabled:text-gray-400'}`}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      {/* Version Details Modal */}
      {showModal && selectedVersion && (
        <DetailsModal 
          darkmode={darkmode}
          setShowModal={setShowModal}
          selectedVersion={selectedVersion}
          showModal={showModal}
        />
      )}
    </div>
  );
};

export default VersionDetails;