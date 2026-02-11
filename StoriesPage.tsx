
import React from 'react';
import { Play, User, Calendar, Quote, MessageCircle, ArrowLeft, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThreeDCard from './ThreeDCard';
import { useContent } from './App';

const StoriesPage: React.FC = () => {
  const { t, showToast } = useContent();
  const navigate = useNavigate();
  const stories = t.storiesPage?.items || [];

  const handleQuickSupport = (e: React.MouseEvent, title: string) => {
    e.stopPropagation();
    if (showToast) showToast(`تم تسجيل دعمك لقضية "${title}"`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20 text-right font-cairo">
      <header className="text-center max-w-4xl mx-auto space-y-6">
        <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
          {t.storiesPage.title}
        </h1>
        <p className="text-xl text-zinc-500 font-medium leading-relaxed">
          {t.storiesPage.desc}
        </p>
        <div className="p-6 bg-red-600/10 border border-red-600/20 rounded-[2rem] text-red-500 font-bold max-w-2xl mx-auto">
          الوقوف بجانب الأب هو وقوف بجانب استقرار المجتمع وحماية الطفل من آثار "الفقر العاطفي".
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {stories.map((story: any) => (
          <ThreeDCard key={story.id}>
            <div 
              onClick={() => navigate(`/stories/${story.id}`)}
              className="bg-zinc-900 rounded-[3rem] overflow-hidden shadow-2xl border border-zinc-800 group cursor-pointer h-full flex flex-col transition-all hover:border-red-600/50 duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 brightness-75"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                  <div className="w-16 h-16 rounded-full bg-red-600/80 flex items-center justify-center text-white">
                    <Play fill="currentColor" size={24} />
                  </div>
                </div>
                <div className="absolute top-6 left-6 flex gap-2">
                  <button 
                    onClick={(e) => handleQuickSupport(e, story.title)}
                    className="p-3 bg-red-600 rounded-2xl text-white shadow-xl hover:scale-110 transition-transform"
                  >
                    <Heart size={20} fill="currentColor" />
                  </button>
                  {story.tags?.map((tag: string) => (
                    <span key={tag} className="px-4 py-1.5 bg-zinc-950/80 rounded-full text-[10px] font-black text-white uppercase tracking-wider border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-6 text-zinc-500 text-xs font-bold uppercase tracking-widest justify-end">
                  <span className="flex items-center gap-1.5">{story.date} <Calendar size={14} className="text-red-600" /></span>
                  <span className="flex items-center gap-1.5">{story.author} <User size={14} className="text-zinc-300" /></span>
                </div>
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-red-600 transition-colors leading-tight">{story.title}</h3>
                <p className="text-zinc-500 text-base leading-relaxed mb-8 flex-1 font-medium">
                  {story.excerpt}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <span className="text-sm font-black">12</span>
                    <MessageCircle size={18} />
                  </div>
                  <span className="text-red-600 font-black text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                    اقرأ القصة وتضامن <ArrowLeft size={16} />
                  </span>
                </div>
              </div>
            </div>
          </ThreeDCard>
        ))}
      </div>

      <div className="bg-zinc-900 rounded-[4rem] p-16 text-center text-white space-y-8 relative overflow-hidden border border-zinc-800 shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Quote size={200} fill="white" />
        </div>
        <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-5xl font-black italic">أدعم قضية الآباء من أجل الأبناء</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto text-xl font-medium">
              العدالة الاجتماعية تبدأ من تمكين الأب من ممارسة دوره التربوي كاملاً. غياب الأب يهدد الأمن القومي النفسي للمجتمع المصري.
            </p>
            <button 
              onClick={() => navigate('/petition')}
              className="px-12 py-5 bg-red-600 rounded-3xl font-black text-xl hover:bg-red-700 transition-all shadow-2xl shadow-red-600/30"
            >
              وقع العريضة وأدعم القضية
            </button>
        </div>
      </div>
    </div>
  );
};

export default StoriesPage;
