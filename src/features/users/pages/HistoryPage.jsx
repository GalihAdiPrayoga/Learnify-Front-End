import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hasilUjianApi } from "@/services/api/hasilujian.api";
import Loading from "@/components/Loading";
import CardHeader from "../components/CardHeader";
import Button from "@/components/button";
import { FileText, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const HistoryPage = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await hasilUjianApi.getHistory();
        setHistory(res?.data?.data ?? res?.data ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <CardHeader
        title="Riwayat Ujian"
        subtitle="Lihat hasil ujian Anda sebelumnya"
        showBack={false}
      />

      {history.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Belum ada riwayat ujian
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {history.map((hasil, idx) => {
            const passed = hasil.nilai >= 60;
            return (
              <motion.div
                key={hasil.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-6 rounded-lg shadow-md border flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-full ${
                      passed ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <Trophy
                      className={passed ? "text-green-600" : "text-red-600"}
                      size={24}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{hasil.materi?.judul}</h3>
                    <p className="text-sm text-gray-600">
                      {hasil.materi?.kelas?.nama}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Nilai:{" "}
                      <strong
                        className={passed ? "text-green-600" : "text-red-600"}
                      >
                        {hasil.nilai}
                      </strong>{" "}
                      ({hasil.jumlah_benar}/{hasil.jumlah_soal} benar)
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(hasil.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  onClick={() =>
                    navigate(
                      `/user/courses/${hasil.materi?.kelas_id}/materials/${hasil.materi_id}/result/${hasil.id}`
                    )
                  }
                  className="flex items-center gap-2"
                >
                  <FileText size={16} /> Detail
                </Button>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
