
import {
    
    Calendar,
   
    Logout,
    Moon,
    Sun1
  } from "iconsax-react";

  import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../action";
import { FaCalendarCheck, FaMoon, FaSun } from "react-icons/fa";

  const NavMenu = ({ currentPage ,setSidebarOpen,isSidebarOpen }) => {
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

    const darkmode = useSelector((state)=> state.darkMode)
   
   console.log(darkmode, "is")
   const toggledark = () => {

     dispatch(setMode(!darkmode)); // Toggle Redux state
     if (!darkmode) {
       document.documentElement.classList.add('dark');
     } else {
       document.documentElement.classList.remove('dark');
     }
   
   }


    return (
      <>
      <section className={`flex fixed top-0 w-full font-grotesk lg:w-[80%] items-center justify-between px-4 py-2 border-b  ${darkmode ? 'border-neutral-800' : 'border-slate-200'}  lg:py-4 ${darkmode ? 'bg-[#111313] dark:bg-[#111313]' : 'bg-neutral-50'}`}>
  <span className={`text-base font-semibold ${darkmode ? 'text-neutral-100' : 'text-zinc-800'} md:text-xl hidden lg:block`}>
    {currentPage}
  </span>

  <button
    onClick={toggleSidebar}
    aria-controls="separator-sidebar"
    type="button"
    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg lg:hidden md:block hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
  >
    <span className="sr-only">Open sidebar</span>
    <FiMenu className="w-6 h-6" />
  </button>

  <div className="flex items-center gap-3 sm:gap-6">
    <div className={`hidden items-center gap-3 ${darkmode ? 'dark:text-neutral-100' : 'text-zinc-800'} lg:flex`}>
      <FaCalendarCheck size={20} />
      <span className={`text-sm font-medium ${darkmode ? 'text-neutral-100' : 'text-zinc-800'}`}>
        {formattedDate}
      </span>
    </div>

    
  <div className="hidden lg:flex">
  <label className="inline-flex items-center relative cursor-pointer">
      <input
        className="peer hidden"
        id="toggle"
        type="checkbox"
        onChange={toggledark}
      />
      <div className={`relative w-[100px] h-[40px] rounded-full transition-colors duration-300 ${darkmode ? 'bg-zinc-500' : 'bg-gray-200'}`}>
        <div className={`absolute w-[40px] h-[30px] rounded-full top-[5px] left-[5px] transition-all duration-300 ${darkmode ? '' : 'bg-gradient-to-r from-orange-500 to-yellow-400 peer-checked:left-[55px]'}`}></div>
      </div>
      
        <FaSun className={`${darkmode ? "fill-gray-400": "fill-white"} absolute w-6 h-6 left-[13px] transition-opacity duration-300`}/>
    
        <FaMoon className="fill-gray-400 z-10 opacity-60 absolute w-6 h-6 right-[13px] transition-opacity duration-300" />
      
      <div className={`absolute w-[40px] h-[30px] left-[55px] ${darkmode ? 'bg-gradient-to-r from-gray-900 to-gray-600  peer-checked:left-[55px]' : ''} rounded-full top-[5px] left-[5px] transition-all duration-300 `}></div>
    </label>
  </div>


<div className="lg:hidden">
<span
      className={`flex h-8 w-8 items-center justify-center rounded-full border ${darkmode ? 'border-neutral-700 text-neutral-100' : 'border-zinc-300 text-slate-900'} md:h-10 md:w-10 cursor-pointer`}
      onClick={toggledark}
    >
      {darkmode ? <FaSun size='20' /> : <FaMoon size='20' />}
    </span>
</div>
  

  
  </div>
</section>
      
      </>
    );
  };
  
  export default NavMenu;