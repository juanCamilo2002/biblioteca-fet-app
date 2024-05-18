import axios from "axios";

//create an custom axios instance
export const customAxiosInstance = (accessToken, customConfig = {}) => {
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            "Content-Type": "application/json",
            "token": `Bearer ${accessToken}`,
            
        },
        ...customConfig,
    });
}
export const customAxiosInstanceFiles = (accessToken, customConfig = {}) => {
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            "Content-Type": "multipart/form-data",
            "token": `Bearer ${accessToken}`,
            
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

export const createBook = async (accessToken, data, notification) => {
    const customApiInstance = customAxiosInstance(accessToken);
    try {
        const response = await customApiInstance.post("/books/agregar", data);
        notification.success("Libro creado correctamente")
        return response.data;

    } catch (error) {
        notification.error("Ha ocurrido un error")
        console.error('error fetching data:', error);
    }
}

export const getBook = async (id) => {
    const api = customAxiosInstance();
    try {
        const response = await api.get("/books/encontrar/" + id);
        return response.data;
    } catch (error) {
        console.error('error fetching data:', error);
    }

}

export const updateBook = async (accessToken, id, data, notification) => {
    const customApiInstance = customAxiosInstance(accessToken);
    try {
        const response = await customApiInstance.put("/books/actualizar/" + id, data);
        notification.success("Libro actualizado correctamente")
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

export const getReserva = async (id) => {
    const api = customAxiosInstance();
    try {
        const response = await api.get("/reserva/encontrar/" + id);
        return response.data;
    } catch (error) {
        console.error('error fetching data:', error);
    }
};
export const createReservation = async (accessToken, data, notification) => {
    const api = customAxiosInstance(accessToken);
    try {
        const response = await api.post("/reserva/agregar", data);
        notification.success("Reserva creada correctamente")
        return response.data;

    } catch (error) {
        notification.error(error.response.data.message)
        console.error('error fetching data:', error);
    }
}

export const deleteReservation = async (accessToken, id, notification) => {
    const api = customAxiosInstance(accessToken);
    try {
        const response = await api.delete("/reserva/borrar/" + id);
        notification.success("Reserva eliminada correctamente")
        return response.data;

    } catch (error) {
        notification.error(error.response.data.message)
        console.error('error fetching data:', error);
    }
}

export const updateReservation = async (accessToken, id, data, notification) => {
    const api = customAxiosInstance(accessToken);
    try {
        const response = await api.put("/reserva/actualizar/" + id, data);
        notification.success("Reserva actualizada correctamente")
        return response.data;

    } catch (error) {
        notification.error(error.response.data.message)
        console.error('error fetching data:', error);
    }
}

export const uploadFile = async (accessToken, image, notification) => {
    const api = customAxiosInstanceFiles(accessToken);
    try {
        const response = await api.post("/upload/image", {
            image: image.file
        });
        notification.success("Archivo subido correctamente")
        return response.data.urlFile;
    } catch (error) {
        notification.error(error.response.data.message)
        console.error('error fetching data:', error);
        throw error
    }
};


// authors api calls
export const getAuthors = async () =>{
    const api = customAxiosInstance();
    try {
        const response = await api.get("/autor/encontrar");
        return response.data;
    } catch (error) {
        console.error('error fetching data:', error);
        throw error
    }
};

// users api calls
export const getUsers = async (accessToken) =>{
    const api = customAxiosInstance(accessToken);
    try {
        const response = await api.get("/users/");
        return response.data;
    } catch (error) {
        console.error('error fetching data:', error);
        throw error
    }
};

export const createUser = async (accessToken, data, notification) => {
    const api = customAxiosInstance(accessToken);
    try {
        const response = await api.post("/users/create", data);
        notification.success("Usuario creado correctamente")
        return response.data;

    } catch (error) {
        notification.error(error.response.data.message)
        console.error('error fetching data:', error);
    }
}

export const deleteUser = async (accessToken, id, notification) => {
    const api = customAxiosInstance(accessToken);
    try {
        const response = await api.delete("/users/delete/" + id);
        notification.success("Usuario eliminado correctamente")
        return response.data;

    } catch (error) {
        notification.error(error.response.data.message)
        console.error('error fetching data:', error);
    }
}

export const getUser = async (accessToken, id) => {
    const api = customAxiosInstance(accessToken);
    try {
        const response = await api.get("/users/find/" + id);
        return response.data;
    } catch (error) {
        console.error('error fetching data:', error);
    }
}

export const updateUser = async (accessToken, id, data, notification) => {
    const api = customAxiosInstance(accessToken);
    try {
        const response = await api.put("/users/update/" + id, data);
        notification.success("Usuario actualizado correctamente")
        return response.data;

    } catch (error) {
        notification.error(error.response.data.message)
        console.error('error fetching data:', error);
    }
}