import { useSelector } from "react-redux";
import LeaderboardPage from "./page";
import { FadeDown } from "../components/framer";

import { ParallaxProvider, Parallax } from 'react-scroll-parallax';





   
const Layout = () => {
    const darkmode = useSelector((state)=> state.darkMode)
  return (
         <ParallaxProvider>
    <section className={`flex min-h-screen  flex-wrap content-start gap-3  px-4 py-4 ${darkmode ? "border-neutral-800": ''} ${darkmode? "bg-neutral-950":'bg-gray-100'} `}>
 

 <div className="h-min w-full lg:w-[calc(100%_-_10px)] animate-fadeDown pt-20 pb-10">
    <Parallax speed={10}> 
  <FadeDown>
  <LeaderboardPage />
  </FadeDown>
  </Parallax>
 </div>
</section>
         </ParallaxProvider>

  );
};

export default Layout;
