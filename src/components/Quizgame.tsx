'use client'

import React, { useState } from 'react'

export default function QuizGame() {
  const [name, setName] = useState('')
  const [sound, setSound] = useState(true)

  const handleContinue = () => {
    // TODO: Implement game start logic
    console.log('Starting game for', name)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full text-white font-sans">
      <h1 className="text-4xl font-bold text-[#c262c2] mb-8">#TUZO AWP</h1>
      <p className="mb-4">Hey 👋, welcome back</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="w-48 p-2 mb-4 bg-[#2c2c2c] border border-[#ff00ff] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff00ff]"
      />
      <div className="flex items-center mb-4">
        <span className="mr-2">SOUND</span>
        <button
          onClick={() => setSound(!sound)}
          className={`w-12 h-6 flex items-center ${sound ? 'bg-[#ff00ff]' : 'bg-gray-600'} rounded-full p-1 duration-300 ease-in-out`}
        >
          <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${sound ? 'translate-x-6' : ''}`} />
        </button>
      </div>
      <button
        onClick={handleContinue}
        className="px-6 py-2 bg-[#ff00ff] text-white rounded hover:bg-[#cc00cc] focus:outline-none focus:ring-2 focus:ring-[#ff00ff] focus:ring-opacity-50"
      >
        CONTINUE
      </button>
    </div>
  )
}