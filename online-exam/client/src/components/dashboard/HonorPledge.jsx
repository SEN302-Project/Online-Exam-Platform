import { ShieldCheck } from "lucide-react";
import { formatDate } from "../../utils/formatTime";

export default function HonorPledge({ userName, signedDate }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-accent-600 to-accent-700 p-5 text-white relative overflow-hidden">
      {/* Decorative pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }}
      />

      <div className="relative">
        <div className="flex items-center gap-1.5 mb-3">
          <ShieldCheck size={14} strokeWidth={2.5} />
          <span className="text-xs font-semibold uppercase tracking-wider">Honor Pledge</span>
        </div>

        <blockquote className="font-display text-lg leading-snug italic">
          "I will neither give nor receive unauthorized aid on this examination."
        </blockquote>

        <div className="mt-4 pt-4 border-t border-white/20 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-semibold">
            {userName?.charAt(0) || "?"}
          </div>
          <div className="text-xs leading-tight">
            <div className="font-semibold">Signed by {userName || "Student"}</div>
            <div className="text-white/70">{formatDate(signedDate || new Date())}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
