const BASE_URL = "http://localhost:4000";

export const opsPostRequest = async (endpoint: string, body: any) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        throw new Error(`Error fetching data from ${BASE_URL}${endpoint}`);
    }
};
