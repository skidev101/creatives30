import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FiPlus, FiCalendar, FiClock, FiCheckCircle, FiXCircle, FiX } from 'react-icons/fi';


const AdminProfile = () => {
  const darkmode = useSelector((state) => state.darkMode);
  const [activeTab, setActiveTab] = useState('profile');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newVersion, setNewVersion] = useState({
    name: '',
    startDate: null,
    description: ''
  });

  // Mock data
  const adminProfile = {
    name: 'Admin User',
    email: 'admin@example.com',
    lastLogin: '2023-07-25 14:30',
    role: 'Super Admin'
  };

  const challengeVersions = [
    { id: '1', name: 'Summer Challenge', startDate: '2023-06-01', endDate: '2023-06-30', status: 'closed' },
    { id: '2', name: 'Fall Challenge', startDate: '2023-09-01', endDate: '2023-09-30', status: 'closed' },
    { id: '3', name: 'Winter Challenge', startDate: '2023-12-01', endDate: '2023-12-31', status: 'active' },
    { id: '4', name: 'Spring Challenge', startDate: '2024-03-01', endDate: '2024-03-31', status: 'upcoming' },
  ];

  // Calculate end date 30 days from start date
  const calculateEndDate = (startDate) => {
    if (!startDate) return null;
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 30);
    return endDate;
  };

  const handleCreateVersion = () => {
    const endDate = calculateEndDate(newVersion.startDate);
    console.log('Creating new version:', {
      ...newVersion,
      endDate: endDate?.toISOString().split('T')[0],
      status: 'upcoming'
    });
    setShowCreateModal(false);
    setNewVersion({ name: '', startDate: null, description: '' });
  };

  const getStatusBadge = (status) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
 
