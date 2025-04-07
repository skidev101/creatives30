import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import { FadeDown, FadeLeft, FadeRight, FadeUp } from '../components/framer';
import { Link } from 'react-router-dom';
import Nav from './nav';

const Hero = () => {
   
  return (
    <section
    id='dev'
      className="relative text-white py-16 p-8 lg:p-9 overflow-hidden font-grotesk"
      style={{
        backgroundImage: `url(https://web.moxcreative.com/techbiz/wp-content/uploads/sites/12/2023/02/part-of-earth-with-sun-rise-and-lens-flare-background-internet-network-concept.jpg)`,
        backgroundPosition: 'top left',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >

      <div
        className="absolute inset-0 bg-black opacity-30"
        style={{
          transition: 'background 0.3s, border-radius 0.3s, opacity 0.3s',
        }}
      ></div>
<div>
<Nav />
</div>

      <div className="relative z-10 max-w-7xl mx-auto md:px-4 top-20 lg:top-[-20px]">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <FadeLeft>
            <p className="text-sm uppercase tracking-widest text-blue-500 mb-2">
              Join VickyJay Community
            </p>
            <h1 className="text-4xl md:text-2xl text-md lg:text-5xl font-bold mb-4 leading-tight">
            30 Days of Code Challenge With VickyJay
            </h1>
            <p className="text-gray-300 mb-6 md:px-4 lg:px-0 md:px-0 font-poppins">
            The “30 Days of Code with VickyJay” challenge is an engaging and intensive programming contest designed to foster continuous learning and project development.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="#"
                className="inline-block bg-gradient-to-r from-blue-900 to-[#fcf7f8] animate-gradient hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md"
              >
                Get started
              </Link>
    
            </div>
          </FadeLeft>

          <div className="flex justify-center">
            <FadeRight>
              <DotLottieReact
                src="https://lottie.host/792a31b3-481a-4010-842e-1a1d0138239d/1wEewb2Urv.lottie"
                loop
                autoplay
                className="lg:h-[700px] lg:w-[600px] md:w-[400px] md:h-[400px] w-[350px] h-[350px]"
              />
            </FadeRight>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;