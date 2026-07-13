import React from "react";

export default function SelectField({ label, value, onChange, name, options }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-bold text-[#999999]">{label}</span>
      <select
        name={name}
        value={value ?? ""}
        onChange={onChange}
        className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3.5 py-2.5 text-sm font-bold text-[#1A1A2E] outline-none transition-colors duration-150 focus:border-[var(--secondary)]"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
