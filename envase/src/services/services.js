export async function getEntregas() {
    const res = await fetch("/api/entregas")

    if (!res.ok) {
        throw new Error("Error obteniendo registros")
    }

    return res.json()
}