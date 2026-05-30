import { Link } from "react-router-dom";
import {
  GraduationCap, ShieldCheck, ScanFace, BarChart3, ArrowRight, Check, Sparkles, Users, Award, Globe, Lock,
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-ink-50">
      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-ink-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-900 text-white">
              <GraduationCap size={20} strokeWidth={2.25} />
            </div>
            <div className="leading-none">
              <div className="font-display text-lg font-bold text-ink-900">Proctera</div>
              <div className="text-[10px] uppercase tracking-widest text-ink-400 hidden sm:block">Examination Platform</div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/login" className="btn-ghost !text-sm">Sign in</Link>
            <Link to="/register" className="btn-primary !text-sm">Get started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(rgba(15,19,28,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(15,19,28,0.5) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }} />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent-600/10 blur-3xl" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-700 mb-6">
              <Sparkles size={12} />
              Trusted by 50+ institutions worldwide
            </div>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight text-ink-900">
              Examinations,
              <br />
              <span className="text-accent-600">re-engineered.</span>
            </h1>
            <p className="mt-6 text-base sm:text-xl text-ink-600 max-w-2xl leading-relaxed">
              Secure online assessments with AI proctoring, plagiarism detection, and real-time analytics.
              Built for academic institutions that take integrity seriously.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="btn-primary !text-base !px-6 !py-3">
                Start free trial <ArrowRight size={16} />
              </Link>
              <Link to="/login" className="btn-secondary !text-base !px-6 !py-3">
                Sign in
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-6 sm:gap-8 text-sm text-ink-500">
              <Stat value="50K+" label="Active students" />
              <Stat value="1.2M+" label="Exams delivered" />
              <Stat value="99.97%" label="Uptime" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12 sm:mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-2">Features</div>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-ink-900">Everything you need</h2>
          <p className="mt-3 text-ink-500 max-w-2xl mx-auto">
            From identity verification to results delivery — one platform, end to end.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Feature
            icon={ScanFace}
            title="AI Proctoring"
            desc="Real-time face detection, eye tracking, and environment monitoring. Flags suspicious behavior automatically."
          />
          <Feature
            icon={ShieldCheck}
            title="Plagiarism Detection"
            desc="Cross-checks every submission against peers and online sources. AI-content detection included."
          />
          <Feature
            icon={BarChart3}
            title="Live Analytics"
            desc="Track student performance, topic mastery, and class progress in real time."
          />
          <Feature
            icon={Users}
            title="Role-Based Access"
            desc="Separate dashboards for students, instructors, proctors, and administrators."
          />
          <Feature
            icon={Lock}
            title="Secure by Design"
            desc="End-to-end encryption, JWT authentication, and audit logs of every action."
          />
          <Feature
            icon={Globe}
            title="Works Anywhere"
            desc="Browser-based. No downloads. Compatible with Chrome, Firefox, Edge, and Safari."
          />
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <div className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-2">Workflow</div>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-ink-900">How it works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            <Step num="1" title="Create" desc="Instructors build exams from question banks or scratch. Configure timing, proctoring, and grading rules." />
            <Step num="2" title="Proctor" desc="Students take exams under AI supervision. Live proctors review flagged events in real time." />
            <Step num="3" title="Grade & Report" desc="Auto-grade objective questions instantly. Get plagiarism reports, analytics, and feedback delivered to students." />
          </div>
        </div>
      </section>

      {/* Roles section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12 sm:mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-2">For everyone</div>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-ink-900">Built for every role</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { title: "Students", desc: "Take exams, track progress, view results.", points: ["Identity verification", "Auto-save drafts", "Honor pledge"] },
            { title: "Instructors", desc: "Create, grade, and analyze.", points: ["Question banks", "AI-assisted grading", "Topic analytics"] },
            { title: "Proctors", desc: "Monitor sessions in real time.", points: ["Live video grid", "Incident management", "AI flagging"] },
            { title: "Administrators", desc: "Manage your institution.", points: ["User management", "Audit logs", "System health"] },
          ].map((r) => (
            <div key={r.title} className="card p-6">
              <h3 className="font-display text-xl font-semibold text-ink-900 mb-2">{r.title}</h3>
              <p className="text-sm text-ink-500 mb-4">{r.desc}</p>
              <ul className="space-y-2">
                {r.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-ink-700">
                    <Check size={14} className="text-success mt-0.5 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="card overflow-hidden">
          <div className="bg-gradient-to-br from-ink-900 to-ink-950 text-white p-8 sm:p-16 relative">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }} />
            <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-accent-600/30 blur-3xl" aria-hidden />

            <div className="relative max-w-2xl">
              <Award size={28} className="text-accent-500 mb-4" />
              <h2 className="font-display text-3xl sm:text-5xl font-semibold leading-tight">
                Ready to deliver examinations with confidence?
              </h2>
              <p className="mt-4 text-ink-300 text-base sm:text-lg max-w-lg">
                Join hundreds of institutions running secure, scalable assessments on Proctera.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-ink-900 hover:bg-ink-50 transition"
                >
                  Get started <ArrowRight size={16} />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white hover:bg-white/10 transition backdrop-blur"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink-900 text-white">
              <GraduationCap size={15} strokeWidth={2.25} />
            </div>
            <span className="font-display font-bold text-ink-900">Proctera</span>
          </div>
          <div className="text-xs text-ink-400">© 2026 Proctera. Built for academic integrity.</div>
        </div>
      </footer>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="font-display text-2xl sm:text-3xl font-bold text-ink-900">{value}</div>
      <div className="text-xs sm:text-sm">{label}</div>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="card p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-600 mb-4">
        <Icon size={22} />
      </div>
      <h3 className="font-display text-xl font-semibold text-ink-900 mb-2">{title}</h3>
      <p className="text-sm text-ink-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function Step({ num, title, desc }) {
  return (
    <div className="relative">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-900 text-white font-display text-xl font-bold mb-4">
        {num}
      </div>
      <h3 className="font-display text-xl font-semibold text-ink-900 mb-2">{title}</h3>
      <p className="text-sm text-ink-600 leading-relaxed max-w-xs">{desc}</p>
    </div>
  );
}