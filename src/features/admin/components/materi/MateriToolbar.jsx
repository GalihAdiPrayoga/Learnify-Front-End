import React from "react";
import SearchBar from "../SearchBar";
import Button from "@/components/button";
import { SelectField } from "@/components/fields";

const MateriToolbar = ({
  searchTerm,
  onSearch,
  itemsPerPage,
  onItemsPerPageChange,
  kelasOptions = [],
  selectedKelasId,
  onKelasChange,
  onAdd,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <SearchBar
          onSearch={onSearch}
          placeholder="Cari materi"
          className="h-12 w-full sm:w-72"
          value={searchTerm}
        />

        <div className="ml-2 w-28">
          <SelectField
            options={[5, 10, 15, 20, 25, 50].map((n) => ({
              value: n,
              label: String(n),
            }))}
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="h-12"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="w-44">
          <SelectField
            options={[
              { value: "null", label: "Semua Kelas" },
              ...kelasOptions.map((k) => ({
                value: String(k.id),
                label: k.nama,
              })),
            ]}
            value={selectedKelasId != null ? String(selectedKelasId) : "null"}
            onChange={(e) => {
              const v = e.target.value;
              const val = v === "null" ? null : Number(v);
              onKelasChange(val);
            }}
            className="h-12"
          />
        </div>

        <Button
          variant="primary"
          onClick={onAdd}
          className="h-12 px-4 sm:w-auto w-full"
        >
          Tambah Materi
        </Button>
      </div>
    </div>
  );
};

export default MateriToolbar;
