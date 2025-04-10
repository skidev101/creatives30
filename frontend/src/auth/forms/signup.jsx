import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../../action';

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ 
        fullname: '', 
        email: '', 
        password: '', 
        confirmpassword: '',
        general: '' 
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError({ fullname: '', email: '', password: '', confirmpassword: '', general: '' });
    
        // Validation
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError(prev => ({ ...prev, email: "Please enter a valid email" }));
            setLoading(false);
            return;
        }
        if (!password || password.length < 6) {
            setError(prev => ({ ...prev, password: "Password must be at least 6 characters" }));
            setLoading(false);
            return;
        }
        if (password !== confirmpassword) {
            setError(prev => ({ ...prev, confirmpassword: "Passwords do not match" }));
            setLoading(false);
            return;
        }
    
        try {
        
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
           
            const idToken = await user.getIdToken();
    
           
            const response = await fetch('https://xen4-backend.vercel.app/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({
                    email,
                    pwd: password,
                }),
                credentials: 'include'
            });
    
        
            const responseData = await response.json();
            console.log(responseData);
    
            if (!response.ok) {
                throw new Error(responseData.message || 'Registration failed');
            }
            console.log("New user created with email:", user.email);
            dispatch(setUser({
                uid: user.uid,
                email: user.email,
              }))
              
            navigate('/submitproject');
    
        } catch (error) {
            console.error('Registration error:', error);
    
            
            let errorMessage = error.message;
            if (error.code) {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        errorMessage = 'Email already in use';
                        break;
                    case 'auth/weak-password':
                        errorMessage = 'Password is too weak';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid email address';
                        break;
                }
            }
    
            setError(prev => ({ ...prev, general: errorMessage }));
    
            // delete Firebase user if backend failed
            if (auth.currentUser) {
                try {
                    await auth.currentUser.delete();
                } catch (deleteError) {
                    console.error('Error deleting Firebase user:', deleteError);
                }
            }
    
        } finally {
            setLoading(false);
        }
    };
    


    return (
        <section className="bg-black min-h-screen flex justify-center items-center pt-10 pb-10 font-grotesk p-4">
            <div className="form-container lg:p-8 p-6 px-8 w-full max-w-md lg:max-w-2xl bg-[#51596C33] text-sm font-sans text-white flex flex-col gap-6 rounded-lg shadow-md">
                <div className="logo-container mb-3 text-center font-bold font-grotesk text-lg">
                    Create an Account
                </div>

                {error.general && (
                    <div className="p-3 bg-red-500/20 text-red-400 rounded-lg text-sm">
                        {error.general}
                    </div>
                )}

                <form className="form flex flex-col gap-3 font-grotesk" onSubmit={handleSignUp}>
                  
                    {/*<div className="flex flex-col gap-1">
                        <label htmlFor="name" className="block">Full name *</label>
                        <input
                            type="text"
                            className="w-full h-[50px] p-3 border text-sm border-opacity-80 rounded-lg border-gray-500 focus:outline-none bg-transparent"
                            placeholder="creative team"
                            onChange={e => setFullName(e.target.value)}
                            value={fullname}
                        />
                        {error.fullname && <span className="text-sm text-red-400">{error.fullname}</span>}
                    </div>*/}

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="block">Email *</label>
                        <input
                            type="email"
                            className="w-full h-[50px] p-3 border text-sm border-opacity-80 rounded-lg border-gray-500 focus:outline-none bg-transparent"
                            placeholder="name@gmail.com"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        {error.email && <span className="text-sm text-red-400">{error.email}</span>}
                    </div>

               
                    <div className="relative">
                        <label className="block mb-2 text-sm font-medium">Password *</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="w-full p-3 h-[50px] text-sm border border-gray-500 border-opacity-80 rounded-lg pr-10 focus:outline-none bg-transparent"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <FaEyeSlash className="text-gray-400" />
                                ) : (
                                    <FaEye className="text-gray-400" />
                                )}
                            </button>
                        </div>
                        {error.password && <span className="text-sm text-red-400">{error.password}</span>}
                    </div>

                    
                    <div className="relative">
                        <label className="block mb-2 text-sm font-medium">Confirm password *</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                className="w-full p-3 h-[50px] text-sm border border-gray-500 border-opacity-80 rounded-lg pr-10 focus:outline-none bg-transparent"
                                placeholder="Confirm Password"
                                onChange={e => setConfirmPassword(e.target.value)}
                                value={confirmpassword}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                                onClick={toggleConfirmPassword}
                            >
                                {showConfirmPassword ? (
                                    <FaEyeSlash className="text-gray-400" />
                                ) : (
                                    <FaEye className="text-gray-400" />
                                )}
                            </button>
                        </div>
                        {error.confirmpassword && <span className="text-sm text-red-400">{error.confirmpassword}</span>}
                    </div>

                 
                    <button 
                        type="submit" 
                        className={`flex justify-center items-center w-full py-3 px-4 rounded-md shadow-md text-white mt-4 ${
                            loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        } transition duration-200`}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z"></path>
                                </svg>
                                Creating account...
                            </>
                        ) : (
                            "Sign up"
                        )}
                    </button>
                </form>

                <p className="text-sm text-center text-[#fcf7f8]">
                    Already have an account?{' '}
                    <a className="text-blue-300 hover:text-blue-400 underline" href="/login">
                        Sign in
                    </a>
                </p>
            </div>
        </section>
    );
}