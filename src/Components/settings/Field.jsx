import React from "react";

export default function Field({ label, type = "text", value, onChange, placeholder, name, disabled = false }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-bold text-[#999999]">{label}</span>
      <input
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3.5 py-2.5 text-sm font-bold text-[#1A1A2E] outline-none transition-colors duration-150 focus:border-[var(--secondary)] disabled:bg-[#FAFAFA] disabled:text-[#999999]"
      />
    </label>
  );
}
