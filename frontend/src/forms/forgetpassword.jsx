import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase"; 

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", isError: false });

//   const handleSendResetEmail = async (e) => {
//     e.preventDefault();
//     if (!email) {
//       setMessage("Please enter your email");
//       return;
//     }
    
//     setLoading(true);
//     setMessage("");
  
//     try {
//       await sendPasswordResetEmail(auth, email);
//       setMessage("Password reset email sent. Please check your inbox (and spam folder).");
//     } catch (error) {
//       let errorMessage = "Error sending password reset email: ";
//       switch (error.code) {
//         case "auth/user-not-found":
//           errorMessage += "No user found with this email address.";
//           break;
//         case "auth/invalid-email":
//           errorMessage += "The email address is invalid.";
//           break;
//         case "auth/too-many-requests":
//           errorMessage += "Too many requests. Try again later.";
//           break;
//         default:
//           errorMessage += error.message;
//       }
//       setMessage(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };



const handleSendResetEmail = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!email) {
      setMessage({ text: "Please enter your email", isError: true });
      return;
    }

    setLoading(true);
    setMessage({ text: "", isError: false });

    const actionCodeSettings = {
      url: `${window.location.origin}/login`, // Redirect to your login page
      handleCodeInApp: false,
    };

    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      setMessage({ 
        text: "Password reset email sent. Please check your inbox (and spam folder).", 
        isError: false 
      });
    } catch (error) {
      let errorMessage;
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email address.";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many attempts. Please try again later.";
          break;
        default:
          errorMessage = "Failed to send reset email. Please try again.";
      }
      setMessage({ text: errorMessage, isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-black min-h-screen flex justify-center items-center pt-10 pb-10 font-poppins p-4">
      <div className="form-container lg:p-8 p-6 px-8 w-full max-w-md lg:max-w-2xl bg-[#51596C33] text-sm font-sans text-white flex flex-col gap-6 rounded-lg shadow-md">
        <div className="logo-container mb-3 text-center font-bold font-poppins text-lg">
          Recover Your Password
        </div>

        <form 
          className="form flex flex-col gap-3 font-poppins" 
          onSubmit={handleSendResetEmail}
        >
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

          {message.text && (
            <p className={`text-center ${message.isError ? "text-yellow-300" : "text-green-400"}`}>
              {message.text}
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
                {loading ? "Processing..." : "Send Reset Email"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}