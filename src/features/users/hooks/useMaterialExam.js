import { useEffect, useState } from "react";
import { soalApi } from "@/services/api/soal.api";

export function useMaterialExam(materialId) {
  const [hasSoal, setHasSoal] = useState(false);
  const [soalCount, setSoalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!materialId) {
      setHasSoal(false);
      setSoalCount(0);
      return;
    }

    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        const res = await soalApi.checkSoalExists(materialId);
        if (cancelled) return;
        const list = res?.data?.data ?? res?.data ?? [];
        setHasSoal(Array.isArray(list) && list.length > 0);
        setSoalCount(Array.isArray(list) ? list.length : 0);
      } catch (err) {
        if (!cancelled) {
          setHasSoal(false);
          setSoalCount(0);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [materialId]);

  return { hasSoal, soalCount, loading };
}
