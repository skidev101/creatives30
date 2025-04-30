import React, { useEffect, useState } from 'react';
import img from '../assets/image.png';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { MessageAlert } from './success';

import { useNavigate } from 'react-router-dom';
import { authFetch } from '../utils/auth';

export default function SubmitPage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const Useremail = user?.email;
  const Userimg = Useremail ? Useremail.charAt(0).toUpperCase() : '';
  const [loading, setLoading] = useState(false);
  const [screenshots, setScreenshots] = useState([]);
  const [form, setForm] = useState({
    title: '',
    livelink: '',
    day: '',
    repolink: '',
    languages: '',
    framework: '',
    description: '',
    screenshots: []
  });
  const [error, setError] = useState({
    title: '',
    livelink: '',
    day: '',
    repolink: '',
    languages: '',
    description: '',
    general: ''
  });
  const [successMessage, setSuccessMessage] = useState("");
  const darkmode = useSelector((state) => state.darkMode);

  // Clean up object URLs when component unmounts or screenshots change
  useEffect(() => {
    return () => {
      screenshots.forEach(screenshot => {
        if (screenshot.preview) {
          URL.revokeObjectURL(screenshot.preview);
        }
      });
    };
  }, [screenshots]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error[name]) {
      setError(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleScreenshotChange = async (event) => {
    try {
      const files = Array.from(event.target.files);
      const validFiles = files.filter(file => {
        // Check file size (2MB max) and type (images only)
        return file.size <= 2 * 1024 * 1024 && file.type.startsWith('image/');
      });

      if (files.length > validFiles.length) {
        setError(prev => ({ ...prev, general: 'Some files were invalid (max 2MB, images only)' }));
      }

      const filesWithPreview = validFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));

      setScreenshots(prevScreenshots => [...prevScreenshots, ...filesWithPreview]);
    } catch (err) {
      console.log("Image Processing error", err);
      setError(prev => ({ ...prev, general: 'Error processing images' }));
    }
  };

  const handleRemoveScreenshot = (index) => {
    const screenshotToRemove = screenshots[index];
    if (screenshotToRemove.preview) {
      URL.revokeObjectURL(screenshotToRemove.preview);
    }
    setScreenshots(prevScreenshots => prevScreenshots.filter((_, i) => i !== index));
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // Reset all errors including general
    setError({ 
      livelink: '', 
      day: '', 
      repolink: '', 
      languages: '', 
      title: '', 
      description: '', 
      general: '' 
    });
  
    // Validate form
    const errors = {};
    if (!form.title.trim()) errors.title = "Project title is required";
    if (!form.livelink.trim() || !isValidUrl(form.livelink)) {
      errors.livelink = "Valid hosted URL is required (e.g., https://example.com)";
    }
    if (!form.day || isNaN(form.day) || form.day < 1 || form.day > 30) {
      errors.day = "Day must be between 1 and 30";
    }
    if (!form.repolink.trim() || !isValidUrl(form.repolink)) {
      errors.repolink = "Valid repository URL is required (e.g., https://github.com/user/repo)";
    }
    if (!form.languages.trim()) {
      errors.languages = "At least one language is required";
    }
    if (!form.description.trim()) errors.description = "Project description is required";
  
    if (Object.keys(errors).length > 0) {
      setError(errors);
      setLoading(false);
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('uid', user.uid);
      formData.append('title', form.title);
      formData.append('livelink', form.livelink);
      formData.append('day', form.day);
      formData.append('repolink', form.repolink);
 // Convert comma-separated string to JSON array string
// Convert comma-separated to array then to JSON string
const langsArray = form.languages.split(',').map(lang => lang.trim());
formData.append('languages', JSON.stringify(form.languages));
      formData.append('framework', form.framework);
      formData.append('description', form.description);
      
      screenshots.forEach((screenshot) => {
        formData.append('files', screenshot.file);
      });
  
      const submitResponse = await authFetch('https://xen4-backend.vercel.app/project/submit', {
        method: 'POST',
        body: formData
      });
  
      // Handle potential non-JSON responses
      let responseData;
      const contentType = submitResponse.headers.get('content-type') || '';
      
      if (contentType.includes('application/json')) {
        responseData = await submitResponse.json();
      } else {
        const text = await submitResponse.text();
        throw new Error(text || 'Server returned unexpected response');
      }
  
      if (!submitResponse.ok) {
        throw new Error(
          responseData.message || 
          responseData.error || 
          'Project submission failed'
        );
      }
  
      // Success handling
      setSuccessMessage("Project submitted successfully!");
      setTimeout(() => {
        navigate('/leaderboard');
        setForm({
          title: '',
          livelink: '',
          day: '',
          repolink: '',
          languages: '',
          framework: '',
          description: ''
        });
        setScreenshots([]);
      }, 1500);
  
    } catch (error) {
      let errorMessage = error.message;
      
      // Handle specific error cases
      if (errorMessage.includes('Internal server error')) {
        errorMessage = 'Server error occurred. Please try again later.';
      } else if (errorMessage.startsWith('<!DOCTYPE html>')) {
        errorMessage = 'Server returned an HTML error page';
      }
  
      setError(prev => ({ 
        ...prev, 
        general: errorMessage 
      }));
      
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className={`inline-flex w-full flex-col items-start border-b justify-start rounded-[14px] border ${darkmode ? 'border-neutral-800' : 'border-slate-100'} ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-6 space-y-6 font-grotesk`}>
    <div className={`flex flex-start items-center flex-row mb-4 border-b w-full ${darkmode ? 'border-neutral-800' : 'border-slate-200'}`}>
      {Userimg ? 
         <div className="lg:h-15 lg:w-15 h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center mb-4">
         <span className='lg:text-4xl text-2xl'> {Userimg} </span>
        </div>
        :
        <img
        src={img}
        alt="Profile"
        className="lg:h-15 lg:w-15 h-10 w-10 rounded-full object-cover mb-4"
      />
    }
   
   
      <div className="flex flex-col pl-3">
        <p className={`text-sm ${darkmode ? 'text-neutral-100' : 'text-gray-500'}`}>
          Welcome Back!
        </p>
        <p className={`text-sm ${darkmode ? 'text-neutral-100' : 'text-gray-500'}`}>
          {user?.username || "guest"}
        </p>
     
      </div>
    </div>
    {error.general && (
      <section className='flex justify-center lg:px-80  items-center'>
  <div className="p-3 bg-red-500/20 text-red-400 text-center flex justify-center items-center rounded-lg text-sm ">
                        {error.general}
                    </div>
      </section>
                  
                )}
                  <>
              
             <MessageAlert
            open={!!successMessage}
            message={successMessage}
            onClose={() => setSuccessMessage("")}
          />
       
    </>
    <form className="w-full space-y-6" onSubmit={handleSubmit}>
    <div className='hidden md:flex justify-end'>
  <button 
    type="submit"
    className={`
      mb-4 py-2 px-4 rounded-lg 
      ${loading ? 
        `${darkmode ? "bg-gray-700/50 text-gray-400" : "bg-gray-300/50"} cursor-not-allowed` : 
        `text-white bg-gradient-to-r from-blue-500 to-purple-600 backdrop-blur-md`
      }
      border ${darkmode ? "border-gray-600/30" : "border-white/30"}
      shadow-lg ${darkmode ? "shadow-gray-900/30" : "shadow-blue-200/30"}
      transition-all duration-300 hover:shadow-xl
    `}
    disabled={loading}
  >
    {loading ? 'Processing' : 'Submit Project'}
  </button>
</div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-medium ${darkmode ? 'text-neutral-100' : 'text-gray-700'}`}>
            Live Link *
          </label>
          <input
            type="text"
            name='livelink'
            className={`mt-1 block w-full rounded-lg border ${darkmode ? 'border-neutral-700 bg-gray-800 text-neutral-100' : 'border-gray-300 bg-gray-100'} shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500`}
            placeholder="https://example.com"
            onChange={handleInputChange}
            value={form.livelink}
          />
          {error.livelink && <span className="text-sm text-red-400">{error.livelink}</span>}
        </div>
        <div>
          <label className={`block text-sm font-medium ${darkmode ? 'text-neutral-100' : 'text-gray-700'}`}>
            Title *
          </label>
          <input
            type="text"
            name='title'
            className={`mt-1 block w-full rounded-lg border ${darkmode ? 'border-neutral-700 bg-gray-800 text-neutral-100' : 'border-gray-300 bg-gray-100'} shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500`}
            placeholder="Landing page"
            onChange={handleInputChange}
            value={form.title}
          />
          {error.title && <span className="text-sm text-red-400">{error.title}</span>}
        </div>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-medium ${darkmode ? 'text-neutral-100' : 'text-gray-700'}`}>
            Repository Link *
          </label>
          <input
            type="text"
            className={`mt-1 block w-full rounded-lg border ${darkmode ? 'border-neutral-700 bg-gray-800 text-neutral-100' : 'border-gray-300 bg-gray-100'} shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500`}
            name="repolink"
            placeholder="https://example.com"
            value={form.repolink}
            onChange={handleInputChange}

          />
            {error.repolink && <span className="text-sm text-red-400">{error.repolink}</span>}
        </div>
        <div>
          <label className={`block text-sm font-medium ${darkmode ? 'text-neutral-100' : 'text-gray-700'}`}>
            Frameworks & Libraries
          </label>
          <input
            type="text"
            className={`mt-1 bg-gray-100 block w-full rounded-lg border ${darkmode ? 'border-neutral-700 bg-gray-800 text-neutral-100' : 'border-gray-300 bg-gray-100'} shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500`}
            placeholder="React.js, Next.js, Vue.js etc"
            name='framework'
            value={form.framework}
            onChange={handleInputChange}
          />
        </div>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-medium ${darkmode ? 'text-neutral-100' : 'text-gray-700'}`}>
            Languages *
          </label>
          <input
            type="text"
            className={`mt-1 block w-full rounded-lg border ${darkmode ? 'border-neutral-700 bg-gray-800 text-neutral-100' : 'border-gray-300 bg-gray-100'} shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500`}
            name='languages'
            value={form.languages}
            onChange={handleInputChange}
            placeholder="Html, css, js"
          />
           {error.languages && <span className="text-sm text-red-400">{error.languages}</span>}
        </div>
        <div>
          <label className={`block text-sm font-medium ${darkmode ? 'text-neutral-100' : 'text-gray-700'}`}>
            Uploading For Day *
          </label>
          <input
            type="number"
            name='day'
            className={`mt-1 block w-full rounded-lg border ${darkmode ? 'border-neutral-700 bg-gray-800 text-neutral-100' : 'border-gray-300 bg-gray-100'} shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500`}
            placeholder="10"
            value={form.day}
            onChange={handleInputChange}
          />
           {error.day && <span className="text-sm text-red-400">{error.day}</span>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
      <div>
          <label className={`block text-sm font-medium ${darkmode ? 'text-neutral-100' : 'text-gray-700'}`}>
            Description *
          </label>
          <input
            type="text"
            className={`mt-1 block w-full rounded-lg border ${darkmode ? 'border-neutral-700 bg-gray-800 text-neutral-100' : 'border-gray-300 bg-gray-100'} shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500`}
            placeholder="Description"
            value={form.description}
            onChange={handleInputChange}
            name='description'
          />
           {error.description && <span className="text-sm text-red-400">{error.description}</span>}
        </div>
      
      </div>
  
      <div className="flex justify-between items-center">
          <h3 className={`text-md font-medium ${darkmode ? 'text-neutral-100' : 'text-gray-700'}`}>
            Upload Screenshots (Max 5)
          </h3>
          {screenshots.length < 5 && (
            <label htmlFor="screenshot-upload" className="cursor-pointer flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg">
              <FaPlus className="mr-2" />
              Upload
              <input
                id="screenshot-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleScreenshotChange}
                className="hidden"
                disabled={screenshots.length >= 5}
              />
            </label>
          )}
        </div>

        {screenshots.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {screenshots.map((screenshot, index) => (
              <div key={index} className="relative group">
                <img
                  src={screenshot.preview}
                  alt={`Screenshot ${index + 1}`}
                  className="rounded-lg object-cover h-32 w-full"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveScreenshot(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-opacity opacity-0 group-hover:opacity-100"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

      <div className='md:hidden flex justify-end'>
      <button 
    type="submit"
    className={`
      mb-4 py-2 px-4 rounded-lg 
      ${loading ? 
        `${darkmode ? "bg-gray-700/50 text-gray-400" : "bg-gray-300/50"} cursor-not-allowed` : 
        `text-white bg-gradient-to-r from-blue-500 to-purple-600 backdrop-blur-md`
      }
      border ${darkmode ? "border-gray-600/30" : "border-white/30"}
      shadow-lg ${darkmode ? "shadow-gray-900/30" : "shadow-blue-200/30"}
      transition-all duration-300 hover:shadow-xl
    `}
    disabled={loading}
  >
    {loading ? 'Processing' : 'Submit Project'}
  </button>
      </div>
    </form>
  </div>
  );
}