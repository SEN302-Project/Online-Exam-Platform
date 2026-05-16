import { Camera, CameraOff } from "lucide-react";
import { useWebcam } from "../../hooks/useWebcam";

export default function WebcamFeed({ size = "default" }) {
  const { videoRef, isActive, error } = useWebcam(true);

  const sizes = {
    default: "h-32 w-44",
    small: "h-24 w-32",
    large: "h-48 w-64",
  };

  return (
    <div className={`relative overflow-hidden rounded-xl bg-ink-900 shadow-soft ${sizes[size]}`}>
      <video
        ref={videoRef}
        muted
        playsInline
        className="h-full w-full object-cover [transform:scaleX(-1)]"
      />
      {!isActive && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink-950 text-ink-500">
          <CameraOff size={20} />
          <span className="text-[10px] font-medium uppercase tracking-wider">
            {error || "Connecting…"}
          </span>
        </div>
      )}
      <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1.5 rounded-md bg-ink-950/80 px-2 py-0.5 backdrop-blur">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            isActive ? "bg-danger animate-pulse-soft" : "bg-ink-500"
          }`}
        />
        <span className="text-[10px] font-medium text-white tracking-wider">
          {isActive ? "REC" : "OFF"}
        </span>
      </div>
      <div className="absolute top-1.5 right-1.5 rounded-md bg-ink-950/80 p-1 backdrop-blur">
        <Camera size={11} className="text-white" />
      </div>
    </div>
  );
}