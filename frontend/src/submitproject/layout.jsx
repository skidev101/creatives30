import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import { useSelector } from "react-redux";
import SubmitPage from "../submitproject/page";
import { FadeUp } from "../components/framer";

const Layout = () => {
    const darkmode = useSelector((state) => state.darkMode);
    
    return (
        <ParallaxProvider>
            <section className={`flex min-h-screen flex-wrap content-start gap-3 px-4 py-4 ${
                darkmode ? "border-neutral-800 bg-neutral-950" : "bg-gray-100"
            }`}>
                
                <div className="h-min w-full lg:w-[calc(100%_-_10px)] pt-20 pb-10">
                    <Parallax speed={5}> {/* Subtle parallax effect */}
                        <FadeUp> {/* Maintains your existing fade animation */}
                            <SubmitPage />
                        </FadeUp>
                    </Parallax>
                </div>

            </section>
        </ParallaxProvider>
    );
};

export default Layout;