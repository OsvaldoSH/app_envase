import "./EntregasTable.css";

function fmtFecha(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString("es-MX");
}

function fmtDinero(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return value ?? "";
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
}

export default function EntregasTable({ entregas }) {
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}