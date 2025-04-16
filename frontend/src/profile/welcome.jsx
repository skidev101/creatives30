import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FiEdit2 } from 'react-icons/fi';

import { EditProfile } from './modal';
import { Stats } from './stat';

export const Welcome = () => {
    const darkmode = useSelector((state) => state.darkMode);
    const user = useSelector((state) => state.user);
    const Useremail = user?.email;
    const Userimg = Useremail ? Useremail.charAt(0).toUpperCase() : '';

    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour < 12) {
        greeting = "Good Morning!";
    } else if (currentHour < 18) {
        greeting = "Good Afternoon!";
    } else {
        greeting = "Good Evening!";
    }

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="space-y-4 font-grotesk">
            <section className={`w-full max-w-4xl mx-auto p-4 rounded-2xl ${darkmode ? 'bg-neutral-900' : 'bg-white'} shadow-sm border ${darkmode ? 'border-neutral-800' : 'border-gray-200'}`}>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        {Userimg ?
                            <>
                                <div className="lg:h-15 lg:w-15 h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center mb-4">
                                    <span className='text-4xl'> {Userimg} </span>
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
                    darkmode={darkmode}
                />
            )}
        </div>
    );
};
