import React from "react";
import Button from "@/components/button";

export default function SoalFormActions({
  editing,
  hasBatch,
  loading,
  onNext,
  onFinish,
  onCancel,
}) {
  return (
    <div className="flex justify-end gap-3 mt-6">
      <Button
        type="button"
        variant="secondary"
        onClick={onCancel}
        className="h-10 px-6"
      >
        Batal
      </Button>

      {!editing && (
        <Button
          type="button"
          variant="primary"
          onClick={onNext}
          loading={loading}
          className="h-10 px-6"
        >
          Selanjutnya
        </Button>
      )}

      <Button
        type="button"
        variant="primary"
        onClick={onFinish}
        loading={loading}
        className="h-10 px-8"
      >
        {editing ? "Perbarui" : hasBatch ? "Selesai & Simpan Semua" : "Simpan"}
      </Button>
    </div>
  );
}
