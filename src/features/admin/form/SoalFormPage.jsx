import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { soalApi } from "@/services/api/soal.api";
import { materiApi } from "@/services/api/materi.api";
import axiosInstance from "@/services/api/axios";
import Loading from "@/components/Loading";
import toastr from "toastr";
import HeaderCard from "../components/HeaderCard";

// split components
import SoalHeader from "../components/soal/SoalHeader";
import SoalMetaForm from "../components/soal/SoalMetaForm";
import SoalQuestionForm from "../components/soal/SoalQuestionForm";
import SoalFormActions from "../components/soal/SoalFormActions";

export default function SoalFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [kelasOptions, setKelasOptions] = useState([]);
  const [materiOptions, setMateriOptions] = useState([]);
  const [selectedKelas, setSelectedKelas] = useState("");
  const [savedSoals, setSavedSoals] = useState([]);
  const [currentSoalIndex, setCurrentSoalIndex] = useState(0);

  const { handleSubmit, control, reset, setValue, formState } = useForm({
    defaultValues: {
      materi_id: "",
      pertanyaan: "",
      jawaban_a: "",
      jawaban_b: "",
      jawaban_c: "",
      jawaban_d: "",
      jawaban_benar: "",
    },
  });

  const jawabanOptions = [
    { value: "a", label: "A" },
    { value: "b", label: "B" },
    { value: "c", label: "C" },
    { value: "d", label: "D" },
  ];

  // Fetch kelas options
  useEffect(() => {
    axiosInstance
      .get("/kelas")
      .then((res) => {
        const rawData = res?.data?.data ?? res?.data ?? [];
        const list = rawData.map((k) => ({
          value: k.id,
          label: k.nama || k.nama_kelas || `Kelas ${k.id}`,
        }));
        setKelasOptions(list);
      })
      .catch(() => {
        toastr.error("Gagal memuat data kelas");
        setKelasOptions([]);
      });
  }, []);

  // Fetch materi for selected kelas (admin endpoint)
  useEffect(() => {
    if (!selectedKelas) {
      setMateriOptions([]);
      return;
    }
    materiApi
      .getByKelasAdmin(selectedKelas)
      .then((res) => {
        const rawData = res?.data?.data ?? res?.data ?? [];
        const list = rawData.map((m) => ({ value: m.id, label: m.judul }));
        setMateriOptions(list);
        if (list.length === 0) toastr.info("Tidak ada materi untuk kelas ini");
      })
      .catch(() => {
        toastr.error("Gagal memuat data materi");
        setMateriOptions([]);
      });
  }, [selectedKelas]);

  // Load soal when editing
  useEffect(() => {
    if (!editing) return;
    setLoading(true);
    soalApi
      .getById(id)
      .then((res) => {
        const soal = res?.data ?? res;
        if (soal.materi && soal.materi.kelas_id) {
          setSelectedKelas(String(soal.materi.kelas_id));
        }
        reset({
          materi_id: String(soal.materi_id || ""),
          pertanyaan: soal.pertanyaan || "",
          jawaban_a: soal.jawaban_a || "",
          jawaban_b: soal.jawaban_b || "",
          jawaban_c: soal.jawaban_c || "",
          jawaban_d: soal.jawaban_d || "",
          jawaban_benar: soal.jawaban_benar || "",
        });
      })
      .catch(() => {
        toastr.error("Gagal memuat soal");
        navigate("/admin/soal");
      })
      .finally(() => setLoading(false));
  }, [id, editing, navigate, reset]);

  // Handlers (preserve existing business behavior)
  const handleNext = (data) => {
    const newSoal = { ...data, index: currentSoalIndex };
    setSavedSoals((prev) => [...prev, newSoal]);

    const keepKelas = selectedKelas;
    const keepMateri = data.materi_id;

    reset({
      materi_id: keepMateri,
      pertanyaan: "",
      jawaban_a: "",
      jawaban_b: "",
      jawaban_c: "",
      jawaban_d: "",
      jawaban_benar: "",
    });

    setSelectedKelas(keepKelas);
    setCurrentSoalIndex((prev) => prev + 1);

    toastr.success(
      `Soal ${currentSoalIndex + 1} tersimpan. Lanjutkan ke soal berikutnya.`
    );
  };

  const handleFinish = async (data) => {
    const allSoals = [...savedSoals, { ...data, index: currentSoalIndex }];
    setLoading(true);
    try {
      const promises = allSoals.map((soal) => soalApi.create(soal));
      await Promise.all(promises);
      toastr.success(`${allSoals.length} soal berhasil dibuat`);
      navigate("/admin/soal");
    } catch (err) {
      toastr.error(err?.response?.data?.message || "Gagal menyimpan soal");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    if (editing) {
      setLoading(true);
      try {
        await soalApi.update(id, data);
        toastr.success("Soal berhasil diperbarui");
        navigate("/admin/soal");
      } catch (err) {
        toastr.error(err?.response?.data?.message || "Gagal menyimpan");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6">
      <SoalHeader
        editing={editing}
        savedCount={savedSoals.length}
        index={currentSoalIndex}
      />

      <div className="w-full mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <SoalMetaForm
            control={control}
            kelasOptions={kelasOptions}
            materiOptions={materiOptions}
            selectedKelas={selectedKelas}
            setSelectedKelas={setSelectedKelas}
            setValue={setValue}
            editing={editing}
            locked={savedSoals.length > 0}
          />

          <SoalQuestionForm control={control} />

          <SoalFormActions
            editing={editing}
            hasBatch={savedSoals.length > 0}
            loading={formState.isSubmitting}
            onNext={handleSubmit(handleNext)}
            onFinish={handleSubmit(handleFinish)}
            onCancel={() => {
              if (savedSoals.length > 0)
                toastr.warning("Ada soal yang belum disimpan permanen.");
              navigate("/admin/soal");
            }}
          />
        </form>
      </div>
    </div>
  );
}
