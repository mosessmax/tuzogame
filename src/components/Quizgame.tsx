'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AWPGame = () => {
  const [nickname, setNickname] = useState('');
  const [sound, setSound] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const terminalLines = [
    { text: "Initializing AWP...", delay: 0 },
    { text: "Loading wanted status...", delay: 1 },
    { text: "Establishing secure connection...", delay: 2 },
    { text: "Ready for input.", delay: 3 }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 font-mono p-6 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-100 rounded-lg shadow-lg p-8 border border-gray-300"
      >
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-bold text-gray-900 mb-8 glitch"
          data-text="#AWP"
        >
          #AWP
        </motion.h1>
        
        <div className="mb-6 h-24 overflow-hidden">
          <AnimatePresence>
            {terminalLines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: line.delay * 0.5 }}
                className="text-sm mb-1 text-gray-600"
              >
                &gt; {line.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mb-4 text-sm text-gray-800"
        >
          hey 👋, what should we call you on the leaderboard?
        </motion.p>
        
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 3, duration: 0.5 }}
          className="relative mb-6"
        >
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="enter a nickname"
            maxLength={10}
            className="w-full bg-transparent text-gray-800 border-b-2 border-gray-400 p-2 focus:outline-none focus:border-gray-600 transition-colors"
          />
          <span className="absolute right-0 bottom-2 text-gray-500 text-sm">
            {nickname.length}/15
          </span>
          {showCursor && (
            <span className="absolute top-2 left-[calc(1ch*{nickname.length}+8px)] w-2 h-5 bg-gray-400 animate-pulse" />
          )}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="flex items-center justify-between mb-6"
        >
          <span className="text-gray-700">SOUND</span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setSound(!sound)}
            className={`w-16 h-8 flex items-center ${sound ? 'bg-gray-700' : 'bg-gray-300'} rounded-full p-1 transition-colors duration-300 ease-in-out`}
          >
            <motion.div 
              layout
              className="bg-white w-6 h-6 rounded-full shadow-md"
            />
          </motion.button>
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
          className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          CONTINUE
        </motion.button>
      </motion.div>
      
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5 }}
        className="mt-8 text-sm text-gray-500"
      >
        <img src="/awp.png" alt="Awp logo" className="h-14" />
      </motion.footer>
    </div>
  );
};

export default AWPGame;