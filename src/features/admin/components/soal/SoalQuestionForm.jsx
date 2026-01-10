import React from "react";
import { Controller } from "react-hook-form";
import { InputField, TextareaField, SelectField } from "@/components/fields";

export default function SoalQuestionForm({ control }) {
  const jawabanOptions = [
    { value: "", label: "Pilih jawaban benar" },
    { value: "a", label: "A" },
    { value: "b", label: "B" },
    { value: "c", label: "C" },
    { value: "d", label: "D" },
  ];

  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-2">Pertanyaan</label>
        <Controller
          name="pertanyaan"
          control={control}
          rules={{ required: "Pertanyaan harus diisi" }}
          render={({ field, fieldState }) => (
            <>
              <TextareaField
                {...field}
                rows={3}
                placeholder="Masukkan pertanyaan"
                className="w-full"
              />
              {fieldState.error && (
                <p className="text-xs text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["a", "b", "c", "d"].map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-2">
              Jawaban {key.toUpperCase()}
            </label>
            <Controller
              name={`jawaban_${key}`}
              control={control}
              rules={{ required: `Jawaban ${key.toUpperCase()} harus diisi` }}
              render={({ field, fieldState }) => (
                <>
                  <InputField
                    {...field}
                    placeholder={`Jawaban ${key.toUpperCase()}`}
                    className="w-full"
                  />
                  {fieldState.error && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Jawaban Benar</label>
        <Controller
          name="jawaban_benar"
          control={control}
          rules={{ required: "Jawaban benar harus dipilih" }}
          render={({ field, fieldState }) => (
            <>
              <SelectField
                options={jawabanOptions}
                value={field.value ?? ""}
                onChange={(e) =>
                  field.onChange?.(e?.target ? e.target.value : e)
                }
                className="w-full"
              />
              {fieldState.error && (
                <p className="text-xs text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      </div>
    </>
  );
}
