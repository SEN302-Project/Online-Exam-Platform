import api from "./api";

export const proctoringService = {
  verifyIdentity: async (imageBlob, examId) => {
    const formData = new FormData();
    formData.append("image", imageBlob);
    formData.append("examId", examId);
    return (await api.post("/proctoring/verify", formData)).data;
  },
  reportIncident: async (examId, incident) =>
    (await api.post("/proctoring/incidents", { examId, ...incident })).data,
  uploadFrame: async (examId, frameBlob) => {
    const formData = new FormData();
    formData.append("frame", frameBlob);
    formData.append("examId", examId);
    return (await api.post("/proctoring/frames", formData)).data;
  },
  getLiveSessions: async () => (await api.get("/proctoring/live")).data,
};