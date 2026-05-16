import { useEffect, useState } from "react";
import { Camera, Mic, Wifi, Monitor, Chrome, Check, X, Loader2 } from "lucide-react";

const CHECKS = [
  { id: "camera", label: "Webcam", icon: Camera, description: "720p minimum required" },
  { id: "microphone", label: "Microphone", icon: Mic, description: "Audio monitoring active" },
  { id: "network", label: "Network Speed", icon: Wifi, description: "Minimum 2 Mbps required" },
  { id: "resolution", label: "Screen Resolution", icon: Monitor, description: "1280×720 minimum" },
  { id: "browser", label: "Browser Compatibility", icon: Chrome, description: "Chrome, Firefox, Edge, Safari" },
];

export default function EnvironmentCheck({ onComplete }) {
  const [statuses, setStatuses] = useState({});

  useEffect(() => {
    const runChecks = async () => {
      // Camera + microphone
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStatuses((s) => ({ ...s, camera: "pass", microphone: "pass" }));
        stream.getTracks().forEach((t) => t.stop());
      } catch {
        setStatuses((s) => ({ ...s, camera: "fail", microphone: "fail" }));
      }

      // Network (basic check)
      const connection = navigator.connection;
      const networkOk = !connection || (connection.downlink && connection.downlink >= 2);
      setStatuses((s) => ({ ...s, network: networkOk ? "pass" : "fail" }));

      // Resolution
      const resOk = window.innerWidth >= 1280 && window.innerHeight >= 720;
      setStatuses((s) => ({ ...s, resolution: resOk ? "pass" : "fail" }));

      // Browser
      const ua = navigator.userAgent.toLowerCase();
      const supported = /chrome|firefox|edg|safari/.test(ua);
      setStatuses((s) => ({ ...s, browser: supported ? "pass" : "fail" }));
    };

    runChecks();
  }, []);

  const allPassed = CHECKS.every((c) => statuses[c.id] === "pass");

  return (
    <div className="card p-8 max-w-2xl w-full">
      <div className="mb-7">
        <h2 className="font-display text-3xl font-semibold text-ink-900">System Check</h2>
        <p className="mt-2 text-ink-500">
          We need to verify your setup before the exam begins. This usually takes a few seconds.
        </p>
      </div>

      <ul className="space-y-2.5">
        {CHECKS.map((check) => {
          const status = statuses[check.id];
          const Icon = check.icon;
          return (
            <li
              key={check.id}
              className={`flex items-center gap-4 rounded-xl border p-4 transition ${
                status === "pass"
                  ? "border-success/30 bg-success/5"
                  : status === "fail"
                    ? "border-danger/30 bg-danger/5"
                    : "border-ink-100 bg-ink-50"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  status === "pass"
                    ? "bg-success text-white"
                    : status === "fail"
                      ? "bg-danger text-white"
                      : "bg-white text-ink-400"
                }`}
              >
                <Icon size={18} />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-ink-900">{check.label}</div>
                <div className="text-sm text-ink-500">{check.description}</div>
              </div>
              <div>
                {status === "pass" && <Check className="text-success" size={20} strokeWidth={2.5} />}
                {status === "fail" && <X className="text-danger" size={20} strokeWidth={2.5} />}
                {!status && <Loader2 className="text-ink-400 animate-spin" size={20} />}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-sm text-ink-500">
          {allPassed
            ? "All systems ready. You may proceed."
            : "Please resolve any failed checks before continuing."}
        </p>
        <button onClick={onComplete} disabled={!allPassed} className="btn-primary">
          Continue
        </button>
      </div>
    </div>
  );
}