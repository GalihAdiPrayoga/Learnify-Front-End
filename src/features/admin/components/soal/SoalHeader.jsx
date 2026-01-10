import React from "react";
import HeaderCard from "../../components/HeaderCard"; // reuse if available

export default function SoalHeader({ editing, savedCount, index }) {
  return (
    <HeaderCard
      title={editing ? "Edit Soal" : "Tambah Soal"}
      subtitle={
        editing
          ? "Perbarui informasi soal"
          : savedCount > 0
          ? `Membuat soal ke-${index + 1} (${savedCount} soal tersimpan)`
          : "Buat soal baru"
      }
      showBack
      onBack={() => {}}
    />
  );
}
