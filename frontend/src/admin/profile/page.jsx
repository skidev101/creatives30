
import { useState } from "react";
import NavMenu from "../../dashboard/navmenu";
import Layout from "./layout";
import AdminSidebar from "../dashboard/sidebar";




const AdminProfile= () => {
  
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
      <NavMenu
      setSidebarOpen={setSidebarOpen}
      isSidebarOpen={isSidebarOpen}
      
      currentPage="Admin Profile" />
      <Layout />
    </section>
  </section>

     


  );
};

export default AdminProfile;
