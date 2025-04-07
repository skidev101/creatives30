import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ fullname: '', email: '', password: '', confirmpassword: '' });
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError({ fullname: '', email: '', password: '', confirmpassword: '' }); // Reset errors

        let hasError = false;

        if (!fullname || fullname.length < 4) {
            setError(prev => ({ ...prev, fullname: "Name should be more than 4 characters." }));
            hasError = true;
        }
        if (!email) {
            setError(prev => ({ ...prev, email: "Email is required." }));
            hasError = true;
        }
        if (!password || password.length <= 6) {
            setError(prev => ({ ...prev, password: "Password should be more than 6 characters." }));
            hasError = true;
        }
        if (password !== confirmpassword) {
            setError(prev => ({ ...prev, confirmpassword: "Passwords do not match." }));
            hasError = true;
        }

        if (hasError) {
            setLoading(false);
            return; 
        }

        try {
            setLoading(true);
            const credential = await createUserWithEmailAndPassword(auth, email, password);
						const user = credential.user;
						const idToken = await user.getIdToken();
						
            const response = await fetch('http://localhost:3000/register', {
							method: 'POST',
						  headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${idToken}`
						  },
						  body: JSON.stringify({email, password})
            });
            
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
            setError(prev => ({ ...prev, general: "An error occurred during signup." }));
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

                <form className="form flex flex-col gap-3 font-grotesk" onSubmit={handleSignUp}>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="block">Full name *</label>
                        <input
                            type="text"
                            className="w-full h-[50px] p-3 border text-sm border-opacity-80 rounded-lg mb-4 border-gray-500 focus:outline-none"
                            placeholder="creative team"
                            required
                            onChange={e => setFullName(e.target.value)}
                            value={fullname}
                        />
                        {error.fullname && <span className="block text-sm text-red-400">{error.fullname}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="block">Email *</label>
                        <input
                            type="email"
                            className="w-full h-[50px] p-3 border text-sm border-opacity-80 rounded-lg mb-4 border-gray-500 focus:outline-none"
                            placeholder="name@gmail.com"
                            required
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        {error.email && <span className="block text-sm text-red-400">{error.email}</span>}
                    </div>
                    <div className="relative mb-4">
                        <label className="block mb-2 text-sm font-medium">Password *</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="w-full p-3 h-[50px] text-sm border border-gray-500 border-opacity-80 rounded-lg pr-10 focus:outline-none"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                            required
                            value={password}
                        />
                        {error.password && <span className="block text-sm text-red-400">{error.password}</span>}
                        <span
                            className="absolute inset-y-0 top-7 right-10 flex items-center cursor-pointer border-l border-gray-500"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <FaEyeSlash className="text-gray-500 relative left-4" />
                            ) : (
                                <FaEye className="text-gray-500 relative left-4" />
                            )}
                        </span>
                    </div>
                    <div className="relative mb-4">
                        <label className="block mb-2 text-sm font-medium">Confirm password *</label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            className="w-full p-3 h-[50px] text-sm border border-gray-500 border-opacity-80 rounded-lg pr-10 focus:outline-none"
                            placeholder="Confirm Password"
                            required
                            onChange={e => setConfirmPassword(e.target.value)}
                            value={confirmpassword}
                        />
                        {error.confirmpassword && <span className="block text-sm text-red-400">{error.confirmpassword}</span>}
                        <span
                            className="absolute inset-y-0 top-7 right-10 flex items-center cursor-pointer border-l border-gray-500"
                            onClick={toggleConfirmPassword}
                        >
                            {showConfirmPassword ? (
                                <FaEyeSlash className="text-gray-500 relative left-4" />
                            ) : (
                                <FaEye className="text-gray-500 relative left-4" />
                            )}
                        </span>
                    </div>
                    <button 
    type="submit" 
    className={`flex justify-center items-center w-full py-3 px-4 rounded-md shadow-md text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} transition duration-200 ease-in-out`}
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
                    Already have an account?
                    <a className="text-blue-300 underline" href="/login"> Sign in</a>
                </p>
            </div>
        </section>
    );
}