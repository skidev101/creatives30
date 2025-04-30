
import { useState } from "react";
import NavMenu from "../../dashboard/navmenu";
import Layout from "./layout";
import AdminSidebar from "../dashboard/sidebar";
import AdminNavMenu from "../dashboard/anav";




const AddAdmin= () => {
  
   const [isSidebarOpen, setSidebarOpen] = useState(false);
 
 

  return (

    <section className="flex bg-[#09090b] h-screen w-[100%]">
      <section className=" h-screen lg:w-[20%]" >
     < AdminSidebar
      setSidebarOpen={setSidebarOpen}
      isSidebarOpen={isSidebarOpen}
     
     /> 
      </section>

    <section className=" flex-grow lg:w-[75%]"> 
      <AdminNavMenu
      setSidebarOpen={setSidebarOpen}
      isSidebarOpen={isSidebarOpen}
      
      currentPage="Add Admin" />
      <Layout />
    </section>
  </section>

     


  );
};

export default AddAdmin;
