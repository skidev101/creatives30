

import { NavLink, } from "react-router-dom";
import { FaChessBoard, FaPodcast, FaUser, FaUserAstronaut } from "react-icons/fa";
import { CiLogout, CiViewBoard } from "react-icons/ci";
import { LiaDropbox } from "react-icons/lia";
import { useSelector } from "react-redux";

const Sidebar = ({isSidebarOpen,setSidebarOpen}) => {

  const closeSidebar = () => {
    setSidebarOpen(false); 
  };


  const darkmode = useSelector((state)=> state.darkMode)
   

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
                <LiaDropbox className="text-xl" />
              </span>
              <span className={`md:text-xl  ${darkmode ? 'text-neutral-100' : 'text-zinc-800'}  text-center font-bold`}>
                Code &lt;30&gt;
              </span>
            </div>
          </NavLink>
        </li>
      </ul>

      <ul className="space-y-3 font-medium px-4 py-4">
        <span className={`${darkmode? "text-white":''} text-sm`}>Menu</span>
        <li onClick={closeSidebar}>
          <NavLink
            to="#"
            className={`flex items-center p-3 text-gray-900 rounded-lg ${darkmode ? 'text-white hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <FaPodcast size="25" className={`text-gray-500 group-hover:text-gray-900 ${darkmode ? 'dark:group-hover:text-white' : ''}`} />
            <span className="ms-3">Project Submit</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="#"
            className={`flex items-center p-3 text-gray-900 rounded-lg ${darkmode ? 'text-white hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <CiViewBoard className={`w-5 h-5 text-gray-500 group-hover:text-gray-900 ${darkmode ? 'dark:group-hover:text-white' : ''}`} />
            <span className="flex-1 ms-3 whitespace-nowrap">Leaderboard</span>
          </NavLink>
        </li>
      </ul>

      <ul className="space-y-3 font-medium px-4">
        <span className={`${darkmode? "text-white":''} text-sm`}>Profile</span>
        <li onClick={closeSidebar}>
          <NavLink
            to="#"
            className={`flex items-center p-3 text-gray-900 rounded-lg ${darkmode ? 'text-white hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <FaUser Astronaut size="25" className={`text-gray-500 group-hover:text-gray-900 ${darkmode ? 'dark:group-hover:text-white' : ''}`} />
            <span className="ms-3">Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="#"
            className={`flex items-center p-3 text-gray-900 rounded-lg ${darkmode ? 'text-white hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <CiLogout size="25" className={`text-gray-500 group-hover:text-gray-900 ${darkmode ? 'dark:group-hover:text-white' : ''}`} />
            <span className="ms-3">Logout</span>
          </NavLink>
        </li>
      </ul>
    </div>
  </aside>
</div>

  );
};

export default Sidebar;
