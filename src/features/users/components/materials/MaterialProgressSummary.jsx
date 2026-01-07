import React from "react";
import ProgressBar from "@/components/ProgressBar";

const MaterialProgressSummary = ({
  progress,
  completed,
  total,
  onToggleAll,
  isLoading,
}) => {
  if (total === 0) return null;

  return (
    <div
      className="mb-6"
      title={
        completed < total ? "Tandai semua selesai" : "Batalkan semua selesai"
      }
      role="button"
      onClick={() => {
        if (!isLoading) onToggleAll();
      }}
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !isLoading) onToggleAll();
      }}
    >
      <ProgressBar
        value={progress}
        height={14}
        onClick={onToggleAll}
        label={`${completed} / ${total} materi selesai`}
        from="#06b6d4"
        to="#7c3aed"
      />
    </div>
  );
};

export default MaterialProgressSummary;
