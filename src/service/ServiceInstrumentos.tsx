export interface Instrumentos{
    id?: number;
    instrumento: string;
    marca: string;
    modelo: string;
    imagen: string;
    precio: number;
    costoEnvio: string;
    cantidadVendida: number;
    descripcion: string;
}

export const getInstrumentos = async (): Promise<Instrumentos[]> => {
    const endpoint = "http://localhost:8080/Instrumentos";
    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        mode: "cors",
    });
    console.log(response);
    return await response.json();
};

export const buscarInstrumentoXId = async (instrumentoId: string | number): Promise<Instrumentos> => {
    const endpoint = `http://localhost:8080/Instrumentos/buscar/${instrumentoId}`;
    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        mode: "cors",
    });
    if (!response.ok) {
      throw new Error('Failed to fetch instrumento');
    }
    return await response.json();
};