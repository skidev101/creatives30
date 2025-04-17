/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FiTrash2, FiPlus, FiX, FiCheck } from 'react-icons/fi';
import AddAdminModal from './modal';
import { getAuth } from 'firebase/auth';

const AdminManagementUI = () => {
  const darkmode = useSelector((state) => state.darkMode);
   const [loading, setLoading] = useState(false)
     const [error, setError] = useState({
      email:'',
      general:''
     });
   
  const [admins, setAdmins] = useState([
    { id: '1', email: 'admin1@example.com', createdAt: '2023-05-15' },
    { id: '2', email: 'admin2@example.com', createdAt: '2023-06-20' },
    { id: '3', email: 'admin3@example.com', createdAt: '2023-06-20' }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    email: '',
  });
  const handleAddAdmin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError({ email: '', general: '' });
  
    
    const errors = {};
    if (!newAdmin.email) {
      errors.email = "Email is required";
    }
  
    if (Object.keys(errors).length > 0) {
      setError(errors);
      setLoading(false);
      return;
    }
  
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        setError(prev => ({ ...prev, general: "You must be logged in." }));
        setLoading(false);
        return;
      }
  
      const idToken = await user.getIdToken();
      const adminData = { email: newAdmin.email };
  
      const response = await fetch('https://xen4-backend.vercel.app/admin/addAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}` 
        },
        body: JSON.stringify(adminData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add admin");
      }
  
      const data = await response.json();
      console.log('Admin added successfully:', data);
      
      setAdmins(prev => [...prev, {
        id: Date.now().toString(),
        email: newAdmin.email,
        createdAt: new Date().toISOString().split('T')[0]
      }]);
      
      setNewAdmin({ email: '' });
      setShowModal(false);
  
    } catch (error) {
      console.error('Error adding admin:', error);
      setError(prev => ({ 
        ...prev, 
        general: error.message || "Failed to add admin" 
      }));
    } finally {
      setLoading(false);
    }
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

      
      {showModal && (
       <AddAdminModal
        newAdmin={newAdmin}
        setNewAdmin={setNewAdmin}
        showModal={showModal}
        setShowModal={setShowModal}
        darkmode={darkmode}
        handleAddAdmin={handleAddAdmin}
        error={error}
       />
      )}
    </div>
  );
};

export default AdminManagementUI;