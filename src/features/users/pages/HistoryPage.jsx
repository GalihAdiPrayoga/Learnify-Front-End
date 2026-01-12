import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hasilUjianApi } from "@/services/api/hasilujian.api";
import Loading from "@/components/Loading";
import CardHeader from "../components/CardHeader";
import Button from "@/components/button";
import { BookOpenCheck, Eye, FileText, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import NotFound from "@/features/error/notfound";
import HistoryStatsCard from "../components/history/HistoryStatsCard";
import HistoryChart from "../components/history/HistoryChart";

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

  const total = history.length;
  const passed = history.filter((h) => Number(h.nilai) >= 60).length;
  const avg =
    total > 0
      ? Math.round(history.reduce((s, h) => s + Number(h.nilai), 0) / total)
      : 0;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <CardHeader
        title="Riwayat Ujian"
        subtitle="Lihat hasil ujian Anda sebelumnya"
        showBack={true}
        onBack={() => navigate(-1)}
      />

      {/* Stats Cards (always shown) */}
      <HistoryStatsCard total={total} passed={passed} average={avg} />

      {/* Chart Card (always shown) */}
      {history.length > 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Distribusi Nilai
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Grafik performa ujian berdasarkan rentang nilai
          </p>
          <HistoryChart history={history} />
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Distribusi Nilai
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Belum ada data untuk ditampilkan
          </p>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-400 text-sm">
              Grafik akan muncul setelah Anda menyelesaikan ujian
            </p>
          </div>
        </div>
      )}

      {history.length === 0 ? (
        <div className="p-6">
          <NotFound
            title="Belum Ada Riwayat Ujian"
            message="Anda belum menyelesaikan ujian apapun. Cobalah mengikuti ujian pada materi yang tersedia."
            type="notfound"
            onHome={() => navigate("/user/courses")}
          />
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
                className="bg-white p-6 rounded-lg shadow-md border-gray-400 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-full ${
                      passed ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <BookOpenCheck
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
                  className="p-2 h-9 w-9 rounded-full border border-gray-200 bg-white text-indigo-600 shadow-sm hover:bg-indigo-50 hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  title="Lihat Hasil"
                >
                  <Eye size={16} />
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
