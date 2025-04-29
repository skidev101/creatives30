import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FiEdit2 } from 'react-icons/fi';

import { EditProfile } from './modal';
import { Stats } from './stat';
import SkeletonLoader from '../components/skeleton';

export const Welcome = () => {
    const darkmode = useSelector((state) => state.darkMode);
    const user = useSelector((state) => state.user);
    const Useremail = user?.email;
    const Userimg = Useremail ? Useremail.charAt(0).toUpperCase() : '';
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    

    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour < 12) {
        greeting = "Good Morning!";
    } else if (currentHour < 18) {
        greeting = "Good Afternoon!";
    } else {
        greeting = "Good Evening!";
    }

useEffect(() => {

    const timer = setTimeout(() => {
        setLoading(false); 
    }, 1000);
    
    return () => clearTimeout(timer);
}, []);
if (loading) {
  return (
    <div className="space-y-4 font-grotesk">
   
      <section className={`w-full max-w-4xl mx-auto p-4 rounded-2xl ${darkmode ? 'bg-neutral-900' : 'bg-white'} shadow-sm border ${darkmode ? 'border-neutral-800' : 'border-gray-200'}`}>
        <div className="flex items-center space-x-4">
        
          <div className="relative">
            <SkeletonLoader circle={true} width={56} height={56} />
            <SkeletonLoader circle={true} width={20} height={20} className="absolute -bottom-1 -right-1" />
          </div>
          
    
          <div className="space-y-2">
            <SkeletonLoader width={150} height={24} />
            <SkeletonLoader width={100} height={16} />
          </div>
          
       
          <SkeletonLoader circle={true} width={36} height={36} className="ml-auto" />
        </div>
      </section>

 
      <div className={`w-full max-w-4xl mx-auto p-4 rounded-2xl ${darkmode ? 'bg-neutral-900' : 'bg-white'} shadow-sm border ${darkmode ? 'border-neutral-800' : 'border-gray-200'}`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="space-y-2">
              <SkeletonLoader width={80} height={16} />
              <SkeletonLoader width={60} height={24} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

    return (
        <div className="space-y-4 font-grotesk">
            <section className={`w-full max-w-4xl mx-auto p-4 rounded-2xl ${darkmode ? 'bg-neutral-900' : 'bg-white'} shadow-sm border ${darkmode ? 'border-neutral-800' : 'border-gray-200'}`}>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        
                        {Userimg ?
                            <>
                                <div className="lg:h-15 lg:w-15 h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center mb-4">
                                    <span className='lg:text-4xl text-2xl'> {Userimg} </span>
                                </div>
                                <div className={`absolute bottom-3 -right-1 w-5 h-5 rounded-full border-2 ${darkmode ? 'border-neutral-900 bg-green-500' : 'border-white bg-green-500'}`}></div>
                            </>
                            :
                            <>
                                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300 dark:border-neutral-700">
                                    <img src={user?.profileImgURL} alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 ${darkmode ? 'border-neutral-900 bg-green-500' : 'border-white bg-green-500'}`}></div>
                            </>
                        }
                    </div>

                    <div>
                        <h2 className={`text-lg font-semibold ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                            {greeting}
                        </h2>
                        <p className={`break-normal w-10 text-sm ${darkmode ? 'text-neutral-400' : 'text-gray-600'}`}>
                            {user?.email || "guest"}
                        </p>
                    </div>

                    <button onClick={() => setIsOpen(true)} className="ml-auto p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-800" title="Edit Profile">
                        <FiEdit2 className={`text-lg ${darkmode ? 'text-white' : 'text-gray-700'}`} />
                    </button>
                </div>
            </section>

            <Stats />

            {isOpen && (
                <EditProfile
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    user={user}
                   
                />
            )}
        </div>
    );
};
