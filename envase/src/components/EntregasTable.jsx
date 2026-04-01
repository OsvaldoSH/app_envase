import "./EntregasTable.css";
import { printTicket } from "../utils/printTikets";
import { Printer } from "lucide-react";

function fmtFecha(value) {
  const d = new Date(value);
  if (window.innerWidth < 600) {
    // celular → solo fecha
    return d.toLocaleDateString("es-MX");
  }
  // computadora → fecha + hora
  return d.toLocaleString("es-MX");
}

function fmtDinero(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return value ?? "";
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
}

export default function EntregasTable({ entregas, onUpdated }) {

async function cambiarEstado(id, estado) {
  const API_URL = import.meta.env.VITE_API_DB;
  const res = await fetch(`${API_URL}/api/entregas/${id}/estado`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || `HTTP ${res.status}`);
  }

  if (onUpdated)  await onUpdated();
}

  return (
    <div className="tabla-card">
      <table className="tabla">
        <thead>
          <tr>
            <th>Creado</th>
            <th>Ruta</th>
            <th>Quién entrega</th>
            <th>Tipo</th>
            <th>Cartones</th>
            <th>Dinero</th>
            <th>Comentario</th>
            <th>Estado</th>
            <th>Tiket</th>

          </tr>
        </thead>

        <tbody>
          {entregas.map((e) => (
            <tr key={e.id}>
              <td>{fmtFecha(e.creado)}</td>
              <td>{e.ruta}</td>
              <td>{e.quien_entrega}</td>
              <td>
                <span className={`chip chip--${(e.tipo || "").toLowerCase()}`}>
                  {e.tipo}
                </span>
              </td>
              <td className="td-num">{e.cartones}</td>
              <td className="td-num">{fmtDinero(e.dinero)}</td>
              <td className="td-muted">{e.comentario ?? ""}</td>
              <td>
                {(() => {
                  const estado = (e.estado ?? "").trim().toUpperCase();

                  if (estado === "ACTIVO") {
                    return (
                      <button
                        type="button"
                        className="btn-estado"
                        onClick={() => cambiarEstado(e.id, "DEVUELTO")}
                        title="Marcar como DEVUELTO"
                      >
                        Activo
                      </button>
                    );
                  }
                  return (
                    <span className={`estado estado-${estado.toLowerCase()}`}>
                      {estado}
                    </span>
                  );
                })()}
              </td>
              <td>
                <button
                className="btn-imprimir"
                  type="button"
                  onClick={() => printTicket(e, { paperMm: 58 })}>
                  <Printer size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}