export async function getEntregas() {
    const API_URL = import.meta.env.VITE_API_DB;
    const res = await fetch(`${API_URL}/api/entregas`);

    if (!res.ok) {
        const errorText = await res.text();
        console.error(errorText);
        throw new Error("Error obteniendo registros");
    }

    return res.json();
}