
import { useState } from "react";

import NavMenu from "../dashboard/navmenu";
import Sidebar from "../dashboard/sidebar";
import Layout from "../dashboard/layout";


const Dashboards = () => {
  
   const [isSidebarOpen, setSidebarOpen] = useState(false);
 
 

  return (

    <section className="flex bg-[#09090b] h-screen w-[100%]">
      <section className=" h-screen lg:w-[20%]" >
     < Sidebar
      setSidebarOpen={setSidebarOpen}
      isSidebarOpen={isSidebarOpen}
     
     /> 
      </section>

    <section className=" flex-grow lg:w-[75%]"> 
      <NavMenu
      setSidebarOpen={setSidebarOpen}
      isSidebarOpen={isSidebarOpen}
      
      currentPage="New project" />
      <Layout />
    </section>
  </section>

     


  );
};

export default Dashboards;