import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { hasilUjianApi } from "@/services/api/hasilujian.api";
import { useMaterial } from "../hooks/useMaterial";
import Loading from "@/components/Loading";
import CardHeader from "../components/CardHeader";
import Button from "@/components/button";
import { Check, X, Trophy, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ResultPage() {
  const { kelasId, materialId, hasilUjianId } = useParams();
  const navigate = useNavigate();
  const [hasil, setHasil] = useState(null);
  const [loading, setLoading] = useState(true);
  const { materials } = useMaterial(kelasId);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await hasilUjianApi.getById(hasilUjianId);
        setHasil(res?.data?.data ?? res?.data);
      } catch (err) {
        console.error(err);
        navigate(`/user/courses/${kelasId}/materials`);
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [hasilUjianId]);

  if (loading) return <Loading />;
  if (!hasil) return null;

  const currentIndex = materials.findIndex((m) => m.id === Number(materialId));
  const nextMaterial =
    currentIndex < materials.length - 1 ? materials[currentIndex + 1] : null;

  const passed = hasil.nilai >= 60;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <CardHeader
        title="Hasil Ujian"
        subtitle={`Materi: ${hasil.materi?.judul || ""}`}
        showBack
        onBack={() => navigate(`/user/courses/${kelasId}/materials`)}
      />

      {/* Score Summary */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`mt-6 p-8 rounded-lg text-center ${
          passed
            ? "bg-green-50 border-2 border-green-500"
            : "bg-red-50 border-2 border-red-500"
        }`}
      >
        <Trophy
          className={`w-16 h-16 mx-auto mb-4 ${
            passed ? "text-green-600" : "text-red-600"
          }`}
        />
        <h2 className="text-3xl font-bold mb-2">{hasil.nilai}</h2>
        <p className="text-lg text-gray-700">
          {hasil.jumlah_benar} benar dari {hasil.jumlah_soal} soal
        </p>
        <p
          className={`mt-2 font-semibold ${
            passed ? "text-green-700" : "text-red-700"
          }`}
        >
          {passed
            ? "🎉 Selamat! Anda Lulus"
            : "Coba lagi untuk nilai lebih baik"}
        </p>
      </motion.div>

      {/* Answer Details */}
      <div className="mt-8 space-y-4">
        <h3 className="text-xl font-semibold mb-4">Detail Jawaban</h3>
        {(hasil.jawabanUsers || []).map((jawaban, index) => {
          const isCorrect = jawaban.jawaban_benar;
          return (
            <div
              key={jawaban.id}
              className="bg-white p-4 rounded-lg border shadow-sm"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="font-medium">
                  {index + 1}. {jawaban.soal?.pertanyaan}
                </p>
                {isCorrect ? (
                  <Check className="text-green-500" size={20} />
                ) : (
                  <X className="text-red-500" size={20} />
                )}
              </div>
              <p className="text-sm text-gray-600">
                Jawaban Anda:{" "}
                <strong>{jawaban.jawaban_user.toUpperCase()}</strong>
              </p>
              {!isCorrect && (
                <p className="text-sm text-red-600">
                  Jawaban benar:{" "}
                  <strong>{jawaban.soal?.jawaban_benar.toUpperCase()}</strong>
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-8 flex gap-3 justify-end">
        <Button
          variant="secondary"
          onClick={() => navigate(`/user/courses/${kelasId}/materials`)}
        >
          Kembali ke Daftar Materi
        </Button>
        {nextMaterial && (
          <Button
            variant="primary"
            onClick={() =>
              navigate(`/user/courses/${kelasId}/materials/${nextMaterial.id}`)
            }
          >
            Lanjut ke Materi Berikutnya <ArrowRight size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}
