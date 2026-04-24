import { useState } from 'react';
import { Download, Youtube, Instagram, MapPin, AlertCircle } from 'lucide-react';
import { DownloadedVideo } from '../App';
import { createClient } from '@supabase/supabase-js';

interface URLInputProps {
  onSubmit: (video: DownloadedVideo) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  onSuccess: () => void;
}

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface PlatformType {
  type: 'youtube' | 'instagram' | 'pinterest' | 'unknown';
  name: string;
  icon: React.ReactNode;
  color: string;
}

function detectPlatform(url: string): PlatformType {
  try {
    new URL(url);
  } catch {
    return { type: 'unknown', name: 'Invalid URL', icon: <AlertCircle className="w-4 h-4" />, color: 'slate' };
  }

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return { type: 'youtube', name: 'YouTube', icon: <Youtube className="w-4 h-4" />, color: 'red' };
  } else if (url.includes('instagram.com')) {
    return { type: 'instagram', name: 'Instagram', icon: <Instagram className="w-4 h-4" />, color: 'pink' };
  } else if (url.includes('pinterest.com')) {
    return { type: 'pinterest', name: 'Pinterest', icon: <MapPin className="w-4 h-4" />, color: 'red' };
  }

  return { type: 'unknown', name: 'Unknown Platform', icon: <AlertCircle className="w-4 h-4" />, color: 'slate' };
}

function generateMockVideoData(url: string, platform: 'youtube' | 'instagram' | 'pinterest'): DownloadedVideo {
  const mockTitles = {
    youtube: ['Amazing Travel Vlog 2024', 'How to Code in React', 'Funny Cat Videos Compilation'],
    instagram: ['Weekend Vibes', 'Fitness Challenge Day 5', 'Coffee Shop Aesthetic'],
    pinterest: ['DIY Home Decoration', 'Cooking Hacks', 'Fashion Styling Tips']
  };

  const mockUploaders = {
    youtube: ['TravelWithAlex', 'Tech Academy', 'PetsCorner'],
    instagram: ['@lifestyle_blogger', '@fitness_guru', '@coffee_culture'],
    pinterest: ['DIY Home', 'Tasty Kitchen', 'Style Guide']
  };

  const randomTitle = mockTitles[platform][Math.floor(Math.random() * mockTitles[platform].length)];
  const randomUploader = mockUploaders[platform][Math.floor(Math.random() * mockUploaders[platform].length)];

  return {
    url,
    platform,
    title: randomTitle,
    thumbnail: `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000) + 1000000}/pexels-photo-${Math.floor(Math.random() * 1000000) + 1000000}.jpeg?auto=compress&cs=tinysrgb&w=400`,
    duration: platform === 'youtube' ? `${Math.floor(Math.random() * 20) + 5}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}` : undefined,
    uploader: randomUploader,
    formats: generateFormatOptions(platform)
  };
}

function generateFormatOptions(platform: 'youtube' | 'instagram' | 'pinterest') {
  if (platform === 'youtube') {
    return [
      { id: '1', quality: '1080p', format: 'MP4', fileSize: '250-500 MB' },
      { id: '2', quality: '720p', format: 'MP4', fileSize: '100-200 MB' },
      { id: '3', quality: '480p', format: 'MP4', fileSize: '50-100 MB' },
      { id: '4', quality: 'Audio Only', format: 'MP3', fileSize: '5-15 MB' }
    ];
  } else if (platform === 'instagram') {
    return [
      { id: '1', quality: '1080p', format: 'MP4', fileSize: '15-50 MB' },
      { id: '2', quality: '720p', format: 'MP4', fileSize: '10-30 MB' },
      { id: '3', quality: 'Audio Only', format: 'MP3', fileSize: '2-5 MB' }
    ];
  } else {
    return [
      { id: '1', quality: '720p', format: 'MP4', fileSize: '20-60 MB' },
      { id: '2', quality: '480p', format: 'MP4', fileSize: '10-30 MB' },
      { id: '3', quality: 'Audio Only', format: 'MP3', fileSize: '3-8 MB' }
    ];
  }
}

export default function URLInput({ onSubmit, setLoading, setError, onSuccess }: URLInputProps) {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState<PlatformType | null>(null);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);

    if (value.trim()) {
      const detected = detectPlatform(value);
      setPlatform(detected);
    } else {
      setPlatform(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    const detected = detectPlatform(url);

    if (detected.type === 'unknown') {
      setError('Please enter a valid YouTube, Instagram, or Pinterest URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const mockVideo = generateMockVideoData(url, detected.type);

      const { error: insertError } = await supabase
        .from('download_history')
        .insert([
          {
            url: mockVideo.url,
            platform: mockVideo.platform,
            video_title: mockVideo.title,
            video_thumbnail: mockVideo.thumbnail
          }
        ]);

      if (insertError) {
        console.error('Error saving to history:', insertError);
      }

      onSubmit(mockVideo);
      onSuccess();
      setUrl('');
      setPlatform(null);
    } catch (err) {
      setError('Failed to process video. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const colorMap: Record<string, string> = {
    red: 'text-red-500',
    pink: 'text-pink-500',
    slate: 'text-slate-400'
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <input
          type="url"
          placeholder="Paste YouTube, Instagram, or Pinterest link here..."
          value={url}
          onChange={handleUrlChange}
          className="w-full px-6 py-4 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all pr-14"
        />
        <button
          type="submit"
          disabled={!url.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>

      {platform && platform.type !== 'unknown' && (
        <div className={`flex items-center gap-2 text-sm font-medium ${colorMap[platform.color as keyof typeof colorMap]}`}>
          {platform.icon}
          <span>{platform.name} detected</span>
        </div>
      )}
    </form>
  );
}
