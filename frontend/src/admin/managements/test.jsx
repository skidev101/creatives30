import { useSelector } from 'react-redux';
import { FiUser, FiChevronLeft, FiChevronRight, FiTrash2 } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { deleteUser, fetchUsers } from './api';

const UsersList = () => {
  const darkmode = useSelector((state) => state.darkMode);
  const user = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [deletingEmail, setDeletingEmail] = useState(null);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;
  const [totalUsers, setTotalUsers] = useState(0);

  const pageCount = Math.ceil(totalUsers / rowsPerPage);

  useEffect(() => {
    if (user) setError(null);
  }, [user]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers(currentPage, rowsPerPage);
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
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingEmail(null);
    }
  };

  return (
    <div className={`w-full max-w-6xl mx-auto mt-4 rounded-[14px] ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-4 md:p-6 font-grotesk`}>
  
   
         <div className="overflow-x-auto scrollbar-hide">
         <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-2">
      <h2
        className={`lg:text-xl md:text-md text-sm font-bold ${
          darkmode ? 'text-white' : 'text-gray-900'
        }`}
      >
        Users List
      </h2>
      <div className="text-sm text-gray-500 dark:text-neutral-400">{totalUsers} users</div>
    </div>
  
    {loading && (
      <div className="text-center w-full text-sm text-gray-400 py-6">Loading users...</div>
    )}
  
    {error && !loading && (
      <div className="text-center w-full text-sm text-red-500 py-6">{error}</div>
    )}
   {!loading && users.length > 0 && (
           <div className="min-w-full inline-block align-middle">
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
                     <tr 
                       key={user.id} 
                       className={`${darkmode ? 'hover:bg-[#222]' : 'hover:bg-gray-50'}`}
                     >
                       <td className={`px-4 py-4 text-sm font-medium ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                              <div className="flex items-center gap-3 truncate">
                                            <div className={`p-2 rounded-full ${darkmode ? 'bg-neutral-800' : 'bg-gray-100'}`}>
                                              <FiUser className={darkmode ? 'text-neutral-400' : 'text-gray-500'} />
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
                                            onClick={() => handleDeleteUser(user.email)}
                                            className={`p-2 rounded-lg ${
                                              darkmode
                                                ? 'hover:bg-neutral-800 text-red-400'
                                                : 'hover:bg-gray-100 text-red-500'
                                            }`}
                                            title="Delete user"
                                            disabled={deletingEmail === user.email}
                                          >
                                            {deletingEmail === user.email ? 'Deleting...' : <FiTrash2 size={16} />}
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

// ✅ Safe and formatted
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
