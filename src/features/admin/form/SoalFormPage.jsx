import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { soalApi } from "@/services/api/soal.api";
import { materiApi } from "@/services/api/materi.api";
import axiosInstance from "@/services/api/axios";
import Button from "@/components/button";
import { InputField, SelectField, TextareaField } from "@/components/fields";
import Loading from "@/components/Loading";
import toastr from "toastr";
import HeaderCard from "../components/HeaderCard";

export default function SoalFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [kelasOptions, setKelasOptions] = useState([]);
  const [materiOptions, setMateriOptions] = useState([]);
  const [selectedKelas, setSelectedKelas] = useState("");

  const { handleSubmit, control, reset, watch, setValue, formState } = useForm({
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
        console.log("Kelas response:", res);
        const rawData = res?.data?.data ?? res?.data ?? [];
        const list = rawData.map((k) => ({
          value: k.id,
          label: k.nama || k.nama_kelas || `Kelas ${k.id}`,
        }));
        console.log("Kelas options:", list);
        setKelasOptions(list);
      })
      .catch((err) => {
        console.error("Error fetching kelas:", err);
        toastr.error("Gagal memuat data kelas");
        setKelasOptions([]);
      });
  }, []);

  // Fetch materi berdasarkan kelas yang dipilih
  useEffect(() => {
    if (!selectedKelas) {
      setMateriOptions([]);
      return;
    }

    console.log("Fetching materi for kelas:", selectedKelas);

    materiApi
      .getByKelas(selectedKelas)
      .then((res) => {
        console.log("Materi response:", res);
        const rawData = res?.data?.data ?? res?.data ?? [];
        console.log("Raw materi data:", rawData);

        const list = rawData.map((m) => ({
          value: m.id,
          label: m.judul,
        }));
        console.log("Materi options:", list);

        setMateriOptions(list);

        if (list.length === 0) {
          toastr.info("Tidak ada materi untuk kelas ini");
        }
      })
      .catch((err) => {
        console.error("Error fetching materi:", err);
        console.error("Error details:", err.response?.data);
        toastr.error("Gagal memuat data materi");
        setMateriOptions([]);
      });
  }, [selectedKelas]);

  // Load soal data ketika editing
  useEffect(() => {
    if (!editing) return;
    setLoading(true);
    soalApi
      .getById(id)
      .then((res) => {
        console.log("Soal response for edit:", res);
        const soal = res?.data ?? res;
        console.log("Soal data:", soal);

        // Set kelas dari materi
        if (soal.materi && soal.materi.kelas_id) {
          console.log("Setting kelas from materi:", soal.materi.kelas_id);
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
      .catch((err) => {
        console.error("Error loading soal:", err);
        toastr.error("Gagal memuat soal");
        navigate("/admin/soal");
      })
      .finally(() => setLoading(false));
  }, [id, editing, navigate, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (editing) {
        await soalApi.update(id, data);
        toastr.success("Soal berhasil diperbarui");
      } else {
        await soalApi.create(data);
        toastr.success("Soal berhasil dibuat");
      }
      navigate("/admin/soal");
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Gagal menyimpan";
      toastr.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6">
      <HeaderCard
        title={editing ? "Edit Soal" : "Tambah Soal"}
        subtitle={editing ? "Perbarui informasi soal" : "Buat soal baru"}
        showBack={true}
        onBack={() => navigate("/admin/soal")}
      />

      <div className="w-full mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Kelas <span className="text-red-500">*</span>
              </label>
              <SelectField
                options={[
                  { value: "", label: "Pilih kelas terlebih dahulu" },
                  ...kelasOptions,
                ]}
                value={selectedKelas}
                onChange={(e) => {
                  setSelectedKelas(e.target.value);
                  setValue("materi_id", ""); // Reset materi when kelas changes
                }}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Pilih kelas untuk menampilkan materi
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Materi <span className="text-red-500">*</span>
              </label>
              <Controller
                name="materi_id"
                control={control}
                rules={{ required: "Materi harus dipilih" }}
                render={({ field, fieldState }) => (
                  <>
                    <SelectField
                      options={[
                        {
                          value: "",
                          label: selectedKelas
                            ? "Pilih materi"
                            : "Pilih kelas terlebih dahulu",
                        },
                        ...materiOptions,
                      ]}
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange?.(e?.target ? e.target.value : e)
                      }
                      className="w-full"
                      disabled={!selectedKelas}
                    />
                    {fieldState.error && (
                      <p className="text-xs text-red-500 mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Pertanyaan <span className="text-red-500">*</span>
            </label>
            <Controller
              name="pertanyaan"
              control={control}
              rules={{ required: "Pertanyaan harus diisi" }}
              render={({ field, fieldState }) => (
                <>
                  <TextareaField
                    {...field}
                    rows={3}
                    placeholder="Masukkan pertanyaan"
                    className="w-full"
                  />
                  {fieldState.error && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Jawaban A <span className="text-red-500">*</span>
              </label>
              <Controller
                name="jawaban_a"
                control={control}
                rules={{ required: "Jawaban A harus diisi" }}
                render={({ field, fieldState }) => (
                  <>
                    <InputField
                      {...field}
                      placeholder="Jawaban A"
                      className="w-full"
                    />
                    {fieldState.error && (
                      <p className="text-xs text-red-500 mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Jawaban B <span className="text-red-500">*</span>
              </label>
              <Controller
                name="jawaban_b"
                control={control}
                rules={{ required: "Jawaban B harus diisi" }}
                render={({ field, fieldState }) => (
                  <>
                    <InputField
                      {...field}
                      placeholder="Jawaban B"
                      className="w-full"
                    />
                    {fieldState.error && (
                      <p className="text-xs text-red-500 mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Jawaban C <span className="text-red-500">*</span>
              </label>
              <Controller
                name="jawaban_c"
                control={control}
                rules={{ required: "Jawaban C harus diisi" }}
                render={({ field, fieldState }) => (
                  <>
                    <InputField
                      {...field}
                      placeholder="Jawaban C"
                      className="w-full"
                    />
                    {fieldState.error && (
                      <p className="text-xs text-red-500 mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Jawaban D <span className="text-red-500">*</span>
              </label>
              <Controller
                name="jawaban_d"
                control={control}
                rules={{ required: "Jawaban D harus diisi" }}
                render={({ field, fieldState }) => (
                  <>
                    <InputField
                      {...field}
                      placeholder="Jawaban D"
                      className="w-full"
                    />
                    {fieldState.error && (
                      <p className="text-xs text-red-500 mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Jawaban Benar <span className="text-red-500">*</span>
            </label>
            <Controller
              name="jawaban_benar"
              control={control}
              rules={{ required: "Jawaban benar harus dipilih" }}
              render={({ field, fieldState }) => (
                <>
                  <SelectField
                    options={[
                      { value: "", label: "Pilih jawaban benar" },
                      ...jawabanOptions,
                    ]}
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange?.(e?.target ? e.target.value : e)
                    }
                    className="w-full"
                  />
                  {fieldState.error && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/admin/soal")}
              className="h-10 px-6"
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={formState.isSubmitting}
              className="h-10 px-8"
            >
              {editing ? "Perbarui" : "Simpan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
