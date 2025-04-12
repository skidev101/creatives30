/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FiTrash2, FiPlus, FiX, FiCheck } from 'react-icons/fi';

const AdminManagementUI = () => {
  const darkmode = useSelector((state) => state.darkMode);
  const [admins, setAdmins] = useState([
    { id: '1', email: 'admin1@example.com', createdAt: '2023-05-15' },
    { id: '2', email: 'admin2@example.com', createdAt: '2023-06-20' },
    { id: '3', email: 'admin3@example.com', createdAt: '2023-06-20' }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  
  const handleAddAdmin = () => {
    console.log('Would add admin:', newAdmin);
    setShowModal(false);
    setNewAdmin({ email: '', password: '', confirmPassword: '' });
  };

  const handleRemoveAdmin = (id) => {
    console.log('Would remove admin with id:', id);
  };

  return (
    <div className={`inline-flex w-full flex-col items-start border-b justify-start rounded-[14px] border ${darkmode ? 'border-neutral-800' : 'border-slate-100'} ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-6 space-y-6 font-grotesk`}>
      <div className="flex w-full items-center justify-between">
        <h2 className={`text-xl font-bold ${darkmode ? 'text-white' : 'text-gray-900'}`}>
          Admin Management
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${darkmode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
        >
          <FiPlus size={16} />
          Add Admin
        </button>
      </div>

      {/* Admins Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[400px]">
          <thead>
            <tr className={`border-b ${darkmode ? 'border-neutral-800' : 'border-slate-100'}`}>
              <th className={`pb-3 text-left text-sm font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>Email</th>
              <th className={`pb-3 text-left text-sm font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>Created At</th>
              <th className={`pb-3 text-left text-sm font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-neutral-800">
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td className={`py-4 text-sm ${darkmode ? 'text-white' : 'text-gray-900'}`}>{admin.email}</td>
                <td className={`py-4 text-sm ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>{admin.createdAt}</td>
                <td className="py-4">
                  <button
                    onClick={() => handleRemoveAdmin(admin.id)}
                    className={`flex items-center gap-1 rounded px-3 py-1 text-sm ${darkmode ? 'text-red-400 hover:bg-neutral-800' : 'text-red-500 hover:bg-red-50'}`}
                  >
                    <FiTrash2 size={14} />
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Admin Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-10">
          <div className={`rounded-[14px] ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-6 w-full max-w-md`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-bold ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                Add New Admin
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className={`p-1 rounded-full ${darkmode ? 'hover:bg-neutral-800' : 'hover:bg-gray-100'}`}
              >
                <FiX size={20} className={darkmode ? 'text-neutral-400' : 'text-gray-500'} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block mb-1 text-sm font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-700'}`}>
                  Email
                </label>
                <input
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                  className={`w-full rounded-lg border ${darkmode ? 'border-neutral-800 bg-[#1a1a1a] text-white' : 'border-gray-300 bg-white'} px-3 py-2 text-sm`}
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <label className={`block mb-1 text-sm font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-700'}`}>
                  Password
                </label>
                <input
                  type="password"
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                  className={`w-full rounded-lg border ${darkmode ? 'border-neutral-800 bg-[#1a1a1a] text-white' : 'border-gray-300 bg-white'} px-3 py-2 text-sm`}
                  placeholder="At least 6 characters"
                />
              </div>

              <div>
                <label className={`block mb-1 text-sm font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-700'}`}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={newAdmin.confirmPassword}
                  onChange={(e) => setNewAdmin({...newAdmin, confirmPassword: e.target.value})}
                  className={`w-full rounded-lg border ${darkmode ? 'border-neutral-800 bg-[#1a1a1a] text-white' : 'border-gray-300 bg-white'} px-3 py-2 text-sm`}
                  placeholder="Confirm password"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${darkmode ? 'text-white hover:bg-neutral-800' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Cancel
              </button>
              <button
                onClick={handleAddAdmin}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${darkmode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
              >
                <FiCheck size={16} />
                Add Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagementUI;