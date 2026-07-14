import React, { useEffect, useState } from "react";
import SettingsLayout from "../../../Components/settings/SettingsLayout";
import { apiUrl } from "../../../lib/api";

const languages = [
  { code: "en", label: "English", native: "English" },
  { code: "ar", label: "Arabic", native: "العربية" },
];

export default function Language() {
  const [selected, setSelected] = useState("en");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch(apiUrl("/user"))
      .then((res) => {
        if (!res.ok) throw new Error(`مشكلة في السيرفر: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setSelected(data.language || "en");
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSave = () => {
    setSaving(true);
    setMessage(null);
    fetch(apiUrl("/user"), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: selected }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`مشكلة في السيرفر: ${res.status}`);
        return res.json();
      })
      .then(() => {
        setSaving(false);
        setMessage({ type: "success", text: "تم تحديث اللغة بنجاح" });
      })
      .catch((err) => {
        setSaving(false);
        setMessage({ type: "error", text: err.message });
      });
  };

  if (loading) {
    return (
      <div className="flex-1 min-h-screen bg-[var(--light-gray)] p-6 flex flex-col items-center justify-center text-sm font-bold text-[#1A1A2E] gap-3">
        <div className="w-8 h-8 border-4 border-[#5570F1] border-t-transparent rounded-full animate-spin"></div>
        <span>جاري تحميل البيانات...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 min-h-screen bg-[var(--light-gray)] p-6 flex items-center justify-center text-sm text-red-500 font-bold">
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center shadow-sm">
          <p>⚠️ حدث خطأ أثناء الاتصال بالسيرفر</p>
          <p className="text-xs bg-white p-2 rounded border mt-2 font-mono text-left">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <SettingsLayout sectionTitle="Language" onSave={handleSave} saving={saving} saveLabel="Save Updates">
      {message && (
        <div
          className={`mb-4 rounded-lg px-4 py-2.5 text-xs font-bold ${
            message.type === "success" ? "bg-[var(--secondary-shade)] text-[var(--secondary)]" : "bg-red-50 text-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {languages.map((lang) => {
          const isSelected = selected === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setSelected(lang.code)}
              className={`flex items-center justify-between rounded-xl border px-5 py-4 text-left transition-colors duration-150 outline-none
                ${isSelected ? "border-[var(--secondary)] bg-[var(--secondary-shade)]" : "border-[#EEEEEE] bg-[#FAFBFF] hover:border-[var(--secondary)]"}`}
            >
              <div>
                <p className="text-sm font-black text-[#1A1A2E]">{lang.label}</p>
                <p className="text-xs font-bold text-[#999999]">{lang.native}</p>
              </div>
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border-2
                  ${isSelected ? "border-[var(--secondary)] bg-[var(--secondary)]" : "border-[#E5E7EB]"}`}
              >
                {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
              </div>
            </button>
          );
        })}
      </div>
    </SettingsLayout>
  );
}
