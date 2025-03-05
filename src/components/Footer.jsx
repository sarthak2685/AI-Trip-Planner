import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../assets/logo.png"; // Adjust the path if needed

const Footer = () => {
  return (
    <motion.footer
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full py-10 bg-black text-white flex flex-col items-center"
    >
      {/* Logo Section */}
      <div className="flex flex-col items-center mb-4">
        <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg shadow-lg">
          <img src={logo} alt="AI Trip Planner Logo" className="h-14" />
        </div>
        <h2 className="text-xl font-bold mt-2 neon-text">AI Trip Planner</h2>
        <p className="text-sm text-gray-400">Your futuristic travel assistant</p>
      </div>

      {/* Social Icons */}
      <div className="flex gap-6 mt-4">
        <FaFacebook className="text-2xl text-cyan-400 hover:text-white transition duration-300 cursor-pointer transform hover:scale-110" />
        <FaTwitter className="text-2xl text-cyan-400 hover:text-white transition duration-300 cursor-pointer transform hover:scale-110" />
        <FaInstagram className="text-2xl text-cyan-400 hover:text-white transition duration-300 cursor-pointer transform hover:scale-110" />
      </div>

      {/* Copyright Section */}
      <p className="text-xs text-gray-500 mt-6">
        © 2025 AI Trip Planner. All rights reserved.
      </p>
    </motion.footer>
  );
};

export default Footer;
