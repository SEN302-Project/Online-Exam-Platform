import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Download, ShieldCheck, LayoutDashboard, Users, ScrollText, ArrowLeft , HelpCircle} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";

const sidebarItems = [
  {
    section: "SYSTEM",
    items: [
      { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
      { to: "/admin/users", label: "User management", icon: Users },
      { to: "/admin/audit-logs", label: "Audit logs", icon: ScrollText },
    ],
  },
  {
    section: "REFERENCE",
    items: [{ to: "/admin/support", label: "Support", icon: HelpCircle }],
  },
];

const mockLogs = [
  { id: "1", time: "2026-05-16 14:23", user: "admin@uni.edu", action: "User role changed", target: "j.smith@uni.edu", ip: "192.168.1.45" },
  { id: "2", time: "2026-05-16 14:15", user: "s.williams@uni.edu", action: "Exam published", target: "SEN 306 Final", ip: "192.168.1.22" },
  { id: "3", time: "2026-05-16 13:48", user: "admin@uni.edu", action: "User account suspended", target: "m.patel@uni.edu", ip: "192.168.1.45" },
  { id: "4", time: "2026-05-16 13:22", user: "j.chen@uni.edu", action: "Grade overridden", target: "Submission #4521", ip: "192.168.1.78" },
  { id: "5", time: "2026-05-16 12:55", user: "system", action: "Automated backup completed", target: "Database", ip: "internal" },
];

export default function AuditLogs() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar showSearch fullWidth onMenuClick={() => setMenuOpen(true)} />
      <div className="flex">
        <Sidebar items={sidebarItems} mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-full lg:max-w-[1400px]">
          <button
            onClick={() => navigate("/admin")}
            className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900 mb-6"
          >
            <ArrowLeft size={15} /> Back to overview
          </button>

          <div className="flex items-start justify-between mb-6 sm:mb-8 gap-4 flex-wrap">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-1">Administrator</div>
              <h1 className="font-display text-2xl sm:text-4xl font-semibold text-ink-900 flex items-center gap-2">
                <ShieldCheck size={26} /> Audit Logs
              </h1>
              <p className="mt-1.5 text-ink-500 text-sm sm:text-base">Tamper-evident trail of all administrative actions.</p>
            </div>
            <button className="btn-secondary">
              <Download size={15} /> Export
            </button>
          </div>

          <div className="flex gap-3 mb-6 flex-wrap">
            <div className="relative flex-1 min-w-[240px]">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
              <input type="text" placeholder="Search logs..." className="input pl-10" />
            </div>
            <select className="input max-w-[160px]">
              <option>All Actions</option>
              <option>User Management</option>
              <option>Exam Activity</option>
              <option>System Events</option>
            </select>
            <input type="date" className="input max-w-[170px]" />
          </div>

          {/* Desktop table */}
          <div className="card overflow-hidden hidden md:block">
            <table className="w-full font-mono text-sm">
              <thead className="bg-ink-50 border-b border-ink-100">
                <tr className="text-left text-xs uppercase tracking-wider text-ink-500 font-sans">
                  <th className="px-5 py-3 font-medium">Timestamp</th>
                  <th className="px-5 py-3 font-medium">Actor</th>
                  <th className="px-5 py-3 font-medium">Action</th>
                  <th className="px-5 py-3 font-medium">Target</th>
                  <th className="px-5 py-3 font-medium">IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {mockLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-ink-50 transition">
                    <td className="px-5 py-3 text-ink-500 text-xs">{log.time}</td>
                    <td className="px-5 py-3 text-ink-900">{log.user}</td>
                    <td className="px-5 py-3 text-ink-700 font-sans font-medium">{log.action}</td>
                    <td className="px-5 py-3 text-ink-600">{log.target}</td>
                    <td className="px-5 py-3 text-ink-500 text-xs">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {mockLogs.map((log) => (
              <div key={log.id} className="card p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="font-semibold text-ink-900 text-sm">{log.action}</div>
                  <div className="font-mono text-[10px] text-ink-400 shrink-0">{log.time}</div>
                </div>
                <div className="text-xs text-ink-600 mb-1">
                  <span className="text-ink-400">Actor:</span> {log.user}
                </div>
                <div className="text-xs text-ink-600 mb-1">
                  <span className="text-ink-400">Target:</span> {log.target}
                </div>
                <div className="text-xs text-ink-500 font-mono">
                  IP: {log.ip}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}