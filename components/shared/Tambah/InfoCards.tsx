import { AlertCircle, CheckCircle2 } from "lucide-react";
import { TabType } from "./types";

interface InfoCardsProps {
  activeTab: TabType;
}

export default function InfoCards({ activeTab }: InfoCardsProps) {
  const getContent = () => {
    switch (activeTab) {
      case "pengeluaran":
        return {
          tips: "Catat setiap pengeluaran secara rutin untuk monitoring keuangan yang lebih baik.",
          benefit:
            "Ketahui kemana saja uang Anda pergi dan buat keputusan keuangan yang lebih baik.",
        };
      case "tugas":
        return {
          tips: "Atur deadline dengan realistis dan prioritaskan tugas yang mendesak.",
          benefit:
            "Tingkatkan produktivitas dan pastikan tidak ada tugas penting yang terlewat.",
        };
      case "hutang":
        return {
          tips: "Bayar hutang tepat waktu untuk menghindari denda dan menjaga kredibilitas.",
          benefit:
            "Kelola hutang dengan baik untuk keuangan yang lebih sehat dan terorganisir.",
        };
      case "budget":
        return {
          tips: "Set budget bulanan sesuai pendapatan dan jangan lupa sisihkan untuk tabungan.",
          benefit:
            "Kontrol pengeluaran dan capai target tabungan dengan perencanaan yang matang.",
        };
    }
  };

  const content = getContent();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
      <div className="bg-linear-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-5 border border-blue-500/30">
        <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-400" />
          Tips
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">{content.tips}</p>
      </div>

      <div className="bg-linear-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-xl p-5 border border-green-500/30">
        <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          Manfaat
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {content.benefit}
        </p>
      </div>
    </div>
  );
}
