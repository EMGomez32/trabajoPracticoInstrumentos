import {Categoria} from "../service/ServiceCategoria";
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
    categoria: Categoria;
}


export const getInstrumentos = async (): Promise<Instrumentos[]> => {
    const endpoint = "http://localhost:8080/instrumentos";
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
    const endpoint = `http://localhost:8080/instrumentos/buscar/${instrumentoId}`;
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


export const cargarInstrumentos = async (datosInstrumento: Instrumentos): Promise<Instrumentos[]> => {
    const endpoint = "http://localhost:8080/instrumentos";
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        mode: "cors",
        body: JSON.stringify(datosInstrumento) // Envía los datos del instrumento al servidor
    });

    if (!response.ok) {
        throw new Error('Failed to add instrument');
    }

    return await response.json();
};