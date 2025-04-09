import { useSelector } from "react-redux";


import { FadeLeft } from "../components/framer";
import { Welcome } from "./welcome";
import Heatmap from "./heatmap";
import Streak from "./streak";
import Achievements from "./achievements";
import UserProjects from "./userprojects";




   
const Layout = () => {
    const darkmode = useSelector((state)=> state.darkMode)
  return (
    <section className={`flex min-h-screen  flex-wrap content-start gap-3 pt-23 px-4 py-4 ${darkmode ? "border-neutral-800": ''} ${darkmode? "bg-neutral-950":'bg-gray-100'} `}>
     <div className="h-min w-full lg:w-[calc(35%_-_10px)] animate-fadeInLeft">
      
        <Welcome  />
      </div>

      <div className="h-min w-full flex-grow lg:w-[calc(20%_-_10px)] animate-fadeUp delay-100">
      <Heatmap  />
      </div>
      
      <div className="h-min w-full flex-grow lg:w-[calc(40%_-_10px)] animate-fadeDown delay-200">
       
      <Streak  />
      </div>

      <div
        className="h-min w-full lg:w-[calc(50%_-_10px)] animate-fadeUp delay-300"
      >
         <UserProjects />
      </div>

      <div className="h-min w-full flex-grow lg:w-[calc(45%_-_10px)] animate-fadeUp delay-400">
      <Achievements  />
      </div>

    
  </section>
  );
};

export default Layout;
