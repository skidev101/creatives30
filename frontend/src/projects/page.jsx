import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  FiChevronLeft, 
  FiGitBranch, 
  FiAlertCircle,
  FiLoader,
  FiLock,
  FiChevronRight
} from 'react-icons/fi';
import { ProjectCard } from './projectcard';
import { ProjectModal } from './projectmodal';
import { getProject } from './api';
import { renderStreakGraph } from './test';

export default function ProjectsPage() {
  const { username } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const darkmode = useSelector((state) => state.darkMode);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [commitData, setCommitData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [authRequired, setAuthRequired] = useState(false);

  // Get username from query if not in params
  const queryParams = new URLSearchParams(location.search);
  const queryUsername = queryParams.get('username');

  // Determine which username to use
  const targetUsername = username || queryUsername || user?.username;

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2;
  const pageCount = Math.ceil(projects.length / rowsPerPage);
  const paginatedprojects = projects.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);
 
  
  useEffect(() => {
    const loadUserProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        setAuthRequired(false);
        
        if (!user) {
          setAuthRequired(true);
          setError('Authentication required');
        }

        const data = await getProject(targetUsername);
        console.log("projects",data)
        if (!data?.projects) {
          setError('No projects found for this user');
        }
        setProjects(data.projects);
        setCommitData(data.commitHistory )
      } catch (err) {
        if (err.message === 'You must be logged in to fetch') {
          setAuthRequired(true);
        }
        setError(err.message);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    if (targetUsername) {
      loadUserProjects();
    } else {
      setError('No user specified');
      setLoading(false);
    }
  }, [targetUsername, user]);

  const UserInitial = targetUsername ? targetUsername.charAt(0).toUpperCase() : '';


  return (
    <div className={`w-full max-w-6xl mx-auto mt-4 rounded-[14px] ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-4 md:p-6 font-grotesk`}>
      
   
      <button
        onClick={() => navigate(-1)}
        className={`flex items-center mb-6 text-sm ${darkmode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
      >
        <FiChevronLeft className="mr-1" /> Back
      </button>

      

      {loading && !authRequired && (
          <div className={`w-full max-w-6xl mx-auto mt-4 rounded-[14px] ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-4 md:p-6 font-grotesk flex justify-center items-center h-64`}>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
       
      )}

     
      {error && !loading && !authRequired && (
        <div className={`p-6 rounded-lg mb-6 ${darkmode ? 'bg-red-900/30' : 'bg-red-100'}`}>
          <div className="flex items-center gap-3">
            <FiAlertCircle className="text-red-500 text-xl" />
            <div>
              <h3 className={`font-medium ${darkmode ? 'text-red-300' : 'text-red-800'}`}>Error loading projects</h3>
              <p className={`text-sm ${darkmode ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
            </div>
          </div>
        </div>
      )}

     
      {!loading && !error && !authRequired && (
        <>
       
          <div className="flex flex-col sm:flex-row gap-6 items-start mb-8">
            <div className="flex items-center gap-4">
              <div className={`h-16 w-16 rounded-full flex items-center justify-center text-3xl font-medium ${
                darkmode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
              }`}>
                {UserInitial}
              </div>
              <div>
                <h1 className={`text-xl font-semibold ${darkmode ? "text-white" : ""}`}>
                  {targetUsername}
                </h1>
                <p className={`text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {targetUsername}
                </p>
              </div>
            </div>
            
            <div className="sm:ml-auto">
              {renderStreakGraph(darkmode, commitData, projects)}
            </div>
          </div>

         
          <div className="mb-4 flex justify-between items-center">
            <h2 className={`text-xl font-bold ${darkmode ? 'text-white' : 'text-gray-900'}`}>
              <FiGitBranch className="inline mr-2" />
              Projects
            </h2>
            <div className={`text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
              {projects.length} {projects.length === 1 ? 'project' : 'projects'}
            </div>
          </div>

          {paginatedprojects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paginatedprojects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  
                  darkmode={darkmode}
                  onView={(proj) => setSelectedProject(proj)}
                />
              ))}
            </div>
          ) : (
            !loading && (
              <div className={`text-center py-8 ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
                No projects found for this user.
              </div>
            )
          )}

          
          {pageCount > 1 && (
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
              <div className={`text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
                Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, projects.length)} of {projects.length} projects
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-md ${darkmode ? 'text-gray-300 hover:bg-gray-800 disabled:text-gray-600' : 'text-gray-700 hover:bg-gray-100 disabled:text-gray-400'}`}
                >
                  <FiChevronLeft />
                </button>

                {Array.from({ length: pageCount }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-8 h-8 rounded-md text-sm ${
                      currentPage === i + 1 
                        ? (darkmode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white') 
                        : (darkmode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100')
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(Math.min(pageCount, currentPage + 1))}
                  disabled={currentPage === pageCount}
                  className={`p-2 rounded-md ${darkmode ? 'text-gray-300 hover:bg-gray-800 disabled:text-gray-600' : 'text-gray-700 hover:bg-gray-100 disabled:text-gray-400'}`}
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <ProjectModal 
        project={selectedProject} 
        darkmode={darkmode} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
}








