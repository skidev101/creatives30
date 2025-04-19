/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FiPlus, FiCalendar, FiClock, FiCheckCircle, FiXCircle, FiX, FiInfo, FiAward, FiUsers, FiFolder } from 'react-icons/fi';
import DetailsModal from './modal';
import { fetchVersion } from './api';

const VersionDetails = () => {
  const darkmode = useSelector((state) => state.darkMode);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [versionStats, setVersionStats] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  
  useEffect(() => {
    const loadVersionStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchVersion(currentPage, rowsPerPage);
        console.log("Version stats:", data);
        setVersionStats(data);
      
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadVersionStats();
  }, [currentPage]);

  // const getStatusBadge = (version) => {
  //   const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    
    
  //   const now = new Date();
  //   const startDate = new Date(version.createdAt);
  //   const endDate = version.endedAt ? new Date(version.endedAt) : null;
    
  //   if (!endDate) {
  //     return (
  //       <span className={`${baseClasses} ${darkmode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
  //         <FiClock className="mr-1" /> Upcoming
  //       </span>
  //     );
  //   } else if (now > endDate) {
  //     return (
  //       <span className={`${baseClasses} ${darkmode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'}`}>
  //         <FiXCircle className="mr-1" /> Closed
  //       </span>
  //     );
  //   } else if (now >= startDate && now <= endDate) {
  //     return (
  //       <span className={`${baseClasses} ${darkmode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
  //         <FiCheckCircle className="mr-1" /> Active
  //       </span>
  //     );
  //   } else {
  //     return (
  //       <span className={`${baseClasses} ${darkmode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
  //         Unknown
  //       </span>
  //     );
  //   }
  // };


  const openVersionDetails = (version) => {
    setSelectedVersion(version);
    setShowModal(true);
  };

  return (
    <div className={`w-full max-w-6xl mx-auto mt-4 rounded-[14px] ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-4 md:p-6 font-grotesk`}>
      
      {loading && <div className="text-center py-4">Loading versions...</div>}
      {error && <div className="text-red-500 text-center py-4">{error}</div>}

     
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
                {/* {versionStats.map((version) => ( */}
                  <tr 
                    // key={version.version} 
                    className={`${darkmode ? 'hover:bg-[#222]' : 'hover:bg-gray-50'}`}
                  >
                    <td className={`px-4 py-4 text-sm font-medium ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                      Version {versionStats?.version}
                    </td>
                    <td className="px-4 py-4">
                      {/* {getStatusBadge(versionStats)} */}
                    </td>
                  
                    <td className="px-4 py-4 text-sm font-medium">
                      <button
                        onClick={() => openVersionDetails(versionStats)}
                        className={`flex items-center gap-1 ${darkmode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                      >
                        <FiInfo size={14} />
                        Details
                      </button>
                    </td>
                  </tr>
                {/* ))} */}
              </tbody>
            </table>
          </div>
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