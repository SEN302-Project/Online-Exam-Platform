import { Clock, AlertTriangle } from "lucide-react";
import { formatTime } from "../../utils/formatTime";

export default function Timer({ secondsLeft, warning }) {
  const isCritical = secondsLeft < 300; // last 5 minutes
  const isUrgent = secondsLeft < 60;

  return (
    <div className="relative">
      <div
        className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 font-mono text-lg font-semibold transition ${
          isUrgent
            ? "bg-danger text-white animate-pulse-soft"
            : isCritical
              ? "bg-warning/10 text-warning"
              : "bg-ink-900 text-white"
        }`}
      >
        <Clock size={18} strokeWidth={2.5} />
        <span className="tabular-nums tracking-wide">{formatTime(secondsLeft)}</span>
      </div>

      {warning && (
        <div className="absolute top-full right-0 mt-2 w-64 card border-warning/40 bg-warning/5 p-3 animate-slide-up z-10">
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="text-warning shrink-0 mt-0.5" />
            <div className="text-sm text-ink-700">
              <strong>{Math.floor(warning / 60)} minutes remaining.</strong> Please review your answers.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}