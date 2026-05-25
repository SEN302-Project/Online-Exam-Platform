import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Camera, Mail, Phone, MapPin, Calendar, Lock, Bell, Shield, Trash2, Save,
} from "lucide-react";
import Navbar from "../components/common/Navbar";
import { useAuth } from "../context/AuthContext";
import { roleLabel } from "../utils/roleGuard";

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");

  const tabs = [
    { id: "personal", label: "Personal Info", icon: Mail },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-10">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50 transition mb-6"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* Profile header */}
        <div className="card overflow-hidden mb-6">
          <div className="h-24 sm:h-32 bg-gradient-to-r from-accent-600 via-accent-500 to-ink-900 relative">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }}
            />
          </div>
          <div className="px-4 sm:px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-5 -mt-10 sm:-mt-12 mb-4">
              <div className="relative shrink-0">
                <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl bg-white text-accent-700 ring-4 ring-white shadow-soft">
                  <span className="font-display text-3xl sm:text-4xl font-bold">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-ink-900 text-white shadow-soft hover:bg-ink-800 transition">
                  <Camera size={13} />
                </button>
              </div>
              <div className="sm:pb-1">
                <h1 className="font-display text-xl sm:text-2xl font-semibold text-ink-900">
                  {user?.name || "User"}
                </h1>
                <p className="text-ink-500 text-sm">{roleLabel(user?.role || "")}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-ink-100">
              <Stat label="Member since" value="Jan 2026" />
              <Stat label="Exams taken" value="12" />
              <Stat label="Avg score" value="84%" />
              <Stat label="Best rank" value="#7" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          {/* Tabs - horizontal scroll on mobile */}
          <nav className="card p-2 h-fit overflow-x-auto">
            <div className="flex lg:flex-col gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-ink-900 text-white shadow-soft"
                      : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>

          <div className="card p-4 sm:p-6">
            {activeTab === "personal" && <PersonalInfoTab user={user} />}
            {activeTab === "security" && <SecurityTab />}
            {activeTab === "notifications" && <NotificationsTab />}
            {activeTab === "privacy" && <PrivacyTab />}
          </div>
        </div>
      </main>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-widest text-ink-400">{label}</div>
      <div className="font-display text-lg sm:text-xl font-bold text-ink-900 mt-0.5">{value}</div>
    </div>
  );
}

function PersonalInfoTab({ user }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink-900 mb-1">Personal Information</h2>
      <p className="text-sm text-ink-500 mb-6">Update your profile details and contact info.</p>
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full Name" defaultValue={user?.name || ""} />
          <Field label="Display Name" defaultValue={user?.name?.split(" ")[0] || ""} />
        </div>
        <Field label="Email" type="email" defaultValue={user?.email || ""} icon={Mail} />
        <Field label="Phone" type="tel" defaultValue="+234 800 000 0000" icon={Phone} />
        <Field label="Location" defaultValue="Abuja, Nigeria" icon={MapPin} />
        <Field label="Date of Birth" type="date" icon={Calendar} />
        <div>
          <label className="text-sm font-medium text-ink-700 block mb-1.5">Bio</label>
          <textarea rows={3} className="input resize-none" placeholder="Tell us a bit about yourself..." defaultValue="Computer Science student passionate about software engineering." />
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t border-ink-100 flex-wrap">
          <button className="btn-secondary">Cancel</button>
          <button className="btn-primary"><Save size={15} /> Save Changes</button>
        </div>
      </div>
    </div>
  );
}

