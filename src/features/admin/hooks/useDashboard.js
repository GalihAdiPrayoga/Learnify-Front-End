import { useState, useEffect, useCallback, useRef } from "react";
import { dashboardApi } from "../../../services/api/dashboard.api";
import { toast } from "react-hot-toast";

export const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: null,
    charts: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const pendingRef = useRef(false);

  const fetchDashboard = useCallback(async () => {
    if (!isMountedRef.current) return;
    if (pendingRef.current) return; // avoid concurrent requests

    pendingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const response = await dashboardApi.getStats();
      if (!isMountedRef.current) return;

      const data = response?.data ?? {};
      setDashboardData({
        stats: data.stats ?? null,
        charts: data.charts ?? null,
      });
    } catch (err) {
      const message =
        err?.response?.data?.message || "Gagal memuat data dashboard";
      toast.error(message);

      if (isMountedRef.current) {
        setError(message);
      }
    } finally {
      if (isMountedRef.current) setLoading(false);
      pendingRef.current = false;
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    dashboardData,
    loading,
    error,
    refetch: fetchDashboard,
  };
};
