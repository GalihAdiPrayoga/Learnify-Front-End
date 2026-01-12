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

  const submitExam = async (opts = {}) => {
    const { allowPartial = false, forceFail = false } = opts;
    if (isSubmitting) {
      console.warn("⚠️ Submit already in progress, ignoring duplicate call");
      return { success: false, error: "Already submitting" };
    }

    const unanswered = soalList.filter((s) => !answers[s.id]);
    if (!allowPartial && unanswered.length > 0) {
      toast.error(`Masih ada ${unanswered.length} soal yang belum dijawab`);
      return { success: false, error: "Incomplete answers" };
    }

    setIsSubmitting(true);
    try {
      // Submit only answered items when allowPartial, else submit all (may include undefined)
      const toSubmit = allowPartial
        ? soalList.filter((s) => answers[s.id])
        : soalList;

      const answerPromises = toSubmit.map((soal) =>
        axios.post("/user/jawaban", {
          hasil_ujian_id: hasilUjianId,
          soal_id: soal.id,
          jawaban_user: answers[soal.id],
        })
      );
      await Promise.all(answerPromises);

      // small delay to reduce race with answer writes
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Finish exam, pass force_fail flag when requested
      const finishRes = await axios.post("/user/hasil-ujian/finish", {
        hasil_ujian_id: hasilUjianId,
        force_fail: !!forceFail,
      });

      toast.success(
        forceFail
          ? "Waktu habis. Ujian berakhir (gagal)."
          : "Ujian berhasil diselesaikan!"
      );
      return { success: true, hasilUjianId };
    } catch (err) {
      toast.error("Gagal menyimpan jawaban");
      console.error(err);
      return { success: false };
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
