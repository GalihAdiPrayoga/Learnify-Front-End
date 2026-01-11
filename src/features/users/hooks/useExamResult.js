import { useEffect, useState } from "react";
import { hasilUjianApi } from "@/services/api/hasilujian.api";

export default function useExamResult(hasilUjianId, navigate, kelasId) {
  const [hasil, setHasil] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasilUjianId) {
      setLoading(false);
      return;
    }
    const fetchResult = async () => {
      try {
        const res = await hasilUjianApi.getById(hasilUjianId);
        setHasil(res?.data?.data ?? res?.data ?? null);
      } catch (err) {
        // redirect jika gagal ambil
        navigate(`/user/courses/${kelasId}/materials`);
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [hasilUjianId]);

  const passed = Number(hasil?.nilai) >= 60;

  return { hasil, loading, passed };
}
