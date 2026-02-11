
import React, { useState } from 'react';
import { Film, Tv, Play, Star, Calendar, Clock, List, X, ArrowLeft } from 'lucide-react';
import { useContent } from '../App';
import ThreeDCard from '../components/ThreeDCard';

const CinemaPage: React.FC = () => {
  const { t } = useContent();
  const cinema = t.cinemaPage;
  const [filter, setFilter] = useState('all');
  const [selectedSeries, setSelectedSeries] = useState<any>(null);

  const filteredItems = cinema.items.filter((item: any) => 
    filter === 'all' ? true : item.type === (filter === 'movies' ? 'movie' : 'series')
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20 text-right font-cairo">
      <header className="text-center max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-red-600/10 text-red-500 rounded-full text-xs font-black border border-red-600/20 uppercase tracking-widest animate-float">
          <Film size={16} /> الفن في خدمة القضية
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
          {cinema.title}
        </h1>
        <p className="text-xl text-zinc-500 font-medium leading-relaxed">{cinema.desc}</p>
        
        <div className="flex justify-center gap-4">
          {Object.entries(cinema.categories).map(([key, label]: [string, any]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-8 py-3 rounded-2xl font-black text-sm transition-all ${filter === key ? 'bg-red-600 text-white shadow-xl shadow-red-600/20' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredItems.map((item: any) => (
          <ThreeDCard key={item.id}>
            <div className="bg-zinc-900 rounded-[3rem] overflow-hidden border border-zinc-800 shadow-2xl flex flex-col h-full group">
              <div className="relative aspect-[2/3] overflow-hidden">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-75" alt={item.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent flex flex-col justify-end p-8 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-xl text-amber-500">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-black">{item.rating || 'N/A'}</span>
                    </div>
                    <span className="text-white/60 text-xs font-bold">{item.year}</span>
                  </div>
                  <h3 className="text-3xl font-black text-white group-hover:text-red-600 transition-colors leading-tight">{item.title}</h3>
                </div>
                <div className="absolute top-6 left-6 w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white">
                  {item.type === 'movie' ? <Film size={24} /> : <Tv size={24} />}
                </div>
              </div>
              
              <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                <p className="text-zinc-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                <div className="flex items-center justify-between text-zinc-400 text-xs font-black uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Clock size={14} className="text-red-600" /> {item.duration || item.episodesCount}</span>
                </div>
                {item.type === 'series' ? (
                  <button 
                    onClick={() => setSelectedSeries(item)}
                    className="w-full py-4 bg-zinc-800 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-red-600 transition-all"
                  >
                    عرض الحلقات <List size={16} />
                  </button>
                ) : (
                  <button className="w-full py-4 bg-red-600 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-red-700 transition-all">
                    شاهد الآن <Play size={16} fill="currentColor" />
                  </button>
                )}
              </div>
            </div>
          </ThreeDCard>
        ))}
      </div>

      {/* Episodes Modal */}
      {selectedSeries && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="max-w-4xl w-full bg-zinc-900 rounded-[4rem] border border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <header className="p-10 border-b border-zinc-800 flex justify-between items-center">
              <div className="space-y-2">
                 <h2 className="text-3xl font-black text-white">{selectedSeries.title}</h2>
                 <p className="text-zinc-500 font-bold">قائمة الحلقات • {selectedSeries.episodesCount}</p>
              </div>
              <button onClick={() => setSelectedSeries(null)} className="p-4 bg-zinc-800 text-zinc-400 hover:text-white rounded-full transition-colors">
                <X size={32} />
              </button>
            </header>
            <div className="p-10 overflow-y-auto space-y-4 scrollbar-hide">
              {selectedSeries.episodes.map((episode: any, i: number) => (
                <div key={episode.id} className="p-6 bg-zinc-950 rounded-3xl border border-zinc-800 flex items-center justify-between group hover:border-red-600/50 transition-all cursor-pointer">
                  <div className="flex items-center gap-6">
                    <span className="text-4xl font-black text-zinc-800 group-hover:text-red-600 transition-colors">{(i+1).toString().padStart(2, '0')}</span>
                    <div className="text-right">
                      <h4 className="text-xl font-black text-white">{episode.title}</h4>
                      <p className="text-zinc-600 text-xs font-bold">{episode.duration}</p>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all">
                    <Play size={20} fill="currentColor" />
                  </div>
                </div>
              ))}
            </div>
            <footer className="p-8 bg-zinc-950 border-t border-zinc-800 text-center">
               <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">تنبيه: كافة الأعمال المسجلة تم عرضها بتصريح من أصحاب الحقوق لأغراض التوعية.</p>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default CinemaPage;
