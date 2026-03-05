import { useEffect, useState } from "react";
import EntregaForm from "./components/EntregaForm";
import EntregasTable from "./components/EntregasTable";
import { getEntregas } from "./services/services.js";

function App() {
  const [entregas, setEntregas] = useState([])
  const [loading, setLoading] = useState(false)

  async function loadEntregas() {
    setLoading(true)
    const data = await getEntregas()
    setEntregas(data)
    setLoading(false)
  }

  useEffect(() => {
    loadEntregas()
  }, [])

  return (
    <div className="app">
      <EntregaForm onCreated={loadEntregas}/>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <EntregasTable entregas={entregas}/>
      )}
    </div>
  )
}

export default App