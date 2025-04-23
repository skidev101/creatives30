import { useSelector } from 'react-redux';
import { FiUser, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { fetchUsers } from './api';

const UsersList = () => {
  const darkmode = useSelector((state) => state.darkMode);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true); // Start loading as true initially
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;
  const [totalUsers, setTotalUsers] = useState(0);

  const pageCount = Math.ceil(totalUsers / rowsPerPage);

  useEffect(() => {
    // Reset error state whenever user changes
    if (user) setError(null);
  }, [user]);

  useEffect(() => {
    const loadUsers = async () => {
      if (!user) {
        console.log("No user in Redux yet, skipping fetchUsers");
        return;
      }
      try {
        setLoading(true); // Ensure loading is true when fetching
        const data = await fetchUsers(currentPage, rowsPerPage);
        setUsers(data.data);
        setTotalUsers(data.totalUsers);
        setError(null); // Clear any existing error on successful fetch
      } catch (err) {
        setError(err.message); // Show error if fetch fails
        console.log(err.message, "e");
      } finally {
        setLoading(false); // Stop loading regardless of the result
      }
    };

    loadUsers();
  }, [currentPage, user]);

  return (
    <div className={`inline-flex w-full flex-col items-start border-b justify-start rounded-[14px] border ${darkmode ? 'border-neutral-800 bg-[#111313]' : 'border-slate-100 bg-white'} p-6 space-y-6 font-grotesk`}>
      <div className="flex w-full items-center justify-between">
        <h2 className={`lg:text-xl md:text-md text-sm font-bold ${darkmode ? 'text-white' : 'text-gray-900'}`}>Users List</h2>
        <div className="text-sm text-gray-500 dark:text-neutral-400">{totalUsers} users</div>
      </div>

      {loading && <div className="text-center w-full text-sm text-gray-400 py-6">Loading users...</div>}

      {error && !loading && <div className="text-center w-full text-sm text-red-500 py-6">{error}</div>}

      {!loading && users.length > 0 && (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[400px]">
            <thead>
              <tr className={`border-b ${darkmode ? 'border-neutral-800' : 'border-slate-100'}`}>
                <th className={`pb-3 text-left text-sm font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>User</th>
                <th className={`pb-3 text-left text-sm font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-800">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className={`py-4 text-sm ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${darkmode ? 'bg-neutral-800' : 'bg-gray-100'}`}>
                        <FiUser className={darkmode ? 'text-neutral-400' : 'text-gray-500'} />
                      </div>
                      <div>
                        <div className="font-medium">{user.username || user.name}</div>
                        <div className={`text-xs ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>Joined {user.createdAt}</div>
                      </div>
                    </div>
                  </td>
                  <td className={`py-4 text-sm ${darkmode ? 'text-neutral-300' : 'text-gray-600'}`}>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && totalUsers > rowsPerPage && (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4 w-full">
          <div className={`text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, totalUsers)} of {totalUsers} entries
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
      )}

      {!loading && users.length === 0 && (
        <div className={`w-full py-12 text-center ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>No users found</div>
      )}
    </div>
  );
};

export default UsersList;
