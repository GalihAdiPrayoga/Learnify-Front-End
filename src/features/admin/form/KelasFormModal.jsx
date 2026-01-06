import Modal from "../components/Modal";
import Button from "@/components/button";
import { FileUploadField, InputField } from "@/components/fields";
import { KelasFormFields } from "../config/KelasConfig";

export default function KelasFormModal({
  open,
  onClose,
  onSubmit,
  loading,
  editingKelas,
  formData,
  setFormData,
  getPreviewSrc,
  handleFileChange,
}) {
  if (!open) return null;

  return (
    <Modal
      title={editingKelas ? "Edit Kelas" : "Tambah Kelas"}
      onClose={onClose}
    >
      <div className="relative">
        <form onSubmit={onSubmit} className="relative z-10">
          {KelasFormFields.map((field) => (
            <div className="mb-4" key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>

              {field.type === "file" ? (
                <>
                  <FileUploadField
                    onChange={(file) => handleFileChange(field.key, file)}
                    disabled={loading}
                  />
                  {getPreviewSrc(field.key) && (
                    <img
                      src={getPreviewSrc(field.key)}
                      alt={formData.nama || editingKelas?.nama || ""}
                      className="h-24 w-24 mt-2 rounded border object-cover"
                    />
                  )}
                </>
              ) : (
                <InputField
                  value={formData[field.key]}
                  onChange={(e) =>
                    setFormData((s) => ({
                      ...s,
                      [field.key]: e.target.value,
                    }))
                  }
                  required={field.required}
                  disabled={loading}
                  className="h-10 w-full px-3 rounded-md border"
                />
              )}
            </div>
          ))}

          <div className="flex justify-end gap-2 mt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="w-20 h-10"
              disabled={loading}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              className="w-20 h-10"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
