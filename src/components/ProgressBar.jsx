import React from "react";

const ProgressBar = ({
  value = 0,
  height = 12,
  onClick,
  label,
  from = "#3b82f6",
  to = "#8b5cf6",
}) => {
  // clamp value
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="w-full" onClick={onClick}>
      {/* track */}
      <div className="relative w-full" style={{ height }}>
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(229,231,235,1), rgba(243,244,246,1))",
          }}
        />
        {/* fill */}
        <div
          className="absolute left-0 top-0 bottom-0 rounded-full"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${from}, ${to})`,
            transition: "width 450ms cubic-bezier(.2,.9,.2,1)",
            boxShadow: "0 4px 14px rgba(59,130,246,0.18)",
          }}
        />
        {/* floating bubble */}
        <div
          className="absolute top-0 h-full flex items-center pointer-events-none"
          style={{
            left: `${Math.min(100, Math.max(0, pct))}%`,
            transform: "translateX(-50%)",
          }}
        >
          <div
            className="bg-white text-xs font-semibold px-2 py-1 rounded-full shadow-md"
            style={{
              transform: "translateY(-60%)",
              minWidth: 42,
              textAlign: "center",
            }}
          >
            {pct}%
          </div>
        </div>
      </div>

      {label ? <div className="mt-2 text-sm text-gray-600">{label}</div> : null}
    </div>
  );
};

export default ProgressBar;
