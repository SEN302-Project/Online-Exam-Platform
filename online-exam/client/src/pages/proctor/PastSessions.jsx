import { useState } from "react";
import {
  AlertTriangle, LayoutDashboard, FileText, HelpCircle, Search, Calendar, ChevronRight, Eye, Clock, Users,
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

const mockSessions = [
  { id: "1", exam: "SEN 306 Final", students: 87, date: "May 20, 2026", duration: "1h 30m", incidents: 6, completed: 71 },
  { id: "2", exam: "CSC 204 Mid-term", students: 52, date: "May 18, 2026", duration: "1h 00m", incidents: 2, completed: 52 },
  { id: "3", exam: "CSC 203 Quiz 3", students: 94, date: "May 15, 2026", duration: "45m", incidents: 4, completed: 88 },
  { id: "4", exam: "MTH 211 Test", students: 38, date: "May 10, 2026", duration: "1h 00m", incidents: 0, completed: 38 },
];

export default function PastSessions() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = mockSessions.filter((s) => s.exam.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar showSearch fullWidth onMenuClick={() => setMenuOpen(true)} />
      <div className="flex">
        <Sidebar items={sidebarItems} mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-full lg:max-w-[1400px]">
          <div className="mb-6 sm:mb-8">
            <div className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-1">Proctor</div>
            <h1 className="font-display text-2xl sm:text-4xl font-semibold text-ink-900">Past sessions</h1>
            <p className="mt-1.5 text-ink-500 text-sm sm:text-base">Review completed examination sessions and proctoring reports.</p>
          </div>

          <div className="relative mb-6">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search exam name..." className="input pl-10" />
          </div>

          <div className="card overflow-hidden">
            {filtered.map((s, i) => (
              <button
                key={s.id}
                className={`w-full p-4 sm:p-5 hover:bg-ink-50 transition text-left flex items-center gap-3 sm:gap-4 ${i < filtered.length - 1 ? "border-b border-ink-100" : ""}`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink-100 text-ink-700">
                  <FileText size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-ink-900 text-sm sm:text-base truncate">{s.exam}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-ink-500 flex-wrap">
                    <span className="flex items-center gap-1"><Calendar size={11} />{s.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{s.duration}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Users size={11} />{s.completed}/{s.students}</span>
                  </div>
                </div>
                {s.incidents > 0 ? (
                  <span className="badge bg-warning/10 text-warning shrink-0">
                    <AlertTriangle size={11} /> {s.incidents}
                  </span>
                ) : (
                  <span className="badge bg-success/10 text-success shrink-0">Clean</span>
                )}
                <ChevronRight size={18} className="text-ink-400 shrink-0" />
              </button>
            ))}
            {filtered.length === 0 && <div className="p-12 text-center text-ink-400">No sessions found.</div>}
          </div>
        </main>
      </div>
    </div>
  );
}
