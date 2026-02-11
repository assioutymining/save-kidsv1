
import React from 'react';
import { Target, Flag, Rocket, ArrowLeft, CheckCircle2, AlertCircle, TrendingUp, Facebook, Youtube, Video as VideoIcon, Instagram, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThreeDCard from './ThreeDCard';
import { useContent } from './App';

const CampaignsPage: React.FC = () => {
  const { t } = useContent();
  const cp = t.campaignsPage;

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Facebook': return <Facebook size={14} className="text-blue-500" />;
      case 'YouTube': return <Youtube size={14} className="text-red-500" />;
      case 'TikTok': return <Share2 size={14} className="text-emerald-400" />;
      default: return <Target size={14} className="text-red-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20 text-right font-cairo">
      <header className="text-center max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-red-600/10 text-red-500 rounded-full text-xs font-black border border-red-600/20 uppercase tracking-widest animate-float">
          <Rocket size={16} /> تحركاتنا الرقمية والميدانية
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
          {cp.title}
        </h1>
        <p className="text-xl text-zinc-500 font-medium leading-relaxed">{cp.desc}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {cp.items.map((item: any) => (
          <ThreeDCard key={item.id}>
            <div className="bg-zinc-900 rounded-[3rem] overflow-hidden border border-zinc-800 shadow-2xl flex flex-col h-full group transition-all hover:border-red-600/30">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={item.image} 
                  className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                  alt={item.title} 
                />
                <div className="absolute top-6 right-6 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-black text-white flex items-center gap-2 border border-white/10">
                  {item.status === 'نشط حالياً' || item.status === 'تفاعل حي' ? <CheckCircle2 size={12} className="text-emerald-500" /> : <AlertCircle size={12} className="text-amber-500" />}
                  {item.status}
                </div>
                {item.platform && (
                   <div className="absolute bottom-4 left-4 p-3 bg-black/80 rounded-2xl border border-white/10 text-white flex items-center gap-2 scale-90">
                      {getPlatformIcon(item.platform)}
                      <span className="text-[10px] font-black">{item.platform}</span>
                   </div>
                )}
              </div>
              
              <div className="p-10 space-y-8 flex-1 flex flex-col">
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-white group-hover:text-red-600 transition-colors leading-tight">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                </div>

                <div className="space-y-4 mt-auto">
                  <div className="flex justify-between items-end text-xs font-black uppercase tracking-widest text-zinc-400">
                    <div className="flex items-center gap-2">
                      <Target size={14} className="text-red-600" />
                      <span>الهدف: {item.goal}</span>
                    </div>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="h-2 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                    <div 
                      className="h-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all duration-1000"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>

                {item.isExternal ? (
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-zinc-800 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-blue-600 transition-all group-hover:shadow-xl"
                  >
                    انضم عبر {item.platform} <ArrowLeft size={16} />
                  </a>
                ) : (
                  <Link 
                    to={item.link} 
                    className="w-full py-4 bg-red-600 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-red-700 transition-all group-hover:shadow-xl group-hover:shadow-red-600/20"
                  >
                    شارك في هذه الحملة <ArrowLeft size={16} />
                  </Link>
                )}
              </div>
            </div>
          </ThreeDCard>
        ))}
      </div>

      <div className="bg-zinc-900 rounded-[4rem] p-16 text-center border border-zinc-800 shadow-2xl space-y-10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
          <Flag size={250} className="text-white" />
        </div>
        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl md:text-5xl font-black text-white italic">انضم لفرق الرصد الميداني</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
            نحن نبحث عن متطوعين في كافة محافظات الجمهورية للمساعدة في رصد حالات الحرمان وتوثيقها بشكل قانوني سليم لدعم ملفنا التشريعي.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/support" className="px-12 py-5 bg-red-600 text-white rounded-3xl font-black text-xl hover:scale-105 transition-transform shadow-2xl shadow-red-600/30">
              سجل كمتطوع رصد
            </Link>
            <div className="flex items-center gap-4 px-8 py-4 bg-zinc-950 border border-zinc-800 rounded-3xl">
              <TrendingUp className="text-emerald-500" />
              <div className="text-right">
                <p className="text-white font-black text-sm">450+ متطوع</p>
                <p className="text-[10px] text-zinc-600 font-bold uppercase">يعملون الآن في 27 محافظة</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignsPage;
