import { useState } from "react";
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
  Search,
  ChevronDown,
  MessageSquare,
  Mail,
  Phone,
  FileText,
  Video,
  Camera,
  Wifi,
  Shield,
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

const categories = [
  { icon: FileText, label: "Getting Started", count: 8, color: "accent" },
  { icon: Camera, label: "Proctoring", count: 12, color: "success" },
  { icon: Wifi, label: "Technical Issues", count: 15, color: "warning" },
  { icon: Shield, label: "Privacy & Security", count: 6, color: "ink" },
];

const faqs = [
  {
    q: "What do I need to take an online exam?",
    a: "You'll need a computer with a working webcam and microphone, a stable internet connection (at least 2 Mbps), and a supported browser (Chrome, Firefox, Edge, or Safari). You should also be in a quiet, well-lit room.",
  },
  {
    q: "Can I use my phone to take an exam?",
    a: "Mobile devices are currently not supported for full examinations due to proctoring requirements. You can review study materials and check your schedule on mobile, but exams must be taken on a desktop or laptop.",
  },
  {
    q: "What happens if my internet disconnects during an exam?",
    a: "Your answers are auto-saved every 30 seconds. If you disconnect, you can reconnect within 5 minutes and continue from where you left off. The proctor will be notified and may verify your identity again.",
  },
  {
    q: "How is plagiarism detected?",
    a: "We use a combination of text similarity matching (against your peers and online sources) and AI-generated content detection. All submissions are scanned automatically.",
  },
  {
    q: "Can I flag a question and come back to it later?",
    a: "Yes! Click the flag icon next to any question. Flagged questions are highlighted in the navigation panel so you can easily return to them before submitting.",
  },
  {
    q: "What if my webcam isn't working?",
    a: "Run the System Check from your dashboard. If it fails, check that your browser has camera permission, no other app is using the camera, and try restarting your browser. Contact support if issues persist.",
  },
  {
    q: "Can I switch tabs or open other apps during an exam?",
    a: "No. Switching tabs, minimizing the browser, or opening other apps is flagged as a violation. Repeated violations may result in your exam being voided.",
  },
  {
    q: "How long does it take to get my results?",
    a: "MCQ and True/False questions are graded instantly. Essay and coding questions require instructor review, which typically takes 3-5 business days.",
  },
];

export default function HelpCenter() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const filtered = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar showSearch fullWidth />
      <div className="flex">
        <Sidebar items={sidebarItems} />
        <main className="flex-1 px-6 lg:px-10 py-8 max-w-[1400px]">
          {/* Hero */}
          <div className="card overflow-hidden mb-8">
            <div className="bg-gradient-to-br from-ink-900 to-ink-950 text-white p-10 relative">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="relative max-w-2xl">
                <h1 className="font-display text-4xl font-semibold">How can we help?</h1>
                <p className="mt-2 text-ink-300">
                  Find answers to common questions or reach out to our support team.
                </p>
                <div className="mt-6 relative">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
                  />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for answers..."
                    className="w-full rounded-lg bg-white/10 backdrop-blur border border-white/20 pl-12 pr-4 py-3 text-white placeholder-ink-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <section className="mb-8">
            <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">Browse by topic</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {categories.map((cat) => {
                const colors = {
                  accent: "bg-accent-50 text-accent-600",
                  success: "bg-success/10 text-success",
                  warning: "bg-warning/10 text-warning",
                  ink: "bg-ink-100 text-ink-700",
                };
                return (
                  <button
                    key={cat.label}
                    className="card p-5 text-left hover:shadow-lg transition group"
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors[cat.color]}`}>
                      <cat.icon size={18} />
                    </div>
                    <div className="mt-4 font-semibold text-ink-900 group-hover:text-accent-600 transition">
                      {cat.label}
                    </div>
                    <div className="text-xs text-ink-500 mt-1">{cat.count} articles</div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-8">
            <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
              Frequently asked questions
            </h2>
            <div className="card overflow-hidden">
              {filtered.map((faq, i) => (
                <div
                  key={i}
                  className={i < filtered.length - 1 ? "border-b border-ink-100" : ""}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-ink-50 transition"
                  >
                    <span className="font-medium text-ink-900">{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-ink-400 shrink-0 transition-transform ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-sm text-ink-600 leading-relaxed animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="p-12 text-center text-ink-400">
                  No results found. Try different keywords.
                </div>
              )}
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">Still need help?</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <ContactCard icon={MessageSquare} label="Live Chat" desc="Avg response: 2 min" color="accent" />
              <ContactCard icon={Mail} label="Email" desc="support@proctera.com" color="success" />
              <ContactCard icon={Phone} label="Phone" desc="+1 (800) 555-0100" color="warning" />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function ContactCard({ icon: Icon, label, desc, color }) {
  const colors = {
    accent: "bg-accent-50 text-accent-600",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
  };
  return (
    <button className="card p-5 text-left hover:shadow-lg transition group">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors[color]}`}>
        <Icon size={18} />
      </div>
      <div className="mt-4 font-semibold text-ink-900 group-hover:text-accent-600 transition">{label}</div>
      <div className="text-sm text-ink-500 mt-0.5">{desc}</div>
    </button>
  );
}