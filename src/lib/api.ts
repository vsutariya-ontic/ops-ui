import axios from "axios";
const BASE_URL = "http://localhost:4000";

export const opsPostRequest = async (endpoint: string, body: any) => {
    try {
        const response = await axios.post(`${BASE_URL}${endpoint}`, body);
        return response.data;
    } catch (err) {
        console.log(err);
        throw new Error(`Error fetching data from ${BASE_URL}${endpoint}`);
    }
};
