import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Is it legal to download videos?',
    answer: 'Downloading videos should comply with local laws and the platform\'s terms of service. Always respect copyright and intellectual property rights. Use downloaded content only for personal, non-commercial purposes.'
  },
  {
    question: 'What video formats are supported?',
    answer: 'We support MP4 (most common), WebM, and audio-only MP3 formats. Quality options range from 480p to 1080p depending on the platform and original video quality.'
  },
  {
    question: 'How long does a download take?',
    answer: 'Most videos download within seconds to minutes depending on length and quality. Larger files or high-resolution videos may take longer. Average download speed is 1-5 MB per second.'
  },
  {
    question: 'Do you store my download history?',
    answer: 'Yes, we keep a local record of your download history for convenience. This helps you quickly re-access videos you\'ve downloaded before. You can clear history anytime.'
  },
  {
    question: 'Is my privacy protected?',
    answer: 'We don\'t track you, sell your data, or show ads. No account or login is required. We only store basic download metadata locally.'
  },
  {
    question: 'What about Instagram private accounts?',
    answer: 'We can only download from public Instagram profiles and public Reels. Private accounts and restricted content cannot be downloaded.'
  },
  {
    question: 'Can I download entire playlists?',
    answer: 'Currently, we support single video downloads. For playlists, you\'ll need to download videos one at a time.'
  },
  {
    question: 'Is there a file size limit?',
    answer: 'There\'s no strict limit, but very large files (over 500MB) may take considerable time. Most videos download without issues.'
  }
];

export default function FAQSection() {
  const [expanded, setExpanded] = useState<number | null>(0);

  const toggle = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-all"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/30 transition-colors"
              >
                <span className="font-bold text-white text-left">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-teal-400 flex-shrink-0 transition-transform ${
                    expanded === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expanded === index && (
                <div className="px-6 py-4 border-t border-slate-700 bg-slate-700/20">
                  <p className="text-slate-300 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-teal-500/10 to-teal-600/10 border border-teal-500/20 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
          <p className="text-slate-300">
            Our tool is straightforward to use. Paste a link, select quality, and download. That\'s it!
          </p>
        </div>
      </div>
    </section>
  );
}
