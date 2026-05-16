import { Search, Download, ShieldCheck } from "lucide-react";
import Navbar from "../../components/common/Navbar";

const mockLogs = [
  { id: "1", time: "2026-05-16 14:23:08", user: "admin@uni.edu", action: "User role changed", target: "j.smith@uni.edu", ip: "192.168.1.45" },
  { id: "2", time: "2026-05-16 14:15:02", user: "s.williams@uni.edu", action: "Exam published", target: "SEN 306 Final", ip: "192.168.1.22" },
  { id: "3", time: "2026-05-16 13:48:31", user: "admin@uni.edu", action: "User account suspended", target: "m.patel@uni.edu", ip: "192.168.1.45" },
  { id: "4", time: "2026-05-16 13:22:11", user: "j.chen@uni.edu", action: "Grade overridden", target: "Submission #4521", ip: "192.168.1.78" },
  { id: "5", time: "2026-05-16 12:55:47", user: "system", action: "Automated backup completed", target: "Database", ip: "internal" },
];

export default function AuditLogs() {
  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold text-ink-900 flex items-center gap-2">
              <ShieldCheck size={26} /> Audit Logs
            </h1>
            <p className="mt-1 text-ink-500">Tamper-evident trail of all administrative actions.</p>
          </div>
          <button className="btn-secondary">
            <Download size={15} /> Export
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
            <input type="text" placeholder="Search logs…" className="input pl-10" />
          </div>
          <select className="input max-w-[160px]">
            <option>All Actions</option>
            <option>User Management</option>
            <option>Exam Activity</option>
            <option>System Events</option>
          </select>
          <input type="date" className="input max-w-[170px]" />
        </div>

        <div className="card overflow-hidden">
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
      </main>
    </div>
  );
}