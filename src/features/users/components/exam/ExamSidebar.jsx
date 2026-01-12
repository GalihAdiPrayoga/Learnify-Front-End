import React, { useEffect, useRef, useState } from "react";
import Button from "@/components/button";
import { Check, Clock } from "lucide-react";

export default function ExamSidebar({
  soalList = [],
  answers = {},
  isSubmitting = false,
  onSubmit,
  durationSeconds = null, // optional total seconds
  onAutoSubmit = null, // optional auto-submit handler
}) {
  const answered = Object.keys(answers).length;
  const progress =
    soalList.length > 0 ? Math.round((answered / soalList.length) * 100) : 0;

  // Timer state
  const [timeLeft, setTimeLeft] = useState(
    typeof durationSeconds === "number" && durationSeconds > 0
      ? durationSeconds
      : 0
  );
  const intervalRef = useRef(null);

  // init/reset when duration changes
  useEffect(() => {
    if (typeof durationSeconds === "number" && durationSeconds > 0) {
      setTimeLeft(durationSeconds);
    } else {
      setTimeLeft(0);
    }
  }, [durationSeconds]);

  // countdown
  useEffect(() => {
    if (!durationSeconds || isSubmitting) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [durationSeconds, isSubmitting]);

  // auto-submit when timeLeft reaches 0
  useEffect(() => {
    if (durationSeconds && timeLeft === 0) {
      if (typeof onAutoSubmit === "function" && !isSubmitting) {
        // scroll top then auto submit
        if (typeof window !== "undefined") {
          try {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } catch {
            window.scrollTo(0, 0);
          }
        }
        onAutoSubmit();
      }
    }
  }, [timeLeft, durationSeconds, onAutoSubmit, isSubmitting]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  const timePct =
    durationSeconds && durationSeconds > 0
      ? Math.max(
          0,
          Math.min(100, Math.round((timeLeft / durationSeconds) * 100))
        )
      : 0;

  return (
    <aside className="md:col-span-1">
      <div className="sticky top-24 bg-white p-4 rounded-lg border-gray-400 shadow-sm">
        {/* Timer */}
        {durationSeconds ? (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-900" />
                <span className="text-sm text-gray-500">Waktu Tersisa</span>
              </div>
              <strong
                className={`text-lg ${
                  timeLeft <= 60 ? "text-indigo-700" : "text-indigo-800"
                }`}
              >
                {formatTime(timeLeft)}
              </strong>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded mb-2">
              <div
                className="h-2 rounded bg-linear-to-r from-indigo-600 via-indigo-700 to-blue-900"
                style={{ width: `${timePct}%`, transition: "width 400ms ease" }}
              />
            </div>
            <div className="text-xs text-gray-900">
              Sisa waktu: {formatTime(timeLeft)}
            </div>
          </div>
        ) : null}

        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-900">Progress</span>
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

        <p className="mt-3 text-xs text-gray-900">
          Tips: pastikan semua soal terjawab sebelum submit.
        </p>
      </div>
    </aside>
  );
}
