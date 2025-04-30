import { FaTimes } from "react-icons/fa"


export const BugModal = ({showBugModal, setBugDescription, setShowBugModal,darkmode
    , bugDescription
}) => {
    const loading = ''
    const handleBugSubmit = (e) => {
        e.preventDefault();
        // Handle bug report submission here
        console.log("Bug reported:", bugDescription);
        setBugDescription("");
        setShowBugModal(false);
      };
    return(

        <>
        
         {showBugModal && (
                <div className={`fixed inset-0 z-50 flex items-center justify-center ${darkmode ? 'bg-opacity-70' : ' bg-opacity-50'}`}>
                  <div className={`relative p-6 rounded-lg shadow-lg w-full max-w-md border ${darkmode ? 'bg-[#1e1e1e] border-gray-700' : 'bg-white border-gray-200'}`}>
                    <button
                      onClick={() => setShowBugModal(false)}
                      className={`absolute top-4 right-4 p-1 rounded-full ${darkmode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                    >
                      <FaTimes className={darkmode ? 'text-gray-300' : 'text-gray-600'} />
                    </button>
                    
                    <h2 className={`text-xl font-semibold mb-4 ${darkmode ? 'text-neutral-100' : 'text-gray-800'}`}>
                      Report a Bug
                    </h2>
                    
                    <form onSubmit={handleBugSubmit}>
                      <div className="mb-4">
                        <label htmlFor="bug-description" className={`block mb-2 text-sm font-medium ${darkmode ? 'text-neutral-300' : 'text-gray-700'}`}>
                          Describe the issue
                        </label>
                        <textarea
                          id="bug-description"
                          rows={4}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none  ${darkmode ? 'bg-[#2d2d2d] border-gray-600 text-neutral-100 ' : 'bg-white border-gray-300 text-gray-800 '}`}
                          placeholder="Please describe the bug you encountered..."
                          value={bugDescription}
                          onChange={(e) => setBugDescription(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setShowBugModal(false)}
                          className={`px-4 py-2 rounded-lg ${darkmode ? 'bg-gray-700 hover:bg-gray-600 text-neutral-100' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
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
                              ${loading ? 'opacity-75 cursor-not-allowed' : ''}
                          `}
                        >
                               {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  ' Submit Report'
                )}
                         
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
        </>
    )
}