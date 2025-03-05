import React from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

const About = () => {
  return (
    <>
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-6 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-moveGrid"></div>
        
        {/* Cursor Animation */}
        <motion.div 
          className="absolute w-10 h-10 bg-cyan-500 rounded-full opacity-50 pointer-events-none"
          animate={{ x: "var(--x)", y: "var(--y)" }}
          transition={{ type: "spring", stiffness: 100 }}
        />

        <h1 className="text-5xl font-bold neon-text">🌌 About AI Trip Planner</h1>
        <p className="text-lg text-gray-400 mt-3 text-center max-w-3xl">
          Imagine a world where your trips are crafted effortlessly, uniquely tailored to your preferences. AI Trip Planner is your personal travel assistant, using advanced algorithms and real-time data to create the perfect journey for you.
        </p>

        {/* AI Animation Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-10 w-full max-w-3xl bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-lg shadow-lg backdrop-blur-lg relative overflow-hidden"
        >
          {/* Floating Particles */}
          <div className="absolute inset-0 bg-stars-pattern opacity-20 animate-float"></div>
          
          <h2 className="text-2xl font-bold text-black">🚀 How It Works</h2>
          <p className="text-black mt-2">
            🔹 Enter your travel preferences and destinations.<br />
            🔹 AI analyzes millions of data points to generate a personalized itinerary.<br />
            🔹 Receive real-time updates, AI-powered suggestions, and seamless navigation.<br />
            🔹 Explore the world stress-free, with AI making every moment special.
          </p>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.2 }} 
          className="mt-10 w-full max-w-3xl p-6 rounded-lg shadow-lg bg-gray-800 bg-opacity-80 backdrop-blur-md"
        >
          <h2 className="text-2xl font-bold text-cyan-300">💡 Why Choose AI Trip Planner?</h2>
          <p className="text-gray-300 mt-3">
            ✨ Smart AI-driven personalization for every traveler.<br />
            ✨ Real-time updates for flight changes, weather alerts, and local recommendations.<br />
            ✨ Cost-efficient travel planning with AI-based budget optimization.<br />
            ✨ An immersive futuristic experience with an intuitive, sleek, and engaging UI.
          </p>
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

export default About;
