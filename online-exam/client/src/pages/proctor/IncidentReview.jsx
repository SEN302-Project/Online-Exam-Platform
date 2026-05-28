import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, AlertTriangle, Check, X, LayoutDashboard, FileText, HelpCircle, Clock, Camera,
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";

const sidebarItems = [
  {
    section: "MONITORING",
    items: [
      { to: "/proctor", label: "Live console", icon: LayoutDashboard, end: true },
      { to: "/proctor/incidents", label: "Incidents", icon: AlertTriangle, badge: "3" },
      { to: "/proctor/sessions", label: "Past sessions", icon: FileText },
    ],
  },
  {
    section: "REFERENCE",
    items: [{ to: "/proctor/help", label: "Help center", icon: HelpCircle }],
  },
];

export default function IncidentReview() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar showSearch fullWidth onMenuClick={() => setMenuOpen(true)} />
      <div className="flex">
        <Sidebar items={sidebarItems} mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-10 max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/proctor")}
            className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900 mb-6"
          >
            <ArrowLeft size={15} /> Back to console
          </button>

          <div className="card overflow-hidden">
            <div className="bg-gradient-to-br from-danger/10 to-danger/5 p-5 sm:p-6">
              <span className="badge bg-danger text-white mb-2">
                <AlertTriangle size={12} /> High Severity
              </span>
              <h1 className="font-display text-xl sm:text-2xl font-semibold text-ink-900">Multiple Faces Detected</h1>
              <p className="mt-1 text-ink-600 text-sm sm:text-base">Student: John P. • SEN 306 Final • 2 minutes ago</p>
            </div>

            <div className="p-5 sm:p-6">
              <div className="aspect-video bg-ink-900 rounded-xl mb-5 flex items-center justify-center text-ink-500">
                <Camera size={32} />
                <span className="ml-2 text-sm">Captured frame preview</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <Field label="Confidence" value="92%" />
                <Field label="Duration" value="3.2s" />
                <Field label="AI Model" value="FaceNet v2" />
                <Field label="Timestamp" value="14:23:08" />
              </div>

              <div className="rounded-xl bg-ink-50 p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={14} className="text-ink-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink-500">Event timeline</span>
                </div>
                <div className="space-y-1.5 text-sm">
                  <TimelineItem time="14:22:50" event="Student started exam" />
                  <TimelineItem time="14:23:05" event="Second face appeared in frame" />
                  <TimelineItem time="14:23:08" event="AI flagged as multiple faces" highlight />
                  <TimelineItem time="14:23:11" event="Frame captured and saved" />
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <button className="btn-primary !bg-success hover:!bg-emerald-700 flex-1 min-w-[140px]">
                  <Check size={15} /> Confirm Violation
                </button>
                <button className="btn-secondary flex-1 min-w-[140px]">
                  <X size={15} /> Dismiss
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="rounded-lg bg-ink-50 p-3">
      <div className="text-[10px] font-semibold uppercase tracking-widest text-ink-400 mb-1">{label}</div>
      <div className="font-mono font-semibold text-ink-900 text-sm">{value}</div>
    </div>
  );
}

function TimelineItem({ time, event, highlight }) {
  return (
    <div className={`flex items-center gap-3 ${highlight ? "font-semibold text-ink-900" : "text-ink-600"}`}>
      <span className="font-mono text-xs text-ink-400 shrink-0">{time}</span>
      <span>{event}</span>
    </div>
  );
}