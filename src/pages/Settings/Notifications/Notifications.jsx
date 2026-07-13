import React, { useEffect, useState } from "react";
import SettingsLayout from "../../../Components/settings/SettingsLayout";
import Toggle from "../../../Components/settings/Toggle";
import { apiUrl } from "../../../lib/api";

export default function Notifications() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch(apiUrl("/notifications"))
      .then((res) => {
        if (!res.ok) throw new Error(`مشكلة في السيرفر: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setSaving(true);
    setMessage(null);
    fetch(apiUrl("/notifications"), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`مشكلة في السيرفر: ${res.status}`);
        return res.json();
      })
      .then(() => {
        setSaving(false);
        setMessage({ type: "success", text: "تم حفظ إعدادات الإشعارات بنجاح" });
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

  const rows = [
    {
      key: "learning",
      title: "Learning",
      description: "Receive notifications when new lessons are added to your enrolled courses.",
    },
    {
      key: "liveSessions",
      title: "Live Sessions",
      description: "Get reminders before your scheduled live sessions begin.",
    },
    {
      key: "assignments",
      title: "Assignments",
      multi: [
        { key: "assignmentsDeadline", description: "Receive reminders before assignment submission deadlines." },
        { key: "assignmentsGraded", description: "Be notified when your instructor grades or comments on your assignment." },
      ],
    },
    {
      key: "quizzes",
      title: "Quizzes",
      description: "Receive alerts when new quizzes or assessments become available.",
    },
    {
      key: "community",
      title: "Community",
      description: "Receive notifications about replies, mentions, and new discussions in the community.",
    },
    {
      key: "aiAssistant",
      title: "AI Assistant",
      description: "Receive personalized course and lesson recommendations from the AI Assistant.",
    },
    {
      key: "account",
      title: "Account",
      description: "Receive notifications about password changes, login activity, and account security updates.",
    },
  ];

  return (
    <SettingsLayout sectionTitle="Notifications" onSave={handleSave} saving={saving} saveLabel="Save Updates">
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
        {rows.map((row) => (
          <div key={row.key} className="px-5 py-4">
            <p className="mb-2 text-xs font-bold text-[#999999]">{row.title}</p>

            {row.multi ? (
              <div className="flex flex-col gap-3">
                {row.multi.map((sub) => (
                  <div key={sub.key} className="flex items-center justify-between gap-4">
                    <p className="text-sm font-bold text-[#1A1A2E]">{sub.description}</p>
                    <Toggle checked={!!settings[sub.key]} onChange={() => toggle(sub.key)} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-bold text-[#1A1A2E]">{row.description}</p>
                <Toggle checked={!!settings[row.key]} onChange={() => toggle(row.key)} />
              </div>
            )}
          </div>
        ))}
      </div>
    </SettingsLayout>
  );
}
