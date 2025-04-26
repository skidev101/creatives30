import { useSelector } from "react-redux";


import { FadeDown, FadeLeft, FadeRight, FadeUp } from "../components/framer";
import { Welcome } from "./welcome";

import Streak from "./streak";
import Achievements from "./achievements";
import UserProjects from "./userprojects";
import SubmitHistory from "./submithistory";




   
const Layout = () => {
    const darkmode = useSelector((state)=> state.darkMode)
  return (
    <section className={`flex min-h-screen  flex-wrap content-start gap-3 pt-23 px-4 py-4 ${darkmode ? "border-neutral-800": ''} ${darkmode? "bg-neutral-950":'bg-gray-100'} overflow-hidden`}>
     <div className="h-min w-full lg:w-[calc(35%_-_10px)] ">
      <FadeLeft>
      <Welcome  />
      </FadeLeft>
      
      </div>

      <div className="h-min w-full flex-grow lg:w-[calc(20%_-_10px)] ">
       <FadeUp>
       <SubmitHistory  />
       </FadeUp>
      </div>
      
      <div className="h-min w-full flex-grow lg:w-[calc(40%_-_10px)] ">
       <FadeRight>
       <Streak  />
       </FadeRight>
      
      </div>

      <div
        className="h-min w-full lg:w-[calc(50%_-_10px)] "
      >
        <FadeUp>
        <UserProjects />
        </FadeUp>
      </div>

      <div className="h-min w-full flex-grow lg:w-[calc(45%_-_10px)] ">
      <FadeDown>
      <Achievements  />
      </FadeDown>
      </div>

    
  </section>
  );
};

export default Layout;
