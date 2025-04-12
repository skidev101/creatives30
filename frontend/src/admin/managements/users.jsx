import { useSelector } from 'react-redux';
import { FiTrash2, FiEdit2, FiUser, FiUserCheck, FiUserX } from 'react-icons/fi';

const UsersList = () => {
  const darkmode = useSelector((state) => state.darkMode);
  
  // Mock user data
  const users = [
    { id: '1', email: 'user1@example.com', name: 'John Doe',  createdAt: '2023-07-10' },
    { id: '2', email: 'user2@example.com', name: 'Jane Smith',  createdAt: '2023-07-15' },
    { id: '3', email: 'user3@example.com', name: 'Bob Johnson',  role: 'admin', createdAt: '2023-07-20' },
  ];



  const handleDeleteUser = (userId) => {
    console.log('Would delete user with id:', userId);
  };


  return (
    <div className={`inline-flex w-full flex-col items-start border-b justify-start rounded-[14px] border ${darkmode ? 'border-neutral-800' : 'border-slate-100'} ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-6 space-y-6 font-grotesk`}>
      <div className="flex w-full items-center justify-between">
        <h2 className={`text-xl font-bold ${darkmode ? 'text-white' : 'text-gray-900'}`}>
          Users List
        </h2>
        <div className="text-sm text-gray-500 dark:text-neutral-400">
          {users.length} users
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[400px]">
          <thead>
            <tr className={`border-b ${darkmode ? 'border-neutral-800' : 'border-slate-100'}`}>
              <th className={`pb-3 text-left text-sm font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>User</th>
              <th className={`pb-3 text-left text-sm font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>Email</th>
              <th className={`pb-3 text-left text-sm font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>Actions</th>
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
                      <div className="font-medium">{user.name}</div>
                      <div className={`text-xs ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>
                        Joined {user.createdAt}
                      </div>
                    </div>
                  </div>
                </td>
                <td className={`py-4 text-sm ${darkmode ? 'text-neutral-300' : 'text-gray-600'}`}>
                  {user.email}
                </td>
                
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className={`p-2 rounded-lg ${darkmode ? 'hover:bg-neutral-800 text-red-400' : 'hover:bg-gray-100 text-red-500'}`}
                      title="Delete user"
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

      {/* Empty state */}
      {users.length === 0 && (
        <div className={`w-full py-12 text-center ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>
          No users found
        </div>
      )}
    </div>
  );
};

export default UsersList;