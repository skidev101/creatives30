import { FiCheck, FiX } from "react-icons/fi";

function AddAdminModal ({
    newAdmin,
    setNewAdmin,
    showModal,
    darkmode,
    setShowModal,
    handleAddAdmin,
    error
}){
    return(
        <>
          {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center pt-2 bg-opacity-70 px-8">
                  <div className={`rounded-[14px] shadow-2xl border ${darkmode ? 'bg-[#1a1a1a] border-gray-700' : 'bg-white border-gray-200'} p-6 w-full max-w-md`}>
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
                    {error.email && (
      <section className='flex justify-center   items-center'>
  <div className="p-3 bg-red-500/20 text-red-400 text-center flex justify-center items-center rounded-lg text-sm ">
                        {error.email}
                    </div>
      </section>
                  
                )}
                       {error.general && (
      <section className='flex justify-center items-center'>
  <div className="p-3 bg-red-500/20 text-red-400 text-center flex justify-center items-center rounded-lg text-sm ">
                        {error.general}
                    </div>
      </section>
                  
                )}
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
                        className={`
                          flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium
                          bg-gradient-to-r ${darkmode ? 'from-indigo-600 to-blue-700' : 'from-blue-500 to-cyan-400'}
                          ${darkmode ? 'backdrop-blur-lg bg-opacity-70' : 'backdrop-blur-md bg-opacity-85'}
                          border ${darkmode ? 'border-indigo-400/30' : 'border-white/30'}
                          shadow-lg ${darkmode ? 'shadow-indigo-900/30' : 'shadow-blue-300/30'}
                          hover:shadow-xl hover:brightness-105
                          transition-all duration-300
                          text-white
                          hover:scale-[1.02]
                        `}
                      >
                        <FiCheck size={16} />
                        Add Admin
                      </button>
                    </div>
                  </div>
                </div>
              )}
        </>
    )
}


function DeleteUserModal({
  confirmDeleteEmail,
  handleDeleteUser,
  cancelDelete,
  darkmode,

}) {
  return (
      <>
          {confirmDeleteEmail && (
                <div className="fixed inset-0 z-50 flex items-center justify-center pt-2 bg-opacity-70 px-8">
                  <div className={`rounded-[14px] shadow-2xl border ${darkmode ? 'bg-[#1a1a1a] border-gray-700' : 'bg-white border-gray-200'} p-6 w-full max-w-md`}>
                      <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-sm font-semibold ${darkmode ? 'text-white' : 'text-gray-900'}`}>Are you sure you want to delete {confirmDeleteEmail}?  </h3>
                      <button
                             onClick={cancelDelete}
                              className={`p-1 rounded-full ${darkmode ? 'hover:bg-neutral-800' : 'hover:bg-gray-100'}`}
                          >
                              <FiX size={20} className={darkmode ? 'text-neutral-400' : 'text-gray-500'} />
                          </button>
                      </div>

                
                      <div className="flex gap-4 mt-4">
 
  <button
    onClick={() => handleDeleteUser(confirmDeleteEmail)}
    className={`
      px-4 py-2 text-sm rounded-md
      bg-gradient-to-r from-red-500 to-pink-600
      backdrop-blur-sm bg-opacity-90
      border border-red-400/30
      shadow-lg shadow-red-900/20
      hover:shadow-xl hover:brightness-110
      transition-all duration-300
      text-white
      hover:scale-[1.02]
    `}
  >
    Yes, Delete
  </button>


  <button
    onClick={cancelDelete}
    className={`
      px-4 py-2 text-sm rounded-md
      bg-gradient-to-r from-gray-100 to-gray-300
      backdrop-blur-sm bg-opacity-80
      border border-gray-300/50
      shadow-lg shadow-gray-400/20
      hover:shadow-md hover:brightness-95
      transition-all duration-300
      text-gray-700
      hover:scale-[1.02]
    `}
  >
    Cancel
  </button>
</div>

                    
                  </div>
              </div>
          )}
      </>
  );
}

export { AddAdminModal,  DeleteUserModal};