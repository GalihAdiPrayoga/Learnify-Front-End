import React from "react";
import { Controller } from "react-hook-form";
import { SelectField } from "@/components/fields";

export default function SoalMetaForm({
  control,
  kelasOptions,
  materiOptions,
  selectedKelas,
  setSelectedKelas,
  setValue,
  editing,
  locked,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium mb-2">Kelas</label>
        <SelectField
          options={[
            { value: "", label: "Pilih kelas terlebih dahulu" },
            ...kelasOptions,
          ]}
          value={selectedKelas}
          onChange={(e) => {
            setSelectedKelas(e.target.value);
            setValue("materi_id", "");
          }}
          className="w-full"
          disabled={editing || locked}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Materi</label>
        <Controller
          name="materi_id"
          control={control}
          rules={{ required: "Materi harus dipilih" }}
          render={({ field, fieldState }) => (
            <>
              <SelectField
                options={[
                  {
                    value: "",
                    label: selectedKelas
                      ? "Pilih materi"
                      : "Pilih kelas terlebih dahulu",
                  },
                  ...materiOptions,
                ]}
                value={field.value ?? ""}
                onChange={(e) =>
                  field.onChange?.(e?.target ? e.target.value : e)
                }
                className="w-full"
                disabled={!selectedKelas || editing || locked}
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
    </div>
  );
}
