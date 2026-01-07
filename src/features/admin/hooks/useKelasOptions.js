import { useState, useEffect } from "react";
import axiosInstance from "@/services/api/axios";

export function useKelasOptions() {
  const [kelasOptions, setKelasOptions] = useState([]);

  useEffect(() => {
    let mounted = true;
    axiosInstance
      .get("/kelas")
      .then((res) => {
        if (!mounted) return;
        const list = (res?.data?.data ?? res?.data ?? []).map((k) => ({
          id: k.id,
          nama: k.nama || k.nama_kelas || `Kelas ${k.id}`,
        }));
        setKelasOptions(list);
      })
      .catch(() => {
        if (!mounted) return;
        setKelasOptions([]);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return kelasOptions;
}
