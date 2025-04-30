
import { useState } from "react";

import NavMenu from "../dashboard/navmenu";
import Sidebar from "../dashboard/sidebar";
import Layout from "../projects/layout";
import { useSelector } from "react-redux";
import AdminSidebar from "../admin/dashboard/sidebar";


const UserProjectsID = () => {
  
   const [isSidebarOpen, setSidebarOpen] = useState(false);
 
   const user = useSelector((state) => state.user); 
   const isAdmin = user?.roles?.includes('Admin');

  return (

    <section className="flex bg-[#09090b] h-screen w-[100%]">
      <section className=" h-screen lg:w-[20%]" >
      {isAdmin? (
     < AdminSidebar
      setSidebarOpen={setSidebarOpen}
      isSidebarOpen={isSidebarOpen}
     
     /> 
    ) : (
      <Sidebar
        setSidebarOpen={setSidebarOpen}
        isSidebarOpen={isSidebarOpen}
      />
    )}
      </section>

    <section className=" flex-grow lg:w-[75%]"> 
      <NavMenu
      setSidebarOpen={setSidebarOpen}
      isSidebarOpen={isSidebarOpen}
      
      currentPage="Projects" />
      <Layout />
    </section>
  </section>

     


  );
};

export default UserProjectsID;