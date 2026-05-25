import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home, CalendarClock, ScanFace, MonitorCheck, Radio, TrendingUp, BookOpen, HelpCircle, Sparkles,
  ShieldCheck, AlertTriangle, Check,
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import { useAuth } from "../../context/AuthContext";

const sidebarItems = [
  {
    section: "MY EXAMS",
    items: [
      { to: "/student", label: "Dashboard", icon: Home, end: true },
      { to: "/student/upcoming", label: "Upcoming exams", icon: CalendarClock, badge: "2" },
      { to: "/student/practice", label: "Practice mode", icon: Sparkles },
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

export default function HonorPolicy() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar showSearch fullWidth onMenuClick={() => setMenuOpen(true)} />
      <div className="flex">
        <Sidebar items={sidebarItems} mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <div className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-1">Reference</div>
              <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink-900">Honor policy</h1>
              <p className="mt-1.5 text-ink-500">Our commitment to academic integrity and your responsibilities.</p>
            </div>

            {/* Pledge */}
            <div className="card overflow-hidden mb-6">
              <div className="bg-gradient-to-br from-accent-600 to-accent-700 p-8 sm:p-10 text-white relative">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                    backgroundSize: "16px 16px",
                  }}
                />
                <div className="relative flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur mb-5">
                    <ShieldCheck size={26} />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-3">The Honor Pledge</div>
                  <blockquote className="font-display text-2xl sm:text-3xl leading-snug italic max-w-xl">
                    "I will neither give nor receive unauthorized aid on this examination."
                  </blockquote>
                  <p className="mt-5 text-white/80 text-sm max-w-md">
                    By taking any exam on Proctera, you reaffirm this commitment.
                  </p>
                </div>
              </div>
            </div>

            {/* Allowed / Not allowed */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6 text-left">
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-success/10 text-success">
                    <Check size={15} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-semibold text-ink-900">Allowed</h3>
                </div>
                <ul className="space-y-2 text-sm text-ink-700">
                  <li>• Reviewing your own notes (when permitted)</li>
                  <li>• Using a calculator (if specified)</li>
                  <li>• Brief water/restroom break (max 5 min)</li>
                  <li>• Stretching while still on camera</li>
                </ul>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-danger/10 text-danger">
                    <AlertTriangle size={14} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-semibold text-ink-900">Not allowed</h3>
                </div>
                <ul className="space-y-2 text-sm text-ink-700">
                  <li>• Communicating with anyone during the exam</li>
                  <li>• Using unauthorized websites or AI tools</li>
                  <li>• Switching tabs or opening other apps</li>
                  <li>• Having other people in the room</li>
                </ul>
              </div>
            </div>

            {/* Policies */}
            <div className="card divide-y divide-ink-100 mb-6 text-left">
              <Section title="What we monitor">
                <p>
                  During every examination, our proctoring system records video from your webcam and audio from
                  your microphone. We use AI to detect potential violations like multiple faces, unauthorized
                  voices, or unusual eye movement. A human proctor reviews any flagged events.
                </p>
              </Section>
              <Section title="Plagiarism and AI-generated content">
                <p>
                  All written submissions are scanned for text similarity (against your peers and online sources)
                  and for AI-generated content. Submissions exceeding 50% similarity or 70% AI probability are
                  flagged for instructor review.
                </p>
              </Section>
              <Section title="Consequences of violations">
                <p>
                  First-time minor violations result in a warning. Repeated or serious violations (collusion,
                  impersonation, prohibited tools) may result in a failing grade, course failure, or academic
                  disciplinary action per your institution's policies.
                </p>
              </Section>
              <Section title="Your privacy">
                <p>
                  Video and audio recordings are stored encrypted for 90 days, then deleted. Only authorized
                  proctors and instructors can access your recordings. We never share them with third parties
                  or use them for advertising.
                </p>
              </Section>
            </div>

            <div className="card p-6 bg-ink-50 border-ink-200">
              <p className="text-sm text-ink-600 mb-4">
                By continuing to use Proctera, <strong>{user?.name || "you"}</strong> acknowledge that you have
                read and agree to abide by this Honor Policy.
              </p>
              <div className="flex gap-2 justify-center flex-wrap">
                <button onClick={() => navigate("/student")} className="btn-primary">I agree and continue</button>
                <button onClick={() => navigate(-1)} className="btn-secondary">Back</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="p-6">
      <h3 className="font-semibold text-ink-900 mb-2">{title}</h3>
      <div className="text-sm text-ink-600 leading-relaxed">{children}</div>
    </div>
  );
}