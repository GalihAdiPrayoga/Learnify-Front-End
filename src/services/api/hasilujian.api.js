import axios from "./axios";

export const hasilUjianApi = {
  start: (materi_id) => axios.post("/user/hasil-ujian/start", { materi_id }),
  finish: (hasil_ujian_id) =>
    axios.post("/user/hasil-ujian/finish", { hasil_ujian_id }),
  getById: (id) => axios.get(`/user/hasil-ujian/${id}`),
  getHistory: () => axios.get("/user/hasil-ujian"),
};
