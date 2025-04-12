import { FiX, FiAward, FiUser, FiStar } from "react-icons/fi";

export default function DetailsModal({
    showModal,
    selectedVersion,
    setShowModal,
    darkmode,
}) {
    
    const topThree = [
        { id: 1, name: 'Alex Johnson', score: 92, projects: 8 },
        { id: 2, name: 'Sam Wilson', score: 88, projects: 7 },
        { id: 3, name: 'Taylor Smith', score: 85, projects: 6 }
    ];

    return (
        <>
            {showModal && selectedVersion && (
                <div className="fixed inset-0 z-50 top-20 flex items-center justify-center p-4  bg-opacity-50">
                    <div className={`w-full max-w-md rounded-lg shadow-2xl border ${darkmode ? 'bg-[#1a1a1a] border-gray-700' : 'bg-white border-gray-200'} p-6`}>
                        
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className={`text-lg font-bold ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                                    {selectedVersion.name}
                                </h3>
                            
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className={`p-1 rounded-full ${darkmode ? 'hover:bg-[#333]' : 'hover:bg-gray-100'}`}
                            >
                                <FiX className={darkmode ? 'text-neutral-400' : 'text-gray-500'} />
                            </button>
                        </div>
                        <div className=" max-h-[60vh] overflow-y-auto scrollbar-hide ">
               
                        <div className="space-y-4">
                          
                            <div className={`p-4 rounded-lg ${darkmode ? 'bg-[#222]' : 'bg-gray-50'}`}>
                                <h4 className={`text-sm font-medium mb-2 ${darkmode ? 'text-neutral-300' : 'text-gray-700'}`}>Time Period</h4>
                                <div className="flex items-center gap-4">
                                    <div>
                                        <p className={`text-xs ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>Start Date</p>
                                        <p className={`font-medium ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                                            {selectedVersion.startDate}
                                        </p>
                                    </div>
                                    <div>
                                        <p className={`text-xs ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>End Date</p>
                                        <p className={`font-medium ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                                            {selectedVersion.endDate}
                                        </p>
                                    </div>
                                </div>
                            </div>

                           
                            <div className={`p-4 rounded-lg ${darkmode ? 'bg-[#222]' : 'bg-gray-50'}`}>
                                <h4 className={`text-sm font-medium mb-3 ${darkmode ? 'text-neutral-300' : 'text-gray-700'}`}>
                                    Top Performers
                                </h4>
                                <div className="space-y-3">
                                    {topThree.map((user, index) => (
                                        <div 
                                            key={user.id}
                                            className={`flex items-center p-3 rounded-md ${darkmode ? 'bg-[#2a2a2a]' : 'bg-white'} border ${
                                                darkmode ? 'border-neutral-700' : 'border-gray-200'
                                            }`}
                                        >
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                                                index === 0 ? 'bg-yellow-500/20 text-yellow-500' :
                                                index === 1 ? 'bg-gray-500/20 text-gray-500' :
                                                'bg-amber-700/20 text-amber-700'
                                            }`}>
                                                {index === 0 ? <FiStar className="text-yellow-500" /> : `#${index + 1}`}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm font-medium truncate ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                                                    {user.name}
                                                </p>
                                                <div className="flex justify-between text-xs">
                                                    <span className={`${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>
                                                        Score: {user.score}
                                                    </span>
                                                    <span className={`${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>
                                                        Projects: {user.projects}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Statistics Section */}
                            <div className={`p-4 rounded-lg ${darkmode ? 'bg-[#222]' : 'bg-gray-50'}`}>
                                <h4 className={`text-sm font-medium mb-2 ${darkmode ? 'text-neutral-300' : 'text-gray-700'}`}>Statistics</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className={`text-xs ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>Total Submissions</p>
                                        <p className={`font-medium ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                                            {selectedVersion.totalSubmissions}
                                        </p>
                                    </div>
                                    <div>
                                        <p className={`text-xs ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>Active Users</p>
                                        <p className={`font-medium ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                                            {selectedVersion.activeUsers}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className={`px-4 py-2 rounded-md ${darkmode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}