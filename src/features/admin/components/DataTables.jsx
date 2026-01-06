import { STORAGE_URL } from "@/services/api/axios";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Button from "@/components/button";
import Alert from "@/components/alert";
import NotFound from "@/features/error/notfound";
import { useState } from "react";

export default function DataTables({
  columns = [],
  data = [],
  onEdit,
  onDelete,
  showActions = true,
}) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setAlertOpen(true);
  };

  const handleConfirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await onDelete(deleteId);
    } finally {
      setDeleteLoading(false);
      setAlertOpen(false);
      setDeleteId(null);
    }
  };

  const buildImageSrc = (row, key) => {
    // coba berbagai kemungkinan nama field (thumbnail / thumnail / gambar / image)
    const imgPath =
      row?.[key] ??
      row?.thumbnail ??
      row?.thumnail ?? // backend typo fallback
      row?.gambar ??
      row?.image;

    if (!imgPath) return null;

    // jika sudah berupa URL absolut (http/https), kembalikan langsung
    if (/^https?:\/\//i.test(String(imgPath))) return String(imgPath);

    const base = String(STORAGE_URL || "").replace(/\/+$/, "");
    const path = String(imgPath).replace(/^\/+/, "");
    return `${base}/${path}`;
  };

  return (
    <div className="relative overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <style>
        {`
          table td {
            word-break: break-word;
            overflow-wrap: break-word;
            white-space: normal;
          }
        `}
      </style>
      <table className="min-w-full divide-y divide-gray-200">
        {/* HEADER */}
        <thead className="sticky top-0 z-10 bg-gray-50/90 backdrop-blur">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
            {showActions && (
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y divide-gray-100">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (showActions ? 1 : 0)}
                className="px-6 py-12"
              >
                <NotFound
                  title="Tidak Ada Data"
                  message="Belum ada data yang sesuai dengan kriteria pencarian Anda."
                  type="notfound"
                />
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={row.id ?? index}
                className="transition odd:bg-white even:bg-gray-50 hover:bg-indigo-50/40"
              >
                {columns.map((column) => {
                  const imgSrc =
                    column.type === "image"
                      ? buildImageSrc(row, column.key)
                      : null;

                  return (
                    <td
                      key={column.key}
                      className="px-6 py-4 text-sm text-gray-700 align-middle max-w-xs"
                    >
                      {column.render ? (
                        column.render(row[column.key], row)
                      ) : imgSrc ? (
                        <div className="group relative h-12 w-12">
                          <img
                            src={imgSrc}
                            alt={row.nama || ""}
                            className="h-12 w-12 rounded-lg object-cover border border-gray-200 transition-transform duration-200 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        row[column.key] ?? "-"
                      )}
                    </td>
                  );
                })}

                {/* ACTIONS */}
                {showActions && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {onEdit && (
                        <Button
                          type="button"
                          title="edit"
                          variant="secondary"
                          className="p-2 h-9 w-9 rounded-full border border-gray-200 bg-white text-indigo-600 shadow-sm hover:bg-indigo-50 hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-200"
                          onClick={() => onEdit(row)}
                        >
                          <Pencil size={16} />
                        </Button>
                      )}

                      {onDelete && (
                        <Button
                          type="button"
                          title="hapus"
                          variant="secondary"
                          className="p-2 h-9 w-9 rounded-full border border-gray-200 bg-white text-red-600 shadow-sm hover:bg-red-50 hover:shadow focus:outline-none focus:ring-2 focus:ring-red-200"
                          onClick={() => handleDeleteClick(row.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Alert
        open={alertOpen}
        title="Hapus Data"
        message="Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan."
        type="danger"
        confirmText="Hapus"
        cancelText="Batal"
        loading={deleteLoading}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setAlertOpen(false);
          setDeleteId(null);
        }}
      />
    </div>
  );
}
