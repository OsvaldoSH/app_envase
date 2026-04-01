import pool from "../connection_db.js"

export const getReporte = async (req, res) => {
    let { fechaInicio, fechaFin, tipo, estado, ruta} = req.query;
    

    if (!fechaInicio || !fechaFin) {
        const hoy = new Date();

        const primerDia = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
        const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);

        const format = (d) => d.toISOString().split("T")[0];

        fechaInicio = format(primerDia);
        fechaFin = format(ultimoDia);
    }

    if (!["ventas", "importes", "ambos"].includes(tipo)) {
        return res.status(400).json({ error: "Tipo de reporte no valido"});
    } 

    try {
        let query = `
            select * 
            from entregas
            where creado >= ? and creado < date_add(?, interval 1 day)
        `;

        let params = [fechaInicio, fechaFin];

        if (tipo == "ventas") {
            query += `and tipo = ?`;
            params.push("VENTA");
        }

        if (tipo == "importes") {
            query += ` and tipo = ?`;
            params.push("IMPORTE");
        }
        
        if (estado && estado !=="todos") {
            query += ` and estado = ?`;
            params.push(estado);
        }

        if (ruta && ruta !== "todas") {
            query += `and ruta = ?`;
            params.push(ruta); 
        }

        query += `order by creado ASC`;

        const rows = await pool.query(query, params);

        const totales = {
            dinero: 0,
            cartones: 0,
            cantidad: rows.length
        };
        for (const row of rows) {
            totales.dinero += Number(row.dinero) || 0;
            totales.cartones += Number(row.cartones) || 0;
        }
        res.json({
            registros: rows,
            totales
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el reporte"});
    }
};
