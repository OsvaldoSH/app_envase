import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [entregas, setEntregas] = useState([])

  useEffect(() => {
    fetch("/api/entregas")
    .then(res => res.json())
    .then(data => setEntregas(data))
  },[])

  return (
  <div>
    <h1>Entregas</h1>

    {entregas.map(e => (
      <div key={e.id}>
        Ruta {e.ruta} - ${e.dinero}
      </div>
    ))}

  </div>
  )
}

export default App
