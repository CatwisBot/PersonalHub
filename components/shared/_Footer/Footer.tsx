import { Heart} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-r from-blue-900 via-blue-800 to-blue-900 text-white border-t border-blue-700">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center space-y-3">
          {/* Version */}
          <div className="flex items-center space-x-2 text-blue-200">
            <span className="text-sm font-medium bg-blue-700/50 px-3 py-1 rounded-full">
              Version 1.0.0
            </span>
          </div>

          {/* Developed by */}
          <div className="flex items-center space-x-2 text-white">
            <span className="text-sm">
              Developed with{" "}
              <Heart className="w-4 h-4 inline text-red-400 fill-red-400 animate-pulse" />{" "}
              by{" "}
              <span className="font-bold text-blue-300 hover:text-blue-200 transition-colors">
                Catwis
              </span>
            </span>
          </div>

          {/* Copyright */}
          <div className="text-center text-xs text-blue-300/80">
            <p>© {currentYear} PersonalHub. All rights reserved.</p>
            <p className="mt-1">Note Anything, Achieve Everything</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
