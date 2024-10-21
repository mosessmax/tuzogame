'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const AWPGame = () => {
  const [nickname, setNickname] = useState('');
  const [sound, setSound] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [gameState, setGameState] = useState('setup'); // 'setup', 'playing', 'end'
  interface Question {
    question: string;
    answer: string;
  }

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


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

  useEffect(() => {
    if (gameState === 'playing') {
      fetchQuestions();
    }
  }, [gameState]);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/questions');
      if (!response.ok) throw new Error('failed to fetch questions');
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('error fetching questions:', error);
      toast.error('error fetching questions. Please try again later.');
      setError('failed to load questions.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartGame = () => {
    if (nickname.trim()) {
      setGameState('playing');
    } else {
      toast.error('Please enter a nickname to start.');
    }
  };

  const handleAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswer('');
    } else {
      setGameState('end');
    }
  };

  const renderSetup = () => (
    <>
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
          maxLength={15}
          className="w-full bg-transparent text-gray-800 border-b-2 border-gray-400 p-2 focus:outline-none focus:border-gray-600 transition-colors"
        />
        <span className="absolute right-0 bottom-2 text-gray-500 text-sm">
          {nickname.length}/15
        </span>
        {showCursor && (
          <span
            className="absolute top-2 bg-gray-400 animate-pulse"
            style={{
              left: `calc(${nickname.length}ch + 8px)`,
              width: '2px',
              height: '1em',
            }}
          />
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
        onClick={handleStartGame}
        className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
      >
        CONTINUE
      </motion.button>
    </>
  );

  const renderPlaying = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <h2 className="text-xl mb-4">Question {currentQuestionIndex + 1}/{questions.length}</h2>
      <p className="mb-4">{questions[currentQuestionIndex]?.question}</p>
      <div className="relative mb-6">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Your answer"
          className="w-full bg-transparent text-gray-800 border-b-2 border-gray-400 p-2 focus:outline-none focus:border-gray-600 transition-colors"
        />
        {showCursor && (
          <span
            className="absolute top-2 bg-gray-400 animate-pulse"
            style={{
              left: `calc(${answer.length}ch + 8px)`,
              width: '2px',
              height: '1em',
            }}
          />
        )}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAnswer}
        className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
      >
        SUBMIT
      </motion.button>
    </motion.div>
  );
  const renderEnd = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center"
    >
      <h2 className="text-2xl mb-4">Game Over, {nickname}!</h2>
      <p className="text-xl mb-4">Your score: {score}/{questions.length}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setGameState('setup')}
        className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
      >
        PLAY AGAIN
      </motion.button>
    </motion.div>
  );

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
        
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              Loading...
            </motion.div>
          )}
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-red-500 text-center mb-4"
            >
              {error}
            </motion.div>
          )}
          {!loading && !error && (
            <motion.div
              key={gameState}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {gameState === 'setup' && renderSetup()}
              {gameState === 'playing' && renderPlaying()}
              {gameState === 'end' && renderEnd()}
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5 }}
          className="mt-8 text-sm text-gray-500"
        >
          <img src="/awp.png" alt="Awp logo" className="h-14" />
        </motion.footer>
      </motion.div>
    </div>
  );
};

export default AWPGame;