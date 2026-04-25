import { X } from 'lucide-react';

interface DownloadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  videoTitle: string;
  formatQuality: string;
  formatType: string;
  isDownloading: boolean;
}

export default function DownloadDialog({
  isOpen,
  onClose,
  onConfirm,
  videoTitle,
  formatQuality,
  formatType,
  isDownloading
}: DownloadDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative bg-slate-800 border border-slate-600 rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl transform transition-all">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          disabled={isDownloading}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg 
              className="w-8 h-8 text-teal-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
              />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            {isDownloading ? 'Downloading...' : 'Confirm Download'}
          </h3>
          
          <p className="text-slate-300 mb-4">
            {isDownloading 
              ? 'Your download is in progress' 
              : `Download "${videoTitle}"?`
            }
          </p>

          {!isDownloading && (
            <div className="bg-slate-700/50 rounded-lg p-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Quality:</span>
                <span className="text-white font-medium">{formatQuality}</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-slate-400">Format:</span>
                <span className="text-white font-medium">{formatType}</span>
              </div>
            </div>
          )}

          {isDownloading && (
            <div className="mb-6">
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-teal-500 rounded-full animate-pulse"
                  style={{ width: '60%' }}
                />
              </div>
              <p className="text-slate-400 text-sm mt-2">Please wait...</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isDownloading}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg text-white font-medium transition-colors disabled:opacity-50"
            >
              {isDownloading ? 'Cancel' : 'Cancel'}
            </button>
            <button
              onClick={onConfirm}
              disabled={isDownloading}
              className="flex-1 px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg text-white font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isDownloading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Downloading
                </>
              ) : (
                'Download'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}