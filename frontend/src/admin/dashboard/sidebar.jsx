/* eslint-disable no-unused-vars */


import { NavLink, useNavigate, } from "react-router-dom";
import { FaChessBoard, FaPodcast, FaUser, FaUserAstronaut } from "react-icons/fa";
import { CiLogout, CiViewBoard } from "react-icons/ci";
import { LiaDropbox } from "react-icons/lia";
import { useSelector } from "react-redux";

import { useState } from "react";
import LogoutModal from "../../components/logoutmodal";

const Sidebar = ({isSidebarOpen,setSidebarOpen}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const darkmode = useSelector((state)=> state.darkMode)
  const closeSidebar = () => {
    setSidebarOpen(false); 
  };
   
  const handleLogout = async () => {
    try {
      
      setLoading(true);
      setTimeout(() => {
        setOpen(false); 
        navigate('/login'); 
        setLoading(false); 
      }, 5000);
    } catch (error) {
      console.error("Error logging out: ", error);
     
  }
}

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
 
  return (
<div className="">
  <aside
    id="separator-sidebar"
    className={`fixed font-grotesk top-0 left-0 z-40 w-64 lg:w-[20%] h-screen transition-transform duration-300 ${
      isSidebarOpen ? "translate-x-0 block" : "-translate-x-full"
    } md:${isSidebarOpen ? "block" : "hidden"} lg:translate-x-0 lg:block`}
  >
    <div className={`h-full py-6 overflow-y-auto ${darkmode ? 'bg-[#111313] border-neutral-800' : 'bg-neutral-50 border-slate-200'}`}>
      <ul className={`p-0 pb-10 m-0 border-b ${darkmode ? 'border-neutral-800' : 'border-slate-200'}`} >
        <li className="p-1 ">
          <NavLink
            to="#"
            className={`flex items-center justify-center text-gray-900 rounded-lg ${darkmode ? 'text-white' : ''}`}
          >
            <div className="flex items-center justify-center text-center absolute top-6 ">
              <span className="mr-2">
                <LiaDropbox className={`text-xl ${darkmode ? 'text-blue-400':'text-blue-600'}`} />
              </span>
              <span className={`md:text-xl  ${darkmode ? 'text-blue-400' : 'text-blue-600'}  text-center font-bold`}>
                Code &lt;30&gt;
              </span>
            </div>
          </NavLink>
        </li>
      </ul>

      <ul className="space-y-3 font-medium px-4 py-4">
        <span className={`${darkmode? "text-blue-200":'text-blue-900'} text-sm`}>Menu</span>
        <li onClick={closeSidebar}>
          <NavLink
            to="/addadmins"
            className={`flex items-center p-3 text-gray-900 rounded-lg ${darkmode ? 'text-white hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <FaPodcast size="25" className={` group-hover:text-gray-900 ${darkmode ? 'dark:group-hover:text-white text-blue-400' : 'text-blue-900'}`} />
            <span className="ms-3">Admins</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/version"
            className={`flex items-center p-3 text-gray-900 rounded-lg ${darkmode ? 'text-white hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <CiViewBoard className={`w-5 h-5  group-hover:text-gray-900 ${darkmode ? 'group-hover:text-white text-blue-400' : 'text-blue-900'}`} />
            <span className="flex-1 ms-3 whitespace-nowrap">Version</span>
          </NavLink>
        </li>
      </ul>

      <ul className="space-y-3 font-medium px-4">
        <span className={`${darkmode? "text-blue-200":'text-blue-900'} text-sm`}>Profile</span>
        <li onClick={closeSidebar}>
          <NavLink
            to="/adminprofile"
            className={`flex items-center p-3  rounded-lg ${darkmode ? 'text-white hover:bg-gray-700 ' : 'hover:bg-gray-100 text-gray-900'}`}
          >
            <FaUserAstronaut size="25" className={` group-hover:text-gray-900 ${darkmode ? 'group-hover:text-white text-blue-400 ' : 'text-blue-900'}`} />
            <span className="ms-3">Profile</span>
          </NavLink>
        </li>
      </ul>
      
      <ul className="space-y-3 font-medium px-4 relative top-40">
      <span className={`${darkmode? "text-blue-200":'text-blue-900'} text-sm`}>Logout</span>
      <li className=" " onClick={() => {closeSidebar(); handleOpen();}}>
          <NavLink
            to="#"
            className={`flex items-center p-3 text-red-700 rounded-lg ${darkmode ? 'text-white hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <CiLogout size="25" className={`text-red-700 group-hover:text-gray-900 ${darkmode ? 'dark:group-hover:text-white' : ''}`} />
            <span className="ms-3">Logout</span>
          </NavLink>
        </li>
        <LogoutModal
           
           
           open={open}
           onClose={handleClose}
           onLogout={handleLogout}
           loading={loading}
           />
      </ul>
    </div>
  </aside>
</div>

  );
};

export default Sidebar;
