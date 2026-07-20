import api from "./api";

export const getAvailableSlots = async (doctorId, date) => {
  const response = await api.get(`/doctors/${doctorId}/slots?date=${date}`);

  return response.data;
};

export const createAppointment = async (data) => {
  const response = await api.post("/appointments", data);

  return response.data;
};

export const getAppointments = async () => {
  const response = await api.get("/appointments");

  return response.data;
};
