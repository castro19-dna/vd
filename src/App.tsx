import { useState } from 'react';
import { Download, Youtube, Instagram, MapPin, ChevronDown } from 'lucide-react';
import Header from './components/Header';
import URLInput from './components/URLInput';
import ResultsPanel from './components/ResultsPanel';
import DownloadHistory from './components/DownloadHistory';
import FeaturesSection from './components/FeaturesSection';
import FAQSection from './components/FAQSection';

export interface DownloadedVideo {
  url: string;
  platform: string;
  title: string;
  thumbnail: string;
  duration?: string;
  uploader?: string;
  formats: Format[];
}

export interface Format {
  id: string;
  quality: string;
  format: string;
  fileSize?: string;
}

function App() {
  const [selectedVideo, setSelectedVideo] = useState<DownloadedVideo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [historyRefresh, setHistoryRefresh] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      <main className="relative">
        {/* Hero Section */}
        <section className="pt-12 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
                Download Videos Instantly
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 mb-8">
                One tool for all platforms. YouTube, Instagram, Pinterest. No limits.
              </p>
            </div>

            {/* Platform Badges */}
            <div className="flex justify-center gap-3 mb-12 flex-wrap">
              <div className="flex items-center gap-2 bg-slate-700/50 backdrop-blur px-4 py-2 rounded-full border border-slate-600">
                <Youtube className="w-5 h-5 text-red-500" />
                <span className="text-slate-200 text-sm font-medium">YouTube & Shorts</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-700/50 backdrop-blur px-4 py-2 rounded-full border border-slate-600">
                <Instagram className="w-5 h-5 text-pink-500" />
                <span className="text-slate-200 text-sm font-medium">Instagram Reels</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-700/50 backdrop-blur px-4 py-2 rounded-full border border-slate-600">
                <MapPin className="w-5 h-5 text-red-600" />
                <span className="text-slate-200 text-sm font-medium">Pinterest Videos</span>
              </div>
            </div>

            {/* URL Input */}
            <URLInput
              onSubmit={setSelectedVideo}
              setLoading={setLoading}
              setError={setError}
              onSuccess={() => setHistoryRefresh(prev => prev + 1)}
            />

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="mt-8 flex justify-center">
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-600"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-teal-500 animate-spin"></div>
                </div>
              </div>
            )}

            {/* Results Panel */}
            {selectedVideo && !loading && (
              <ResultsPanel video={selectedVideo} />
            )}
          </div>
        </section>

        {/* Download History */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-800/50 backdrop-blur">
          <div className="max-w-4xl mx-auto">
            <DownloadHistory key={historyRefresh} />
          </div>
        </section>

        {/* Features Section */}
        <FeaturesSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Footer */}
        <footer className="border-t border-slate-700 bg-slate-900 px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-slate-400 text-sm">
              Download videos safely and securely. Supporting YouTube, Instagram, and Pinterest.
            </p>
            <p className="text-slate-500 text-xs mt-4">
              © 2024 Video Downloader. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
