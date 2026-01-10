import { useState, useEffect } from "react";
import { soalApi } from "@/services/api/soal.api";
import { toast } from "react-hot-toast";
import axios from "@/services/api/axios";

export const useExam = (materiId) => {
  const [soalList, setSoalList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [hasilUjianId, setHasilUjianId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSoal = async () => {
      try {
        setLoading(true);
        const response = await soalApi.getByMateri(materiId);
        const soal = response?.data?.data ?? response?.data ?? [];
        setSoalList(soal);

        // Start exam session
        const startResponse = await axios.post("/user/hasil-ujian/start", {
          materi_id: materiId,
        });
        const hasil = startResponse?.data?.data ?? startResponse?.data;
        setHasilUjianId(hasil.id);
      } catch (err) {
        toast.error("Gagal memuat soal ujian");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (materiId) {
      fetchSoal();
    }
  }, [materiId]);

  const selectAnswer = (soalId, jawaban) => {
    setAnswers((prev) => {
      const current = prev[soalId];
      if (current === jawaban) {
        // same option clicked again -> unselect
        const next = { ...prev };
        delete next[soalId];
        return next;
      }
      // select/update answer
      return { ...prev, [soalId]: jawaban };
    });
  };

  const submitExam = async () => {
    if (isSubmitting) return;

    const unanswered = soalList.filter((s) => !answers[s.id]);
    if (unanswered.length > 0) {
      toast.error(`Masih ada ${unanswered.length} soal yang belum dijawab`);
      return;
    }

    setIsSubmitting(true);
    try {
      // Submit all answers
      const answerPromises = soalList.map((soal) =>
        axios.post("/user/jawaban", {
          hasil_ujian_id: hasilUjianId,
          soal_id: soal.id,
          jawaban_user: answers[soal.id],
        })
      );
      await Promise.all(answerPromises);

      // Finish exam
      await axios.post("/user/hasil-ujian/finish", {
        hasil_ujian_id: hasilUjianId,
      });

      toast.success("Ujian berhasil diselesaikan!");
      return true;
    } catch (err) {
      toast.error("Gagal menyimpan jawaban");
      console.error(err);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    soalList,
    loading,
    answers,
    isSubmitting,
    selectAnswer,
    submitExam,
  };
};
