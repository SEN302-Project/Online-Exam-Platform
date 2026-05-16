import { AlertTriangle, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProctorAlertBanner({ alert, onDismiss }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (alert) {
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 8000);
      return () => clearTimeout(t);
    }
  }, [alert]);

  if (!alert || !visible) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className="flex items-center gap-3 rounded-xl border border-warning/30 bg-warning/10 backdrop-blur-md px-5 py-3 shadow-soft">
        <AlertTriangle size={18} className="text-warning shrink-0" />
        <div className="text-sm">
          <span className="font-semibold text-ink-900">Proctor Notice:</span>{" "}
          <span className="text-ink-700">{alert.message}</span>
        </div>
        <button
          onClick={() => {
            setVisible(false);
            onDismiss?.();
          }}
          className="text-ink-400 hover:text-ink-700"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}