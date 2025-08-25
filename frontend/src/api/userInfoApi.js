import axios from "axios";

const API_URL = "http://localhost:3000/auth";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// user info
export const userInfo = async () => {
  const response = await api.get("/profile");
  console.log(response.data);
  return response.data;
};

// update user info
export const updateUserInfo = async ({ name, email }) => {
  const response = await api.put("/update-profile", { name, email });
  return response.data;
};

// delete account
export const deleteUserAccount = async () => {
  const response = await api.delete("/delete-account");
  return response.data;
};
