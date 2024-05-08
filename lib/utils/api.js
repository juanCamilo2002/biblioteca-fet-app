import axios from "axios";

//create an custom axios instance
export const customAxiosInstance = (accessToken, customConfig = {}) => {
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            "Content-Type": "application/json",
            "token": `Bearer ${accessToken}`
        },
        ...customConfig,
    });
}

// Books api calls
export const getBooks = async () => {
    const api = customAxiosInstance();
    try {
        const res = await api.get("/books/listar");
        return res.data;
    } catch (error) {
        console.error('Error fetching data:' + error);
    }
}

export const deleteBook = async (accessToken, id, notification) => {
    const api = customAxiosInstance(accessToken);
    try {
        const response = await api.delete("/books/borrar/" + id);
        notification.success("Libro eliminado correctamente")
        return response.data;

    } catch (error) {
        notification.error("Ha ocurrido un error")
        console.error('error fetching data:', error);
    }
}

// stats api calls
export const getReservasCountMonth = async () =>{
    const api = customAxiosInstance();
    try {
        const response = await api.get("/reports/cantidadReMes");
        return response.data;
    } catch (error) {
        console.error('error fetching data:', error);
        throw error;
    }
};

export const getCountBooksRegister = async () =>{
    const api = customAxiosInstance();
    try {
        const response = await api.get("/reports/cantidadLb");
        return response.data;
    } catch (error) {
        console.error('error fetching data:', error);
        throw error
    }
};

export const getBookMostReserv = async () =>{
    const api = customAxiosInstance();
    try {
        const response = await api.get("/reports/libroMasRe");
        return response.data;
    } catch (error) {
        console.error('error fetching data:', error);
        throw error
    }
};

// reservations api calls
export const getReservas = async (query = false) =>{
    const api = customAxiosInstance(null, query && {params: {isNew: query}});
    try {
        const response = await api.get("/reserva/listar");
        return response.data;
    } catch (error) {
        console.error('error fetching data:', error);
        throw error
    }
};