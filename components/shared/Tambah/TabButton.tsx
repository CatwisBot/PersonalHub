import { LucideIcon } from "lucide-react";
import { TabType } from "./types";

interface TabButtonProps {
  tab: {
    id: TabType;
    label: string;
    icon: LucideIcon;
    color: string;
  };
  isActive: boolean;
  onClick: () => void;
}

export default function TabButton({ tab, isActive, onClick }: TabButtonProps) {
  const Icon = tab.icon;

  const getColorClasses = (color: string, active: boolean) => {
    const colors = {
      blue: active
        ? "bg-blue-500/20 text-blue-400 border-blue-500"
        : "hover:bg-blue-500/10 hover:text-blue-400",
      green: active
        ? "bg-green-500/20 text-green-400 border-green-500"
        : "hover:bg-green-500/10 hover:text-green-400",
      red: active
        ? "bg-red-500/20 text-red-400 border-red-500"
        : "hover:bg-red-500/10 hover:text-red-400",
      purple: active
        ? "bg-purple-500/20 text-purple-400 border-purple-500"
        : "hover:bg-purple-500/10 hover:text-purple-400",
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 ${
        isActive
          ? getColorClasses(tab.color, true)
          : `bg-slate-800/50 border-slate-700 text-gray-400 ${getColorClasses(
              tab.color,
              false
            )}`
      }`}
    >
      <Icon className="w-6 h-6" />
      <span className="text-sm font-medium">{tab.label}</span>
    </button>
  );
}
