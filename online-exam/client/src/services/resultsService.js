import api from "./api";

export const resultsService = {
  getMyResults: async () => (await api.get("/results/me")).data,
  getExamResults: async (examId) => (await api.get(`/results/exam/${examId}`)).data,
  getResultDetail: async (id) => (await api.get(`/results/${id}`)).data,
  exportResultPDF: async (id) =>
    (await api.get(`/results/${id}/pdf`, { responseType: "blob" })).data,
};