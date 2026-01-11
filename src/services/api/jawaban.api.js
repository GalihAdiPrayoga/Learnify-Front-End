import axios from "./axios";

export const jawabanApi = {
  store: (hasil_ujian_id, soal_id, jawaban_user) =>
    axios.post("/user/jawaban", { hasil_ujian_id, soal_id, jawaban_user }),
};
