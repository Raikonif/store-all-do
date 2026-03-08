import { Radius } from "lucide-react";

function CircleProgress() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden bg-slate-950/45 backdrop-blur-sm outline-none transition-colors focus:outline-none">
      <div className="glass-card soft-entry flex flex-col items-center gap-3 px-8 py-6">
        <Radius className="animate-spin text-cyan-100" />
        <p className="font-semibold text-cyan-50">Procesando ...</p>
      </div>
    </div>
  );
}

export default CircleProgress;
