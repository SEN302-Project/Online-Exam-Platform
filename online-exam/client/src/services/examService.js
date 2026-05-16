import api from "./api";

export const examService = {
  getExams: async () => (await api.get("/exams")).data,
  getExamById: async (id) => (await api.get(`/exams/${id}`)).data,
  createExam: async (payload) => (await api.post("/exams", payload)).data,
  updateExam: async (id, payload) => (await api.put(`/exams/${id}`, payload)).data,
  startExam: async (id) => (await api.post(`/exams/${id}/start`)).data,
  submitExam: async (id, answers) =>
    (await api.post(`/exams/${id}/submit`, { answers })).data,
  autoSave: async (id, answers) =>
    (await api.post(`/exams/${id}/autosave`, { answers })).data,
  getQuestionBank: async () => (await api.get("/questions")).data,
};