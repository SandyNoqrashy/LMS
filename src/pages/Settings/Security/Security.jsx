import React, { useEffect, useState } from "react";
import SettingsLayout from "../../../Components/settings/SettingsLayout";
import { apiUrl } from "../../../lib/api";

const deviceIcons = {
  desktop: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  laptop: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  mobile: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
};

export default function Security() {
  const [user, setUser] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(apiUrl("/user")).then((res) => {
        if (!res.ok) throw new Error(`مشكلة في السيرفر: ${res.status}`);
        return res.json();
      }),
      fetch(apiUrl("/sessions")).then((res) => {
        if (!res.ok) throw new Error(`مشكلة في السيرفر: ${res.status}`);
        return res.json();
      }),
    ])
      .then(([userData, sessionsData]) => {
        setUser(userData);
        setSessions(sessionsData);
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
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`مشكلة في السيرفر: ${res.status}`);
        return res.json();
      })
      .then(() => {
        setSaving(false);
        setMessage({ type: "success", text: "تم تحديث إعدادات الأمان بنجاح" });
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
    <SettingsLayout sectionTitle="Login details" onSave={handleSave} saving={saving}>
      {message && (
        <div
          className={`mb-4 rounded-lg px-4 py-2.5 text-xs font-bold ${
            message.type === "success" ? "bg-[var(--secondary-shade)] text-[var(--secondary)]" : "bg-red-50 text-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="rounded-xl border border-[#EEEEEE] bg-[#FAFBFF] divide-y divide-[#EEEEEE]">
        <div className="px-5 py-4">
          <p className="text-xs font-bold text-[#999999]">Current password</p>
          <p className="mt-1 text-sm font-bold tracking-widest text-[#1A1A2E]">••••••••••</p>
        </div>
        <div className="px-5 py-4">
          <p className="text-xs font-bold text-[#999999]">Security questions</p>
          <p className="mt-1 text-sm font-bold text-[#1A1A2E]">{user.securityQuestion}</p>
        </div>
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <p className="text-xs font-bold text-[#999999]">2-Step verification</p>
            <p className="mt-1 text-sm font-bold text-[#1A1A2E]">{user.twoStepEnabled ? "Enabled" : "Disabled"}</p>
          </div>
          <button
            type="button"
            onClick={() => setUser((prev) => ({ ...prev, twoStepEnabled: !prev.twoStepEnabled }))}
            className="rounded-lg border border-[var(--secondary)] px-4 py-1.5 text-xs font-bold text-[var(--secondary)] transition-colors duration-150 hover:bg-[var(--secondary-shade)] outline-none"
          >
            {user.twoStepEnabled ? "Disable" : "Enable"}
          </button>
        </div>
      </div>

      <h2 className="mb-3 mt-8 text-sm font-black text-[#1A1A2E]">Security credentials</h2>
      <div className="rounded-xl border border-[#EEEEEE] bg-[#FAFBFF] divide-y divide-[#EEEEEE]">
        {sessions.map((session) => (
          <div key={session.id} className="flex items-center justify-between px-5 py-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-[#EEEEEE] text-[var(--secondary)]">
                {deviceIcons[session.device] ?? deviceIcons.desktop}
              </div>
              <div>
                <p className="text-xs font-medium text-[#999999]">{session.dateTime}</p>
                <p className="text-sm font-bold text-[#1A1A2E]">{session.label}</p>
              </div>
            </div>
            {session.current && (
              <span className="rounded-full bg-[var(--secondary)] px-3 py-1 text-[10px] font-black uppercase tracking-wide text-white">
                Current session
              </span>
            )}
          </div>
        ))}
      </div>
    </SettingsLayout>
  );
}
