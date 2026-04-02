import { useState } from "react";
import { getReporte } from "../services/reportes.js";
import EntregasTable from "./EntregasTable.jsx";
import "./Reporte.css"

function fmtDinero(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return value ?? "";
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
}

export default function Reporte() {
    const [form, setForm] = useState({
        fechaInicio: "",
        fechaFin: "",
        tipo: "ambos",
        estado: "todos",
        ruta: "todas"
    });

    const [registros, setRegistros] = useState([]);
    const [totales, setTotales] = useState({
        dinero: 0,
        cartones: 0,
        cantidad: 0
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const data = await getReporte(form);
            setRegistros(data.registros);
            setTotales(data.totales);
        } catch (err) {
            console.error(err);
            setError("Error al obtener el reporte");
        } finally {
            setLoading(false);
        }
    };

    function getMesActual() {
        const hoy = new Date();

        const primerDia = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
        const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);

        const format = (d) => {
            const anio = d.getFullYear();
            const mes = String(d.getMonth() + 1).padStart(2, "0");
            const dia = String(d.getDate()).padStart(2, "0");
            return `${anio}-${mes}-${dia}`;
        };

        return {
            inicio: format(primerDia),
            fin: format(ultimoDia)
        };
    }
    const fechas = getMesActual();
    return (
        <div className="reporte-wrapper">
            <div className="reporte-card">
            <h1>Reporte</h1>
            <p className="reporte-subtitle">Consulta e impresión de reportes</p>

            <form className="reporte-form" onSubmit={handleSubmit}>
                <div className="reporte-grid">
                <div className="reporte-field">
                    <label>Fecha inicio</label>
                    <input
                    type="date"
                    name="fechaInicio"
                    value={form.fechaInicio}
                    onChange={handleChange}
                    />
                </div>

                <div className="reporte-field">
                    <label>Fecha fin</label>
                    <input
                    type="date"
                    name="fechaFin"
                    value={form.fechaFin}
                    onChange={handleChange}
                    />
                </div>

                <div className="reporte-field">
                    <label>Tipo</label>
                    <select
                    name="tipo"
                    value={form.tipo}
                    onChange={handleChange}
                    >
                    <option value="ambos">Todo</option>
                    <option value="ventas">Ventas</option>
                    <option value="importes">Importes</option>
                    </select>
                </div>

                <div className="reporte-field">
                    <label>Estado</label>
                    <select
                    name="estado"
                    value={form.estado}
                    onChange={handleChange}
                    >
                    <option value="todos">Todos</option>
                    <option value="ACTIVO">Activos</option>
                    <option value="DEVUELTO">Devueltos</option>
                    </select>
                </div>

                <div className="reporte-field">
                    <label>Ruta</label>
                    <select
                    name="ruta"
                    value={form.ruta}
                    onChange={handleChange}
                    >
                    <option value="todas">Todas</option>
                    <option value="Ruta 01">Ruta 01</option>
                    <option value="Ruta 02">Ruta 02</option>
                    <option value="Ruta 03">Ruta 03</option>
                    <option value="Ruta 04">Ruta 04</option>
                    <option value="Ruta 05">Ruta 05</option>
                    <option value="Mostrador">Mostrador</option>
                    </select>
                </div>
                </div>

                <div className="reporte-actions">
                <button className="reporte-button" type="submit">
                    Buscar
                </button>

                <button
                    className="reporte-button-secondary"
                    type="button"
                    onClick={() => window.print()}
                >
                    Imprimir reporte
                </button>
                </div>
            </form>

            {loading && <p className="reporte-loading">Cargando...</p>}
            {error && <p className="reporte-error">{error}</p>}

            <div className="reporte-resumen">
                <p>
                    <strong>Fecha inicio:</strong>{" "}
                    {form.fechaInicio || fechas.inicio}
                </p>
                <p>
                    <strong>Fecha fin:</strong>{" "}
                    {form.fechaFin || fechas.fin}
                </p>
                <p><strong>Tipo:</strong> {form.tipo}</p>
                <p><strong>Estado:</strong> {form.estado}</p>
                <p><strong>Ruta:</strong> {form.ruta}</p>
            </div>

            <div className="reporte-totales">
                <h2>Totales</h2>

                <div className="reporte-totales-grid">
                <div className="reporte-total-item">
                    <span className="reporte-total-label">Efectivo Total</span>
                    <span className="reporte-total-value">{fmtDinero(totales.dinero)}</span>
                </div>

                <div className="reporte-total-item">
                    <span className="reporte-total-label">Total cartones</span>
                    <span className="reporte-total-value">{totales.cartones}</span>
                </div>

                <div className="reporte-total-item">
                    <span className="reporte-total-label">Total registros</span>
                    <span className="reporte-total-value">{totales.cantidad}</span>
                </div>
                </div>
            </div>

            <div className="reporte-tabla">
                <EntregasTable entregas={registros} modo="reporte" />
            </div>
            </div>
        </div>
    );
}
