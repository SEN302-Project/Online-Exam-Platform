import { Users, FileText, Shield, Activity, Server, AlertTriangle } from "lucide-react";
import Navbar from "../../components/common/Navbar";

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="font-display text-3xl font-semibold text-ink-900 mb-1">System Administration</h1>
        <p className="text-ink-500 mb-8">Platform overview, health, and configuration.</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Users} label="Active Users" value="2,847" trend="+12%" />
          <StatCard icon={FileText} label="Exams This Month" value="156" trend="+8%" />
          <StatCard icon={Shield} label="Integrity Flags" value="23" warning />
          <StatCard icon={Activity} label="System Uptime" value="99.97%" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <section className="card p-6">
            <h2 className="font-display text-xl font-semibold text-ink-900 mb-4 flex items-center gap-2">
              <Server size={18} /> System Health
            </h2>
            <div className="space-y-3">
              <HealthRow label="API Gateway" status="healthy" />
              <HealthRow label="Database (PostgreSQL)" status="healthy" />
              <HealthRow label="Database (MongoDB)" status="healthy" />
              <HealthRow label="AI Proctoring Service" status="degraded" />
              <HealthRow label="File Storage (S3)" status="healthy" />
            </div>
          </section>

          <section className="card p-6">
            <h2 className="font-display text-xl font-semibold text-ink-900 mb-4 flex items-center gap-2">
              <AlertTriangle size={18} /> Recent System Events
            </h2>
            <div className="space-y-2">
              {[
                { time: "5m", event: "AI Proctoring latency exceeded threshold" },
                { time: "1h", event: "Auto-scaled to 12 instances" },
                { time: "3h", event: "Backup completed successfully" },
                { time: "1d", event: "Security patches applied" },
              ].map((e, i) => (
                <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-ink-50">
                  <div className="font-mono text-xs text-ink-400 mt-0.5 shrink-0 w-8">{e.time}</div>
                  <div className="text-sm text-ink-700 flex-1">{e.event}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, trend, warning }) {
  return (
    <div className="card p-5">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
        warning ? "bg-warning/10 text-warning" : "bg-ink-100 text-ink-700"
      }`}>
        <Icon size={18} />
      </div>
      <div className="mt-4 text-xs font-medium uppercase tracking-wider text-ink-400">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <div className="font-display text-3xl font-bold text-ink-900">{value}</div>
        {trend && <div className="text-xs font-semibold text-success">{trend}</div>}
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
    <div className="flex items-center justify-between p-3 rounded-lg bg-ink-50">
      <span className="font-medium text-ink-900">{label}</span>
      <span className={`flex items-center gap-2 text-sm font-medium ${s.text}`}>
        <span className={`h-2 w-2 rounded-full ${s.dot} animate-pulse-soft`} />
        {s.label}
      </span>
    </div>
  );
}