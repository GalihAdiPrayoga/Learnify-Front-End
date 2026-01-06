import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { materiApi } from "@/services/api/materi.api";
import axiosInstance from "@/services/api/axios";
import Button from "@/components/button";
import { InputField, SelectField, TextareaField } from "@/components/fields";
import Loading from "@/components/Loading";
import toastr from "toastr";
import HeaderCard from "../components/HeaderCard";

export default function MateriFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);

  const { handleSubmit, control, reset, formState } = useForm({
    defaultValues: { kelas_id: "", judul: "", deskripsi: "", konten: "" },
  });

  const [loading, setLoading] = useState(false);
  const [kelasOptions, setKelasOptions] = useState([]);
  const quillRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    axiosInstance
      .get("/kelas")
      .then((res) => {
        if (!mounted) return;
        const list = (res?.data?.data ?? res?.data ?? []).map((k) => ({
          value: k.id,
          label: k.nama || k.nama_kelas || `Kelas ${k.id}`,
        }));
        setKelasOptions(list);
      })
      .catch(() => setKelasOptions([]));
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    if (!editing) return;
    setLoading(true);
    materiApi
      .getById(id)
      .then((res) => {
        const payload = res?.data ?? res ?? {};
        const mat = payload.data ?? payload;
        reset({
          kelas_id: mat.kelas_id ?? mat.kelas?.id ?? "",
          judul: mat.judul ?? "",
          deskripsi: mat.deskripsi ?? "",
          konten: mat.konten ?? mat.content ?? "",
        });
      })
      .catch(() => {
        toastr.error("Gagal memuat materi");
        navigate("/admin/materi");
      })
      .finally(() => setLoading(false));
  }, [id, editing, navigate, reset]);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        const editor = quillRef.current?.getEditor?.();
        if (editor) {
          const range = editor.getSelection(true);
          editor.insertEmbed(range.index, "image", base64);
          editor.setSelection(range.index + 1);

          // Add resize handles after image inserted
          setTimeout(() => {
            const imgs = editor.root.querySelectorAll(
              "img:not([data-resizable])"
            );
            imgs.forEach(makeImageResizable);
          }, 100);
        }
      };
      reader.readAsDataURL(file);
    };
  };

  // Make image resizable
  const makeImageResizable = (img) => {
    if (img.getAttribute("data-resizable")) return;
    img.setAttribute("data-resizable", "true");
    img.style.cursor = "pointer";

    img.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove previous selection
      document.querySelectorAll(".ql-editor img.selected").forEach((i) => {
        i.classList.remove("selected");
        i.style.outline = "none";
      });

      // Select current image
      this.classList.add("selected");
      this.style.outline = "2px solid #3b82f6";

      // Show resize toolbar
      showResizeToolbar(this);
    });
  };

  const showResizeToolbar = (img) => {
    // Remove existing toolbar
    const existingToolbar = document.querySelector(".image-resize-toolbar");
    if (existingToolbar) existingToolbar.remove();

    const toolbar = document.createElement("div");
    toolbar.className = "image-resize-toolbar";
    toolbar.innerHTML = `
      <button type="button" data-size="25">25%</button>
      <button type="button" data-size="50">50%</button>
      <button type="button" data-size="75">75%</button>
      <button type="button" data-size="100">100%</button>
      <button type="button" data-align="left">◀ Left</button>
      <button type="button" data-align="center">▣ Center</button>
      <button type="button" data-align="right">▶ Right</button>
    `;

    toolbar.querySelectorAll("[data-size]").forEach((btn) => {
      btn.onclick = () => {
        const size = btn.getAttribute("data-size");
        img.style.width = size + "%";
        img.style.height = "auto";
      };
    });

    toolbar.querySelectorAll("[data-align]").forEach((btn) => {
      btn.onclick = () => {
        const align = btn.getAttribute("data-align");
        img.style.display = "block";
        if (align === "left") {
          img.style.marginLeft = "0";
          img.style.marginRight = "auto";
        } else if (align === "center") {
          img.style.marginLeft = "auto";
          img.style.marginRight = "auto";
        } else if (align === "right") {
          img.style.marginLeft = "auto";
          img.style.marginRight = "0";
        }
      };
    });

    document.body.appendChild(toolbar);

    const rect = img.getBoundingClientRect();
    toolbar.style.top = rect.top - 45 + "px";
    toolbar.style.left = rect.left + "px";
  };

  // Close toolbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".ql-editor img") &&
        !e.target.closest(".image-resize-toolbar")
      ) {
        const toolbar = document.querySelector(".image-resize-toolbar");
        if (toolbar) toolbar.remove();

        document.querySelectorAll(".ql-editor img.selected").forEach((img) => {
          img.classList.remove("selected");
          img.style.outline = "none";
        });
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ font: [] }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ script: "sub" }, { script: "super" }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        [{ direction: "rtl" }],
        ["blockquote", "code-block"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ["link", "image"],
        [{ width: [] }, { height: [] }],
        ["video"],
        ["formula"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
    clipboard: { matchVisual: false },
  };

  const formats = [
    "font",
    "size",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "script",
    "list",
    "indent",
    "direction",
    "blockquote",
    "code-block",
    "align",
    "color",
    "background",
    "link",
    "image",
    "video",
    "formula",
    "width",
    "height",
  ];

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (editing) {
        await materiApi.update(id, data);
        toastr.success("Materi berhasil diperbarui");
      } else {
        await materiApi.create(data);
        toastr.success("Materi berhasil dibuat");
      }
      navigate("/admin/materi");
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Gagal menyimpan";
      toastr.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6">
      <HeaderCard
        title={editing ? "Edit Materi" : "Tambah Materi"}
        subtitle={editing ? "Perbarui informasi materi" : "Buat materi baru"}
        showBack={true}
        onBack={() => navigate("/admin/materi")}
      />

      <div className="w-full mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg">
        <style>
          {`
            /* === QUILL EDITOR STYLING === */
            .custom-quill .ql-container {
              border: 0;
              box-shadow: none;
              font-family: inherit;
            }
            
            /* make toolbar sticky to viewport/top when page scrolls */
            .custom-quill .ql-toolbar {
              position: sticky;
              top: 72px; /* adjust if your header height differs */
              z-index: 60;
              background: #f9fafb;
              border-bottom: 2px solid #e5e7eb;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
              transition: box-shadow 0.15s ease, backdrop-filter 0.15s;
            }
            .custom-quill .ql-toolbar.stuck {
              box-shadow: 0 6px 18px rgba(0,23,42,0.08);
              backdrop-filter: blur(6px);
            }

            /* make editor area scroll internally (so page doesn't keep scrolling) */
            .custom-quill .ql-editor {
              max-height: 480px;
              overflow: auto;
              padding: 1.25rem;
              font-size: 16px;
              line-height: 1.8;
              border-radius: 0 0 0.5rem 0.5rem;
              color: #1f2937;
            }

            .custom-quill .ql-editor.ql-blank::before {
              color: #9ca3af;
              font-style: italic;
            }

            /* === HEADING STYLES === */
            .custom-quill .ql-editor h1,
            .custom-quill .ql-editor h2,
            .custom-quill .ql-editor h3 {
              font-weight: 700;
              line-height: 1.3;
              margin: 1.5rem 0 0.75rem;
            }

            .custom-quill .ql-editor h1 { font-size: 2rem; }
            .custom-quill .ql-editor h2 { font-size: 1.75rem; }
            .custom-quill .ql-editor h3 { font-size: 1.5rem; }
            .custom-quill .ql-editor h4,
            .custom-quill .ql-editor h5,
            .custom-quill .ql-editor h6 { font-size: 1.125rem; }

            /* === PARAGRAPH & TEXT === */
            .custom-quill .ql-editor p,
            .custom-quill .ql-editor li {
              margin-bottom: 1rem;
            }

            /* === LISTS === */
            .custom-quill .ql-editor ol,
            .custom-quill .ql-editor ul {
              margin: 1rem 0;
              padding-left: 2rem;
            }

            /* === BLOCKQUOTE === */
            .custom-quill .ql-editor blockquote {
              border-left: 4px solid #cbd5f5;
              padding-left: 1rem;
              margin: 1rem 0;
              color: #4b5563;
              font-style: italic;
            }

            /* === CODE === */
            .custom-quill .ql-editor code {
              background: #f3f4f6;
              padding: 0.2rem 0.4rem;
              border-radius: 0.25rem;
              font-size: 0.9em;
            }

            .custom-quill .ql-editor pre {
              background: #1f2937;
              color: #e5e7eb;
              padding: 1rem;
              border-radius: 0.5rem;
              overflow-x: auto;
              margin: 1rem 0;
            }

            .custom-quill .ql-editor pre code {
              background: none;
              color: inherit;
              padding: 0;
            }

            /* === IMAGES === */
            .custom-quill .ql-editor img {
              max-width: 100%;
              height: auto;
              border-radius: 0.5rem;
              margin: 1rem 0;
              transition: all 0.2s;
            }

            .custom-quill .ql-editor img.selected {
              outline: 2px solid #3b82f6;
            }

            /* === IMAGE RESIZE TOOLBAR === */
            .image-resize-toolbar {
              position: fixed;
              background: white;
              border: 1px solid #e5e7eb;
              border-radius: 0.5rem;
              padding: 0.5rem;
              display: flex;
              gap: 0.25rem;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              z-index: 1000;
            }

            .image-resize-toolbar button {
              padding: 0.375rem 0.75rem;
              font-size: 0.75rem;
              background: #f3f4f6;
              border: 1px solid #d1d5db;
              border-radius: 0.25rem;
              cursor: pointer;
              transition: all 0.2s;
            }

            .image-resize-toolbar button:hover {
              background: #e5e7eb;
              border-color: #9ca3af;
            }

            @media (min-width: 768px) {
              .custom-quill .ql-editor {
                min-height: 500px;
              }
            }
          `}
        </style>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT / TOP FIELDS */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium mb-2">Kelas</label>
              <Controller
                name="kelas_id"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <SelectField
                    options={[
                      { value: "", label: "Pilih kelas" },
                      ...kelasOptions,
                    ]}
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange?.(e?.target ? e.target.value : e)
                    }
                    className="w-full"
                  />
                )}
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium mb-2">Judul</label>
              <Controller
                name="judul"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    {...field}
                    placeholder="Masukkan judul materi"
                    className="w-full"
                  />
                )}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Deskripsi
              </label>
              <Controller
                name="deskripsi"
                control={control}
                render={({ field }) => (
                  <TextareaField
                    {...field}
                    rows={3}
                    placeholder="Deskripsi singkat"
                    className="w-full"
                  />
                )}
              />
            </div>
          </div>

          {/* === Separate card for editor content === */}
          <div className="mt-6 border border-gray-200 rounded-lg bg-white shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <label className="block text-sm font-medium">Konten</label>
            </div>

            <div className="p-4">
              <Controller
                name="konten"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <div className="custom-quill">
                    <ReactQuill
                      ref={quillRef}
                      theme="snow"
                      value={field.value || ""}
                      onChange={field.onChange}
                      modules={modules}
                      formats={formats}
                    />
                  </div>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/admin/materi")}
              className="h-10 px-6"
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={formState.isSubmitting}
              className="h-10 px-8"
            >
              {editing ? "Perbarui" : "Simpan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
