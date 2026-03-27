import { useState } from "react";
import "./EntregaFormulario.css";

const initial = {
  ruta: "",
  quien_entrega: "",
  dinero: "",
  cartones: "",
  tipo: "",
  comentario: "",
};

export default function EntregaForm({ onCreated }) {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const setField = (name, value) => setForm((p) => ({ ...p, [name]: value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setOk("");

    if (!form.ruta.trim()) return setError("Falta el campo Ruta.");
    if (!form.quien_entrega.trim()) return setError("Falta campo quién entrega.");
    if (!form.tipo.trim()) return setError("Falta el tipo de entrega.");

    const dineroNum = Number(form.dinero);
    const cartonesNum = Number(form.cartones);

    if (!Number.isFinite(dineroNum) || dineroNum < 0) {
      return setError("Dinero inválido, no se permiten números negativos.");
    }

    // Si quieres permitir 0 cartones, cambia < 1 por < 0
    if (!Number.isInteger(cartonesNum) || cartonesNum < 1) {
      return setError("La cantidad de cartones debe ser un entero mayor o igual a 1.");
    }

    setLoading(true);
    try {
      const res = await fetch("/api/entregas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ruta: form.ruta.trim(),
          quien_entrega: form.quien_entrega.trim(),
          dinero: dineroNum,
          cartones: cartonesNum,
          tipo: form.tipo.trim(),
          comentario: form.comentario.trim() || null,
        }),
      });

      const text = await res.text();
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {}

      if (!res.ok) {
        throw new Error(data?.message || data?.error || `Error HTTP ${res.status}`);
      }

      setOk("Entrega registrada.");
      setForm(initial);
      onCreated?.(data);
    } catch (err) {
      setError(err?.message || "Error al registrar la entrega.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="entrega-form-wrapper">
      <form className="entrega-form" onSubmit={handleSubmit}>
        <h2>Registrar entrega</h2>
        <p className="entrega-subtitle">Registra las entregas de envases y dinero.</p>

        <div className="entrega-section">
          <div className="entrega-section-title">Información de entrega</div>

          <div className="entrega-grid">

            <div className="entrega-field">
              <label>Ruta</label>
              <select
                value={form.ruta}
                onChange={(e) => setField("ruta", e.target.value)}
              >
                <option value="">Seleccionar</option>
                <option value="Ruta 01">Ruta 01</option>
                <option value="Ruta 02">Ruta 02</option>
                <option value="Ruta 03">Ruta 03</option>
                <option value="Ruta 04">Ruta 04</option>
                <option value="Ruta 05">Ruta 05</option>
              </select>
            </div>

            <div className="entrega-field">
              <label>Quién entrega</label>
              <input
                value={form.quien_entrega}
                onChange={(e) => setField("quien_entrega", e.target.value)}
              />
            </div>

            <div className="entrega-field">
              <label>Cantidad $</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.dinero}
                onChange={(e) => setField("dinero", e.target.value)}
              />
            </div>

            <div className="entrega-field">
              <label>Cartones</label>
              <input
                type="number"
                step="1"
                min="1"
                value={form.cartones}
                onChange={(e) => setField("cartones", e.target.value)}
              />
            </div>

            <div className="entrega-field">
              <label>Tipo</label>
              <select
                value={form.tipo}
                onChange={(e) => setField("tipo", e.target.value)}
              >
                <option value="">Seleccionar</option>
                <option value="VENTA">Venta</option>
                <option value="IMPORTE">Importe</option>
                <option value="FALTANTE">Faltante</option>
              </select>
            </div>

            <div className="entrega-field">
              <label>Comentario</label>
              <input
                value={form.comentario}
                onChange={(e) => setField("comentario", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="entrega-actions">
          <button className="entrega-button" type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </button>

          {error && <span className="entrega-error">{error}</span>}
          {ok && <span className="entrega-ok">{ok}</span>}
        </div>
      </form>
    </div>
  );
}