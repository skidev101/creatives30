import { useSelector } from 'react-redux';
import { FiUser, FiChevronLeft, FiChevronRight, FiTrash2, FiToggleRight, FiToggleLeft, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { deleteUser, fetchUsers, disableUser, enableUser } from './api';
import { DeleteUserModal } from './modal';

const UsersList = () => {
  const darkmode = useSelector((state) => state.darkMode);
  const user = useSelector((state) => state.user);
  
  // delete
  const [deletingEmail, setDeletingEmail] = useState(null);
  const [confirmDeleteEmail, setConfirmDeleteEmail] = useState(null);

  // loading and error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // user and pagination
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;
  const [totalUsers, setTotalUsers] = useState(0);
  const pageCount = Math.ceil(totalUsers / rowsPerPage);

  // success
  const [successMessage, setSuccessMessage] = useState(null);
  
  // toggle status
  const [togglingEmail, setTogglingEmail] = useState(null);

  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccessMessage(null);
      }, 3000); 

      return () => clearTimeout(timer); 
    }
  }, [error, successMessage]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers(currentPage, rowsPerPage);
        console.log("users", data);
        
        setUsers(data.data);
        setTotalUsers(data.totalUsers);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [currentPage, user]);

  const handleDeleteUser = async (email) => {
    try {
      setDeletingEmail(email);
      await deleteUser(email);
      const data = await fetchUsers(currentPage, rowsPerPage);
      
      setUsers(data.data);
      setTotalUsers(data.totalUsers);
      setError(null);
      setSuccessMessage(`User with email ${email} has been successfully deleted.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingEmail(null);
      setConfirmDeleteEmail(null);
    }
  };

  const handleConfirmDelete = (email) => {
    setConfirmDeleteEmail(email); 
  };

  const cancelDelete = () => {
    setConfirmDeleteEmail(null); 
  };

  const toggleUserStatus = async (email, isCurrentlyDisabled) => {
    try {
      setTogglingEmail(email);
      
      if (isCurrentlyDisabled) {
        await enableUser(email);
      } else {
        await disableUser(email);
      }
      
      setUsers(users.map(user => 
        user.email === email 
          ? { ...user, disabled: !isCurrentlyDisabled } 
          : user
      ));
      
      setSuccessMessage(`User has been ${isCurrentlyDisabled ? 'enabled' : 'disabled'} successfully.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setTogglingEmail(null);
    }
  };

  return (
    <div className={`w-full max-w-6xl mx-auto mt-4 rounded-[14px] ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-4 md:p-6 font-grotesk`}>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-2">
          <h2 className={`lg:text-xl md:text-md text-sm font-bold ${darkmode ? 'text-white' : 'text-gray-900'}`}>
            Users List
          </h2>
          <div className="text-sm text-gray-500 dark:text-neutral-400">{totalUsers} users</div>
        </div>

        {loading && (
          <div className={`w-full max-w-6xl mx-auto mt-4 rounded-[14px] ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-4 md:p-6 font-grotesk`}>
            <div className="flex flex-col justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
              <p className={`text-sm ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>
                Loading users...
              </p>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="text-center w-full text-sm text-red-500 py-6">{error}</div>
        )}
        
        {successMessage && (
          <div className="text-center w-full text-sm text-green-500 py-6">
            {successMessage}
          </div>
        )}

        {!loading && users.length > 0 && (
          <div className="min-w-full inline-block align-middle mt-2">
            <div className={`rounded-lg border ${darkmode ? 'border-neutral-800' : 'border-gray-200'} overflow-hidden`}>
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-800">
                <thead className={darkmode ? 'bg-[#1a1a1a]' : 'bg-gray-50'}>
                  <tr>
                    <th className={`px-4 py-3 text-left text-xs font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-500'} uppercase`}>User</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium hidden md:table-cell ${darkmode ? 'text-neutral-400' : 'text-gray-500'} uppercase`}>Email</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-500'} uppercase`}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className={`${darkmode ? 'hover:bg-[#222]' : 'hover:bg-gray-50'}`}>
                      <td className={`px-4 py-4 text-sm font-medium ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                        <div className="flex items-center gap-3 truncate">
                          <div className={`p-2 rounded-full ${darkmode ? 'bg-neutral-800' : 'bg-gray-100'} relative`}>
                            <FiUser className={!user.disabled ? 
                              (darkmode ? 'text-green-400' : 'text-green-600') : 
                              (darkmode ? 'text-red-400' : 'text-red-600')} 
                            />
                            {!user.disabled ? (
                              <FiCheckCircle 
                                className={`absolute -bottom-1 -right-1 text-xs ${
                                  darkmode ? 'text-green-400' : 'text-green-600'
                                } bg-white bg-neutral-800 rounded-full`} 
                              />
                            ) : (
                              <FiXCircle 
                                className={`absolute -bottom-1 -right-1 text-xs ${
                                  darkmode ? 'text-red-400' : 'text-red-600'
                                } bg-white bg-neutral-800 rounded-full`} 
                              />
                            )}
                          </div>
                          <div className="truncate">
                            <div className="font-medium truncate max-w-[150px]">{user.username || ''}</div>
                            <div className={`text-xs ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>
                              Joined {formatDate(user.createdAt)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 hidden text-sm md:table-cell">
                        <div className="">
                          <span className={darkmode ? 'text-neutral-300' : 'text-gray-600'}>
                            {user.email}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm font-medium">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleUserStatus(user.email, user.disabled)}
                            className={`p-2 rounded-lg ${
                              darkmode
                                ? 'hover:bg-neutral-800'
                                : 'hover:bg-gray-100'
                            }`}
                            title={user.disabled ? 'Enable user' : 'Disable user'}
                            disabled={togglingEmail === user.email}
                          >
                            {!user.disabled ? (
                              <FiToggleRight size={16} className="text-green-500" />
                            ) : (
                              <FiToggleLeft size={16} className="text-red-500" />
                            )}
                          </button>
                          <button
                            onClick={() => handleConfirmDelete(user.email)}
                            className={`p-2 rounded-lg ${
                              darkmode
                                ? 'hover:bg-neutral-800 text-red-400'
                                : 'hover:bg-gray-100 text-red-500'
                            }`}
                            title="Delete user"
                            disabled={deletingEmail === user.email}
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {confirmDeleteEmail && (
          <DeleteUserModal 
            confirmDeleteEmail={confirmDeleteEmail}
            darkmode={darkmode}
            cancelDelete={cancelDelete}
            handleDeleteUser={handleDeleteUser}
          />
        )}
      </div>

      {!loading && totalUsers > rowsPerPage && (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4 w-full">
          <div className={`text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
            {(currentPage - 1) * rowsPerPage + 1} to{' '}
            {Math.min(currentPage * rowsPerPage, totalUsers)} of {totalUsers} users
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${
                darkmode
                  ? 'text-gray-300 hover:bg-gray-800 disabled:text-gray-600'
                  : 'text-gray-700 hover:bg-gray-100 disabled:text-gray-400'
              }`}
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
                  className={`w-8 h-8 rounded-md ${
                    currentPage === pageNum
                      ? darkmode
                        ? 'bg-red-800 text-white'
                        : 'bg-blue-600 text-white'
                      : darkmode
                      ? 'text-gray-300 hover:bg-gray-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(pageCount, prev + 1))}
              disabled={currentPage === pageCount}
              className={`p-2 rounded-md ${
                darkmode
                  ? 'text-gray-300 hover:bg-gray-800 disabled:text-gray-600'
                  : 'text-gray-700 hover:bg-gray-100 disabled:text-gray-400'
              }`}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}

      {!loading && users.length === 0 && (
        <div className={`w-full py-12 text-center ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>
          No users found
        </div>
      )}
    </div>
  );
};

export default UsersList;

function formatDate(dateString) {
  if (!dateString) return 'Unknown date';
  const date = new Date(dateString);
  if (isNaN(date)) return 'Invalid date';

  const day = date.getUTCDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getUTCFullYear().toString().slice(-2);

  const dayWithSuffix =
    day +
    (day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
      ? 'nd'
      : day % 10 === 3 && day !== 13
      ? 'rd'
      : 'th');

  return `${dayWithSuffix} ${month} ${year}`;
}