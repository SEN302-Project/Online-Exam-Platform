import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, AlertTriangle, Users, LayoutDashboard, FileText, HelpCircle } from "lucide-react";
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

const mockSessions = [
  { id: "1", student: "Alex M.", exam: "SEN 306 Final", status: "active", flags: 0, duration: "00:42:15" },
  { id: "2", student: "Sara K.", exam: "SEN 306 Final", status: "active", flags: 2, duration: "00:38:09" },
  { id: "3", student: "John P.", exam: "SEN 306 Final", status: "flagged", flags: 5, duration: "00:51:22" },
  { id: "4", student: "Maya R.", exam: "SEN 306 Final", status: "active", flags: 0, duration: "00:29:44" },
];

const mockAlerts = [
  { time: "2 min ago", student: "John P.", type: "Multiple faces detected", severity: "high" },
  { time: "5 min ago", student: "Sara K.", type: "Window switched", severity: "medium" },
  { time: "8 min ago", student: "John P.", type: "Voice activity detected", severity: "medium" },
];

export default function ProctorConsole() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar showSearch fullWidth onMenuClick={() => setMenuOpen(true)} />
      <div className="flex">
        <Sidebar items={sidebarItems} mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-full lg:max-w-[1400px]">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-1">Proctor</div>
              <h1 className="font-display text-2xl sm:text-4xl font-semibold text-ink-900">Live Proctoring</h1>
              <p className="mt-1.5 text-ink-500 text-sm sm:text-base">Monitor active examination sessions in real-time.</p>
            </div>
            <div className="badge bg-success/10 text-success self-start">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse-soft" />
              {mockSessions.filter((s) => s.status !== "completed").length} sessions live
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {mockSessions.map((s) => (
              <article
                key={s.id}
                className={`card overflow-hidden transition hover:shadow-lg cursor-pointer ${
                  s.status === "flagged" ? "ring-2 ring-danger" : ""
                }`}
              >
                <div className="aspect-video bg-ink-900 relative flex items-center justify-center">
                  <Eye size={28} className="text-ink-700" />
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 rounded-md bg-ink-950/80 px-2 py-0.5 backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-danger animate-pulse-soft" />
                    <span className="text-[10px] font-medium text-white tracking-wider">LIVE</span>
                  </div>
                  {s.flags > 0 && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-danger px-2 py-0.5">
                      <AlertTriangle size={10} className="text-white" />
                      <span className="text-[10px] font-bold text-white">{s.flags}</span>
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 font-mono text-xs text-white bg-ink-950/80 px-2 py-0.5 rounded-md">
                    {s.duration}
                  </div>
                </div>
                <div className="p-3">
                  <div className="font-semibold text-ink-900 text-sm truncate">{s.student}</div>
                  <div className="text-xs text-ink-500 truncate">{s.exam}</div>
                </div>
              </article>
            ))}
          </div>

          <div className="card p-5 sm:p-6">
            <h2 className="font-display text-lg font-semibold text-ink-900 mb-4 flex items-center gap-2">
              <AlertTriangle size={18} className="text-warning" /> Recent Alerts
            </h2>
            <div className="space-y-2">
              {mockAlerts.map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-ink-50 flex-wrap">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg shrink-0 ${
                      a.severity === "high" ? "bg-danger/10 text-danger" : "bg-warning/10 text-warning"
                    }`}
                  >
                    <AlertTriangle size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-ink-900 text-sm">{a.type}</div>
                    <div className="text-xs text-ink-500">{a.student}</div>
                  </div>
                  <div className="text-xs text-ink-400">{a.time}</div>
                  <button
                    onClick={() => navigate(`/proctor/incident/alert-${i}`)}
                    className="btn-ghost !text-sm !px-3 !py-1.5"
                  >
                    Review
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}