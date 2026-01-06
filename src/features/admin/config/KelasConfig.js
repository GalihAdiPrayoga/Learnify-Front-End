// config/KelasConfig.js

export const KelasColumns = [
  { key: "__no", label: "No" },
  { key: "nama", label: "Nama Kelas" },
  // gunakan type: "image" agar DataTables merender gambar (dengan fallback thumnail/gambar)
  { key: "thumbnail", label: "Thumbnail", type: "image" },
  {
    key: "created_at",
    label: "Dibuat",
    render: (v) => (v ? new Date(v).toLocaleDateString("id-ID") : "-"),
  },
];

export const KelasFormFields = [
  { key: "nama", label: "Nama Kelas", type: "text", required: true },
  { key: "thumbnail", label: "Thumbnail", type: "file", required: false },
];
