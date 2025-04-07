
import { FaDiscord, FaFacebook, FaGithub, FaHamburger, FaTwitter } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import Sidebar from "./sidebar";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { LiaDropbox } from "react-icons/lia";
export default function Nav(){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    return(
        <>
        <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-10 ">
              <div className="flex items-center">
                    <span className="mr-2"> 
                        <LiaDropbox className="text-xl" /> 
                    </span>
                    <h1 className="text-[24px]   text-blue-400 hover:  font-bold">
                        Code &lt;30&gt;
                    </h1>
                </div>
        
                {/* <div className="hidden md:flex gap-4">
                  <FaGithub className="text-xl" />
                  <FaDiscord className="text-xl" />
                  <FaFacebook className="text-xl" />
                  <FaTwitter className="text-xl" />
                </div> */}
                <div className="hidden md:flex gap-4">
                  <button className="bg-[#fcf7f8] text-center hover:bg-[#a31621]/80 lg:px-[50px] hover:text-white lg:py-[15px] w-[120px] text-base py-2.5 lg:w-[155px]  font-medium text-blue-500 whitespace-nowrap  border-blue-400 border-[1.5px] border-solid px-3 focus:outline-none font-semibold transition-all duration-300 active:scale-[0.97] text-md rounded-xl">Login</button>
                  <button className="bg-blue-400 text-center hover:bg-[#fcf7f8]/40 lg:px-[50px] text-white hover:text-white lg:py-[15px] w-[120px] text-base py-2.5 lg:w-[155px]  font-medium text-white whitespace-nowrap  border-blue-200 border-[1.5px] border-solid px-3 focus:outline-none font-semibold transition-all duration-300 text-md rounded-full">Sign up</button>
                  {/* <button className="bg-[#a31621] text-center hover:bg-[#fcf7f8]/40 lg:px-[50px] lg:py-[15px] w-full text-base py-2.5 lg:w-[155px] text-[20px] font-medium text-[#fcf7f8] whitespace-nowrap font-chillax border-[#a31621] border-[1.5px] border-solid px-3 focus:outline-none font-semibold transition-all duration-300 active:scale-[0.97]">Sign up</button> */}
                </div>
              
                <button className="md:hidden" onClick={toggleSidebar}>
                  <span className="text-2xl text-white"><CiMenuFries /></span> 
                </button>
              </nav>
               
                    {isSidebarOpen && (
                    <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    // setIsSidebarOpen={setIsSidebarOpen}
                    />
                    )}
        </>
    )
}