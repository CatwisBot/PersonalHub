import { CheckCircle2, AlertCircle } from "lucide-react";

interface AlertMessageProps {
  type: "success" | "error";
  message: string;
}

export default function AlertMessage({ type, message }: AlertMessageProps) {
  if (type === "success") {
    return (
      <div className="mb-6 bg-green-500/20 border border-green-500/50 rounded-xl p-4 flex items-center gap-3 animate-in slide-in-from-top">
        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
        <p className="text-green-400 text-sm">{message}</p>
      </div>
    );
  }

  return (
    <div className="mb-6 bg-red-500/20 border border-red-500/50 rounded-xl p-4 flex items-center gap-3 animate-in slide-in-from-top">
      <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
      <p className="text-red-400 text-sm">{message}</p>
    </div>
  );
}
