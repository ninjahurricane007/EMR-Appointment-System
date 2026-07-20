import api from "./api";

export const createDoctor = async (data) => {
  const response = await api.post("/users/doctor", data);
  return response.data;
};

export const getDoctors = async () => {
  const response = await api.get("/users");
  return response.data;
};
