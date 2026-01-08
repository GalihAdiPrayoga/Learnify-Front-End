import { useState, useEffect, useCallback, useRef } from "react";
import { materiApi } from "../../../services/api/materi.api";
import { toast } from "react-hot-toast";

export const useMaterial = (kelasId) => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // new refs to avoid loops / duplicate updates
  const pendingRef = useRef(false);
  const lastMaterialsJsonRef = useRef(null);
  const lastErrorRef = useRef(null);

  const fetchMaterials = useCallback(async () => {
    if (!kelasId) return;
    if (!isMountedRef.current) return;
    if (pendingRef.current) return; // avoid concurrent requests

    pendingRef.current = true;
    setLoading(true);
    setError(null);
    try {
      const response = await materiApi.getByKelas(kelasId);
      if (!isMountedRef.current) return;
      // backend wraps payload as { data: [...] }, fall back to response.data if shape differs
      const newMaterials = response?.data?.data ?? response?.data ?? [];

      const newJson = JSON.stringify(newMaterials);
      // only update state when data actually changed
      if (lastMaterialsJsonRef.current !== newJson) {
        setMaterials(newMaterials);
        lastMaterialsJsonRef.current = newJson;
      }
      // clear previous error if any
      lastErrorRef.current = null;
    } catch (err) {
      const status = err?.response?.status;
      const message = err?.response?.data?.message || "Gagal memuat materi";
      // avoid spamming toast on repeated identical errors (esp. 403)
      if (status !== 403 && lastErrorRef.current !== message)
        toast.error(message);
      if (isMountedRef.current && lastErrorRef.current !== message) {
        setError(message);
        lastErrorRef.current = message;
      }
    } finally {
      if (isMountedRef.current) setLoading(false);
      pendingRef.current = false;
    }
  }, [kelasId]);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  return {
    materials,
    loading,
    error,
    refetch: fetchMaterials,
  };
};
