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
        @page {
          size: ${paperMm}mm auto;
          margin: 3mm;
        }

        html, body {
          width: ${paperMm}mm;
          margin: 0;
          padding: 0;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 13px;
          font-weight: 700;
          color: #000;
          background: #fff;
        }

        .ticket {
          padding: 2mm;
        }

        .center {
          text-align: center;
        }

        .row {
          display: flex;
          justify-content: space-between;
          gap: 8px;
        }

        .muted {
          opacity: 0.9;
        }

        .hr {
          border-top: 1px dashed #000;
          margin: 6px 0;
        }

        .big {
          font-size: 15px;
          font-weight: 900;
        }

        .logo {
          width: 55px;
          display: block;
          margin: 0 auto 6px auto;
          margin-bottom: 6px;
        }

        .firma {
          margin-top: 10px;
          text-align: center;
        }

        @media print {
          .no-print {
            display: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="ticket">
        <div>
          <p></p>
        </div>

        <div class="center big">Distribuidora de Cerveza Zacapoaxtla</div>
        <div class="center">
          <svg class="logo" viewBox="0 0 512 512" width="60">
            <g fill="none" stroke="#000" stroke-width="12" stroke-linecap="round" stroke-linejoin="round">
              <!-- Caja -->
              <rect x="60" y="200" width="390" height="180" rx="20"/>
              
              <!-- Botellas -->
              <path d="M140 120 v80 M140 120 c0-20 30-20 30 0 v80"/>
              <path d="M220 120 v80 M220 120 c0-20 30-20 30 0 v80"/>
              <path d="M300 120 v80 M300 120 c0-20 30-20 30 0 v80"/>
              <path d="M380 120 v80 M380 120 c0-20 30-20 30 0 v80"/>
              
              <!-- Tapa caja -->
              <polyline points="60,200 100,160 200,160"/>
              <polyline points="450,200 410,160 310,160"/>
            </g>
          </svg>
        </div>
        <div class="center big">ENVASE</div>
        <p></p>
        <div class="center muted">Ticket de entrega de efectivo</div>

        <div class="hr"></div>

        <div class="row">
          <span><b>Fecha:</b></span>
          <span><b>${safe(fecha)}</b></span>
        </div>

        <p></p>

        <div class="row">
          <span><b>Ruta:</b></span>
          <span><b>${safe(entrega?.ruta)}</b></span>
        </div>

        <p></p>

        <div class="row">
          <span><b>Entrega:</b></span>
          <span><b>${safe(entrega?.quien_entrega)}</b></span>
        </div>

        <div class="hr"></div>

        <div class="row">
          <span><b>Tipo:</b></span>
          <span><b>${safe(entrega?.tipo)}</b></span>
        </div>

        <p></p>

        <div class="row">
          <span><b>Cartones:</b></span>
          <span><b>${safe(entrega?.cartones)}</b></span>
        </div>

        <p></p>

        <div class="row">
          <span><b>Efectivo:</b></span>
          <span><b>${safe(dineroTxt)}</b></span>
        </div>

        <p></p>

        <div class="row">
          <span><b>Estado:</b></span>
          <span><b>${safe(entrega?.estado)}</b></span>
        </div>

        ${
          entrega?.comentario
            ? `
        <div class="hr"></div>
        <div>
          <b>Comentario:</b> ${safe(entrega.comentario)}
        </div>`
            : ""
        }

        <div class="hr"></div>

        <div class="firma">
          <div><b>Firma</b></div>
          <p></p>
          <div>_______________________</div>
        </div>

        <div class="hr"></div>
      </div>

      <script>
        const logo = document.getElementById("logo");

        function imprimir() {
          setTimeout(() => {
            window.print();
          }, 1200);
        }

        if (logo && !logo.complete) {
          logo.onload = imprimir;
          logo.onerror = imprimir;
        } else {
          window.onload = imprimir;
        }
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