function SecurityTab() {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink-900 mb-1">Security</h2>
      <p className="text-sm text-ink-500 mb-6">Manage your password and authentication.</p>
      <div className="space-y-5">
        <div>
          <h3 className="font-semibold text-ink-900 mb-3">Change Password</h3>
          <div className="space-y-3">
            <Field label="Current Password" type="password" />
            <Field label="New Password" type="password" />
            <Field label="Confirm New Password" type="password" />
          </div>
        </div>
        <div className="pt-5 border-t border-ink-100">
          <h3 className="font-semibold text-ink-900 mb-3">Two-Factor Authentication</h3>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <p className="text-sm text-ink-700 mb-1">Add an extra layer of security</p>
              <p className="text-xs text-ink-500">Receive a code via SMS or authenticator app when signing in.</p>
            </div>
            <button className="btn-secondary">Enable</button>
          </div>
        </div>
        <div className="pt-5 border-t border-ink-100">
          <h3 className="font-semibold text-ink-900 mb-3">Active Sessions</h3>
          <div className="space-y-2">
            {[
              { device: "Windows • Chrome", location: "Abuja, NG", current: true, time: "Active now" },
              { device: "iPhone • Safari", location: "Abuja, NG", current: false, time: "2 days ago" },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-ink-50 gap-3">
                <div className="min-w-0">
                  <div className="font-medium text-sm text-ink-900 flex items-center gap-2 flex-wrap">
                    {s.device}
                    {s.current && <span className="badge bg-success/10 text-success">Current</span>}
                  </div>
                  <div className="text-xs text-ink-500">{s.location} • {s.time}</div>
                </div>
                {!s.current && <button className="text-xs font-medium text-danger hover:underline shrink-0">Revoke</button>}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t border-ink-100">
          <button className="btn-primary"><Save size={15} /> Save Changes</button>
        </div>
      </div>
    </div>
  );
}

function NotificationsTab() {
  const settings = [
    { key: "exam_reminder", label: "Exam reminders", desc: "24h and 1h before exams start" },
    { key: "result_ready", label: "Results published", desc: "When your exam result is available" },
    { key: "grade_update", label: "Grade updates", desc: "When an instructor updates your grade" },
    { key: "system_alert", label: "System alerts", desc: "Maintenance, outages, security notices" },
    { key: "newsletter", label: "Newsletter", desc: "Tips, study guides, and platform updates" },
  ];
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink-900 mb-1">Notifications</h2>
      <p className="text-sm text-ink-500 mb-6">Choose what you want to be notified about.</p>
      <div className="space-y-3">
        {settings.map((s) => <ToggleRow key={s.key} label={s.label} desc={s.desc} defaultChecked />)}
      </div>
    </div>
  );
}

function PrivacyTab() {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink-900 mb-1">Privacy</h2>
      <p className="text-sm text-ink-500 mb-6">Control your data and visibility.</p>
      <div className="space-y-3">
        <ToggleRow label="Show me in leaderboards" desc="Other students can see your rank and score" defaultChecked />
        <ToggleRow label="Allow performance analytics" desc="Help improve the platform with anonymous data" defaultChecked />
        <ToggleRow label="Email visible to instructors" desc="Instructors can contact you directly" defaultChecked />
      </div>
      <div className="mt-8 pt-6 border-t border-ink-100">
        <h3 className="font-semibold text-danger mb-2">Danger Zone</h3>
        <div className="rounded-xl border border-danger/30 bg-danger/5 p-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="min-w-[200px] flex-1">
            <div className="font-semibold text-ink-900 text-sm">Delete account</div>
            <div className="text-xs text-ink-500">Permanently delete your account and all data. This cannot be undone.</div>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-danger px-4 py-2 text-sm font-medium text-danger hover:bg-danger hover:text-white transition">
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, type = "text", defaultValue, icon: Icon }) {
  return (
    <div>
      <label className="text-sm font-medium text-ink-700 block mb-1.5">{label}</label>
      <div className="relative">
        {Icon && <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />}
        <input type={type} defaultValue={defaultValue} className={`input ${Icon ? "pl-10" : ""}`} />
      </div>
    </div>
  );
}

function ToggleRow({ label, desc, defaultChecked }) {
  const [checked, setChecked] = useState(defaultChecked || false);
  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-ink-50 transition gap-3">
      <div className="min-w-0">
        <div className="font-medium text-ink-900 text-sm">{label}</div>
        {desc && <div className="text-xs text-ink-500 mt-0.5">{desc}</div>}
      </div>
      <button onClick={() => setChecked(!checked)} className={`relative h-6 w-11 rounded-full transition shrink-0 ${checked ? "bg-accent-600" : "bg-ink-200"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${checked ? "left-5" : "left-0.5"}`} />
      </button>
    </div>
  );
}