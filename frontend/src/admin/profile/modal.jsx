import { FiX, FiAward, FiUser, FiStar, FiFolder, FiUsers } from "react-icons/fi";

export default function DetailsModal({
    showModal,
    selectedVersion,
    setShowModal,
    darkmode,
}) {
    const formatDate = (dateString) => {
        if (!dateString) return 'Present';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <>
            {showModal && selectedVersion && (
                <div className="fixed inset-0 z-50 top-20 flex items-center justify-center p-4 bg-opacity-50 font-grotesk">
                    <div className={`w-full max-w-md rounded-lg shadow-2xl border ${darkmode ? 'bg-[#1a1a1a] border-gray-700' : 'bg-white border-gray-200'} p-6`}>
                        
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className={`text-lg font-bold ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                                    Version {selectedVersion.version}: {selectedVersion.title}
                                </h3>
                            
                                <p className={`text-sm ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>
                                    Created by {selectedVersion.createdBy}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className={`p-1 rounded-full ${darkmode ? 'hover:bg-[#333]' : 'hover:bg-gray-100'}`}
                            >
                                <FiX className={darkmode ? 'text-neutral-400' : 'text-gray-500'} />
                            </button>
                        </div>
                        <div className="max-h-[60vh] overflow-y-auto scrollbar-hide">
                            <div className="space-y-4">
                                {/* Time Period */}
                                <div className={`p-4 rounded-lg ${darkmode ? 'bg-[#222]' : 'bg-gray-50'}`}>
                                    <h4 className={`text-sm font-medium mb-2 ${darkmode ? 'text-neutral-300' : 'text-gray-700'}`}>Time Period</h4>
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <p className={`text-xs ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>Start Date</p>
                                            <p className={`font-medium ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                                                {formatDate(selectedVersion.createdAt)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className={`text-xs ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>End Date</p>
                                            <p className={`font-medium ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                                                {formatDate(selectedVersion.endedAt)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Top Performers */}
                                {selectedVersion.topPerformers && selectedVersion.topPerformers.length > 0 && (
                                    <div className={`p-4 rounded-lg ${darkmode ? 'bg-[#222]' : 'bg-gray-50'}`}>
                                        <h4 className={`text-sm font-medium mb-3 ${darkmode ? 'text-neutral-300' : 'text-gray-700'}`}>
                                            Top Performers
                                        </h4>
                                        <div className="space-y-3">
                                            {selectedVersion.topPerformers.map((user, index) => (
                                                <div 
                                                    key={index}
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
                                                            {user.username}
                                                        </p>
                                                        <div className="flex justify-between text-xs">
                                                            <span className={`${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>
                                                                Projects: {user.projectCount}
                                                            </span>
                                                            <span className={`${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>
                                                                {user.percentage}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                               
                                <div className={`p-4 rounded-lg ${darkmode ? 'bg-[#222]' : 'bg-gray-50'}`}>
                                    <h4 className={`text-sm font-medium mb-2 ${darkmode ? 'text-neutral-300' : 'text-gray-700'}`}>Statistics</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2">
                                            <FiFolder className={darkmode ? 'text-blue-400' : 'text-blue-600'} />
                                            <div>
                                                <p className={`text-xs ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>Total Submission</p>
                                                <p className={`font-medium ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                                                    {selectedVersion.totalProjects}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FiUsers className={darkmode ? 'text-green-400' : 'text-green-600'} />
                                            <div>
                                                <p className={`text-xs ${darkmode ? 'text-neutral-400' : 'text-gray-500'}`}>Total Users</p>
                                                <p className={`font-medium ${darkmode ? 'text-white' : 'text-gray-900'}`}>
                                                    {selectedVersion.totalUsers}
                                                </p>
                                            </div>
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