import React, { useState } from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-6 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-moveGrid"></div>
        
        {/* Cursor Effect */}
        <motion.div 
          className="absolute inset-0 pointer-events-none" 
          animate={{ x: [0, 10, -10, 0], y: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        ></motion.div>
        
        <h1 className="text-5xl font-extrabold neon-text text-center">📩 Contact AI Trip Planner</h1>
        <p className="text-lg text-gray-300 mt-3 text-center max-w-3xl">
          Have questions? Our AI is here to help! Send us a message and get instant assistance.
        </p>

        {/* Contact Form */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mt-6 w-full max-w-lg bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-md shadow-lg border border-cyan-500"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 mb-4 bg-transparent border border-cyan-500 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 bg-transparent border border-cyan-500 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 mb-4 bg-transparent border border-cyan-500 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <button className="w-full p-3 bg-blue-500 hover:bg-cyan-500 rounded-md transition-transform transform hover:scale-105">
            Send Message
          </button>
        </motion.div>
        <motion.div 
          className="w-2/3 h-1 bg-cyan-500 rounded-full my-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        ></motion.div>
      </div>
    </>
  );
};

export default Contact;
