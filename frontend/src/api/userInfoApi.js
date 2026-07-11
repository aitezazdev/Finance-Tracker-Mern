import api from "./client";


export const userInfo = async () => {
  const response = await api.get("/auth/profile");
  console.log(response.data);
  return response.data;
};


export const updateUserInfo = async ({ name, email }) => {
  const response = await api.put("/auth/update-profile", { name, email });
  return response.data;
};


export const deleteUserAccount = async () => {
  const response = await api.delete("/auth/delete-account");
  return response.data;
};
