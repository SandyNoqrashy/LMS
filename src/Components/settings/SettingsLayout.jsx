import React from "react";
import { useNavigate } from "react-router-dom";

export default function SettingsLayout({
  sectionTitle,
  children,
  onSave,
  saving = false,
  saveLabel = "Update Settings",
  showFooter = true,
}) {
  const navigate = useNavigate();

  return (
    <div
      style={{ fontFamily: "'Cairo', sans-serif" }}
      className="flex-1 min-h-screen bg-[var(--light-gray)] p-6"
    >
      <div className="mx-auto w-full max-w-[900px] rounded-2xl bg-white p-8 shadow-sm border border-[#EEEEEE]">
        <h1 className="text-lg font-black text-[#1A1A2E]">Profile settings</h1>

        <div className="mt-6 flex flex-col gap-8">
          <div>
            <h2 className="mb-3 text-sm font-black text-[#1A1A2E]">{sectionTitle}</h2>
            {children}
          </div>
        </div>

        {showFooter && (
          <div className="mt-8 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-xl border border-[var(--secondary)] bg-white px-6 py-2.5 text-sm font-bold text-[var(--secondary)] transition-colors duration-150 hover:bg-[var(--secondary-shade)] outline-none"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSave}
              disabled={saving}
              className="rounded-xl bg-[var(--secondary)] px-6 py-2.5 text-sm font-bold text-white transition-opacity duration-150 hover:opacity-90 disabled:opacity-60 outline-none"
            >
              {saving ? "Saving..." : saveLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
