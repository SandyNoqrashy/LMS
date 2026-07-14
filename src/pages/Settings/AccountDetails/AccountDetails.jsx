import React, { useEffect, useState } from "react";
import Field from "../../../Components/settings/Field";
import SelectField from "../../../Components/settings/SelectField";
import { apiUrl } from "../../../lib/api";

export default function AccountDetails() {
  const [profile, setProfile] = useState(null);
  const [devices, setDevices] = useState([]);
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
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
      fetch(apiUrl("/devices")).then((res) => {
        if (!res.ok) throw new Error(`مشكلة في السيرفر: ${res.status}`);
        return res.json();
      }),
    ])
      .then(([userData, devicesData]) => {
        setProfile(userData);
        setDevices(devicesData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleDisconnect = (id) => {
    fetch(apiUrl(`/devices/${id}`), { method: "DELETE" })
      .then(() => setDevices((prev) => prev.filter((d) => d.id !== id)))
      .catch(() => setError("تعذر فصل الجهاز، حاول مرة أخرى"));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, avatar: url }));
  };

  const handleSave = () => {
    if (passwords.newPassword && passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ type: "error", text: "New Password و New Password Again مش متطابقين" });
      return;
    }

    setSaving(true);
    setMessage(null);

    fetch(apiUrl("/user"), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`مشكلة في السيرفر: ${res.status}`);
        return res.json();
      })
      .then(() => {
        setSaving(false);
        setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
        setMessage({ type: "success", text: "تم تحديث بياناتك بنجاح" });
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
    <div style={{ fontFamily: "'Cairo', sans-serif" }} className="flex-1 min-h-screen bg-[var(--light-gray)] p-6">
      <div className="mx-auto w-full max-w-[900px] rounded-2xl bg-white p-8 shadow-sm border border-[#EEEEEE]">
        <h1 className="text-lg font-black text-[#1A1A2E]">Profile settings</h1>

        {message && (
          <div
            className={`mt-4 rounded-lg px-4 py-2.5 text-xs font-bold ${
              message.type === "success" ? "bg-[var(--secondary-shade)] text-[var(--secondary)]" : "bg-red-50 text-red-600"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Personal Information */}
        <div className="mt-6">
          <h2 className="mb-3 text-sm font-black text-[#1A1A2E]">Personal Information</h2>
          <div className="rounded-xl border border-[#EEEEEE] bg-[#FAFBFF] p-5">
            <div className="mb-5 flex items-center gap-4">
              {profile.avatar ? (
                <img src={profile.avatar} alt={profile.fullName} className="h-14 w-14 rounded-full object-cover border-2 border-[var(--secondary)]" />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--secondary)] bg-[var(--secondary-shade)] text-lg font-bold text-[var(--secondary)]">
                  {profile.fullName?.[0] ?? "U"}
                </div>
              )}
              <label className="cursor-pointer rounded-lg bg-[var(--secondary)] px-4 py-1.5 text-xs font-bold text-white transition-opacity duration-150 hover:opacity-90">
                Change
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Name" name="fullName" value={profile.fullName} onChange={handleChange} />
              <Field label="Email" name="email" type="email" value={profile.email} onChange={handleChange} />
              <SelectField label="Gender" name="gender" value={profile.gender} onChange={handleChange} options={["Female", "Male"]} />
              <Field label="Date of birth" name="dateOfBirth" type="date" value={profile.dateOfBirth} onChange={handleChange} />
              <Field label="Phone number" name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} />
              <Field label="Address" name="address" value={profile.address} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="mt-6">
          <h2 className="mb-3 text-sm font-black text-[#1A1A2E]">Change Password</h2>
          <div className="rounded-xl border border-[#EEEEEE] bg-[#FAFBFF] p-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field label="Old Password" name="oldPassword" type="password" placeholder="Enter your password" value={passwords.oldPassword} onChange={handlePasswordChange} />
              <Field label="New Password" name="newPassword" type="password" placeholder="Enter your password" value={passwords.newPassword} onChange={handlePasswordChange} />
              <Field label="New Password Again" name="confirmPassword" type="password" placeholder="Enter your password" value={passwords.confirmPassword} onChange={handlePasswordChange} />
            </div>
          </div>
        </div>

        {/* Devices */}
        <div className="mt-6">
          <h2 className="mb-3 text-sm font-black text-[#1A1A2E]">Devices</h2>
          <div className="rounded-xl border border-[#EEEEEE] bg-[#FAFBFF] divide-y divide-[#EEEEEE]">
            {devices.length === 0 && (
              <p className="p-5 text-xs font-bold text-[#999999]">مفيش أجهزة متصلة حالياً</p>
            )}
            {devices.map((device) => (
              <div key={device.id} className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-[#EEEEEE] text-[var(--secondary)]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1A1A2E]">{device.name}</p>
                    <p className="text-xs font-medium text-[#999999]">{device.lastUsed}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDisconnect(device.id)}
                  className="rounded-lg border border-[var(--secondary)] px-4 py-1.5 text-xs font-bold text-[var(--secondary)] transition-colors duration-150 hover:bg-[var(--secondary-shade)] outline-none"
                >
                  Disconnect
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded-xl border border-[var(--secondary)] bg-white px-6 py-2.5 text-sm font-bold text-[var(--secondary)] transition-colors duration-150 hover:bg-[var(--secondary-shade)] outline-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-xl bg-[var(--secondary)] px-6 py-2.5 text-sm font-bold text-white transition-opacity duration-150 hover:opacity-90 disabled:opacity-60 outline-none"
          >
            {saving ? "Saving..." : "Update Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
