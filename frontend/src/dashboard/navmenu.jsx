/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../action";
import { FaCalendarCheck, FaMoon, FaSun, FaBullhorn, FaBug, FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { BugModal } from "./bugmodal";
import AnnouncementsModal from "./mod";
import { authFetch } from "../utils/auth";

const NavMenu = ({ currentPage, setSidebarOpen, isSidebarOpen }) => {
  const [showBugModal, setShowBugModal] = useState(false);
  const [bugDescription, setBugDescription] = useState("");
  const [showAnnouncements, setShowAnnouncements] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
const [announcements, setAnnouncements] = useState([]);
useEffect(() => {
    const fetchAnnouncements = async () => {
      if (showAnnouncements) {
        setIsLoading(true);
        setError(null);
        try {
          const response = await authFetch('https://xen4-backend.vercel.app/announcements');
          if (!response.ok) throw new Error('Failed to fetch announcements');
          const data = await response.json();
          setAnnouncements(data.announcements || []);
        } catch (err) {
          console.error("Error fetching announcements:", err);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchAnnouncements();
  }, [showAnnouncements]);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const formatDate = () => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = new Date().toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const formattedDate = formatDate();
  const dispatch = useDispatch();
  const darkmode = useSelector((state) => state.darkMode);

  const toggledark = () => {
    dispatch(setMode(!darkmode));
  };

 


  return (
    <>
      <section className={`fixed top-0 inset-x-0 z-10 w-full border-b px-4 py-2 lg:py-4 ${darkmode ? 'bg-[#111313] border-neutral-800' : 'bg-neutral-50 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className={`text-base px-60 font-semibold ${darkmode ? 'text-neutral-100' : 'text-blue-900'} md:text-xl hidden lg:block`}>
            {currentPage}
          </span>

          <button
            onClick={toggleSidebar}
            aria-controls="separator-sidebar"
            type="button"
            className={`inline-flex items-center p-2 mt-2 ms-3 text-sm ${darkmode ? 'text-white':'text-gray-500'} rounded-lg lg:hidden md:block `}
          >
            <span className="sr-only">Open sidebar</span>
            <CiMenuFries className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3 sm:gap-6">
         
          <button 
  onClick={() => setShowAnnouncements(true)}
  className={`p-2 rounded-full relative ${darkmode ? 'text-neutral-100 hover:bg-neutral-800' : 'text-blue-900 hover:bg-blue-100'}`}
>
  <FaBullhorn size={20} />
  <span className="sr-only">Announcements</span>
  {announcements.length > 0 && (
    <span className={`absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold 
      ${darkmode ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'}`}>
      {announcements.length || 0}
    </span>
  )}
</button>


        
            <button 
              onClick={() => setShowBugModal(true)}
              className={`p-2 rounded-full ${darkmode ? 'text-neutral-100 hover:bg-neutral-800' : 'text-blue-900 hover:bg-blue-100'}`}
            >
              <FaBug size={20} />
              <span className="sr-only">Report a Bug</span>
            </button>

            <div className={`hidden items-center gap-3 ${darkmode ? 'text-neutral-100' : 'text-zinc-800'} md:flex`}>
              <FaCalendarCheck className={`${darkmode ? 'text-blue-400':'text-blue-900'}`} size={20} />
              <span className={`text-sm font-medium ${darkmode ? 'text-neutral-100' : 'text-zinc-800'}`}>
                {formattedDate}
              </span>
            </div>


  <div className="hidden md:flex items-center">
  <label className="relative inline-flex items-center cursor-pointer group">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={darkmode}
      onChange={toggledark}
    />
    

    <div className={`
      relative w-16 h-8 rounded-full transition-all duration-300 ease-out
      group-hover:scale-[1.02] group-active:scale-[0.98]
      ${darkmode 
        ? 'bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 shadow-inner shadow-slate-800/50' 
        : 'bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 shadow-inner shadow-blue-200/80'
      }
      border ${darkmode ? 'border-slate-600/50' : 'border-blue-200/60'}
    `}>
      
    
      <div className={`
        absolute top-0.5 w-7 h-7 rounded-full transition-all duration-300 ease-out
        shadow-lg backdrop-blur-sm
        ${darkmode 
          ? 'left-8 bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-500/30' 
          : 'left-0.5 bg-gradient-to-br from-orange-400 to-yellow-500 shadow-orange-400/40'
        }
      `}>
        
  
        <div className="flex items-center justify-center w-full h-full">
          {darkmode ? (
            <FaMoon className="w-3.5 h-3.5 text-white drop-shadow-sm" />
          ) : (
            <FaSun className="w-3.5 h-3.5 text-white drop-shadow-sm" />
          )}
        </div>
        
    
        <div className={`
          absolute inset-0 rounded-full opacity-60 blur-[1px]
          ${darkmode 
            ? 'bg-gradient-to-br from-indigo-400 to-purple-500' 
            : 'bg-gradient-to-br from-orange-300 to-yellow-400'
          }
        `}></div>
      </div>
      
     
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <FaSun className={`w-3 h-3 transition-opacity duration-300 ${
          !darkmode ? 'opacity-0' : 'opacity-30 text-slate-400'
        }`} />
        <FaMoon className={`w-3 h-3 transition-opacity duration-300 ${
          darkmode ? 'opacity-0' : 'opacity-30 text-blue-400'
        }`} />
      </div>
    </div>
    
 
    <div className={`
      absolute inset-0 rounded-full opacity-0 transition-opacity duration-200
      peer-focus-visible:opacity-100 ring-2 ring-offset-2 ring-offset-transparent
      ${darkmode ? 'ring-indigo-500' : 'ring-orange-400'}
    `}></div>
  </label>
</div>

            <div className="md:hidden">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full border ${darkmode ? 'border-neutral-700 text-neutral-100' : 'border-zinc-300 text-blue-900'} md:h-10 md:w-10 cursor-pointer`}
                onClick={toggledark}
              >
                {darkmode ? <FaSun size='20' /> : <FaMoon size='20' />}
              </span>
            </div>
          </div>
        </div>
      </section>

     
      {showBugModal && (
        <BugModal 
       showBugModal={showBugModal}
      
       setBugDescription={setBugDescription}
       setShowBugModal={setShowBugModal}
       bugDescription={bugDescription}
       darkmode={darkmode}
        />
      )}

{showAnnouncements && (
  <AnnouncementsModal
  showModal={showAnnouncements}
  setShowModal={setShowAnnouncements}
  darkmode={darkmode}
  isLoading={isLoading}
  error={error}
  announcements={announcements}
  />
)}
    </>
  );
};

export default NavMenu;