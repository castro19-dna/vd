import { useEffect, useState } from 'react';
import { Trash2, Youtube, Instagram, MapPin, Clock } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

interface HistoryItem {
  id: string;
  url: string;
  platform: 'youtube' | 'instagram' | 'pinterest';
  video_title: string;
  video_thumbnail: string | null;
  created_at: string;
}

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const platformIcons: Record<string, React.ReactNode> = {
  youtube: <Youtube className="w-4 h-4 text-red-500" />,
  instagram: <Instagram className="w-4 h-4 text-pink-500" />,
  pinterest: <MapPin className="w-4 h-4 text-red-600" />
};

export default function DownloadHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('download_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching history:', error);
      } else {
        setHistory(data || []);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleClearHistory = async () => {
    if (!window.confirm('Are you sure you want to clear all download history?')) {
      return;
    }

    const { error } = await supabase
      .from('download_history')
      .delete()
      .gt('id', '');

    if (!error) {
      setHistory([]);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-400">Loading history...</p>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-400">No download history yet. Start by downloading a video!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Recent Downloads</h3>
        {history.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 hover:bg-red-500/30 transition-all text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="bg-slate-700/30 border border-slate-600 rounded-lg p-4 hover:bg-slate-700/50 hover:border-slate-500 transition-all group"
          >
            <div className="flex gap-4">
              {item.video_thumbnail && (
                <div className="flex-shrink-0">
                  <img
                    src={item.video_thumbnail}
                    alt={item.video_title}
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23374151" width="100" height="100"/%3E%3C/svg%3E';
                    }}
                  />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {platformIcons[item.platform]}
                  <span className="text-xs font-bold uppercase text-slate-400">
                    {item.platform}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white truncate group-hover:text-teal-400 transition-colors">
                  {item.video_title}
                </h4>

                <div className="flex items-center gap-1 text-xs text-slate-400 mt-2">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(item.created_at)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
