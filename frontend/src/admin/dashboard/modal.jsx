import { FaTimes } from "react-icons/fa";

const BugReportsModal = ({ 
  showBugModal, 
  setShowBugModal, 
  bugReports, // Array of bug reports
  darkmode 
}) => {
  return (
    
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center ${darkmode ? ' bg-opacity-70' : ' bg-opacity-50'}`}
      onClick={() => setShowBugModal(false)}
    >
      <div 
        className={`relative p-6 rounded-lg shadow-lg w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto ${darkmode ? 'bg-[#1e1e1e]' : 'bg-white'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowBugModal(false)}
          className={`absolute top-4 right-4 p-1 rounded-full ${darkmode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}
        >
          <FaTimes />
        </button>
        
        <h2 className={`text-xl font-semibold mb-4 ${darkmode ? 'text-neutral-100' : 'text-gray-800'}`}>
          Bug Reports ({bugReports.length})
        </h2>
        
        <div className="space-y-4">
          {bugReports.length > 0 ? (
            bugReports.map((report, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg ${darkmode ? 'bg-[#2d2d2d]' : 'bg-gray-100'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`font-medium ${darkmode ? 'text-neutral-100' : 'text-gray-800'}`}>
                      {report.user || 'Anonymous'} - {new Date(report.date).toLocaleString()}
                    </h3>
                    <p className={`mt-2 ${darkmode ? 'text-neutral-300' : 'text-gray-600'}`}>
                      {report.description}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    report.status === 'resolved' 
                      ? 'bg-green-500 text-white'
                      : report.status === 'in-progress'
                      ? 'bg-yellow-500 text-white'
                      : darkmode 
                        ? 'bg-gray-700 text-neutral-300'
                        : 'bg-gray-300 text-gray-800'
                  }`}>
                    {report.status || 'new'}
                  </span>
                </div>
                {report.response && (
                  <div className={`mt-3 p-3 rounded-lg ${darkmode ? 'bg-[#3d3d3d]' : 'bg-blue-50'}`}>
                    <h4 className={`text-sm font-medium ${darkmode ? 'text-blue-400' : 'text-blue-600'}`}>
                      Admin Response:
                    </h4>
                    <p className={`mt-1 ${darkmode ? 'text-neutral-300' : 'text-gray-700'}`}>
                      {report.response}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className={`text-center py-8 ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>
              No bug reports found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BugReportsModal;