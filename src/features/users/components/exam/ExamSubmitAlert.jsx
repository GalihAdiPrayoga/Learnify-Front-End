import React from "react";
import Alert from "@/components/alert";

export default function ExamSubmitAlert({
  open,
  answered = 0,
  total = 0,
  isSubmitting = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Alert
      open={open}
      title="Konfirmasi Submit"
      message={`Anda telah menjawab ${answered} dari ${total} soal. Yakin ingin submit ujian?`}
      type="warning"
      confirmText="Ya, Submit"
      cancelText="Cek Lagi"
      loading={isSubmitting}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
