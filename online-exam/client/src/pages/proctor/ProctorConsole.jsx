import { Eye, AlertTriangle, Users } from "lucide-react";
import Navbar from "../../components/common/Navbar";

const mockSessions = [
  { id: "1", student: "Alex M.", exam: "SEN 306 Final", status: "active", flags: 0, duration: "00:42:15" },
  { id: "2", student: "Sara K.", exam: "SEN 306 Final", status: "active", flags: 2, duration: "00:38:09" },
  { id: "3", student: "John P.", exam: "SEN 306 Final", status: "flagged", flags: 5, duration: "00:51:22" },
  { id: "4", student: "Maya R.", exam: "SEN 306 Final", status: "active", flags: 0, duration: "00:29:44" },
];

export default function ProctorConsole() {
  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl font-semibold text-ink-900">Live Proctoring</h1>
            <p className="mt-1 text-ink-500">Monitor active examination sessions in real-time.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="badge bg-success/10 text-success">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse-soft" />
              4 sessions live
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {mockSessions.map((s) => (
            <article
              key={s.id}
              className={`card overflow-hidden transition hover:shadow-lg ${
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

        <div className="card p-6">
          <h2 className="font-display text-lg font-semibold text-ink-900 mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-warning" /> Recent Alerts
          </h2>
          <div className="space-y-2">
            {[
              { time: "2 min ago", student: "John P.", type: "Multiple faces detected" },
              { time: "5 min ago", student: "Sara K.", type: "Window switched" },
              { time: "8 min ago", student: "John P.", type: "Voice activity detected" },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-ink-50">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/10 text-warning">
                  <AlertTriangle size={14} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-ink-900 text-sm">{a.type}</div>
                  <div className="text-xs text-ink-500">{a.student}</div>
                </div>
                <div className="text-xs text-ink-400">{a.time}</div>
                <button className="btn-ghost !text-sm !px-3 !py-1.5">Review</button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}