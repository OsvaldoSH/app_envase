export async function getReporte({ fechaInicio, fechaFin, tipo, estado, ruta }){
    const API_URL = import.meta.env.VITE_API_DB;

    const params = new URLSearchParams({
        fechaInicio,
        fechaFin,
        tipo,
        estado,
        ruta
    });

    const res = await fetch(`${API_URL}/api/reportes?${params}`);

    if (!res.ok) {
        const errorText = await res.text();
        console.error(errorText);
        throw new Error("Error obteniedo reporte");
    }

    return res.json();
}