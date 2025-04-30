
export default function VersionModal ({
    showVersionModal,
    darkmode,
    newVersionName,
    setNewVersionName,
    setShowVersionModal,
    handleCreateVersion,
    error,
    loadingC
}){
    return(
        <>
         {showVersionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-70 px-8">
          <div className={`rounded-[14px] shadow-2xl border ${darkmode ? 'bg-[#1a1a1a] border-gray-700' : 'bg-white border-gray-200'} p-6 w-full max-w-md`}>
            <h3 className={`md:text-lg text-sm font-bold mb-4 ${darkmode ? 'text-white' : 'text-gray-900'}`}>
              Create New Version
            </h3>

             {error && (
      <section className='flex justify-center mb-5 items-center'>
  <div className="p-3 bg-red-500/20 text-red-400 text-center flex justify-center items-center rounded-lg text-sm ">
                        {error}
                    </div>
      </section>
                  
                )}
            <input
              type="text"
              value={newVersionName}
              onChange={(e) => setNewVersionName(e.target.value)}
              placeholder="Version no"
              className={`w-full p-2 rounded-md border mb-4 ${darkmode ? 'bg-[#111313] border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowVersionModal(false)}
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
              <button
                onClick={handleCreateVersion}
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
                {loadingC ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
        </>
    )
}