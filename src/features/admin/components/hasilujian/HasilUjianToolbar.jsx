import React from "react";
import SearchBar from "../SearchBar";
import { SelectField } from "@/components/fields";

const HasilUjianToolbar = ({
  searchTerm,
  onSearch,
  itemsPerPage,
  onItemsPerPageChange,
  dateRange = "all",
  onDateRangeChange = () => {},
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <SearchBar
          onSearch={onSearch}
          placeholder="Cari kelas user atau materi"
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

      <div className="ml-2 flex items-center gap-2">
        <div className="w-44">
          <SelectField
            options={[
              { value: "all", label: "Semua Tanggal" },
              { value: "today", label: "Hari Ini" },
              { value: "7", label: "7 Hari Terakhir" },
              { value: "30", label: "30 Hari Terakhir" },
              { value: "365", label: "1 Tahun" },
            ]}
            value={String(dateRange)}
            onChange={(e) => onDateRangeChange(e.target.value)}
            className="h-12"
          />
        </div>
      </div>
    </div>
  );
};

export default HasilUjianToolbar;
