import { FaDiscord, FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
export default function Sidebar({ isSidebarOpen , setIsSidebarOpen}) {
    const handleClose = () => {
        setIsSidebarOpen(false);
      };
    return (
        <>
            {isSidebarOpen && (
                <div className="fixed top-0 left-0 w-64 h-full bg-black border-r border-blue-200 shadow-lg z-50 p-4">
  <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-blue-800">Menu</h2>
            <button onClick={handleClose} className="text-white text-2xl hover:text-red-500 transition">
              <RxCross2 />
            </button>
          </div>
                    <div className="flex flex-col gap-4 mt-4">
  <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer transition-colors duration-200">
    <FaGithub className="text-xl" />
    <span>GitHub</span>
  </div>
  <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer transition-colors duration-200">
    <FaDiscord className="text-xl" />
    <span>Discord</span>
  </div>
  <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer transition-colors duration-200">
    <FaFacebook className="text-xl" />
    <span>Facebook</span>
  </div>
  <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer transition-colors duration-200">
    <FaTwitter className="text-xl" />
    <span>Twitter</span>
  </div>
</div>

                    <div className="flex flex-col gap-4 mt-6">
                        <button className="bg-[#fcf7f8] border-blue-400 border-2 cursor-pointer text-gray-800  font-medium py-2 rounded">
                            Login
                        </button>
                        <button className="bg-blue-400 border border-blue-200 text-white font-medium py-2 rounded cursor-pointer ">
                            Sign up
                        </button>
                    
                        <button className="bg-blue-200 border-blue-100 border-2  text-gray-900 cursor-pointer font-medium py-2 rounded">
                            Leaderboard
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}