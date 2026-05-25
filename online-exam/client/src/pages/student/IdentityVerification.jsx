import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  CalendarClock,
  ScanFace,
  MonitorCheck,
  Radio,
  TrendingUp,
  BookOpen,
  HelpCircle,
  ArrowLeft,
  Camera,
  Upload,
  Check,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import { useWebcam } from "../../hooks/useWebcam";

const sidebarItems = [
  {
    section: "MY EXAMS",
    items: [
      { to: "/student", label: "Dashboard", icon: Home, end: true },
      { to: "/student/upcoming", label: "Upcoming exams", icon: CalendarClock, badge: "5" },
      { to: "/student/identity", label: "Identity verification", icon: ScanFace },
      { to: "/student/system-check", label: "System check", icon: MonitorCheck },
      { to: "/student/live", label: "Live exam", icon: Radio },
      { to: "/student/history", label: "Results & feedback", icon: TrendingUp },
    ],
  },
  {
    section: "REFERENCE",
    items: [
      { to: "/student/honor-policy", label: "Honor policy", icon: BookOpen },
      { to: "/student/help", label: "Help center", icon: HelpCircle },
    ],
  },
];

const STEPS = [
  { id: 1, label: "Upload ID" },
  { id: 2, label: "Capture selfie" },
  { id: 3, label: "Verification" },
];

export default function IdentityVerification() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [idFile, setIdFile] = useState(null);
  const [selfieCaptured, setSelfieCaptured] = useState(false);
  const { videoRef, isActive, captureFrame } = useWebcam(step === 2);

  const handleCapture = async () => {
    const blob = await captureFrame();
    if (blob) {
      setSelfieCaptured(true);
      setTimeout(() => setStep(3), 800);
    }
  };

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar showSearch fullWidth />
      <div className="flex">
        <Sidebar items={sidebarItems} />
        <main className="flex-1 px-6 lg:px-10 py-8 max-w-[1400px]">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900 mb-6"
          >
            <ArrowLeft size={15} /> Back
          </button>

          <div className="mb-8">
            <div className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-1">Student</div>
            <h1 className="font-display text-4xl font-semibold text-ink-900">Identity verification</h1>
            <p className="mt-1.5 text-ink-500">
              Confirm your identity before your first exam. This is a one-time check.
            </p>
          </div>

          {/* Steps */}
          <div className="card p-6 mb-6">
            <div className="flex items-center gap-2 mb-2">
              {STEPS.map((s, i) => (
                <div key={s.id} className="flex-1 flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                      step > s.id
                        ? "bg-success text-white"
                        : step === s.id
                          ? "bg-ink-900 text-white"
                          : "bg-ink-100 text-ink-400"
                    }`}
                  >
                    {step > s.id ? <Check size={14} strokeWidth={3} /> : s.id}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      step >= s.id ? "text-ink-900" : "text-ink-400"
                    }`}
                  >
                    {s.label}
                  </span>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 ${step > s.id ? "bg-success" : "bg-ink-100"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="card p-8">
            {step === 1 && (
              <>
                <h2 className="font-display text-2xl font-semibold text-ink-900">Upload your student ID</h2>
                <p className="text-ink-500 mt-1 mb-6">
                  Upload a clear photo of your school ID or a government-issued ID.
                </p>

                <label
                  className={`block cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition ${
                    idFile ? "border-success bg-success/5" : "border-ink-200 hover:border-accent-500 hover:bg-accent-50"
                  }`}
                >
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,application/pdf"
                    onChange={(e) => setIdFile(e.target.files?.[0])}
                  />
                  {idFile ? (
                    <>
                      <CheckCircle2 size={36} className="text-success mx-auto mb-3" />
                      <div className="font-semibold text-ink-900">{idFile.name}</div>
                      <div className="text-sm text-ink-500 mt-1">{(idFile.size / 1024).toFixed(1)} KB</div>
                    </>
                  ) : (
                    <>
                      <Upload size={36} className="text-ink-400 mx-auto mb-3" />
                      <div className="font-semibold text-ink-900">Click to upload</div>
                      <div className="text-sm text-ink-500 mt-1">JPG, PNG, or PDF up to 10MB</div>
                    </>
                  )}
                </label>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    disabled={!idFile}
                    className="btn-primary"
                  >
                    Continue →
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="font-display text-2xl font-semibold text-ink-900">Capture a live selfie</h2>
                <p className="text-ink-500 mt-1 mb-6">
                  Face the camera in good lighting. We'll match it to your ID photo.
                </p>

                <div className="grid sm:grid-cols-[1fr_240px] gap-6">
                  <div className="relative aspect-video bg-ink-900 rounded-xl overflow-hidden">
                    <video
                      ref={videoRef}
                      muted
                      playsInline
                      className="w-full h-full object-cover [transform:scaleX(-1)]"
                    />
                    {!isActive && (
                      <div className="absolute inset-0 flex items-center justify-center text-ink-500">
                        Connecting to camera...
                      </div>
                    )}
                    {/* Face guide overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-48 h-64 border-4 border-white/40 rounded-[40%]" />
                    </div>
                    {selfieCaptured && (
                      <div className="absolute inset-0 bg-success/20 backdrop-blur-sm flex items-center justify-center animate-fade-in">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success">
                          <Check size={36} strokeWidth={3} className="text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 text-sm text-ink-600">
                    <h3 className="font-semibold text-ink-900">Tips</h3>
                    <Tip>Look directly at the camera</Tip>
                    <Tip>Remove sunglasses or hats</Tip>
                    <Tip>Ensure even lighting on your face</Tip>
                    <Tip>Stay still while we capture</Tip>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <button onClick={() => setStep(1)} className="btn-secondary">← Back</button>
                  <button
                    onClick={handleCapture}
                    disabled={!isActive || selfieCaptured}
                    className="btn-primary"
                  >
                    <Camera size={15} /> Capture
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <div className="text-center py-8">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10 text-success mb-5">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="font-display text-3xl font-semibold text-ink-900">Verification submitted</h2>
                <p className="mt-2 text-ink-500 max-w-md mx-auto">
                  We're reviewing your documents. You'll be notified within 24 hours and can take exams once approved.
                </p>
                <div className="mt-8 max-w-sm mx-auto card border-warning/30 bg-warning/5 p-4 text-left flex gap-3">
                  <AlertCircle size={18} className="text-warning shrink-0 mt-0.5" />
                  <div className="text-sm text-ink-700">
                    <strong>Status: Under Review</strong>
                    <p className="text-ink-500 mt-0.5">Estimated time: 4-24 hours</p>
                  </div>
                </div>
                <button onClick={() => navigate("/student")} className="btn-primary mt-6">
                  Back to dashboard
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function Tip({ children }) {
  return (
    <div className="flex gap-2">
      <Check size={14} className="text-success shrink-0 mt-0.5" strokeWidth={2.5} />
      <span>{children}</span>
    </div>
  );
}