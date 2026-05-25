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
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import EnvironmentCheck from "../../components/proctoring/EnvironmentCheck";

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

export default function SystemCheck() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar showSearch fullWidth />
      <div className="flex">
        <Sidebar items={sidebarItems} />
        <main className="flex-1 px-6 lg:px-10 py-8 max-w-[1400px]">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900 mb-6"
          >
            <ArrowLeft size={15} /> Back
          </button>

          <div className="mb-8">
            <div className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-1">Student</div>
            <h1 className="font-display text-4xl font-semibold text-ink-900">System check</h1>
            <p className="mt-1.5 text-ink-500">
              Verify your hardware and network meet exam requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
            <EnvironmentCheck onComplete={() => navigate("/student")} />

            <aside className="space-y-4">
              <div className="card p-5">
                <h3 className="font-semibold text-ink-900 mb-3">Why this matters</h3>
                <ul className="space-y-2.5 text-sm text-ink-600">
                  <li className="flex gap-2">
                    <span className="text-accent-600 font-bold mt-0.5">•</span>
                    <span>Proctoring requires a working camera and microphone</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-600 font-bold mt-0.5">•</span>
                    <span>Stable network prevents lost answers and disconnections</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-600 font-bold mt-0.5">•</span>
                    <span>Some browsers are not supported for security reasons</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-600 font-bold mt-0.5">•</span>
                    <span>Run this check 5-10 minutes before your exam</span>
                  </li>
                </ul>
              </div>

              <div className="card p-5 bg-gradient-to-br from-ink-900 to-ink-950 text-white">
                <h3 className="font-display text-lg font-semibold mb-1">Need help?</h3>
                <p className="text-sm text-ink-300 mb-4">
                  Browser permission issues? Check our troubleshooting guide.
                </p>
                <button
                  onClick={() => navigate("/student/help")}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-ink-900 hover:bg-ink-50 transition"
                >
                  Open guide <ArrowRight size={14} />
                </button>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}