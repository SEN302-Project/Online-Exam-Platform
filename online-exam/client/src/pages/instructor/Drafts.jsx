import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Plus, BookOpen, ScrollText, BarChart3, AlertTriangle, HelpCircle, FileEdit,
  Calendar, Clock, FileText, Search, Trash2, Edit, ChevronRight,
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

const mockDrafts = [
  { id: "1", title: "Advanced Algorithms Final", course: "CSC 405", lastSaved: "2 hours ago", questionCount: 35, complete: 87 },
  { id: "2", title: "Database Systems Mid-term", course: "CSC 350", lastSaved: "Yesterday", questionCount: 18, complete: 45 },
  { id: "3", title: "Operating Systems Quiz 4", course: "CSC 310", lastSaved: "3 days ago", questionCount: 8, complete: 22 },
];

export default function Drafts() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = mockDrafts.filter((d) => d.title.toLowerCase().includes(search.toLowerCase()) || d.course.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar showSearch fullWidth onMenuClick={() => setMenuOpen(true)} />
      <div className="flex">
        <Sidebar items={sidebarItems} mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-full lg:max-w-[1400px]">
          <div className="flex items-start justify-between gap-4 mb-6 sm:mb-8 flex-wrap">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-1">Instructor</div>
              <h1 className="font-display text-2xl sm:text-4xl font-semibold text-ink-900">Drafts</h1>
              <p className="mt-1.5 text-ink-500 text-sm sm:text-base">Continue working on exams you haven't published yet.</p>
            </div>
            <button onClick={() => navigate("/instructor/create-exam")} className="btn-primary">
              <Plus size={16} /> New exam
            </button>
          </div>

          <div className="relative mb-6">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search drafts..." className="input pl-10" />
          </div>

          {filtered.length > 0 ? (
            <div className="space-y-3">
              {filtered.map((d) => (
                <article key={d.id} className="card p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-mono text-xs font-semibold text-ink-500">{d.course}</span>
                        <span className="badge bg-warning/10 text-warning">Draft</span>
                      </div>
                      <h3 className="font-semibold text-ink-900 text-sm sm:text-base">{d.title}</h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-ink-500 flex-wrap">
                        <span className="flex items-center gap-1"><Clock size={11} />Saved {d.lastSaved}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1"><FileText size={11} />{d.questionCount} questions</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => navigate("/instructor/create-exam")} className="btn-secondary !text-sm">
                        <Edit size={13} /> Continue
                      </button>
                      <button className="btn-ghost !p-2 text-danger hover:!bg-danger/10" title="Delete">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-ink-500">Completion</span>
                      <span className="font-mono font-semibold text-ink-700">{d.complete}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-ink-100 overflow-hidden">
                      <div className="h-full bg-accent-600 transition-all duration-700" style={{ width: `${d.complete}%` }} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <FileEdit size={32} className="text-ink-400 mx-auto mb-3" />
              <h3 className="font-semibold text-ink-900 mb-1">No drafts yet</h3>
              <p className="text-sm text-ink-500 mb-5">Start creating an exam — your progress will be saved as a draft automatically.</p>
              <button onClick={() => navigate("/instructor/create-exam")} className="btn-primary">
                <Plus size={16} /> Create your first exam
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}