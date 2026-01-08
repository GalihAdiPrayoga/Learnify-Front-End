import React from "react";
import SearchBar from "../SearchBar";
import Button from "@/components/button";
import { SelectField } from "@/components/fields";

const SoalToolbar = ({
  searchTerm,
  onSearch,
  itemsPerPage,
  onItemsPerPageChange,
  onAdd,
  className,
}) => {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 min-h-12 ${
        className || ""
      }`}
    >
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <SearchBar
          onSearch={onSearch}
          placeholder="Cari soal berdasarkan pertanyaan atau materi..."
          className="h-12 w-full sm:w-72"
          value={searchTerm}
        />
        <div className="w-28">
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

      <Button
        variant="primary"
        onClick={onAdd}
        className="h-12 px-4 sm:w-auto w-full"
      >
        Tambah Soal
      </Button>
    </div>
  );
};

export default SoalToolbar;
