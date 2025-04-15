/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../action';

export const EditProfile = ({ isOpen, setIsOpen,  darkmode }) => {
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
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
        
        const auth = getAuth();
        const currentUser = auth.currentUser;
        
        // Client-side validation
        if (!currentUser) {
            setError("You must be logged in to update your profile.");
            setLoading(false);
            return;
        }
        
        if (password && password.length < 6) {
            setError("Password must be at least 6 characters");
            setLoading(false);
            return;
        }
        
     
        const updatedProfile = {
            uid: currentUser.uid,
            email: email || undefined,
            username: username || undefined,
            profileImgURL: profileImgURL || undefined,
            pwd: password || undefined,
        };

        try {
            const idToken = await currentUser.getIdToken();
      
            const response = await fetch('https://xen4-backend.vercel.app/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify(updatedProfile),
            });
    
            // Check if response is JSON before parsing
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                throw new Error(text || 'Invalid server response');
            }
    
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || `Server error: ${response.status}`);
            }
            dispatch(setUser({
                ...user,
                username: username,
                email: email,
                profileImgURL: profileImgURL
            }));
            setSuccess(true);
            setTimeout(() => setIsOpen(false), 1500);
        } catch (err) {
            setError(err.message.includes('<!DOCTYPE html>') 
                ? 'Server endpoint not found (404)' 
                : err.message);
            console.error('Update error:', err);
        } finally {
            setLoading(false);
        }
    };

    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type and size
            if (!file.type.match('image.*')) {
                setError('Please select an image file (JPEG, PNG, etc.)');
                return;
            }
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setError('Image size should be less than 5MB');
                return;
            }
            setProfileImgFile(file);
            setError('');
        }
    };


    return (
        <div
            className={`fixed inset-0 bg-opacity-50 flex justify-center items-center transition-all ${
                isOpen ? 'opacity-100 z-50' : 'opacity-0 pointer-events-none'
            }`}
            style={{ transition: 'opacity 0.3s ease' }}
        >
            <div
                className={`bg-white rounded-lg shadow-lg p-6 w-96 ${
                    darkmode ? 'bg-neutral-900 text-white' : 'bg-white text-black'
                }`}
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-800"
                >
                    ×
                </button>
                <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full p-2 rounded border border-gray-300 dark:border-neutral-700"
                        required
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full p-2 rounded border border-gray-300 dark:border-neutral-700"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="New Password (optional)"
                        className="w-full p-2 rounded border border-gray-300 dark:border-neutral-700"
                        minLength="6"
                    />
                           <div className="space-y-2">
                        <label className="block text-sm font-medium">
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
                                hover:file:bg-blue-100"
                        />
                     
                    </div>

                  
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && <p className="text-green-500 text-sm">Profile updated successfully!</p>}
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
};