import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../../action';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({ 
      email: '', 
      password: '', 
      general: '' 
  });
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError({ email: '', password: '', general: '' });
    
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError(prev => ({ ...prev, email: "Please enter a valid email" }));
        setLoading(false);
        return;
      }
    
      try {
        const credential = await signInWithEmailAndPassword(auth, email, password);
        const user = credential.user;
        const idToken = await user.getIdToken();
    
        const response = await fetch('https://xen4-backend.vercel.app/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
          },
          credentials: 'include',
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log(data); // Receives username and roles
    
          dispatch(setUser({
            uid: user.uid,
            email: user.email,
          }));
    
          navigate('/submitproject');
        } else {
          if (!response.ok) {
            const errorData = await response.json();
            console.log("Backend login error:", errorData);
            throw new Error(errorData.message || 'Login failed');
          }
          
        }
    
      } 
      
      catch (error) {
        console.error("Login error:", error);
      
        let errorMessage = 'An error occurred. Please try again.';
      
        if (error.code) {
          switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
              errorMessage = 'Invalid email or password';
              break;
            case 'auth/invalid-email':
              errorMessage = 'Invalid email address';
              break;
            case 'auth/too-many-requests':
              errorMessage = 'Too many attempts. Please try again later.';
              break;
            default:
              errorMessage = error.message; // fallback to Firebase's error message
          }
        } else if (error.message) {
          errorMessage = error.message;
        }
      
        setError(prev => ({ ...prev, general: errorMessage }));
      }
       finally {
        setLoading(false);
      }
    };
    
    
    return (
        <section className="bg-black min-h-screen flex justify-center items-center pt-10 pb-10 font-grotesk p-4">
            <div className="form-container lg:p-8 p-6 px-8 w-full max-w-md lg:max-w-2xl bg-[#51596C33]  text-sm font-sans text-white flex flex-col gap-6 rounded-lg shadow-md">
                <div className="logo-container mb-3 text-center font-bold font-grotesk text-lg">
                    Welcome Back!
                </div>

                <div className="social-buttons flex flex-col items-center mb-5 gap-6 font-grotesk">
  <button className="social-button flex justify-center items-center w-full text-[#fcf7f8] border-gray-500 border py-3 px-4 gap-2 rounded-md shadow-md">
    <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
      <path fill="#EA4335" d="M9 3.48c1.69 0 2.83.73 3.48 1.35l2.55-2.48C13.76.88 11.23 0 9 0 5.48 0 2.53 2.01 1 5.03l2.93 2.27C4.54 5.08 6.44 3.48 9 3.48z"></path>
      <path fill="#4285F4" d="M17.64 9.2c0-.63-.06-1.25-.18-1.84H9v3.48h4.84c-.21 1.14-.84 2.1-1.8 2.74v2.27h2.92c1.71-1.58 2.68-3.92 2.68-6.65z"></path>
      <path fill="#FBBC05" d="M3.96 10.92c-.21-.63-.33-1.3-.33-2 0-.7.12-1.37.33-2l-2.93-2.27C1.02 6.14 0 7.47 0 9c0 1.53 1.02 2.86 2.03 3.68l1.93-2.76z"></path>
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.81 5.96-2.2l-2.92-2.27c-.81.55-1.83.87-3.04.87-2.56 0-4.71-1.73-5.48-4.08H1.06v2.55C2.53 15.99 5.48 18 9 18z"></path>
      <path fill="none" d="M0 0h18v18H0z"></path>
    </svg>
    <span>Sign in with Google</span>
  </button>
  <button className="social-button flex justify-center items-center w-full text-[#fcf7f8] border-gray-500 border py-3 px-4 gap-2 rounded-md shadow-md">
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
      <path fillRule="evenodd" fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
    </svg>
    <span>Sign in with GitHub</span>
  </button>
</div>

                <div className="relative flex items-center font-grotesk ">
                    <div className="line w-full h-px bg-[#fcf7f8] opacity-10"></div>
                    <span className="absolute left-1/2 transform -translate-x-1/2  px-2 text-[#fcf7f8]">or sign in with</span>
                    <div className="line w-full h-px bg-[#fcf7f8] opacity-10"></div>
                </div>
                {error.general && (
                    <div className="p-3 bg-red-500/20 text-red-400 rounded-lg text-sm">
                        {error.general}
                    </div>
                )}
                <form className="form flex flex-col gap-3 font-grotesk" onSubmit={handleLogin}>
                    <div className=" flex flex-col gap-1 ">
                        <label htmlFor="email" className="block">Email *</label>
                        <input
              type="email"
              className="w-full h-[50px] p-3 border text-sm  border-opacity-80 rounded-lg mb-4 border-gray-500 focus:outline-none "
              placeholder="name@gmail.com"
              value={email}
              required
              onChange={e => setEmail(e.target.value)}
            />
                                    {error.email && <span className="text-sm text-red-400">{error.email}</span>}
                    </div>


                    
<div className="relative mb-4">
      <label className="block mb-2 text-sm font-medium">Password *</label>
      <input
        type={showPassword ? 'text' : 'password'}
        className="w-full p-3 h-[50px] text-sm border border-gray-500 border-opacity-80 rounded-lg pr-10 focus:outline-none "
        placeholder="Password"
        required
        onChange={e=> setPassword(e.target.value)}
      />
      <span
        className="absolute inset-y-0 top-7 right-10  flex items-center   cursor-pointer border-l border-gray-500"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <FaEyeSlash className="text-gray-500 relative left-4" />
        ) : (
          <FaEye className="text-gray-500  relative left-4" />
        )}
      </span>
      {error.password && <span className="text-sm text-red-400">{error.password}</span>}
    </div>
                    <a className="forgot-password-link text-blue-300 text-sm underline self-end" href="#">Forgot Password</a>
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
            Loading...
        </>
    ) : (
        "Login"
    )}
</button>
                </form>

            
                <p className="signup-link text-sm text-center text-[#fcf7f8]">
                    Don't have an account?
                    <a className=" text-blue-300 underline" href="/signup"> Sign up now</a>
                </p>
            </div>
        </section>
    );
}