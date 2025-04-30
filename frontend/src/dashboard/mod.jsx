import { FaTimes } from "react-icons/fa";


const AnnouncementsModal = ({ 
  showModal, 
  setShowModal, 
  darkmode ,
  isLoading,
  error,
  announcements,

}) => {


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
    {showModal && (
        <div 
        className={`fixed inset-0 z-50 flex items-center justify-center ${darkmode ? 'bg-opacity-70' : 'bg-opacity-50'}`}
        onClick={() => setShowModal(false)}
      >
        <div 
          className={`relative p-6 rounded-lg shadow-lg w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto ${darkmode ? 'bg-[#1e1e1e] border-gray-700' : 'bg-white border-gray-200'} border`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setShowModal(false)}
            className={`absolute top-4 right-4 p-1 rounded-full ${darkmode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}
            aria-label="Close announcements"
          >
            <FaTimes size={20} />
          </button>
          
          <h2 className={`text-xl font-semibold mb-4 ${darkmode ? 'text-neutral-100' : 'text-gray-800'}`}>
            Announcements ({announcements.length})
          </h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className={`p-4 rounded-lg ${darkmode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'}`}>
              Error loading announcements: {error}
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.length > 0 ? (
                announcements.map((announcement) => (
                  <div 
                    key={announcement._id}
                    className={`p-4 rounded-lg ${darkmode ? 'bg-[#2d2d2d]' : 'bg-gray-50'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`font-medium ${darkmode ? 'text-neutral-100' : 'text-gray-800'}`}>
                          {announcement.username || 'Admin'}
                        </h3>
                        <p className={`mt-2 ${darkmode ? 'text-neutral-300' : 'text-gray-600'}`}>
                          {announcement.announcement}
                        </p>
                      </div>
                      {announcement.version && (
                        <span className={`text-xs px-2 py-1 rounded ${darkmode ? 'bg-gray-700 text-neutral-300' : 'bg-gray-300 text-gray-800'}`}>
                          v{announcement.version}
                        </span>
                      )}
                    </div>
                    <p className={`mt-2 text-xs ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>
                      {formatDate(announcement.createdAt)}
                    </p>
                  </div>
                ))
              ) : (
                <p className={`text-center py-8 ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>
                  No announcements available
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    )}
    </>
  );
};

export default AnnouncementsModal;