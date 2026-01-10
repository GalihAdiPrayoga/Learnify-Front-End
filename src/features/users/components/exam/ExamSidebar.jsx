import React from "react";
import Button from "@/components/button";
import { Check } from "lucide-react";

export default function ExamSidebar({
  soalList = [],
  answers = {},
  isSubmitting = false,
  onSubmit,
}) {
  const answered = Object.keys(answers).length;
  const progress =
    soalList.length > 0 ? Math.round((answered / soalList.length) * 100) : 0;

  return (
    <aside className="md:col-span-1">
      <div className="sticky top-24 bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">Progress</span>
          <strong className="text-lg">{progress}%</strong>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded mb-4">
          <div
            className="h-2 bg-blue-600 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>

        <Button
          onClick={onSubmit}
          loading={isSubmitting}
          disabled={answered < soalList.length || isSubmitting}
          variant="primary"
          className="w-full"
        >
          <Check size={16} /> &nbsp;Selesai & Submit
        </Button>

        <p className="mt-3 text-xs text-gray-600">
          Tips: pastikan semua soal terjawab sebelum submit.
        </p>
      </div>
    </aside>
  );
}
