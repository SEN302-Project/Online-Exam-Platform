import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, ScrollText, HelpCircle, MessageSquare, Mail, Phone, FileText, Settings, ArrowLeft, ChevronDown, Search,
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

const faqs = [
  { q: "How do I add a new user?", a: "Go to User Management → click 'Invite user' → enter email and select role. An invitation is sent automatically." },
  { q: "Can I bulk import users from CSV?", a: "Yes — in User Management, click the dropdown next to 'Invite user' and select 'Bulk import'. Upload a CSV with columns: name, email, role." },
  { q: "How do I view audit logs?", a: "Click Audit logs in the sidebar. All administrative actions are logged with timestamp, actor, action, target, and IP. You can filter and export." },
  { q: "What if AI Proctoring shows 'Degraded'?", a: "Check the AI service logs in your monitoring dashboard. Common causes: GPU saturation, model loading delays, or upstream API issues." },
  { q: "How do I configure SSO?", a: "Contact your account manager — SSO setup requires backend configuration with your IdP (Okta, Azure AD, Google Workspace, etc.)." },
];

export default function AdminSupport() {
  const navigate = useNavigate();
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
          <button onClick={() => navigate("/admin")} className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900 mb-6">
            <ArrowLeft size={15} /> Back to overview
          </button>

          <div className="card overflow-hidden mb-8">
            <div className="bg-gradient-to-br from-ink-900 to-ink-950 text-white p-6 sm:p-10 relative">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
              <div className="relative max-w-2xl">
                <h1 className="font-display text-3xl sm:text-4xl font-semibold">Admin Support</h1>
                <p className="mt-2 text-ink-300">System administration help and direct support channels.</p>
                <div className="mt-6 relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
                  <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search documentation..." className="w-full rounded-lg bg-white/10 backdrop-blur border border-white/20 pl-12 pr-4 py-3 text-white placeholder-ink-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30" />
                </div>
              </div>
            </div>
          </div>

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
            <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">Contact support</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <ContactCard icon={MessageSquare} label="Live Chat" desc="Priority queue, ~30s" color="accent" />
              <a href="mailto:admin@proctera.com" className="card p-5 text-left hover:shadow-lg transition group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
                  <Mail size={18} />
                </div>
                <div className="mt-4 font-semibold text-ink-900 group-hover:text-accent-600 transition">Email</div>
                <div className="text-sm text-ink-500 mt-0.5">admin@proctera.com</div>
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
  const colors = { accent: "bg-accent-50 text-accent-600", warning: "bg-warning/10 text-warning" };
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
