
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FiTrash2, FiPlus,  FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import {AddAdminModal} from './modal';

import { addAdmin, fetchAdmins } from './api';

const AdminManagementUI = () => {
 const darkmode = useSelector((state) => state.darkMode);
 // add admins
 const [loading, setLoading] = useState(false)
     const [error, setError] = useState({
      email:'',
      general:''
     });

  const [showModal, setShowModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    email: '',
  });
// get admins
const [Aerror, setAError] = useState();
const [currentPage, setCurrentPage] = useState(1);
const rowsPerPage = 3;
const [totalAdmin, setTotalAdmin] = useState(0);
const pageCount = Math.ceil(totalAdmin / rowsPerPage);
const [admins, setAdmins] = useState([]);

  
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
      const data = await addAdmin(newAdmin.email);
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

  

    
  
  
  useEffect(() => {
      const loadUsers = async () => {
        try {
          setLoading(true);
          const data = await fetchAdmins(currentPage, rowsPerPage);
          console.log("admins", data)
          setAdmins(data.data);
          setTotalAdmin(data.totalUsers);
        } catch (err) {
          setAError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      loadUsers();
    }, [currentPage]);

  return (
    <div className={`w-full max-w-6xl mx-auto mt-4 rounded-[14px] ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-4 md:p-6 font-grotesk`}>
  
   
         <div className="overflow-x-auto">
      <div className="flex w-full items-center justify-between">
        <h2 className={`lg:text-xl md:text-md text-sm font-bold ${darkmode ? 'text-white' : 'text-gray-900'}`}>
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
      {loading && <div className="text-center w-full text-sm text-gray-400 py-6">Loading users...</div>}
      {Aerror && <div className="text-center w-full text-sm text-red-500 py-6">{Aerror}</div>}

      
      {!loading && admins.length > 0 && (
        <div className="min-w-full inline-block align-middle mt-2">
                 <div className={`rounded-lg border ${darkmode ? 'border-neutral-800' : 'border-gray-200'} overflow-hidden`}>
                   <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-800">
                     <thead className={darkmode ? 'bg-[#1a1a1a]' : 'bg-gray-50'}>
                       <tr>
                         <th className={`px-4 py-3 text-left text-xs font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-500'} uppercase`}>Email</th>
                         <th className={`px-4 py-3 text-left text-xs font-medium ${darkmode ? 'text-neutral-400' : 'text-gray-500'} uppercase`}>Actions</th>
                       </tr>
                     </thead>
                     <tbody>
                       {admins.map((admin) => (
                         <tr 
                           key={admin.id} 
                           className={`${darkmode ? 'hover:bg-[#222]' : 'hover:bg-gray-50'}`}
                         >
                           <td className={`px-4 py-4 text-sm font-medium ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                            {admin.email}
                           </td>
                    
                         
                           <td className="px-4 py-4 text-sm font-medium">
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
               </div>
       )}


{!loading && totalAdmin > rowsPerPage && (
  <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4 w-full">
    <div className={`text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
       {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, totalAdmin)} of {totalAdmin} admins
    </div>
    <div className="flex items-center gap-1">
      <button
        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
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
        onClick={() => setCurrentPage(prev => Math.min(pageCount, prev + 1))}
        disabled={currentPage === pageCount}
        className={`p-2 rounded-md ${darkmode ? 'text-gray-300 hover:bg-gray-800 disabled:text-gray-600' : 'text-gray-700 hover:bg-gray-100 disabled:text-gray-400'}`}
      >
        <FiChevronRight/>
      </button>
    </div>
  </div>
)}

      {!loading && admins.length === 0 && (
        <div className={`w-full py-12 text-center ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>No users found</div>
      )}
      
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
    </div>
  );
};

export default AdminManagementUI;