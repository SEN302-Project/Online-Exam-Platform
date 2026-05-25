import { useEffect, useState } from "react";
import { Check, X, Loader2 } from "lucide-react";

export default function SystemHealth() {
  const [checks, setChecks] = useState({
    camera: { status: "checking", detail: "Detecting..." },
    microphone: { status: "checking", detail: "Detecting..." },
    network: { status: "checking", detail: "Testing..." },
    browser: { status: "checking", detail: "Verifying..." },
  });

  useEffect(() => {
    const runChecks = async () => {
      // Camera + microphone
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const videoTrack = stream.getVideoTracks()[0];
        const audioTrack = stream.getAudioTracks()[0];
        setChecks((c) => ({
          ...c,
          camera: { status: "ok", detail: videoTrack?.label?.split("(")[0].trim() || "Webcam ready" },
          microphone: { status: "ok", detail: audioTrack?.label?.split("(")[0].trim() || "Mic ready" },
        }));
        stream.getTracks().forEach((t) => t.stop());
      } catch {
        setChecks((c) => ({
          ...c,
          camera: { status: "fail", detail: "Permission denied" },
          microphone: { status: "fail", detail: "Permission denied" },
        }));
      }

      // Network
      const conn = navigator.connection;
      if (conn?.downlink) {
        setChecks((c) => ({
          ...c,
          network: {
            status: conn.downlink >= 2 ? "ok" : "fail",
            detail: `${conn.downlink} Mbps • ${conn.rtt || 0}ms`,
          },
        }));
      } else {
        setChecks((c) => ({ ...c, network: { status: "ok", detail: "Connected" } }));
      }

      // Browser
      const ua = navigator.userAgent;
      let browserName = "Unknown";
      let version = "";
      if (ua.includes("Edg/")) {
        browserName = "Microsoft Edge";
        version = ua.match(/Edg\/([\d.]+)/)?.[1]?.split(".")[0] || "";
      } else if (ua.includes("Chrome/")) {
        browserName = "Chrome";
        version = ua.match(/Chrome\/([\d.]+)/)?.[1]?.split(".")[0] || "";
      } else if (ua.includes("Firefox/")) {
        browserName = "Firefox";
        version = ua.match(/Firefox\/([\d.]+)/)?.[1]?.split(".")[0] || "";
      } else if (ua.includes("Safari/")) {
        browserName = "Safari";
      }
      setChecks((c) => ({
        ...c,
        browser: { status: "ok", detail: `${browserName} ${version}`.trim() },
      }));
    };
    runChecks();
  }, []);

  const allReady = Object.values(checks).every((c) => c.status === "ok");

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-ink-900 flex items-center gap-2">
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full ${
              allReady ? "bg-success" : "bg-ink-200"
            }`}
          >
            {allReady && <Check size={12} strokeWidth={3} className="text-white" />}
          </span>
          System Health
        </h3>
        <span
          className={`badge ${
            allReady ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              allReady ? "bg-success" : "bg-warning"
            } animate-pulse-soft`}
          />
          {allReady ? "Ready" : "Checking"}
        </span>
      </div>

      <ul className="space-y-2.5">
        {[
          { key: "camera", label: "Camera" },
          { key: "microphone", label: "Microphone" },
          { key: "network", label: "Network" },
          { key: "browser", label: "Browser" },
        ].map(({ key, label }) => {
          const c = checks[key];
          return (
            <li key={key} className="flex items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-2.5 min-w-0">
                {c.status === "ok" && <Check size={14} className="text-success shrink-0" strokeWidth={2.5} />}
                {c.status === "fail" && <X size={14} className="text-danger shrink-0" strokeWidth={2.5} />}
                {c.status === "checking" && <Loader2 size={14} className="text-ink-400 animate-spin shrink-0" />}
                <span className="text-ink-700 font-medium">{label}</span>
              </div>
              <span className="text-xs text-ink-500 truncate">{c.detail}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
