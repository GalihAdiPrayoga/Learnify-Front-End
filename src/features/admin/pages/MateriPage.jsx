import React, { useState} from "react";
import { useMateri } from "../hooks/useMateri";
import { useNavigate } from "react-router-dom";
import HeaderCard from "../components/HeaderCard";
import Loading from "@/components/Loading";
import NotFound from "@/features/error/notfound";
import { useKelasOptions } from "../hooks/useKelasOptions";
import MateriToolbar from "../components/materi/MateriToolbar";
import MateriTableSection from "../components/materi/MateriTableSection";

const MateriPage = () => {
  const [selectedKelasId, setSelectedKelasId] = useState(null); // allow changing filter
  const navigate = useNavigate();
  const { materiList, loading, error, deleteMateri } =
    useMateri(selectedKelasId);

  // kelas options via hook (extracted)
  const kelasOptions = useKelasOptions();

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

      <MateriToolbar
        searchTerm={searchTerm}
        onSearch={handleSearch}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        kelasOptions={kelasOptions}
        selectedKelasId={selectedKelasId}
        onKelasChange={(v) => {
          setSelectedKelasId(v);
          setCurrentPage(1);
        }}
        onAdd={() => navigate("/admin/materi/new")}
      />

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
        <MateriTableSection
          columns={columns}
          data={tableData}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filtered.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          onEdit={(row) => navigate(`/admin/materi/${row.id}/edit`)}
          onDelete={(id) => deleteMateri(id)}
        />
      )}
    </div>
  );
};

export default MateriPage;
