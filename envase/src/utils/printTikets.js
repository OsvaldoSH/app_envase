export function printTicket(entrega, { paperMm = 58 } = {}) {

  const created = entrega?.creado ? new Date(entrega.creado) : null;
  const fecha = created && !Number.isNaN(created.getTime())
    ? created.toLocaleDateString("es-MX")
    : (entrega?.creado ?? "");

  const dinero = Number(entrega?.dinero);
  const dineroTxt = Number.isFinite(dinero)
    ? dinero.toLocaleString("es-MX", { style: "currency", currency: "MXN" })
    : (entrega?.dinero ?? "");

  const safe = (v) => (v ?? "").toString();

  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Ticket</title>
  <style>
    /* Cambia 58 por 80 si tu rollo es 80mm */
    @page { size: ${paperMm}mm auto; margin: 3mm; }

    html, body {
      width: ${paperMm}mm;
      margin: 0;
      padding: 0;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 12px;
      color: #000;
      background: #fff;
    }

    .ticket { padding: 2mm; }
    .center { text-align: center; }
    .row { display: flex; justify-content: space-between; gap: 8px; }
    .muted { opacity: 0.85; }
    .hr { border-top: 1px dashed #000; margin: 6px 0; }
    .big { font-size: 14px; font-weight: 700; }

    /* No imprimir botones si algún día agregas */
    @media print { .no-print { display: none; } }
  </style>
</head>
<body>
  <div class="ticket">
    <div class="center big">Distribuidora de Cerveza Zacapoaxtla</div>
    <p></p>
    <div class="center big">ENVASE</div>
    <div class="center muted">Ticket de entrega de efectivo</div>

    <div class="hr"></div>

    <div class="row"><span><b>Fecha</b>:</span><span>${safe(fecha)}</span></div>
    <p></p>
    <div class="row"><span><b>Ruta:</b></span><span>${safe(entrega?.ruta)}</span></div>
    <p></p>
    <div class="row"><span><b>Entrega:</b></span><span>${safe(entrega?.quien_entrega)}</span></div>

    <div class="hr"></div>

    <div class="row"><span><b>Tipo:</b></span><span>${safe(entrega?.tipo)}</span></div>
    <p></p>
    <div class="row"><span><b>Cartones:</b></span><span>${safe(entrega?.cartones)}</span></div>
    <p></p>
    <div class="row"><span><b>Efectivo:</b></span><span>${safe(dineroTxt)}</span></div>
    <p></p>
    <div class="row"><span><b>Estado:</b></span><span>${safe(entrega?.estado)}</span></div>
    <p></p>
    ${entrega?.comentario ? `<div class="hr"></div><div><b>Comentario:</b> ${safe(entrega.comentario)}</div>` : ""}

    <div class="hr"></div>
    <p></p>
    <div class="center">Firma</div>
    <p></p>
    <div class="center">_______________________</div>
    <p></p>
    <div class="hr"></div>

  </div>

  <script>
    // Espera un momento para que renderice y luego imprime
    window.onload = () => {
      setTimeout(() => window.print(), 200);
    };
  </script>
</body>
</html>`;

  const w = window.open("", "_blank");
  if (!w) {
    alert("No se pudo abrir la ventana de impresión. Revisa si el navegador bloquea popups.");
    return;
  }
  w.document.open();
  w.document.write(html);
  w.document.close();
}