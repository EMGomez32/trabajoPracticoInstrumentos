export interface Categoria{
    id?: number;
    denominacion: string;
}


export const mostrarCategorias = async (): Promise<Categoria[]> => {
    const endpoint = "http://localhost:8080/categorias/mostrarLista";
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