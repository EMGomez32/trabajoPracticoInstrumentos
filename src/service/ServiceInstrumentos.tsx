
import  Instrumentos  from "../entidades/Instrumento";


export async function getInstrumentos () {
    const endpoint = "http://localhost:8080/instrumentos/mostrarTodo";
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


  export async function getInstrumentoXIdFetch(id: number) {
    const urlServer = "http://localhost:8080/instrumentos/mostrar/" + id;
    const response = await fetch(urlServer, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
    });
    return (await response.json()) as Instrumentos;
  }
  export async function saveInstrumento(instrumento?: Instrumentos) {
    let urlServer = "http://localhost:8080/instrumentos/crearInstrumentos";
    let method: string = "POST";
    if (
       instrumento && instrumento.id > 0) {
       urlServer =
         "http://localhost:8080/instrumentos/actualizar/" + instrumento.id;
       method = "PUT";
     }
    await fetch(urlServer, {
      method: method,
      body: JSON.stringify(instrumento),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  export async function getInstrumentoJSONFetch(): Promise<Instrumentos[]> {
    const urlServer = "http://localhost:8080/Instrumento/traer-lista";
  
    try {
      const response = await fetch(urlServer, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        mode: "cors",
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Fetched data:', data);
      return data;
    } catch (error) {
      console.error('Failed to fetch instrumentos:', error);
      throw error;
    }
  }