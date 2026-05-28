import { useState } from "react";
import {
  AlertTriangle, LayoutDashboard, FileText, HelpCircle, Search, ChevronDown,
  MessageSquare, Mail, Phone, Eye, ShieldCheck, Camera, AlertCircle,
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";

const sidebarItems = [
  {
    section: "MONITORING",
    items: [
      { to: "/proctor", label: "Live console", icon: LayoutDashboard, end: true },
      { to: "/proctor/incidents", label: "Incidents", icon: AlertTriangle, badge: "3" },
      { to: "/proctor/sessions", label: "Past sessions", icon: FileText },
    ],
  },
  {
    section: "REFERENCE",
    items: [{ to: "/proctor/help", label: "Help center", icon: HelpCircle }],
  },
];

const categories = [
  { icon: Eye, label: "Monitoring Sessions", count: 8, color: "accent" },
  { icon: AlertCircle, label: "Handling Incidents", count: 12, color: "warning" },
  { icon: ShieldCheck, label: "Best Practices", count: 6, color: "success" },
  { icon: Camera, label: "Camera Issues", count: 9, color: "ink" },
];

const faqs = [
  { q: "How do I review a flagged incident?", a: "Click any alert in the Live Console or open the Incidents page. You'll see the captured frame, AI confidence score, and event timeline. Use Confirm Violation or Dismiss based on what you observe." },
  { q: "What counts as a confirmed violation?", a: "Multiple faces, unauthorized devices, leaving the exam window for extended periods, or clear communication with another person. Looking away briefly or stretching is generally fine." },
  { q: "Can I message a student during an exam?", a: "Yes — on a student's live feed card, click the message icon to send a private note. They'll see it as a small toast in their exam screen." },
  { q: "What happens after I confirm a violation?", a: "The instructor is notified, and the violation is logged on the student's record. The instructor decides what disciplinary action (if any) to take." },
  { q: "How do I handle a false positive?", a: "Click Dismiss with a brief note. This trains the AI to be less sensitive to similar patterns in the future and protects the student's record." },
  { q: "What's my role during the exam?", a: "Watch the live grid, respond to flagged events, and intervene only when necessary. AI handles most detection — you confirm or dismiss its calls." },
];

export default function ProctorHelp() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const filtered = faqs.filter((f) => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar showSearch fullWidth onMenuClick={() => setMenuOpen(true)} />
      <div className="flex">
        <Sidebar items={sidebarItems} mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-full lg:max-w-[1400px]">
          <div className="card overflow-hidden mb-8">
            <div className="bg-gradient-to-br from-ink-900 to-ink-950 text-white p-6 sm:p-10 relative">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
              <div className="relative max-w-2xl">
                <h1 className="font-display text-3xl sm:text-4xl font-semibold">How can we help?</h1>
                <p className="mt-2 text-ink-300">Proctoring guides, best practices, and troubleshooting.</p>
                <div className="mt-6 relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
                  <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for answers..." className="w-full rounded-lg bg-white/10 backdrop-blur border border-white/20 pl-12 pr-4 py-3 text-white placeholder-ink-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30" />
                </div>
              </div>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">Browse by topic</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {categories.map((cat) => {
                const colors = { accent: "bg-accent-50 text-accent-600", warning: "bg-warning/10 text-warning", success: "bg-success/10 text-success", ink: "bg-ink-100 text-ink-700" };
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
                  {openFaq === i && <div className="px-5 pb-5 text-sm text-ink-600 leading-relaxed animate-fade-in">{faq.a}</div>}
                </div>
              ))}
              {filtered.length === 0 && <div className="p-12 text-center text-ink-400">No results found.</div>}
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">Still need help?</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <ContactCard icon={MessageSquare} label="Live Chat" desc="Avg response: 2 min" color="accent" />
              <a href="mailto:proctors@proctera.com" className="card p-5 text-left hover:shadow-lg transition group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
                  <Mail size={18} />
                </div>
                <div className="mt-4 font-semibold text-ink-900 group-hover:text-accent-600 transition">Email</div>
                <div className="text-sm text-ink-500 mt-0.5">proctors@proctera.com</div>
              </a>
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
