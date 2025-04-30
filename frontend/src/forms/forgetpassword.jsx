import { useState, useEffect } from "react";
import { sendPasswordResetEmail, confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "../firebase"; 

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oobCode, setOobCode] = useState(null);
  const [isResetLink, setIsResetLink] = useState(false);

  // Check if this is a password reset link and get the email
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("oobCode");
    if (code) {
      setOobCode(code);
      setIsResetLink(true);
      // Verify the code and get the associated email
      verifyPasswordResetCode(auth, code)
        .then((email) => {
          setEmail(email); // Auto-populate the email
        })
        .catch((error) => {
          setMessage("Invalid or expired reset link.");
        });
    }
  }, []);

  const handleSendResetEmail = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter your email");
      return;
    }
    
    setLoading(true);
    setMessage("");
  
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Please check your inbox (and spam folder).");
    } catch (error) {
      let errorMessage = "Error sending password reset email: ";
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage += "No user found with this email address.";
          break;
        case "auth/invalid-email":
          errorMessage += "The email address is invalid.";
          break;
        case "auth/too-many-requests":
          errorMessage += "Too many requests. Try again later.";
          break;
        default:
          errorMessage += error.message;
      }
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (newPassword !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }
    
    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // 1. First confirm the password reset with Firebase
      await confirmPasswordReset(auth, oobCode, newPassword);
      
      // 2. Then update the password in MongoDB backend
      const response = await fetch('https://xen4-backend.vercel.app/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email, 
          newPassword: newPassword 
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update backend password");
      }

      setMessage("Password updated successfully. You can now login with your new password.");
      
      // Optionally redirect to login after a delay
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
      
    } catch (error) {
      setMessage("Error resetting password: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-black min-h-screen flex justify-center items-center pt-10 pb-10 font-poppins p-4">
      <div className="form-container lg:p-8 p-6 px-8 w-full max-w-md lg:max-w-2xl bg-[#51596C33] text-sm font-sans text-white flex flex-col gap-6 rounded-lg shadow-md">
        <div className="logo-container mb-3 text-center font-bold font-poppins text-lg">
          {isResetLink ? "Reset Your Password" : "Recover Your Password"}
        </div>

        <form 
          className="form flex flex-col gap-3 font-poppins" 
          onSubmit={isResetLink ? handlePasswordReset : handleSendResetEmail}
        >
          {!isResetLink && (
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="block">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-[50px] p-3 border text-sm border-opacity-80 rounded-lg mb-4 border-gray-500 focus:outline-none"
                placeholder="name@gmail.com"
              />
            </div>
          )}

          {isResetLink && (
            <>
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="block">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled // Make email read-only since we got it from the link
                  className="w-full h-[50px] p-3 border text-sm border-opacity-80 rounded-lg mb-4 border-gray-500 focus:outline-none bg-gray-700"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="newPassword" className="block">New Password *</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full h-[50px] p-3 border text-sm border-opacity-80 rounded-lg mb-4 border-gray-500 focus:outline-none"
                  placeholder="Enter new password (min 6 characters)"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="confirmPassword" className="block">Confirm Password *</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full h-[50px] p-3 border text-sm border-opacity-80 rounded-lg mb-4 border-gray-500 focus:outline-none"
                  placeholder="Confirm new password"
                />
              </div>
            </>
          )}

          {message && (
            <p className={`text-xs text-center ${
              message.includes("success") ? "text-green-400" : "text-yellow-300"
            }`}>
              {message}
            </p>
          )}

          <div className="flex flex-col items-center justify-between flex-cols lg:flex-row mb-4 gap-4 pt-3">
            <div className="lg:w-90 w-full order-2 lg:order-1">
              <button
                type="button"
                className="w-full text-white font-semibold text-sm border border-[#fcf7f8] rounded-lg p-3"
                onClick={() => (window.location.href = "/login")}
              >
                Cancel
              </button>
            </div>
            <div className="w-full pt-1 order-1 lg:order-2">
              <button
                type="submit"
                disabled={loading}
                className={`flex justify-center items-center w-full py-3 px-4 rounded-md shadow-md text-white ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                } transition duration-200 ease-in-out`}
              >
                {loading 
                  ? "Processing..." 
                  : isResetLink 
                    ? "Reset Password" 
                    : "Send Reset Email"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}