import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
   return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center">
      
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 
                      p-10 rounded-3xl shadow-2xl w-96 text-center space-y-6">

        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r 
                       from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Envace
        </h1>

        <p className="text-slate-400">
          Interfaz moderna sin IDE pesado wey
        </p>

        <button className="w-full bg-blue-600 hover:bg-blue-500 
                           active:scale-95 transition-all duration-200 
                           p-3 rounded-xl font-semibold shadow-lg">
          Comenzar
        </button>

      </div>

    </div>
  )
}

export default App
