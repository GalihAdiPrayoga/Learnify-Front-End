import React, { useState, useEffect } from "react";
import { useMateri } from "../hooks/useMateri";
import { useNavigate } from "react-router-dom";
import HeaderCard from "../components/HeaderCard";
import DataTables from "../components/DataTables";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Button from "@/components/button";
import Loading from "@/components/Loading";
import NotFound from "@/features/error/notfound";
import axiosInstance from "@/services/api/axios";
import { SelectField } from "@/components/fields";

const MateriPage = () => {
  const [selectedKelasId, setSelectedKelasId] = useState(null); // allow changing filter
  const navigate = useNavigate();
  const { materiList, loading, error, deleteMateri } =
    useMateri(selectedKelasId);

  // kelas options for filter
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
      .catch(() => setKelasOptions([]));
    return () => (mounted = false);
  }, []);

  // Search & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page < 1) return;
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const sortedList = (materiList || []).slice().sort((a, b) => {
    const ia = Number(a?.id ?? 0);
    const ib = Number(b?.id ?? 0);
    return ia - ib;
  });

  const filtered = sortedList.filter((m) => {
    if (!searchTerm) return true;
    const t = searchTerm.toLowerCase();
    return (
      String(m.judul ?? "")
        .toLowerCase()
        .includes(t) ||
      String(m.kelas?.nama ?? m.kelas_nama ?? "")
        .toLowerCase()
        .includes(t)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const start = (currentPage - 1) * itemsPerPage;
  const displayed = filtered.slice(start, start + itemsPerPage);

  // prepare columns for DataTables and attach row numbers
  const columns = [
    { key: "__no", label: "No" },
    { key: "judul", label: "Judul" },
    { key: "deskripsi", label: "Deskripsi" },
    { key: "kelas_nama", label: "Kelas" },
  ];
  const tableData = (displayed || []).map((m, idx) => ({
    ...m,
    __no: start + idx + 1,
    kelas_nama: m.kelas?.nama ?? m.kelas_nama ?? "",
  }));

  return (
    <div className="p-6">
      <HeaderCard
        title="Material Management"
        subtitle="Kelola materi pembelajaran"
        showBack={false}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Cari materi"
            className="h-12 w-full sm:w-72"
          />

          <div className="ml-2 w-28">
            <SelectField
              options={[5, 10, 15, 20, 25, 50].map((n) => ({
                value: n,
                label: String(n),
              }))}
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="h-12"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Kelas filter (styled dropdown) */}
          <div className="w-44">
            <SelectField
              options={[
                { value: null, label: "Semua Kelas" },
                ...kelasOptions.map((k) => ({ value: k.id, label: k.nama })),
              ]}
              value={selectedKelasId ?? null}
              onChange={(e) => {
                const v =
                  e.target.value === null || e.target.value === "null"
                    ? null
                    : Number(e.target.value);
                setSelectedKelasId(v);
                setCurrentPage(1);
              }}
              className="h-12"
            />
          </div>

          <Button
            variant="primary"
            onClick={() => navigate("/admin/materi/new")}
            className="h-12 px-4 sm:w-auto w-full"
          >
            Tambah Materi
          </Button>
        </div>
      </div>

      {/* Table using shared DataTables component */}
      {loading ? (
        <Loading />
      ) : error ? (
        <NotFound
          title="Gagal Memuat Data"
          message={
            error ||
            "Terjadi kesalahan saat mengambil data materi. Silakan coba lagi."
          }
          type="error"
          onRetry={() => window.location.reload()}
        />
      ) : (
        <DataTables
          columns={columns}
          data={tableData}
          onEdit={(row) => navigate(`/admin/materi/${row.id}/edit`)}
          onDelete={(id) => deleteMateri(id)}
        />
      )}

      {/* Pagination */}
      {!loading && (
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filtered.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default MateriPage;
