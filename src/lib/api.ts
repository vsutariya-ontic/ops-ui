import Cookies from "js-cookie";

const BASE_URL = "http://localhost:4000";

export const opsPostRequest = async (endpoint: string, body: any) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: String(
          Cookies.get("auth") ||
            String(
              localStorage.getItem("auth") || sessionStorage.getItem("auth")
            )
        ),
      },
      body: JSON.stringify(body),
      //   credentials: "include", // Send cookies with the request // deployment time pe dekhte he
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(`Error fetching data from ${BASE_URL}${endpoint}`);
  }
};

export const opsGetRequest = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: String(
          Cookies.get("auth") ||
            String(
              localStorage.getItem("auth") || sessionStorage.getItem("auth")
            )
        ),
      },
      //   credentials: "include", // Send cookies with the request // deployment time pe dekhte he
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(`Error fetching data from ${BASE_URL}${endpoint}`);
  }
};

export const opsPutRequest = async (endpoint: string, body: any) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: String(
          Cookies.get("auth") ||
            String(
              localStorage.getItem("auth") || sessionStorage.getItem("auth")
            )
        ),
      },
      body: JSON.stringify(body),
      //   credentials: "include", // Send cookies with the request // deployment time pe dekhte he
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(`Error fetching data from ${BASE_URL}${endpoint}`);
  }
};
