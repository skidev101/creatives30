import { useSelector } from "react-redux";
import SubmitPage from "../submitproject/page";
import { FadeUp } from "../components/framer";


   
const Layout = () => {
    const darkmode = useSelector((state)=> state.darkMode)
  return (
    <section className={`flex min-h-screen  flex-wrap content-start gap-3  px-4 py-4 ${darkmode ? "border-neutral-800": ''} ${darkmode? "bg-neutral-950":'bg-gray-100'} `}>
    <div className="h-min w-full lg:w-[calc(100%_-_10px)] animate-fadeDown pt-20 pb-10">
      <FadeUp>
      <SubmitPage />
      </FadeUp>
    </div>

 
    
  
  </section>
  );
};

export default Layout;
