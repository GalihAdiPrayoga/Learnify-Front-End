import React, { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, Upload, X, ChevronDown } from "lucide-react";

export function InputField({
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
  ...props
}) {
  const baseStyles =
    "w-full px-4 py-3 border rounded-lg focus:outline-none bg-neural-800 text-gray-500";

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`${baseStyles} ${className}`}
      {...props}
    />
  );
}

export function PasswordField({
  placeholder = "Enter your password",
  value,
  onChange,
  required = false,
  className = "",
  ...props
}) {
  const [show, setShow] = useState(false);

  const baseStyles =
    "w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none bg-neural-800 text-gray-500";

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`${baseStyles} ${className}`}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition"
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}

export function SelectField({
  options = [],
  placeholder = "Select an option",
  value,
  onChange,
  required = false,
  className = "",
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const internalValue = value ?? ""; // normalize null/undefined -> ""
  const selectedLabel =
    options.find((o) => String(o.value ?? "") === String(internalValue))
      ?.label || placeholder;

  const rootRef = useRef(null);

  // close dropdown when clicking/touching outside
  useEffect(() => {
    const handleOutside = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, []);

  return (
    <div className="relative" ref={rootRef}>
      <div
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none bg-neural-800 text-gray-500 resize-none ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <span className={value ? "text-gray-900" : "text-gray-500"}>
            {selectedLabel}
          </span>
          <ChevronDown
            size={20}
            className={`text-gray-600 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Hidden select untuk form submission */}
      <select
        value={internalValue}
        onChange={(e) => {
          onChange?.(e);
          setIsOpen(false);
        }}
        required={required}
        className="hidden"
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={String(option.value)} value={String(option.value ?? "")}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={String(option.value)}
                type="button"
                onClick={() => {
                  onChange?.({ target: { value: option.value ?? "" } });
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 ${
                  String(internalValue) === String(option.value ?? "")
                    ? "bg-gray-300 text-gray-700 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function TextareaField({
  placeholder,
  value,
  onChange,
  required = false,
  rows = 4,
  className = "",
  ...props
}) {
  const baseStyles =
    "w-full px-4 py-3 border rounded-lg focus:outline-none bg-neural-800 text-gray-500 resize-none";

  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
      className={`${baseStyles} ${className}`}
      {...props}
    />
  );
}

export function FileUploadField({
  accept = "image/*",
  value,
  onChange,
  required = false,
  className = "",
  ...props
}) {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onChange?.(file);
    }
  };

  const handleClear = () => {
    setFileName("");
    onChange?.(null);
  };

  return (
    <div className={`${className}`}>
      <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition bg-neural-800">
        <div className="flex flex-col items-center justify-center">
          <Upload size={24} className="text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">
            {fileName || "Click to upload file"}
          </p>
        </div>
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          required={required}
          className="hidden"
          {...props}
        />
      </label>
      {fileName && (
        <button
          type="button"
          onClick={handleClear}
          className="mt-2 text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
        >
          <X size={16} />
          Clear
        </button>
      )}
    </div>
  );
}

export function DateField({
  value,
  onChange,
  required = false,
  min,
  max,
  className = "",
  ...props
}) {
  const baseStyles =
    "w-full px-4 py-3 border rounded-lg focus:outline-none bg-neural-800 text-gray-500";

  return (
    <input
      type="date"
      value={value}
      onChange={onChange}
      required={required}
      min={min}
      max={max}
      className={`${baseStyles} ${className}`}
      {...props}
    />
  );
}

export function CheckboxField({
  label,
  checked,
  onChange,
  required = false,
  className = "",
  ...props
}) {
  return (
    <label className={`flex items-center gap-3 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        required={required}
        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
        {...props}
      />
      <span className="text-gray-700">{label}</span>
    </label>
  );
}

export function SwitchField({
  label,
  checked,
  onChange,
  className = "",
  ...props
}) {
  return (
    <label className={`flex items-center gap-3 cursor-pointer ${className}`}>
      <div
        className={`relative w-12 h-6 rounded-full transition-colors ${
          checked ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="hidden"
          {...props}
        />
        <div
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
            checked ? "translate-x-6" : ""
          }`}
        />
      </div>
      {label && <span className="text-gray-700">{label}</span>}
    </label>
  );
}
