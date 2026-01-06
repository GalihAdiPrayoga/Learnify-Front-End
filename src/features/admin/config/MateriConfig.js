// Konfigurasi kolom dan form untuk entitas Materi

export const MateriColumns = [
  { Header: "No", accessor: (_row, i) => i + 1 },
  { Header: "Judul", accessor: "judul" },
  { Header: "Deskripsi", accessor: "deskripsi" },
  // backend bisa mengirim nama kelas sebagai 'kelas_nama' atau serupa
  { Header: "Kelas", accessor: "kelas_nama" },
  { Header: "Dibuat", accessor: "created_at" },
  // kolom aksi disediakan untuk DataTables; render tombol dilakukan oleh komponen tabel atau page
  { Header: "Aksi", accessor: "aksi" },
];

export const MateriFormFields = [
  {
    key: "kelas_id",
    label: "Kelas",
    type: "select",
    placeholder: "Pilih kelas",
    required: true,
    // options diisi dinamically dari API sebelum render form
    options: [],
  },
  {
    key: "judul",
    label: "Judul",
    type: "text",
    placeholder: "Masukkan judul materi",
    required: true,
  },
  {
    key: "deskripsi",
    label: "Deskripsi",
    type: "textarea",
    placeholder: "Deskripsi singkat",
    required: true,
  },
  {
    key: "konten",
    label: "Konten",
    type: "richtext", // gunakan React Quill / rich text editor
    placeholder: "",
    required: true,
  },
];

// helper: buat initial form object berdasarkan field config
export const getMateriInitialForm = () => {
  const form = {};
  MateriFormFields.forEach((f) => {
    form[f.key] = f.type === "file" ? null : "";
  });
  return form;
};
