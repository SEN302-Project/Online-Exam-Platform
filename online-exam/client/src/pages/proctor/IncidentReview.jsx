import { ArrowLeft, AlertTriangle, Check, X } from "lucide-react";
import Navbar from "../../components/common/Navbar";

export default function IncidentReview() {
  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-10">
        <button className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900 mb-6">
          <ArrowLeft size={15} /> Back to console
        </button>

        <div className="card overflow-hidden">
          <div className="bg-gradient-to-br from-danger/10 to-danger/5 p-6">
            <span className="badge bg-danger text-white mb-2">
              <AlertTriangle size={12} /> High Severity
            </span>
            <h1 className="font-display text-2xl font-semibold text-ink-900">Multiple Faces Detected</h1>
            <p className="mt-1 text-ink-600">Student: John P. • SEN 306 Final • 2 minutes ago</p>
          </div>

          <div className="p-6">
            <div className="aspect-video bg-ink-900 rounded-xl mb-5 flex items-center justify-center text-ink-500">
              Captured frame preview
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Field label="Confidence Score" value="92%" />
              <Field label="Duration" value="3.2s" />
              <Field label="AI Model" value="FaceNet v2" />
              <Field label="Timestamp" value="14:23:08" />
            </div>

            <div className="flex gap-2">
              <button className="btn-primary !bg-success hover:!bg-emerald-700 flex-1">
                <Check size={15} /> Confirm Violation
              </button>
              <button className="btn-secondary flex-1">
                <X size={15} /> Dismiss as False Positive
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="rounded-lg bg-ink-50 p-3">
      <div className="text-xs uppercase tracking-wider text-ink-400 mb-1">{label}</div>
      <div className="font-mono font-semibold text-ink-900">{value}</div>
    </div>
  );
}