const NormalDatePicker = () => {
  const darkmode = useSelector((state) => state.darkMode);
  const [date, setDate] = useState('');

  return (
    <div className={`inline-flex flex-col rounded-[14px] border ${darkmode ? 'border-neutral-800 bg-[#111313]' : 'border-slate-100 bg-white'} p-4`}>
      <label 
        htmlFor="datepicker" 
        className={`mb-2 text-sm font-medium ${darkmode ? 'text-neutral-300' : 'text-gray-700'}`}
      >
        Select Date
      </label>
      <input
        type="date"
        id="datepicker"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={`w-full p-2 rounded-lg border ${darkmode ? 'border-neutral-700 bg-[#1a1a1a] text-white' : 'border-gray-300 bg-white text-gray-900'}`}
      />
    </div>
  );
};


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

  return (
    <div className={`inline-flex w-full flex-col items-start border-b justify-start rounded-[14px] border ${darkmode ? 'border-neutral-800' : 'border-slate-100'} ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-6 space-y-6 font-grotesk`}>
      {/* Header with tabs */}
      <div className="flex w-full items-start justify-between">
        <div className="flex flex-col">
          <h2 className={`text-2xl font-bold ${darkmode ? 'text-white' : 'text-gray-900'}`}>
            Admin Dashboard
          </h2>
          <div className="flex mt-4 border-b border-gray-200 dark:border-neutral-800">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'profile' ? (darkmode ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600') : (darkmode ? 'text-neutral-400' : 'text-gray-500')}`}
            >
              My Profile
            </button>
            <button
              onClick={() => setActiveTab('challenges')}
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'challenges' ? (darkmode ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600') : (darkmode ? 'text-neutral-400' : 'text-gray-500')}`}
            >
              Challenge Versions
            </button>
          </div>
        </div>
        
        {activeTab === 'challenges' && (
          <button
            onClick={() => setShowCreateModal(true)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${darkmode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            <FiPlus size={16} />
            New Version
          </button>
        )}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`rounded-lg p-6 ${darkmode ? 'bg-[#1a1a1a]' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${darkmode ? 'bg-neutral-800 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {adminProfile.name.charAt(0)}
              </div>
              <div>
                <h3 className={`text-lg font-bold ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                  {adminProfile.name}
                </h3>
                <p className={`text-sm ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>
                  {adminProfile.role}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className={`text-sm ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>Email</p>
                <p className={`${darkmode ? 'text-white' : 'text-gray-900'}`}>{adminProfile.email}</p>
              </div>
              <div>
                <p className={`text-sm ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>Last Login</p>
                <p className={`${darkmode ? 'text-white' : 'text-gray-900'}`}>{adminProfile.lastLogin}</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className={`text-lg font-bold mb-4 ${darkmode ? 'text-white' : 'text-gray-900'}`}>
              Recent Activity
            </h3>
            <div className={`rounded-lg p-4 ${darkmode ? 'bg-[#1a1a1a]' : 'bg-gray-50'}`}>
              <p className={`${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>
                No recent activity to display
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Challenge Versions Tab */}
      {activeTab === 'challenges' && (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className={`border-b ${darkmode ? 'border-neutral-800' : 'border-slate-100'}`}>
                <th className={`pb-3 text-left text-sm font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>Version Name</th>
                <th className={`pb-3 text-left text-sm font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>Start Date</th>
                <th className={`pb-3 text-left text-sm font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>End Date</th>
                <th className={`pb-3 text-left text-sm font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>Status</th>
                <th className={`pb-3 text-left text-sm font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-800">
              {challengeVersions.map((version) => (
                <tr key={version.id}>
                  <td className={`py-4 text-sm ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                    {version.name}
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
                    {getStatusBadge(version.status)}
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
      )}

      {/* Create New Version Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`rounded-[14px] ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-6 w-full max-w-md`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-bold ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                Create New Challenge Version
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className={`p-1 rounded-full ${darkmode ? 'hover:bg-neutral-800' : 'hover:bg-gray-100'}`}
              >
                <FiX size={20} className={darkmode ? 'text-neutral-400' : 'text-gray-500'} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block mb-1 text-sm font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-700'}`}>
                  Version Name
                </label>
                <input
                  type="text"
                  value={newVersion.name}
                  onChange={(e) => setNewVersion({...newVersion, name: e.target.value})}
                  className={`w-full rounded-lg border ${darkmode ? 'border-neutral-800 bg-[#1a1a1a] text-white' : 'border-gray-300 bg-white'} px-3 py-2 text-sm`}
                  placeholder="e.g., Summer Challenge 2023"
                />
              </div>

              <div>
                <label className={`block mb-1 text-sm font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-700'}`}>
                  Start Date
                </label>
                <DatePicker
                  className={`w-full rounded-lg border ${darkmode ? 'border-neutral-800 bg-[#1a1a1a] text-white' : 'border-gray-300 bg-white'}`}
                  onChange={(date) => setNewVersion({...newVersion, startDate: date})}
                />
              </div>

              <div>
                <label className={`block mb-1 text-sm font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-700'}`}>
                  End Date (auto-calculated)
                </label>
                <div className={`w-full rounded-lg border ${darkmode ? 'border-neutral-800 bg-[#1a1a1a] text-white' : 'border-gray-300 bg-white'} px-3 py-2 text-sm`}>
                  {newVersion.startDate ? calculateEndDate(newVersion.startDate).toLocaleDateString() : 'Select start date first'}
                </div>
              </div>

              <div>
                <label className={`block mb-1 text-sm font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-700'}`}>
                  Description (Optional)
                </label>
                <textarea
                  value={newVersion.description}
                  onChange={(e) => setNewVersion({...newVersion, description: e.target.value})}
                  className={`w-full rounded-lg border ${darkmode ? 'border-neutral-800 bg-[#1a1a1a] text-white' : 'border-gray-300 bg-white'} px-3 py-2 text-sm`}
                  rows={3}
                  placeholder="Describe this challenge version..."
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${darkmode ? 'text-white hover:bg-neutral-800' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateVersion}
                disabled={!newVersion.name || !newVersion.startDate}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${darkmode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <FiPlus size={16} />
                Create Version
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;