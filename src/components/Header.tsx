import { Download } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg">
            <Download className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">DownloadHub</span>
        </div>
        <nav className="hidden sm:flex gap-8">
          <a href="#features" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
            Features
          </a>
          <a href="#faq" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
            FAQ
          </a>
        </nav>
      </div>
    </header>
  );
}
