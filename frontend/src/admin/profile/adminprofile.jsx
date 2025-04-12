
import { useSelector } from 'react-redux';
import { FiPlus, FiCalendar, FiClock, FiCheckCircle, FiXCircle, FiX } from 'react-icons/fi';


const AdminProfile = () => {
  const darkmode = useSelector((state) => state.darkMode);

  

  const challengeVersions = [
    { id: '1', name: 'Version 10', startDate: '2023-06-01', endDate: '2023-06-30', status: 'closed' },
    { id: '2', name: 'Version 11', startDate: '2023-09-01', endDate: '2023-09-30', status: 'closed' },
    { id: '3', name: 'Version 12', startDate: '2023-12-01', endDate: '2023-12-31', status: 'active' },
    { id: '4', name: 'Version 13', startDate: '2024-03-01', endDate: '2024-03-31', status: 'upcoming' },
  ];



  const getStatusBadge = (status) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
 


    switch (status) {
      case 'active':
        return (
          <span className={`${baseClasses} ${darkmode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
            <FiCheckCircle className="mr-1" /> 
          </span>
        );
      case 'closed':
        return (
          <span className={`${baseClasses} ${darkmode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'}`}>
            <FiXCircle className="mr-1" /> 
          </span>
        );
      case 'upcoming':
        return (
          <span className={`${baseClasses} ${darkmode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
            <FiClock className="mr-1" /> 
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

  return (
    <div className={`w-full max-w-6xl mx-auto mt-4 rounded-[14px] ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-4 md:p-6 font-grotesk`}>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className={`border-b ${darkmode ? 'border-neutral-800' : 'border-slate-100'}`}>
                <th className={`pb-3 text-left text-sm font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>Version Name</th>
                <th className={`pb-3 text-left text-sm font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>Start Date</th>
                <th className={`pb-3 text-left text-sm font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>End Date</th>
                <th className={`pb-3 text-left text-sm font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-800">
              {challengeVersions.map((version) => (
                <tr key={version.id}>
                  <td className={`py-4 text-sm ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                    {version.name}  {getStatusBadge(version.status)}
                  </td>
                  <td className={`py-4 text-sm ${darkmode ? 'text-neutral-300' : 'text-gray-600'}`}>
                    <div className="flex items-center gap-2">
                      <FiCalendar size={14} />
                      {version.startDate}
                    </div>
                  </td>
                  <td className={`py-4 text-sm ${darkmode ? 'text-neutral-300' : 'text-gray-600'}`}>
                    <div className="flex items-center gap-2">
                      <FiCalendar size={14} />
                      {version.endDate}
                    </div>
                  </td>
                 
                  <td className="py-4">
                    <button
                      className={`text-sm ${darkmode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
     

   
    
    </div>
  );
};

export default AdminProfile;