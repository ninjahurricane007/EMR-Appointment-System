import api from "./api";

export const createPatient = async (data) => {
  const response = await api.post("/patients", data);
  return response.data;
};

export const getPatient = async (patientId) => {
  const response = await api.get(`/patients/${patientId}`);
  return response.data;
};
