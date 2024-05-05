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

