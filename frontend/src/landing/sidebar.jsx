import { FaDiscord, FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";

export default function Sidebar({ isSidebarOpen }) {
    return (
        <>
            {isSidebarOpen && (
                <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-4">
                    <h2 className="text-xl font-bold text-[#a31621]">Menu</h2>
                    <div className="flex flex-col gap-4 mt-4">
                        <div className="flex items-center gap-2">
                            <FaGithub className="text-xl" />
                            <span>GitHub</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaDiscord className="text-xl" />
                            <span>Discord</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaFacebook className="text-xl" />
                            <span>Facebook</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaTwitter className="text-xl" />
                            <span>Twitter</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-6">
                        <button className="bg-[#fcf7f8] border-[#a31621] border-2 hover:bg-[#a31621]/80 text-[#a31621] hover:text-white font-medium py-2 rounded">
                            Login
                        </button>
                        <button className="bg-[#a31621] text-white font-medium py-2 rounded">
                            Sign up
                        </button>
                    
                        <button className="bg-[#fcf7f8] border-[#a31621] border-2 hover:bg-[#a31621]/80 text-[#a31621] hover:text-white font-medium py-2 rounded">
                            Leaderboard
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}