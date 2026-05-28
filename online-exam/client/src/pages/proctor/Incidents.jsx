import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle, LayoutDashboard, FileText, HelpCircle, Search, Calendar, ChevronRight, Eye,
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

const mockIncidents = [
  { id: "1", student: "John P.", exam: "SEN 306 Final", type: "Multiple faces detected", severity: "high", time: "2 min ago", status: "unreviewed" },
  { id: "2", student: "Sara K.", exam: "SEN 306 Final", type: "Window switched", severity: "medium", time: "5 min ago", status: "unreviewed" },
  { id: "3", student: "John P.", exam: "SEN 306 Final", type: "Voice activity detected", severity: "medium", time: "8 min ago", status: "unreviewed" },
  { id: "4", student: "Alex M.", exam: "CSC 204 Mid-term", type: "Looked away repeatedly", severity: "low", time: "1 hour ago", status: "confirmed" },
  { id: "5", student: "Maya R.", exam: "CSC 204 Mid-term", type: "Phone detected", severity: "high", time: "2 hours ago", status: "dismissed" },
];

const SEVERITY = {
  high: "bg-danger/10 text-danger",
  medium: "bg-warning/10 text-warning",
  low: "bg-ink-100 text-ink-700",
};

const STATUS = {
  unreviewed: { label: "Unreviewed", style: "bg-accent-100 text-accent-700" },
  confirmed: { label: "Confirmed", style: "bg-danger/10 text-danger" },
  dismissed: { label: "Dismissed", style: "bg-ink-100 text-ink-500" },
};

export default function Incidents() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = mockIncidents.filter((i) => {
    const ms = i.student.toLowerCase().includes(search.toLowerCase()) || i.type.toLowerCase().includes(search.toLowerCase());
    const mf = filter === "all" || i.status === filter;
    return ms && mf;
  });

  const counts = {
    unreviewed: mockIncidents.filter((i) => i.status === "unreviewed").length,
    confirmed: mockIncidents.filter((i) => i.status === "confirmed").length,
    dismissed: mockIncidents.filter((i) => i.status === "dismissed").length,
  };

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar showSearch fullWidth onMenuClick={() => setMenuOpen(true)} />
      <div className="flex">
        <Sidebar items={sidebarItems} mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-full lg:max-w-[1400px]">
          <div className="mb-6 sm:mb-8">
            <div className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-1">Proctor</div>
            <h1 className="font-display text-2xl sm:text-4xl font-semibold text-ink-900">Incidents</h1>
            <p className="mt-1.5 text-ink-500 text-sm sm:text-base">Review and act on flagged events from active exams.</p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <StatCard label="Unreviewed" value={counts.unreviewed} color="accent" />
            <StatCard label="Confirmed" value={counts.confirmed} color="danger" />
            <StatCard label="Dismissed" value={counts.dismissed} color="ink" />
          </div>

          <div className="flex gap-3 mb-6 flex-wrap">
            <div className="relative flex-1 min-w-[240px]">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by student or incident type..." className="input pl-10" />
            </div>
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input max-w-[180px]">
              <option value="all">All statuses</option>
              <option value="unreviewed">Unreviewed</option>
              <option value="confirmed">Confirmed</option>
              <option value="dismissed">Dismissed</option>
            </select>
          </div>

          <div className="card overflow-hidden">
            {filtered.map((inc, i) => {
              const status = STATUS[inc.status];
              return (
                <button
                  key={inc.id}
                  onClick={() => navigate(`/proctor/incident/${inc.id}`)}
                  className={`w-full p-4 sm:p-5 hover:bg-ink-50 transition text-left flex items-center gap-3 sm:gap-4 ${i < filtered.length - 1 ? "border-b border-ink-100" : ""}`}
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${SEVERITY[inc.severity]}`}>
                    <AlertTriangle size={17} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`badge ${status.style}`}>{status.label}</span>
                      <span className="badge bg-ink-100 text-ink-600">{inc.student}</span>
                    </div>
                    <h3 className="font-semibold text-ink-900 text-sm sm:text-base">{inc.type}</h3>
                    <div className="text-xs text-ink-500 mt-1 flex items-center gap-2 flex-wrap">
                      <span>{inc.exam}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Calendar size={11} />{inc.time}</span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-ink-400 shrink-0" />
                </button>
              );
            })}
            {filtered.length === 0 && <div className="p-12 text-center text-ink-400">No incidents match your filters.</div>}
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  const colors = { accent: "text-accent-700", danger: "text-danger", ink: "text-ink-700" };
  return (
    <div className="card p-4 sm:p-5">
      <div className="text-[10px] font-semibold uppercase tracking-widest text-ink-400">{label}</div>
      <div className={`mt-1 font-display text-2xl sm:text-3xl font-bold ${colors[color]}`}>{value}</div>
    </div>
  );
}