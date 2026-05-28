import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, FileText, Shield, Activity, Server, AlertTriangle, ScrollText, HelpCircle, ArrowRight,
} from "lucide-react";
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

export default function AdminPanel() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar showSearch fullWidth onMenuClick={() => setMenuOpen(true)} />
      <div className="flex">
        <Sidebar items={sidebarItems} mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-full lg:max-w-[1400px]">
          <div className="mb-6 sm:mb-8">
            <div className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-1">Administrator</div>
            <h1 className="font-display text-2xl sm:text-4xl font-semibold text-ink-900">System Administration</h1>
            <p className="mt-1.5 text-ink-500 text-sm sm:text-base">Platform overview, health, and configuration.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            <StatCard icon={Users} label="Active users" value="2,847" trend="+12%" />
            <StatCard icon={FileText} label="Exams this month" value="156" trend="+8%" />
            <StatCard icon={Shield} label="Integrity flags" value="23" warning />
            <StatCard icon={Activity} label="System uptime" value="99.97%" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <section className="card p-5 sm:p-6">
              <h2 className="font-display text-lg sm:text-xl font-semibold text-ink-900 mb-4 flex items-center gap-2">
                <Server size={18} /> System Health
              </h2>
              <div className="space-y-2">
                <HealthRow label="API Gateway" status="healthy" />
                <HealthRow label="Database (PostgreSQL)" status="healthy" />
                <HealthRow label="Database (MongoDB)" status="healthy" />
                <HealthRow label="AI Proctoring Service" status="healthy" />
                <HealthRow label="File Storage (S3)" status="healthy" />
              </div>
            </section>

            <section className="card p-5 sm:p-6">
              <h2 className="font-display text-lg sm:text-xl font-semibold text-ink-900 mb-4 flex items-center gap-2">
                <AlertTriangle size={18} /> Recent System Events
              </h2>
              <div className="space-y-1">
                {[
                  { time: "5m", event: "AI Proctoring service restarted" },
                  { time: "1h", event: "Auto-scaled to 12 instances" },
                  { time: "3h", event: "Backup completed successfully" },
                  { time: "1d", event: "Security patches applied" },
                  { time: "2d", event: "Database vacuum completed" },
                ].map((e, i) => (
                  <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-ink-50">
                    <div className="font-mono text-xs text-ink-400 mt-0.5 shrink-0 w-8">{e.time}</div>
                    <div className="text-sm text-ink-700 flex-1">{e.event}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Quick actions */}
          <section className="mt-6">
            <h2 className="font-display text-lg sm:text-xl font-semibold text-ink-900 mb-4">Quick actions</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <ActionCard
                icon={Users}
                title="Manage Users"
                desc="Invite, suspend, or update permissions"
                onClick={() => navigate("/admin/users")}
              />
              <ActionCard
                icon={ScrollText}
                title="Audit Logs"
                desc="View all administrative actions"
                onClick={() => navigate("/admin/audit-logs")}
              />
              <ActionCard
                icon={HelpCircle}
                title="Support"
                desc="Get help with system administration"
                onClick={() => navigate("/admin/support")}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, trend, warning }) {
  return (
    <div className="card p-4 sm:p-5">
      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
        warning ? "bg-warning/10 text-warning" : "bg-ink-100 text-ink-700"
      }`}>
        <Icon size={17} />
      </div>
      <div className="mt-3 sm:mt-4 text-[10px] font-semibold uppercase tracking-widest text-ink-400">{label}</div>
      <div className="mt-1 flex items-baseline gap-2 flex-wrap">
        <span className="font-display text-2xl sm:text-3xl font-bold text-ink-900">{value}</span>
        {trend && <span className="text-xs font-semibold text-success">{trend}</span>}
      </div>
    </div>
  );
}

function HealthRow({ label, status }) {
  const styles = {
    healthy: { dot: "bg-success", text: "text-success", label: "Healthy" },
    degraded: { dot: "bg-warning", text: "text-warning", label: "Degraded" },
    down: { dot: "bg-danger", text: "text-danger", label: "Down" },
  };
  const s = styles[status];
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-ink-50 gap-3">
      <span className="font-medium text-ink-900 text-sm">{label}</span>
      <span className={`flex items-center gap-2 text-sm font-medium ${s.text} shrink-0`}>
        <span className={`h-2 w-2 rounded-full ${s.dot} animate-pulse-soft`} />
        {s.label}
      </span>
    </div>
  );
}

function ActionCard({ icon: Icon, title, desc, onClick }) {
  return (
    <button onClick={onClick} className="card p-5 text-left hover:shadow-lg transition group">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
        <Icon size={18} />
      </div>
      <div className="mt-4 flex items-center gap-1 font-semibold text-ink-900 group-hover:text-accent-600 transition">
        {title}
        <ArrowRight size={14} className="opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-1 transition-all" />
      </div>
      <div className="text-sm text-ink-500 mt-0.5">{desc}</div>
    </button>
  );
}