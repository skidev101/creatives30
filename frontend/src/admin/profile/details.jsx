import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FiPlus, FiCalendar, FiClock, FiCheckCircle, FiXCircle, FiX, FiInfo } from 'react-icons/fi';
import DetailsModal from './modal';

const VersionDetails = () => {
  const darkmode = useSelector((state) => state.darkMode);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const challengeVersions = [
    { 
      id: '1', 
      name: 'Version 10', 
      startDate: '2023-06-01', 
      endDate: '2023-06-30', 
      status: 'closed',
      totalSubmissions: 245,
      activeUsers: 87,
      description: 'Summer challenge focusing on creative projects'
    },
    { 
      id: '2', 
      name: 'Version 11', 
      startDate: '2023-09-01', 
      endDate: '2023-09-30', 
      status: 'closed',
      totalSubmissions: 312,
      activeUsers: 104,
      description: 'Fall coding challenge with new features'
    },
    { 
      id: '3', 
      name: 'Version 12', 
      startDate: '2023-12-01', 
      endDate: '2023-12-31', 
      status: 'active',
      totalSubmissions: 189,
      activeUsers: 62,
      description: 'Winter holiday special edition'
    },
    { 
      id: '4', 
      name: 'Version 13', 
      startDate: '2024-03-01', 
      endDate: '2024-03-31', 
      status: 'upcoming',
      totalSubmissions: 0,
      activeUsers: 0,
      description: 'Spring refresh with updated challenges'
    },
  ];

  const getStatusBadge = (status) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    
    switch (status) {
      case 'active':
        return (
          <span className={`${baseClasses} ${darkmode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
            <FiCheckCircle className="mr-1" /> Active
          </span>
        );
      case 'closed':
        return (
          <span className={`${baseClasses} ${darkmode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'}`}>
            <FiXCircle className="mr-1" /> Closed
          </span>
        );
      case 'upcoming':
        return (
          <span className={`${baseClasses} ${darkmode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
            <FiClock className="mr-1" /> Upcoming
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} ${darkmode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
            {status}
          </span>
        );
    }
  };

  const openVersionDetails = (version) => {
    setSelectedVersion(version);
    setShowModal(true);
  };

  return (
    <div className={`w-full max-w-6xl mx-auto mt-4 rounded-[14px] ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-4 md:p-6 font-grotesk`}>
      
      {/* Responsive Table */}
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
                {challengeVersions.map((version) => (
                  <tr 
                    key={version.id} 
                    className={`${darkmode ? 'hover:bg-[#222]' : 'hover:bg-gray-50'}`}
                  >
                    <td className={`px-4 py-4 text-sm font-medium ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                      {version.name}
                    </td>
                  
                    <td className="px-4 py-4">
                      {getStatusBadge(version.status)}
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

      {/* Version Details Modal */}
      {showModal && selectedVersion && (
      <>
      <DetailsModal 
      darkmode={darkmode}
      setShowModal={setShowModal}
      selectedVersion={selectedVersion}
      showModal={showModal}

      />
      </>
      )}
    </div>
  );
};

export default VersionDetails;