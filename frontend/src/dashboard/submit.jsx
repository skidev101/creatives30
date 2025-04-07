import React, { useState } from 'react';
import img from '../assets/image.png';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function SubmitProject() {
  const [screenshots, setScreenshots] = useState([]);

  const handleScreenshotChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => file.size <= 2 * 1024 * 1024); // Filter files larger than 2MB
    const fileURLs = validFiles.map(file => URL.createObjectURL(file));
    setScreenshots(prevScreenshots => [...prevScreenshots, ...fileURLs]);
  };

  const handleRemoveScreenshot = (index) => {
    setScreenshots(prevScreenshots => prevScreenshots.filter((_, i) => i !== index));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  
    console.log('Form submitted');
  };
  const darkmode = useSelector((state)=> state.darkMode)
   
  return (
    <div className={`inline-flex w-full flex-col items-start border-b justify-start rounded-[14px] border ${darkmode ? 'border-neutral-800' : 'border-slate-100'} ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-6 space-y-6 font-grotesk`}>
    <div className={`flex flex-start items-center flex-row mb-4 border-b w-full ${darkmode ? 'border-neutral-800' : 'border-slate-200'}`}>
      <img
        src={img}
        alt="Profile"
        className="lg:h-15 lg:w-15 h-10 w-10 rounded-full object-cover mb-4"
      />
      <div className="flex flex-col pl-3">
        <p className={`text-sm ${darkmode ? 'text-neutral-100' : 'text-gray-500'}`}>
          Welcome Back!
        </p>
        <p className={`text-sm ${darkmode ? 'text-neutral-100' : 'text-gray-500'}`}>
          Billie Dominic
        </p>
      </div>
    </div>
  
    <form className="w-full space-y-6" onSubmit={handleSubmit}>
      <div className='flex justify-end'>
        <button type="submit" className="mb-4 bg-blue-500 text-white py-2 px-4 rounded-lg">
          Submit Project
        </button>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-medium ${darkmode ? 'text-neutral-100' : 'text-gray-700'}`}>
            Live Link *
          </label>
          <input
            type="text"
            className={`mt-1 block w-full rounded-lg border ${darkmode ? 'border-neutral-700 bg-gray-800 text-neutral-100' : 'border-gray-300 bg-gray-100'} shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500`}
            placeholder="https://example.com"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${darkmode ? 'text-neutral-100' : 'text-gray-700'}`}>
            Uploading For Day
          </label>
          <input
            type="number"
            className={`mt-1 block w-full rounded-lg border ${darkmode ? 'border-neutral-700 bg-gray-800 text-neutral-100' : 'border-gray-300 bg-gray-100'} shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500`}
            placeholder="10"
          />
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
            name="repo"
            placeholder="https://example.com"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${darkmode ? 'text-neutral-100' : 'text-gray-700'}`}>
            Frameworks & Libraries
          </label>
          <input
            type="text"
            className={`mt-1 bg-gray-100 block w-full rounded-lg border ${darkmode ? 'border-neutral-700 bg-gray-800 text-neutral-100' : 'border-gray-300 bg-gray-100'} shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500`}
            placeholder="React.js, Next.js, Vue.js etc"
            
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
          
            placeholder="Html, css, js"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${darkmode ? 'text-neutral-100' : 'text-gray-700'}`}>
            Description *
          </label>
          <input
            type="text"
            className={`mt-1 block w-full rounded-lg border ${darkmode ? 'border-neutral-700 bg-gray-800 text-neutral-100' : 'border-gray-300 bg-gray-100'} shadow-sm py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500`}
            placeholder="Description"
          />
        </div>
      </div>
  
      <div className="flex justify-between items-center">
        <h3 className={`text-md font-medium ${darkmode ? 'text-neutral-100' : 'text-gray-700'}`}>Upload Screenshots</h3>
        <label htmlFor="screenshot-upload" className="cursor-pointer flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg">
          <FaPlus className="mr-2" />
          Upload
        </label>
        <input
          id="screenshot-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleScreenshotChange}
          className="hidden"
        />
      </div>
  
      {screenshots.length > 0 && (
        <div className="mt-4 grid grid-cols-4 gap-4">
          {screenshots.map((screenshot, index) => (
            <div key={index} className="relative">
              <img
                src={screenshot}
                alt={`Screenshot ${index + 1}`}
                className="rounded-lg object-cover h-25 w-full"
              />
              <button
                type="button"
                onClick={() => handleRemoveScreenshot(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
      )}
    </form>
  </div>
  );
}