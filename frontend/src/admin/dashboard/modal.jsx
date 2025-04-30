import { FaTimes } from "react-icons/fa";

const BugReportsModal = ({ 
  showBugModal, 
  setShowBugModal, 
  bugReports, 
  darkmode,
  isLoading = false,
  error = null
}) => {
  if (!showBugModal) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center ${darkmode ? 'bg-opacity-70' : 'bg-opacity-50'}`}
      onClick={() => setShowBugModal(false)}
    >
      <div 
        className={`relative p-6 rounded-lg shadow-lg w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto ${darkmode ? 'bg-[#1e1e1e] border-gray-700' : 'bg-white border-gray-200'} border`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowBugModal(false)}
          className={`absolute top-4 right-4 p-1 rounded-full ${darkmode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}
          aria-label="Close modal"
        >
          <FaTimes size={20} />
        </button>
        
        <h2 className={`text-xl font-semibold mb-4 ${darkmode ? 'text-neutral-100' : 'text-gray-800'}`}>
          Bug Reports ({bugReports.length})
        </h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className={`p-4 rounded-lg ${darkmode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'}`}>
            Error loading bug reports: {error}
          </div>
        ) : (
          <div className="space-y-4">
            {bugReports.length > 0 ? (
              bugReports.map((report) => (
                <div 
                  key={report._id}
                  className={`p-4 rounded-lg ${darkmode ? 'bg-[#2d2d2d]' : 'bg-gray-100'}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`font-medium ${darkmode ? 'text-neutral-100' : 'text-gray-800'}`}>
                      {report.username || '@user'}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${darkmode ? 'bg-gray-700 text-neutral-300' : 'bg-gray-300 text-gray-800'}`}>
                      v{report.version}
                    </span>
                  
                  </div>
                  <p className={`${darkmode ? 'text-neutral-300' : 'text-gray-600'}`}>
                    {report.bugReport}
                  </p>
                </div>
              ))
            ) : (
              <p className={`text-center py-8 ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>
                No bug reports found
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BugReportsModal;