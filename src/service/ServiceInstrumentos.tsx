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
    eliminado?: boolean;
}


export const getInstrumentos = async (): Promise<Instrumentos[]> => {
    const endpoint = "http://localhost:8080/instrumentos/mostrarLista";
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
    const endpoint = `http://localhost:8080/instrumentos/mostrar/${instrumentoId}`;
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


export const cargarInstrumentos = async (formData: FormData): Promise<Instrumentos[]> => {
    const endpoint = "http://localhost:8080/instrumentos/crearInstrumentos";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data", // No necesitas establecer esto; el navegador lo hace automáticamente.
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
      body: formData // Envía el FormData que incluye los datos y la imagen
    });
  
    if (!response.ok) {
      throw new Error('Failed to add instrument');
    }
  
    return await response.json();
  };



  export const actualizarInstrumento = async (id: string, formData: FormData): Promise<Instrumentos[]> => {
    const endpoint = `http://localhost:8080/instrumentos/actualizar/${id}`;
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
      body: formData // Envía el FormData que incluye los datos y la imagen
    });
  
    if (!response.ok) {
      throw new Error('Failed to update instrument');
    }
  
    return await response.json();
  };

 
 
  export const activarInstrumento = async (id: string): Promise<any> => {
    const endpoint = `http://localhost:8080/instrumentos/estado/${id}`;
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
    });
  
    if (!response.ok) {
      throw new Error('Failed to activate instrument');
    }
  
    return await response.json();
  };