export const SoalColumns = [
  { key: "__no", label: "No", width: "w-16" },
  {
    key: "pertanyaan",
    label: "Pertanyaan",
    width: "w-1/3",
  },
  {
    key: "materi.judul",
    label: "Materi",
    width: "w-48",
    render: (value, row) => row.materi?.judul || "-",
  },
  {
    key: "jawaban_benar",
    label: "Jawaban Benar",
    width: "w-32",
    render: (value) => value?.toUpperCase(),
  },
];
