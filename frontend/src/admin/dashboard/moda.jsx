import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const AddAnnouncementModal = ({ 
  showModal,
  setShowModal,
  darkmode,
  onAddAnnouncement
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isImportant, setIsImportant] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAnnouncement = {
      title,
      content,
      isImportant,
      date: new Date().toISOString()
    };
    onAddAnnouncement(newAnnouncement);
    setShowModal(false);
    setTitle('');
    setContent('');
    setIsImportant(false);
  };

  return (
    <>
    

   {showModal && (
 <div 
 className={`fixed inset-0 z-50 flex items-center justify-center ${darkmode ? 'bg-opacity-70' : ' bg-opacity-50'}`}
 onClick={() => setShowModal(false)}
>
 <div 
   className={`relative p-6 rounded-lg shadow-lg w-full max-w-md mx-4 ${darkmode ? 'bg-[#1e1e1e]' : 'bg-white'}`}
   onClick={(e) => e.stopPropagation()}
 >
   <button
     onClick={() => setShowModal(false)}
     className={`absolute top-4 right-4 p-1 rounded-full ${darkmode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}
   >
     <FaTimes />
   </button>
   
   <h2 className={`text-xl font-semibold mb-4 ${darkmode ? 'text-neutral-100' : 'text-gray-800'}`}>
     Create New Announcement
   </h2>
   
   <form onSubmit={handleSubmit}>
     <div className="mb-4">
       <label 
         htmlFor="announcement-title" 
         className={`block mb-2 text-sm font-medium ${darkmode ? 'text-neutral-300' : 'text-gray-700'}`}
       >
         Title
       </label>
       <input
         id="announcement-title"
         type="text"
         className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
           darkmode 
             ? 'bg-[#2d2d2d] border-gray-600 text-neutral-100 focus:ring-blue-500' 
             : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-300'
         }`}
         placeholder="Announcement title"
         value={title}
         onChange={(e) => setTitle(e.target.value)}
         required
       />
     </div>

     <div className="mb-4">
       <label 
         htmlFor="announcement-content" 
         className={`block mb-2 text-sm font-medium ${darkmode ? 'text-neutral-300' : 'text-gray-700'}`}
       >
         Content
       </label>
       <textarea
         id="announcement-content"
         rows={4}
         className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
           darkmode 
             ? 'bg-[#2d2d2d] border-gray-600 text-neutral-100 focus:ring-blue-500' 
             : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-300'
         }`}
         placeholder="Announcement details..."
         value={content}
         onChange={(e) => setContent(e.target.value)}
         required
       />
     </div>

     <div className="mb-4 flex items-center">
       <input
         id="important-announcement"
         type="checkbox"
         checked={isImportant}
         onChange={(e) => setIsImportant(e.target.checked)}
         className={`w-4 h-4 rounded ${darkmode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
       />
       <label 
         htmlFor="important-announcement" 
         className={`ml-2 text-sm ${darkmode ? 'text-neutral-300' : 'text-gray-700'}`}
       >
         Mark as important
       </label>
     </div>
     
     <div className="flex justify-end gap-3">
       <button
         type="button"
         onClick={() => setShowModal(false)}
         className={`px-4 py-2 rounded-lg ${
           darkmode 
             ? 'bg-gray-700 hover:bg-gray-600 text-neutral-100' 
             : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
         }`}
       >
         Cancel
       </button>
       <button
         type="submit"
         className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
       >
         Post Announcement
       </button>
     </div>
   </form>
 </div>
</div>
   )

   }
   </>
  );
};

export default AddAnnouncementModal;