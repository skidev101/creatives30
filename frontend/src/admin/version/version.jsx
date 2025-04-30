/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import {  useState } from 'react';
import { FiPlus, FiCheck } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/image.png';
import VersionModal from './modal';
import { setCurrentVersion } from '../../action';
import { authFetch } from '../../utils/auth';
import VersionDetails from '../profile/details';

export default function VersionPage() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
     const darkMode = useSelector((state) => state.darkMode);

  const navigate = useNavigate();

  const Useremail = user?.email;
  const Userimg = Useremail ? Useremail.charAt(0).toUpperCase() : '';
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [newVersionName, setNewVersionName] = useState('');
  const [loadingC, setLoadingC] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [createdVersion, setCreatedVersion] = useState(null);
  const leaderboard = useSelector((state) => state.leaderboard)
  const currentVersion = leaderboard.currentVersion
  const handleCreateVersion = async () => {
    setLoadingC(true);
    setError(null);
    setSuccess(null);

    try {
      const VData = {
        title: newVersionName,
        uid: user.uid 
      };

      const response = await authFetch('https://xen4-backend.vercel.app/admin/newVersion', {
        method: 'POST',
        body: JSON.stringify(VData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create version");
      }

      const data = await response.json();
      const versionNumber = data.version;
      const versionKey = `v${versionNumber}`;
      const versionTitle = data.title || newVersionName;

      // Update UI immediately
      setCreatedVersion({
        id: versionKey,
        name: versionTitle,
        createdAt: new Date().toISOString()
      });

      // Set in Redux
      dispatch(setCurrentVersion(versionKey));

      // Show success message
      setSuccess(`Version ${versionKey} created successfully!`);

      // Reset form
      setNewVersionName('');
      setShowVersionModal(false);

  
      setTimeout(() => {
        navigate('/lead');
      }, 2500);

    } catch (error) {
      console.error('Error creating version:', error);
      setError(error.message || "Failed to create version");
    } finally {
      setLoadingC(false);
    }
  };

  // Display newly created version in UI
  const renderCreatedVersion = () => {
    if (!createdVersion) return null;

    return (
      <div className={`mb-4 p-3 rounded-md ${darkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
        <div className="flex items-center gap-2">
          <FiCheck className="text-green-500" />
          <span className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
            {success}
          </span>
        </div>
        <div className={`mt-2 text-xs ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
          Version: {createdVersion.id} | Name: {createdVersion.name}
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full max-w-6xl mx-auto mt-4 rounded-[14px] ${darkMode ? 'bg-[#111313]' : 'bg-white'} p-4 md:p-6 font-grotesk`}>
      <div className={`flex items-center justify-between mb-4 border-b w-full ${darkMode ? 'border-neutral-800' : 'border-slate-200'}`}>
      <div className={`
  lg:h-10 lg:w-10 h-10 w-10 rounded-full 
  ${darkMode ? 
    'bg-gradient-to-br from-blue-600 to-indigo-700' : 
    'bg-gradient-to-br from-blue-500 to-cyan-400'
  }
  ${darkMode ? 'backdrop-blur-sm' : 'backdrop-blur-xs'}
  border ${darkMode ? 'border-indigo-400/30' : 'border-white/30'}
  shadow-lg ${darkMode ? 'shadow-blue-900/30' : 'shadow-blue-300/20'}
  flex items-center justify-center mb-4
  text-white
`}>
  <span className='text-lg  font-medium'>
    {currentVersion}
  </span>
</div>
      
        <button
          onClick={() => setShowVersionModal(true)}
          className={`
            flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium
            bg-gradient-to-r ${darkMode ? 'from-blue-600 to-purple-700' : 'from-blue-500 to-blue-400'}
            backdrop-blur-md
            border ${darkMode ? 'border-blue-400/30' : 'border-white/30'}
            shadow-lg ${darkMode ? 'shadow-blue-900/30' : 'shadow-blue-300/30'}
            hover:shadow-xl hover:brightness-110
            transition-all duration-300
            text-white
          `}
          disabled={loadingC}
        >
          <FiPlus size={16} />
          New Version
        </button>
      </div>

      {/* Success message display */}
      {renderCreatedVersion()}

      {showVersionModal && (
        <VersionModal 
          darkmode={darkMode}
          showVersionModal={showVersionModal}
          newVersionName={newVersionName}
          setNewVersionName={setNewVersionName}
          setShowVersionModal={setShowVersionModal}
          handleCreateVersion={handleCreateVersion}
          error={error}
          loadingC={loadingC}
        />
      )}
      
      <VersionDetails />
    </div>
  );
}