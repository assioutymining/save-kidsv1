
import React, { useState } from 'react';
import { Play, Share2, Heart, X, Film, Video as VideoIcon, Mic2 } from 'lucide-react';
import ThreeDCard from './ThreeDCard';
import { useContent } from './App';

const MediaPage: React.FC = () => {
  const { t } = useContent();
  const [activeVideo, setActiveVideo] = useState<any>(null);
  const mediaItems = t.media?.items || [];

  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    if (url.endsWith('.mp4') || url.includes('.mov') || url.includes('.webm')) return null; // Direct video
    
    let videoId = '';
    if (url.includes('v=')) videoId = url.split('v=')[1].split('&')[0];
    else if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1].split('?')[0];
    else if (url.includes('embed/')) videoId = url.split('embed/')[1].split('?')[0];
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20 text-right font-cairo">
      <header className="space-y-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 text-red-500 text-xs font-black border border-red-600/20 uppercase tracking-widest">
           المكتبة الوثائقية
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white">
          {t.media.title.split(' ')[0]} <span className="text-red-600">{t.media.title.split(' ').slice(1).join(' ')}</span>
        </h1>
        <p className="text-xl text-zinc-500 font-medium leading-relaxed">{t.media.desc}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mediaItems.map((item: any) => (
          <ThreeDCard key={item.id}>
            <div 
              onClick={() => setActiveVideo(item)}
              className="bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-zinc-800 group hover:border-red-600 transition-all duration-500 cursor-pointer shadow-xl h-full flex flex-col"
            >
              <div className="relative aspect-video">
                <img src={item.thumbnail || "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=800"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75" alt={item.title} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                    <Play fill="currentColor" size={24} />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-xs font-black text-white">
                  {item.duration}
                </div>
              </div>
              <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <span className="text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center gap-1.5">
                        {item.type === 'Reel' ? <Film size={12}/> : item.type === 'Interview' ? <Mic2 size={12}/> : <VideoIcon size={12}/>}
                        {item.type}
                     </span>
                     <div className="flex gap-4 text-zinc-500">
                        <Heart size={18} className="hover:text-red-600 cursor-pointer" />
                        <Share2 size={18} className="hover:text-white cursor-pointer" />
                     </div>
                  </div>
                  <h3 className="text-2xl font-black text-white group-hover:text-red-600 transition-colors leading-tight">{item.title}</h3>
                </div>
                <button className="w-full mt-6 py-4 bg-zinc-800 rounded-xl text-sm font-black text-white hover:bg-zinc-700 transition-colors">شاهد المادة المرئية</button>
              </div>
            </div>
          </ThreeDCard>
        ))}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6 animate-in fade-in duration-300">
           <button onClick={() => setActiveVideo(null)} className="absolute top-10 left-10 text-white p-4 hover:bg-zinc-800 rounded-full transition-colors">
              <X size={40} />
           </button>
           <div className="w-full max-w-5xl aspect-video rounded-[3rem] overflow-hidden border border-zinc-800 shadow-[0_0_100px_rgba(220,38,38,0.2)] bg-black">
              {getEmbedUrl(activeVideo.videoUrl) ? (
                <iframe 
                  src={`${getEmbedUrl(activeVideo.videoUrl)}?autoplay=1&rel=0`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video 
                  controls 
                  autoPlay 
                  className="w-full h-full"
                  src={activeVideo.videoUrl}
                />
              )}
           </div>
           <div className="absolute bottom-10 text-center">
              <h2 className="text-2xl font-black text-white mb-2">{activeVideo.title}</h2>
              <p className="text-zinc-500">{activeVideo.type} • {activeVideo.duration}</p>
           </div>
        </div>
      )}
    </div>
  );
};

export default MediaPage;
