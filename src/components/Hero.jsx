import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

function Hero() {
  // Initial position
  const initialPosition = { x: 0, y: 0 };
  const [position, setPosition] = useState(initialPosition);

  return (
    <>
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gray-950 overflow-hidden">
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-moveGrid"></div>

        {/* Split Section with Globe */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-16 lg:px-32 mt-10">
          
          {/* Draggable & Spinning Globe */}
          <motion.div
            className="w-96 h-96 flex items-center justify-center cursor-pointer"
            drag
            dragConstraints={{ top: -200, left: -200, right: 200, bottom: 200 }}
            onDragEnd={() => setPosition(initialPosition)}
            animate={{ ...position, rotate: 360 }} // Keeps spinning while returning to position
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }} // Infinite rotation
          >
            <span className="text-[150px]">🌍</span>
          </motion.div>

          {/* Text Content */}
          <div className="text-center md:text-left max-w-2xl">
            <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight text-white">
              **AI Travel Planner: Smart & Personalized Trips**
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mt-4">
              Let AI design your dream vacation with custom recommendations and real-time updates.
            </p>
            <Link to={'/create-trip'}>
              <Button className="mt-4 px-8 py-3 text-lg font-semibold bg-blue-500 text-white hover:bg-cyan-500 rounded-full shadow-lg transform hover:scale-105 transition duration-300">
                Start Planning Now
              </Button>
            </Link>
          </div>

        </div>
        <motion.div 
          className="w-2/3 h-1 bg-cyan-500 rounded-full my-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        ></motion.div>
      </div>
      
    </>
  );
}

export default Hero;
