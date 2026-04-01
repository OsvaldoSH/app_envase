import { useEffect, useState } from "react";
import EntregaForm from "./components/EntregaForm";
import EntregasTable from "./components/EntregasTable";
import { getEntregas } from "./services/services.js";
import Reporte from "./components/Reporte.jsx";
import "./App.css"

function App() {
  const [entregas, setEntregas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vista, setVista] = useState("entregas");

  async function loadEntregas() {
    setLoading(true);
    try {
      const data = await getEntregas();
      setEntregas(data);
    } catch (error) {
      console.error("Error cargando entregas:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEntregas();
  }, []);

  return (
    <div className="app">
      <div className="nav-buttons">
        <button
          className={`nav-button ${vista === "entregas" ? "active" : ""}`}
          onClick={() => setVista("entregas")}
        >
          Entregas
        </button>

        <button
          className={`nav-button ${vista === "reporte" ? "active secondary" : ""}`}
          onClick={() => setVista("reporte")}
        >
          Reporte
        </button>
      </div>

      {vista === "entregas" && (
        <>
          <EntregaForm onCreated={loadEntregas} />

          {loading ? (
            <p>Cargando...</p>
          ) : (
            <EntregasTable entregas={entregas} onUpdated={loadEntregas} />
          )}
        </>
      )}

      {vista === "reporte" && <Reporte />}
    </div>
  );
}

export default App;