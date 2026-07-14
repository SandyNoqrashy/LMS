import React from "react";

// سويتش تفعيل/إلغاء بسيط بيتحكم فيه من برة (controlled component)
export default function Toggle({ checked, onChange, disabled = false }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors duration-200 border-0 outline-none
        ${checked ? "bg-[var(--secondary)]" : "bg-[#E0E0E6]"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow-sm transition-transform duration-200
          ${checked ? "translate-x-[22px]" : "translate-x-[3px]"}`}
        style={{ height: "18px", width: "18px" }}
      />
    </button>
  );
}
