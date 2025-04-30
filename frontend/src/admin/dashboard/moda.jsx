import { useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import { authFetch } from "../../utils/auth";


const AddAnnouncementModal = ({ 
  showModal,
  setShowModal,
  darkmode
}) => {
  const [announcement, setAnnouncement] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!announcement.trim()) {
      setError('Please enter announcement content');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await authFetch('https://xen4-backend.vercel.app/admin/createAnnouncement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ announcement }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create announcement');
      }

      // Show success and close after delay
      setSuccess(true);
      setAnnouncement('');
      
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
      }, 1500);

    } catch (err) {
      console.error('Error creating announcement:', err);
      setError(err.message || 'Failed to create announcement');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showModal && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center ${darkmode ? 'bg-opacity-70' : 'bg-opacity-50'}`}
          onClick={() => !isSubmitting && setShowModal(false)}
        >
          <div 
            className={`relative p-6 rounded-lg shadow-lg w-full max-w-md mx-4 ${darkmode ? 'bg-[#1e1e1e]' : 'bg-white'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => !isSubmitting && setShowModal(false)}
              className={`absolute top-4 right-4 p-1 rounded-full ${darkmode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              <FaTimes />
            </button>
            
            <h2 className={`text-xl font-semibold mb-4 ${darkmode ? 'text-neutral-100' : 'text-gray-800'}`}>
              {success ? 'Success!' : 'Create Announcement'}
            </h2>
            
            {success ? (
              <div className="flex flex-col items-center py-4">
                <div className={`p-3 rounded-full mb-3 ${darkmode ? 'bg-green-800/30 text-green-400' : 'bg-green-100 text-green-600'}`}>
                  <FaCheck size={24} />
                </div>
                <p className={`text-center ${darkmode ? 'text-neutral-300' : 'text-gray-700'}`}>
                  Announcement created successfully!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label 
                    htmlFor="announcement-content" 
                    className={`block mb-2 text-sm font-medium ${darkmode ? 'text-neutral-300' : 'text-gray-700'}`}
                  >
                    Announcement Content
                  </label>
                  <textarea
                    id="announcement-content"
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                      darkmode 
                        ? 'bg-[#2d2d2d] border-gray-600 text-neutral-100' 
                        : 'bg-white border-gray-300 text-gray-800'
                    }`}
                    placeholder="Enter your announcement..."
                    value={announcement}
                    onChange={(e) => {
                      setAnnouncement(e.target.value);
                      setError(null);
                    }}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {error && (
                  <div className={`mb-4 p-2 rounded ${darkmode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'} text-sm`}>
                    {error}
                  </div>
                )}
                
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className={`px-4 py-2 rounded-lg ${
                      darkmode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-neutral-100' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-lg text-white flex items-center gap-2 ${
                      isSubmitting 
                        ? 'bg-blue-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Posting...
                      </>
                    ) : (
                      'Post '
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AddAnnouncementModal;