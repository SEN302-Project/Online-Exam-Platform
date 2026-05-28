import { useState } from "react";
import {
  LayoutDashboard, Plus, BookOpen, ScrollText, BarChart3, AlertTriangle, HelpCircle,
  Search, ChevronDown, MessageSquare, Mail, Phone, FileText, ShieldCheck, Users, Settings,
  FileEdit,
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";

const sidebarItems = [
  {
    section: "TEACHING",
    items: [
      { to: "/instructor", label: "Overview", icon: LayoutDashboard, end: true },
      { to: "/instructor/create-exam", label: "Create exam", icon: Plus },
      { to: "/instructor/drafts", label: "Drafts", icon: FileEdit, badge: "3" },
      { to: "/instructor/question-bank", label: "Question bank", icon: BookOpen },
      { to: "/instructor/grading/1", label: "Grading queue", icon: ScrollText, badge: "12" },
    ],
  },
  {
    section: "INSIGHTS",
    items: [
      { to: "/instructor/analytics", label: "Analytics", icon: BarChart3 },
      { to: "/instructor/plagiarism/1", label: "Integrity reports", icon: AlertTriangle },
    ],
  },
  {
    section: "REFERENCE",
    items: [{ to: "/instructor/help", label: "Help center", icon: HelpCircle }],
  },
];

const categories = [
  { icon: FileText, label: "Creating Exams", count: 10, color: "accent" },
  { icon: ScrollText, label: "Grading", count: 8, color: "success" },
  { icon: Users, label: "Managing Students", count: 6, color: "warning" },
  { icon: Settings, label: "Settings & Tools", count: 12, color: "ink" },
];

const faqs = [
  {
    q: "How do I create my first exam?",
    a: "From your dashboard, click 'New exam' or go to Create Exam in the sidebar. Fill in the basic info (title, course, duration), set scheduling, configure proctoring options, then add questions from your bank or create new ones. Click 'Publish' when ready.",
  },
  {
    q: "What question types are supported?",
    a: "Multiple choice, true/false, multi-select, short answer, essay, coding (with code editor), and file upload. Each can be assigned points and difficulty levels.",
  },
  {
    q: "Can I use AI to help grade essays?",
    a: "Yes — when you open the Grading Queue, AI suggestions appear for each essay response with a recommended score and feedback. You can apply, modify, or override the suggestion.",
  },
  {
    q: "How does the plagiarism detection work?",
    a: "Submissions are scanned against (1) other students' submissions in the same cohort, (2) public internet sources, and (3) AI-generated content detection. Results are shown in the Integrity Reports panel.",
  },
  {
    q: "Can I randomize question order?",
    a: "Yes — in the Exam Settings section when creating an exam, toggle 'Randomize question order'. You can also randomize the order of answer choices in MCQs.",
  },
  {
    q: "How do I prevent students from going back to previous questions?",
    a: "Enable 'Prevent backward navigation' in Exam Settings. Students will only be able to move forward, and skipped questions cannot be revisited.",
  },
  {
    q: "Can I let students retake an exam?",
    a: "Set 'Allowed attempts' to any number greater than 1 in Exam Settings. You can also configure whether to keep the highest, latest, or average score across attempts.",
  },
  {
    q: "What if I find an error in a question after publishing?",
    a: "You can edit questions even after publishing. Changes apply to future submissions only. Students who already submitted with the original wording will need their scores manually adjusted.",
  },
];

export default function InstructorHelp() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const filtered = faqs.filter(
    (f) => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar showSearch fullWidth onMenuClick={() => setMenuOpen(true)} />
      <div className="flex">
        <Sidebar items={sidebarItems} mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-full lg:max-w-[1400px]">
          {/* Hero */}
          <div className="card overflow-hidden mb-8">
            <div className="bg-gradient-to-br from-ink-900 to-ink-950 text-white p-6 sm:p-10 relative">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="relative max-w-2xl">
                <h1 className="font-display text-3xl sm:text-4xl font-semibold">How can we help?</h1>
                <p className="mt-2 text-ink-300">Find answers to common instructor questions.</p>
                <div className="mt-6 relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
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
                  <button key={cat.label} className="card p-5 text-left hover:shadow-lg transition group">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors[cat.color]}`}>
                      <cat.icon size={18} />
                    </div>
                    <div className="mt-4 font-semibold text-ink-900 group-hover:text-accent-600 transition">{cat.label}</div>
                    <div className="text-xs text-ink-500 mt-1">{cat.count} articles</div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">Frequently asked questions</h2>
            <div className="card overflow-hidden">
              {filtered.map((faq, i) => (
                <div key={i} className={i < filtered.length - 1 ? "border-b border-ink-100" : ""}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-ink-50 transition">
                    <span className="font-medium text-ink-900">{faq.q}</span>
                    <ChevronDown size={18} className={`text-ink-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-sm text-ink-600 leading-relaxed animate-fade-in">{faq.a}</div>
                  )}
                </div>
              ))}
              {filtered.length === 0 && <div className="p-12 text-center text-ink-400">No results found.</div>}
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">Still need help?</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <ContactCard icon={MessageSquare} label="Live Chat" desc="Avg response: 2 min" color="accent" />
              <ContactCard icon={Mail} label="Email" desc="instructors@proctera.com" color="success" />
              <ContactCard icon={Phone} label="Phone" desc="+1 (800) 555-0100" color="warning" />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function ContactCard({ icon: Icon, label, desc, color }) {
  const colors = { accent: "bg-accent-50 text-accent-600", success: "bg-success/10 text-success", warning: "bg-warning/10 text-warning" };
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
