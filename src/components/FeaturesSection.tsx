import { Youtube, Instagram, MapPin, Zap, Shield, Clock } from 'lucide-react';

export default function FeaturesSection() {
  const platforms = [
    {
      name: 'YouTube & Shorts',
      description: 'Download full videos, shorts, and playlists in multiple quality options from 4K down to mobile-friendly formats.',
      icon: Youtube,
      color: 'text-red-500',
      bg: 'bg-red-500/10'
    },
    {
      name: 'Instagram Reels',
      description: 'Grab your favorite Reels, stories, and carousel posts. Save with original quality and metadata intact.',
      icon: Instagram,
      color: 'text-pink-500',
      bg: 'bg-pink-500/10'
    },
    {
      name: 'Pinterest Videos',
      description: 'Download videos and pins from Pinterest boards. Perfect for saving creative content and inspiration.',
      icon: MapPin,
      color: 'text-red-600',
      bg: 'bg-red-600/10'
    }
  ];

  const features = [
    {
      title: 'Lightning Fast',
      description: 'Download videos in seconds with our optimized servers.',
      icon: Zap
    },
    {
      title: 'Secure & Private',
      description: 'No tracking, no ads, no account required. Your privacy is paramount.',
      icon: Shield
    },
    {
      title: 'Always Available',
      description: 'Works 24/7 with 99.9% uptime for reliable downloads whenever you need them.',
      icon: Clock
    }
  ];

  return (
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
      <div className="max-w-4xl mx-auto">
        {/* Supported Platforms */}
        <div className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            Supported Platforms
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <div
                  key={platform.name}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all"
                >
                  <div className={`w-12 h-12 ${platform.bg} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${platform.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{platform.name}</h3>
                  <p className="text-slate-300 text-sm">{platform.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Features */}
        <div>
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Why Choose Us
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                  <p className="text-slate-400 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
