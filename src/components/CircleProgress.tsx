import { Radius } from "lucide-react";

function CircleProgress() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden bg-white/70 shadow-2xl outline-none transition-colors focus:outline-none">
      <Radius className="animate-spin text-green-500" />
      <p className="font-semibold text-green-600">Procesando ...</p>
    </div>
  );
}

export default CircleProgress;
