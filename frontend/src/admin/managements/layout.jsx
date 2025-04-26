import { useSelector } from "react-redux";

import AdminManagementUI from "./tes";
import { FadeUp } from "../../components/framer";
import UsersList from "./test";


   
const Layout = () => {
    const darkmode = useSelector((state)=> state.darkMode)
  return (
    <section className={`flex min-h-screen  flex-wrap content-start gap-3  px-4 py-4 ${darkmode ? "border-neutral-800": ''} ${darkmode? "bg-neutral-950":'bg-gray-100'} `}>
    <div className="h-min w-full lg:w-[calc(50%_-_10px)] animate-fadeDown pt-20 pb-10">
      <FadeUp>
      <AdminManagementUI />
      </FadeUp>
    </div>
    <div className="h-min w-full lg:w-[calc(50%_-_30px)] animate-fadeDown pt-20 pb-10">
      <FadeUp>
      <UsersList />
      </FadeUp>
    </div>
 
    
  
  </section>
  );
};

export default Layout;
