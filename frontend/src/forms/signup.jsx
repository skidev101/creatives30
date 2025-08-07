import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../action';

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ 
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
        setError({ email: '', password: '', confirmpassword: '', general: '' });
      
        // Input validation (unchanged)
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          setError(prev => ({ ...prev, email: "Invalid email" }));
          setLoading(false);
          return;
        }
        if (!password || password.length < 6) {
          setError(prev => ({ ...prev, password: "Password too short" }));
          setLoading(false);
          return;
        }
        if (password !== confirmpassword) {
          setError(prev => ({ ...prev, confirmpassword: "Passwords don't match" }));
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
             uid: user.uid,
              email, 
              pwd: password 
            }),
            credentials: 'include'
          });
      
          const responseData = await response.json();
          
          if (!response.ok) {
            
            if (responseData.errors) {
              throw new Error(responseData.errors.join(', '));
            }
            throw new Error(responseData.message || 'Backend registration failed');
          }
      
          console.log("Full backend response:", responseData);
      

          if (!responseData.username || !responseData.roles) {
            throw new Error('Backend response missing user data');
          }
      
       
          dispatch(setUser({
            uid: responseData.uid,
            email: responseData.email,
            username: responseData.username,
            roles: responseData.roles
          }));
      
          navigate('/submitproject');
      
        } catch (error) {
          console.error("Signup error:", error);
          setError(prev => ({ ...prev, general: error.message }));
      
          // Rollback: Delete Firebase user if backend failed
          if (auth.currentUser) {
            try {
              await auth.currentUser.delete();
              console.log("Rollback: Deleted Firebase user");
            } catch (deleteError) {
              console.error("Failed to rollback Firebase user:", deleteError);
            }
          }
        } finally {
          setLoading(false);
        }
      };

   const handleGoogleSignUp = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError({ general: '' });
    
      try {
        // 1. Authenticate with Google
        const credential = await signInWithPopup(auth, googleProvider);
        const user = credential.user;
        const idToken = await user.getIdToken();
        
        // 2. Verify with backend
        const response = await fetch('https://xen4-backend.vercel.app/googleLogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
          },
          credentials: 'include',
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Google login failed');
        }
    
        const data = await response.json();
        
        // 3. Dispatch user data to Redux
        dispatch(setUser({
          uid: user.uid,
          email: user.email || data.email || '',
          username: data.username || user.displayName || user.email?.split('@')[0] || 'google-user',
          displayName: user.displayName || data.username || 'Google User',
          photoURL: user.photoURL || data.profileImgURL || '',
          roles: data.roles || [],
          lastVerified: Date.now()
        }));
    
        // 4. Navigate based on role
         navigate('/submitproject');
      } catch (err) {
        console.error("Google sign in error:", err);
        
        let errorMessage = "Google login failed. Please try again.";
        
        if (err.code) {
          const errorMap = {
            'auth/account-exists-with-different-credential': 'An account already exists with the same email but different sign-in method',
            'auth/popup-closed-by-user': 'Login popup was closed before completing',
            'auth/cancelled-popup-request': 'Login process was cancelled',
            'auth/popup-blocked': 'Popup was blocked by browser'
          };
          errorMessage = errorMap[err.code] || err.message;
        } else if (err.message) {
          errorMessage = err.message;
        }
    
        setError({ general: errorMessage });
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
                                <div className="social-buttons flex flex-col items-center mb-5 gap-6 font-grotesk">
  <button onClick={handleGoogleSignUp}  className="social-button flex justify-center items-center w-full text-[#fcf7f8] border-gray-500 border py-3 px-4 gap-2 rounded-md shadow-md cursor-pointer">
    <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
      <path fill="#EA4335" d="M9 3.48c1.69 0 2.83.73 3.48 1.35l2.55-2.48C13.76.88 11.23 0 9 0 5.48 0 2.53 2.01 1 5.03l2.93 2.27C4.54 5.08 6.44 3.48 9 3.48z"></path>
      <path fill="#4285F4" d="M17.64 9.2c0-.63-.06-1.25-.18-1.84H9v3.48h4.84c-.21 1.14-.84 2.1-1.8 2.74v2.27h2.92c1.71-1.58 2.68-3.92 2.68-6.65z"></path>
      <path fill="#FBBC05" d="M3.96 10.92c-.21-.63-.33-1.3-.33-2 0-.7.12-1.37.33-2l-2.93-2.27C1.02 6.14 0 7.47 0 9c0 1.53 1.02 2.86 2.03 3.68l1.93-2.76z"></path>
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.81 5.96-2.2l-2.92-2.27c-.81.55-1.83.87-3.04.87-2.56 0-4.71-1.73-5.48-4.08H1.06v2.55C2.53 15.99 5.48 18 9 18z"></path>
      <path fill="none" d="M0 0h18v18H0z"></path>
    </svg>
    <span>Sign Up With Google</span>
  </button>

</div>

                {error.general && (
                    <div className="p-3 bg-red-500/20 text-red-400 rounded-lg text-sm">
                        {error.general}
                    </div>
                )}

                <form className="form flex flex-col gap-3 font-grotesk" onSubmit={handleSignUp}>
                  

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
                    <Link className="text-blue-300 hover:text-blue-400 underline" to="/login">
                        Sign in
                    </Link>
                </p>
            </div>
        </section>
    );
}