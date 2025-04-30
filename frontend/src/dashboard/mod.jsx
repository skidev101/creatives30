import { FaTimes } from "react-icons/fa";

const AnnouncementsModal = ({ 
  showModal, 
  setShowModal, 
  announcements,
  darkmode 
}) => {
  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center ${darkmode ? 'bg-opacity-70' : ' bg-opacity-50'}`}
      onClick={() => setShowModal(false)}
    >
      <div 
        className={`relative p-6 rounded-lg shadow-lg w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto ${darkmode ? 'bg-[#1e1e1e]' : 'bg-white'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowModal(false)}
          className={`absolute top-4 right-4 p-1 rounded-full ${darkmode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}
        >
          <FaTimes />
        </button>
        
        <h2 className={`text-xl font-semibold mb-4 ${darkmode ? 'text-neutral-100' : 'text-gray-800'}`}>
          Announcements ({announcements.length})
        </h2>
        
        <div className="space-y-4">
          {announcements.length > 0 ? (
            announcements.map((announcement, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg ${announcement.isImportant ? 'border-l-4 border-yellow-500' : ''} ${darkmode ? 'bg-[#2d2d2d]' : 'bg-gray-50'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`font-medium ${darkmode ? 'text-neutral-100' : 'text-gray-800'}`}>
                      {announcement.title}
                    </h3>
                    <p className={`mt-2 text-sm ${darkmode ? 'text-neutral-300' : 'text-gray-600'}`}>
                      {announcement.content}
                    </p>
                  </div>
                  {announcement.isImportant && (
                    <span className={`px-2 py-1 text-xs rounded-full ${darkmode ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-800'}`}>
                      Important
                    </span>
                  )}
                </div>
                <p className={`mt-2 text-xs ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>
                  {new Date(announcement.date).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className={`text-center py-8 ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>
              No announcements available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsModal;