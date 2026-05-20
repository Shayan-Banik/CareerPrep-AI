import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const register = async ({ username, email, password }) => {
  try {
    const response = await api.post(
      "/api/auth/register",
      {
        username,
        email,
        password,
      },
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
  }
};


export const login = async ({ email, password }) => {
  try {
    const response = await api.post(
      "/api/auth/login",
      {
        email,
        password,
      },
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
  }
};

export const logout = async () => {
  try {
    await api.post("/api/auth/logout", {}, { withCredentials: true });
  } catch (error) {
    console.error("Error logging out user:", error);
  }
};

export const getMe = async () => {
  try {
    const response = await api.get("/api/auth/getMe", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};
