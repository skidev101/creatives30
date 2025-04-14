import React, { useState } from 'react';
import img from '../assets/image.png';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { MessageAlert } from './success';
import { getAuth } from 'firebase/auth';
//import { storage } from '../firebase';
//import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function SubmitPage() {

  const user = useSelector((state)=> state.user)
  const Useremail = user?.email
  const Userimg = Useremail ? Useremail.charAt(0).toUpperCase() : '';
  const [loading, setLoading] = useState(false)
  //const [screenshots, setScreenshots] = useState([]);
  const [form , setForm] = useState({
    livelink :'',
    day:'',
    repolink:'',
    languages:'',
    framework:'',
    description:''
  })
  const [error, setError] = useState({ 
    livelink:'',
    day:'',
    repolink:'',
    languages:'',
    description:'',
    general:''
  });
  const [successMessage, setSuccessMessage] = useState("");
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevUpdate) => ({ ...prevUpdate, [name]: value }));
  };

  // const handleScreenshotChange = async (event) => {
  //   try {
		//	const files = Array.from(event.target.files);
	 //   const validFiles = files.filter(file => file.size <= 2 * 1024 * 1024); // Filter files larger than 2MB
	 //   const screenshotURL = await Promise.all(validFiles.map((file) => {
		//		const storageRef = ref(storage, `Projects/images/${Date.now()}/${file.name}`);
		//		await uploadBytes(storageRef, file);
		//		const downloadURL = await getDownloadURL(storageRef);
		//		return downloadURL;
	 //   }));
	 //   setScreenshots(prevScreenshots => [...prevScreenshots, ...downloadURL]);
  //   } catch (err) {
		//	console.log("Image Processing error,": err)
  //   }
  // };
  

  // const handleRemoveScreenshot = (index) => {
  //   setScreenshots(prevScreenshots => prevScreenshots.filter((_, i) => i !== index));
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError({ livelink: '', day: '', repolink: '', languages: '', description: '', general: '' });
  
    const errors = {};
    if (!form.livelink) errors.livelink = "Provide your hosted URL";
    if (!form.day) errors.day = "Provide your day of submission";
    if (!form.repolink) errors.repolink = "Provide your repo URL";
    if (!form.languages) errors.languages = "Provide languages used";
    if (!form.description) errors.description = "Provide description";
  
    if (Object.keys(errors).length > 0) {
      setError(errors);
      setLoading(false);
      return;
    }
  
    try {
			const auth = getAuth();
			const user = auth.currentUser;
			if (!user) {
				console.log('User is not authenticated');
				return
			}
			const idToken = await user.getIdToken();
      const formData = {
				...form
      };
      // const formData = new FormData();
      // formData.append('livelink', form.livelink);
      // formData.append('day', form.day);
      // formData.append('repolink', form.repolink);
      // formData.append('languages', form.languages);
      // formData.append('framework', form.framework);
      // formData.append('description', form.description);
  
      // screenshots.forEach((file) => {
      //   formData.append('screenshots', file);
      // });
  
    
     const response = await fetch('https://xen4-backend.vercel.app/submit', {
       method: 'POST',
       headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${idToken}`
       },
       body: JSON.stringify(formData),
       credentials: 'include',
     });
     
     if (!response.ok) throw new Error("Failed to submit");
     
     const data = response.json();
     console.log(data);
  
      setSuccessMessage(`Project added`);
      setForm({
        livelink: '',
        day: '',
        repolink: '',
        languages: '',
        framework: '',
        description: ''
      });
      setScreenshots([]);
    } catch (error) {
      console.log(error);
      setError(prev => ({ ...prev, general: "Something went wrong!" }));
    } finally {
      setLoading(false);
    }
  };
  
  
  const darkmode = useSelector((state)=> state.darkMode)
 
  return (
    <div className={`inline-flex w-full flex-col items-start border-b justify-start rounded-[14px] border ${darkmode ? 'border-neutral-800' : 'border-slate-100'} ${darkmode ? 'bg-[#111313]' : 'bg-white'} p-6 space-y-6 font-grotesk`}>
    <div className={`flex flex-start items-center flex-row mb-4 border-b w-full ${darkmode ? 'border-neutral-800' : 'border-slate-200'}`}>
      {Userimg ? 
         <div className="lg:h-15 lg:w-15 h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center mb-4">
         <span className='text-4xl'> {Userimg} </span>
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
      <div className='flex justify-end'>
        <button type="submit" 
        className={`mb-4 ${loading ? `${darkmode ? "bg-gray-700 text-gray-400":"bg-gray-300 "} cursor-not-allowed`:'bg-blue-500 text-white'}  py-2 px-4 rounded-lg`}
        disabled={loading}
        >
          {loading ?
          'Processing':

          ' Submit Project'
          }
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
  
      {/*<div className="flex justify-between items-center">
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
      )}*/}
    </form>
  </div>
  );
}