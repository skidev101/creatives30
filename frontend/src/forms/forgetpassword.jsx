/* eslint-disable no-unused-vars */
import { useState } from "react";
import { sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth";
import { auth } from "../firebase"; 


export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [newPassword, setNewPassword] = useState(""); // New password state

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Reset any previous messages

    try {
      //
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Please check your inbox.");

      const updatedProfile = {
        password: newPassword, 
        email: email, 
      };

      // Update the password on the backend
      const response = await fetch('https://xen4-backend.vercel.app/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });

      const responseData = await response.json();

      if (response.ok) {
        setMessage("Password updated successfully.");
      } else {
        setMessage(responseData.message || "Failed to update password.");
      }
    } catch (error) {
      setMessage("Error sending password reset email: " + error.message);
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

        <form className="form flex flex-col gap-3 font-poppins" onSubmit={handleReset}>
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

          <div className="flex flex-col gap-1">
            <label htmlFor="newPassword" className="block">New Password *</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full h-[50px] p-3 border text-sm border-opacity-80 rounded-lg mb-4 border-gray-500 focus:outline-none"
              placeholder="Enter new password"
            />
          </div>

          {message && <p className="text-xs text-center text-yellow-300">{message}</p>}

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
                className={`flex justify-center items-center w-full py-3 px-4 rounded-md shadow-md text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} transition duration-200 ease-in-out`}
              >
                {loading ? "Sending..." : "Recover My Password"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
