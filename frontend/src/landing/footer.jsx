import React from 'react';
import { FaGithub, FaDiscord, FaFacebook, FaTwitter } from 'react-icons/fa'; 

export default function Footer() {
    const currentYear = new Date().getFullYear(); 

    return (
        <footer className="border-gray-400 bg-black border-t text-white text-center py-10">
            <p className="text-sm text-white">
                &copy; {currentYear} Code &lt;30&gt;. All rights reserved.
            </p>
            <div className="hidden md:flex justify-center gap-4 mt-4">
                <FaGithub className="text-xl" />
                <FaDiscord className="text-xl" />
                <FaFacebook className="text-xl" />
                <FaTwitter className="text-xl" />
            </div>
        </footer>
    );
}