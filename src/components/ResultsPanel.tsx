import { Download, Copy } from 'lucide-react';
import { DownloadedVideo } from '../App';
import { useState } from 'react';
import DownloadDialog from './DownloadDialog';

interface ResultsPanelProps {
  video: DownloadedVideo;
}

export default function ResultsPanel({ video }: ResultsPanelProps) {
  const [selectedFormat, setSelectedFormat] = useState<string>(video.formats[0].id);
  const [copied, setCopied] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const selectedFormatData = video.formats.find(f => f.id === selectedFormat);

  const handleDownloadClick = () => {
    setShowDialog(true);
  };

  const handleConfirmDownload = async () => {
    if (!selectedFormatData) return;

    setIsDownloading(true);
    setDownloadComplete(false);

    try {
      // Call backend to download real video
      const response = await fetch(
        `http://localhost:4000/download?url=${encodeURIComponent(video.url)}`
      );
      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${video.title.replace(/[^a-z0-9]/gi, '_')}_${selectedFormatData.quality}.${selectedFormatData.format.toLowerCase()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setDownloadComplete(true);
      setTimeout(() => {
        setShowDialog(false);
        setIsDownloading(false);
        setDownloadComplete(false);
      }, 1500);
    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
      alert('Download failed. Please make sure the backend is running.');
    }
  };

  const handleCloseDialog = () => {
    if (!isDownloading) {
      setShowDialog(false);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(video.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-12 space-y-8">
      {/* Video Info Card */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-all">
        <div className="grid md:grid-cols-3 gap-6 p-6">
          {/* Thumbnail */}
          <div className="md:col-span-1 flex items-center justify-center">
            <div className="relative group">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full aspect-video object-cover rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23374151" width="100" height="100"/%3E%3C/svg%3E';
                }}
              />
              {video.duration && (
                <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white font-medium">
                  {video.duration}
                </div>
              )}
            </div>
          </div>

          {/* Video Details */}
          <div className="md:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                  {video.platform.toUpperCase()}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {video.title}
              </h3>
              {video.uploader && (
                <p className="text-slate-300 text-sm mb-4">
                  <span className="text-slate-400">By</span> {video.uploader}
                </p>
              )}
            </div>

            {/* URL Copy Button */}
            <button
              onClick={handleCopyUrl}
              className="flex items-center gap-2 w-fit px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-lg text-slate-200 text-sm transition-all"
            >
              <Copy className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy URL'}
            </button>
          </div>
        </div>
      </div>

      {/* Format Selection */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
        <h4 className="text-lg font-bold text-white mb-4">Select Download Format</h4>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {video.formats.map((format) => (
            <button
              key={format.id}
              onClick={() => setSelectedFormat(format.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedFormat === format.id
                  ? 'border-teal-500 bg-teal-500/10'
                  : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
              }`}
            >
              <div className="font-bold text-white text-sm sm:text-base">
                {format.quality}
              </div>
              <div className="text-xs text-slate-300 mt-1">
                {format.format}
              </div>
              {format.fileSize && (
                <div className="text-xs text-slate-400 mt-2">
                  {format.fileSize}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownloadClick}
          className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95"
        >
          <Download className="w-5 h-5" />
          Download Now
        </button>

        <p className="text-xs text-slate-400 text-center mt-4">
          Downloads are typically completed within seconds. Large files may take longer.
        </p>
      </div>

      {/* Download Dialog */}
      <DownloadDialog
        isOpen={showDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDownload}
        videoTitle={video.title}
        formatQuality={selectedFormatData?.quality || ''}
        formatType={selectedFormatData?.format || ''}
        isDownloading={isDownloading}
      />
    </div>
  );
}
