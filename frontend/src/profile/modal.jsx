/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../action';
import { FaTimes } from 'react-icons/fa'; 
import { authFetch } from '../utils/auth';

export const EditProfile = ({ isOpen, setIsOpen }) => {
    const darkmode = useSelector((state) => state.darkMode);
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');
    const [profileImgURL, setProfileImgURL] = useState(user?.profileImgURL || '');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
    const [profileImgFile, setProfileImgFile] = useState(null);
    const fileInputRef = useRef(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);
        
     
      
        try {
          // Convert image to base64 if new file was selected
          let imageBase64 = null;
          if (profileImgFile) {
            imageBase64 = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(profileImgFile);
              reader.onload = () => resolve(reader.result);
              reader.onerror = error => reject(error);
            });
          }
      
          const updatedProfile = {
            uid: user.uid,
            email: email || undefined,
            username: username || undefined,
            profileImgURL: imageBase64 || profileImgURL || undefined, // Use new base64 or existing URL
          };
      
        
          const response = await authFetch('https://xen4-backend.vercel.app/update', {
            method: 'PUT',
         
            body: JSON.stringify(updatedProfile),
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Update failed');
          }
      
          const data = await response.json();
          dispatch(setUser(data.updatedUser));
          setSuccess(true);
          setTimeout(() => setIsOpen(false), 1500);
        } catch (err) {
          setError(err.message);
          console.error('Update error:', err);
        } finally {
          setLoading(false);
        }
      };
   
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.match('image.*')) {
                setError('Please select an image file (JPEG, PNG, etc.)');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size should be less than 5MB');
                return;
            }
            setProfileImgFile(file);
            setError('');
        }
    };

    return (
        <div
            className={`fixed inset-0  bg-opacity-50 flex justify-center items-center transition-all ${
                isOpen ? 'opacity-100 z-50' : 'opacity-0 pointer-events-none'
            }`}
            style={{ transition: 'opacity 0.3s ease' }}
        >
            <div
                className={`relative rounded-lg shadow-lg p-6 w-full max-w-md mx-4 border ${
                    darkmode ? 'bg-neutral-900 text-white border-gray-700' : 'bg-white text-black border-gray-200'
                }`}
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className={`absolute top-4 right-4 text-xl p-1 rounded-full hover:bg-opacity-20 hover:bg-gray-500 transition-colors ${
                        darkmode ? 'text-gray-300' : 'text-gray-500'
                    }`}
                >
                    <FaTimes className="text-xl" />
                </button>
                <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="w-full p-2 rounded border  transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full p-2 rounded border  transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Profile Picture
                        </label>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-200"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && <p className="text-green-500 text-sm">Profile updated successfully!</p>}
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600 disabled:opacity-50 transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
};