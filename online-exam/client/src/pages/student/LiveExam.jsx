import { useNavigate } from "react-router-dom";
import {
  Home,
  CalendarClock,
  ScanFace,
  MonitorCheck,
  Radio,
  TrendingUp,
  BookOpen,
  HelpCircle,
  ArrowRight,
  Clock,
  FileText,
  AlertCircle,
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";

const sidebarItems = [
  {
    section: "MY EXAMS",
    items: [
      { to: "/student", label: "Dashboard", icon: Home, end: true },
      { to: "/student/upcoming", label: "Upcoming exams", icon: CalendarClock, badge: "5" },
      { to: "/student/identity", label: "Identity verification", icon: ScanFace },
      { to: "/student/system-check", label: "System check", icon: MonitorCheck },
      { to: "/student/live", label: "Live exam", icon: Radio },
      { to: "/student/history", label: "Results & feedback", icon: TrendingUp },
    ],
  },
  {
    section: "REFERENCE",
    items: [
      { to: "/student/honor-policy", label: "Honor policy", icon: BookOpen },
      { to: "/student/help", label: "Help center", icon: HelpCircle },
    ],
  },
];

const liveExam = {
  id: "1",
  course: "SEN 306",
  title: "Software Construction Final",
  startsAt: "2026-05-20T10:00:00",
  endsAt: "2026-05-20T11:30:00",
  durationMin: 90,
  questionCount: 40,
  instructor: "Dr. Sarah Williams",
};

export default function LiveExam() {
  const navigate = useNavigate();
  const hasLiveExam = true; // Toggle for testing

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar showSearch fullWidth />
      <div className="flex">
        <Sidebar items={sidebarItems} />
        <main className="flex-1 px-6 lg:px-10 py-8 max-w-[1400px]">
          <div className="mb-8">
            <div className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-1">Student</div>
            <h1 className="font-display text-4xl font-semibold text-ink-900">Live exam</h1>
            <p className="mt-1.5 text-ink-500">
              Active examinations available for you to join.
            </p>
          </div>

          {hasLiveExam ? (
            <div className="card overflow-hidden">
              <div className="bg-gradient-to-br from-accent-600 to-accent-700 p-6 text-white relative">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                    backgroundSize: "16px 16px",
                  }}
                />
                <div className="relative flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="badge bg-white/20 text-white border border-white/30">
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse-soft" />
                        LIVE NOW
                      </span>
                      <span className="font-mono text-xs font-semibold text-white/80">{liveExam.course}</span>
                    </div>
                    <h2 className="font-display text-3xl font-semibold">{liveExam.title}</h2>
                    <p className="mt-1 text-white/80">Proctored by {liveExam.instructor}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs uppercase tracking-wider text-white/70 mb-0.5">Ends in</div>
                    <div className="font-mono text-3xl font-bold tabular-nums">01:24:36</div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <Info icon={Clock} label="Duration" value={`${liveExam.durationMin} min`} />
                  <Info icon={FileText} label="Questions" value={liveExam.questionCount} />
                  <Info icon={Radio} label="Status" value="Live" />
                  <Info icon={MonitorCheck} label="Proctoring" value="AI + Live" />
                </div>

                <div className="card border-warning/30 bg-warning/5 p-4 mb-5 flex gap-3">
                  <AlertCircle size={18} className="text-warning shrink-0 mt-0.5" />
                  <div className="text-sm text-ink-700">
                    <strong>Before joining:</strong> Ensure your camera and microphone are working,
                    you have a stable internet connection, and you're in a quiet, well-lit room.
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => navigate(`/student/exam/${liveExam.id}`)}
                    className="btn-primary"
                  >
                    Join exam now <ArrowRight size={15} />
                  </button>
                  <button
                    onClick={() => navigate("/student/system-check")}
                    className="btn-secondary"
                  >
                    <MonitorCheck size={15} /> Run system check first
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ink-100 text-ink-400 mb-4">
                <Radio size={28} />
              </div>
              <h2 className="font-display text-2xl font-semibold text-ink-900">No live exams right now</h2>
              <p className="mt-2 text-ink-500 max-w-md mx-auto">
                When an exam is scheduled and active, you'll be able to join it from here.
              </p>
              <button onClick={() => navigate("/student/upcoming")} className="btn-primary mt-6">
                View upcoming exams
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-widest text-ink-400 mb-1 flex items-center gap-1.5">
        <Icon size={12} /> {label}
      </div>
      <div className="font-display text-xl font-bold text-ink-900">{value}</div>
    </div>
  );
}