
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { Play, ShieldCheck, Video as VideoIcon, X, Volume2, VolumeX, Info, AlertTriangle, ArrowLeft, Brain, BookOpen, Quote } from 'lucide-react';
import ThreeDCard from '../components/ThreeDCard';
import DocumentAds from '../components/DocumentAds';
import { useContent } from '../App';

const RotatingMessage = ({ messages }: { messages: string[] }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!messages || messages.length === 0) return;
    const timer = setInterval(() => setIndex((p) => (p + 1) % messages.length), 4000);
    return () => clearInterval(timer);
  }, [messages]);
  if (!messages || messages.length === 0) return null;
  return (
    <div className="h-24 flex items-center">
      <p className="text-2xl md:text-4xl font-black text-red-600 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        "{messages[index] || 'الطفل أمانة في أعناقنا'}"
      </p>
    </div>
  );
};

const HomePage: React.FC = () => {
  const { t } = useContent();
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Safety Fallbacks for nested properties to prevent empty UI
  const hero = t?.hero || { title: 'طفل مش قضية', titleSpan: 'حق أصيل للطفل' };
  const campaigns = t?.campaigns || { dangerItems: [], features: [] };
  const research = t?.research || { title: 'أبحاث ودراسات' };
  const psych = t?.psych || { points: [] };
  const messages = t?.messages?.psych || [];

  const getIcon = (type: string) => {
    const IconComp = (LucideIcons as any)[type] || Info;
    return <IconComp size={40} />;
  };

  return (
    <div className="space-y-40 pb-24 text-right">
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[90vh]">
        <div className="space-y-10 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 text-red-500 text-xs font-black border border-red-600/20">
            <ShieldCheck size={14} /> {hero.badge || "مرحباً بكم في منصتنا"}
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-tight">
            {hero.title || "الطفل ليس طرفاً في نزاع"} <br />
            <span className="text-gradient-red">{hero.titleSpan || "بل صاحب حق مستقل"}</span>
          </h1>
          <RotatingMessage messages={messages} />
          <p className="text-xl text-zinc-500 max-w-xl leading-relaxed font-medium">{hero.desc || "نعمل من أجل مصلحة الطفل الفضلى في التشريعات المصرية."}</p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link to="/petition" className="px-12 py-5 bg-red-600 text-white rounded-[2rem] font-black shadow-xl shadow-red-600/30 text-center text-xl hover:bg-red-700 transition-all">
              {hero.ctaJoin || "وقع العريضة الآن"}
            </Link>
            <button 
              onClick={() => setShowVideo(true)}
              className="px-12 py-5 bg-zinc-900 border border-zinc-800 text-white rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all"
            >
              <VideoIcon size={24} /> {hero.ctaWatch || "شاهد أثر الحرمان"}
            </button>
          </div>
        </div>

        <div className="relative order-1 lg:order-2">
          <ThreeDCard>
            <div 
              onClick={() => setShowVideo(true)}
              className="relative rounded-[4rem] overflow-hidden shadow-2xl border-2 border-zinc-800 aspect-[4/5] group cursor-pointer bg-zinc-950"
            >
              <div className="absolute inset-0 w-full h-full">
                 {hero.heroVideo ? (
                    <video autoPlay loop muted={isMuted} playsInline className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-1000" src={hero.heroVideo} />
                 ) : (
                    <img src={hero.mainImage || "https://images.unsplash.com/photo-1476703714490-bb388e12239c?q=80&w=1000"} className="w-full h-full object-cover opacity-60 group-hover:opacity-100" alt="Hero" />
                 )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent flex flex-col justify-end p-12">
                 <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-white shadow-2xl transition-transform transform group-hover:scale-110">
                      <Play fill="currentColor" size={32} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white">{hero.videoTitle || "رؤية الطفل"}</h3>
                      <p className="text-zinc-400 font-bold">{hero.videoDesc || "لماذا لا يكفي الأب الزائر؟"}</p>
                    </div>
                 </div>
              </div>
              {hero.heroVideo && (
                <button onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} className="absolute top-8 left-8 p-4 bg-black/50 rounded-2xl text-white hover:bg-black/70 transition-all">
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
              )}
            </div>
          </ThreeDCard>
        </div>
      </section>

      {/* Document Ads Section */}
      <DocumentAds />

      {/* Campaign Section */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
           <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
             {campaigns.tamrodTitle || "لماذا نتحرك؟"}
           </h2>
           <p className="text-xl text-zinc-500 font-medium leading-relaxed">
             {campaigns.tamrodDesc || "تحسين وضع الطفل في القوانين الحالية هو ضرورة ملحة."}
           </p>
           <div className="bg-zinc-900 p-8 rounded-[3rem] border border-zinc-800 space-y-6">
              <h3 className="text-2xl font-black text-red-600 flex items-center gap-3">
                <AlertTriangle size={24} /> {campaigns.dangerTitle || "مخاطر الوضع الحالي"}
              </h3>
              <ul className="space-y-4">
                {(campaigns.dangerItems || []).map((item: string, i: number) => (
                  <li key={i} className="flex gap-4 text-zinc-300 font-bold leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
           </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
           {(campaigns.features || []).map((f: any, i: number) => (
              <ThreeDCard key={i} className={`${i === 0 ? 'col-span-2' : ''}`}>
                <div className={`p-8 rounded-[3rem] border border-zinc-800 ${i === 0 ? 'aspect-[2/1]' : 'aspect-square'} relative overflow-hidden group`}>
                  <div className="relative z-10 space-y-4">
                     <div className="text-red-600">{getIcon(f.type)}</div>
                     <h3 className="text-2xl font-black text-white">{f.title || "ميزة جديدة"}</h3>
                  </div>
                  {f.img && <img src={f.img} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700" alt={f.title} />}
                </div>
              </ThreeDCard>
           ))}
        </div>
      </section>

      {/* Research Section */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1 relative">
           <ThreeDCard>
             <div className="p-12 bg-zinc-900 rounded-[4rem] border border-zinc-800 shadow-2xl space-y-8 overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5"><BookOpen size={150} /></div>
                <div className="w-20 h-20 bg-red-600/10 rounded-3xl flex items-center justify-center text-red-600">
                   <Brain size={40} />
                </div>
                <h3 className="text-3xl font-black text-white">{research.impactTitle || "أثر الوجود الأبوي"}</h3>
                <p className="text-xl text-zinc-400 leading-[1.8] font-medium italic">
                  "{research.impactText || "الحقائق العلمية لا تجامل أحداً."}"
                </p>
                <div className="p-6 bg-zinc-950 rounded-3xl border border-zinc-800">
                   <p className="text-zinc-500 font-bold">{research.socialJustice || "العدالة للطفل تبدأ من هنا."}</p>
                </div>
             </div>
           </ThreeDCard>
        </div>
        <div className="order-1 lg:order-2 space-y-8">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 text-red-500 text-xs font-black border border-red-600/20">
              <Quote size={14} /> حقائق علمية
           </div>
           <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
             {research.title || "بيانات حاسمة"}
           </h2>
           <p className="text-xl text-zinc-500 font-medium leading-relaxed">
             {research.desc || "نقدم أدلة علمية حول أهمية الوجود الوالدي المتوازن."}
           </p>
           <Link to="/why" className="inline-flex items-center gap-2 text-red-600 font-black text-xl hover:gap-4 transition-all">
             تعرف على المقارنات الدولية <ArrowLeft size={24} />
           </Link>
        </div>
      </section>

      {/* Psych Impact Section */}
      <section className="bg-zinc-900 py-32 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          <header className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">{psych.impactTitle || "الأثر النفسي"}</h2>
            <p className="text-xl text-zinc-500 font-medium">{psych.impactDesc || "كيف يؤثر الحرمان على شخصية الطفل؟"}</p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {(psych.points || []).map((p: any, i: number) => (
              <ThreeDCard key={i}>
                <div className="p-10 bg-zinc-950 rounded-[3rem] border border-zinc-800 hover:border-red-600 transition-all group h-full">
                  <span className="text-4xl font-black text-red-600/20 group-hover:text-red-600 transition-colors">0{i+1}</span>
                  <h3 className="text-2xl font-black text-white mt-4 mb-4">{p.title || "نقطة أثر"}</h3>
                  <p className="text-zinc-500 leading-relaxed font-medium">{p.text || "وصف الأثر النفسي."}</p>
                </div>
              </ThreeDCard>
            ))}
          </div>

          <div className="flex flex-col items-center text-center space-y-8 bg-red-600 p-16 rounded-[4rem] shadow-2xl shadow-red-600/20">
             <h3 className="text-4xl font-black text-white">{psych.finalCtaTitle || "سجل موقفك الآن"}</h3>
             <p className="text-xl text-red-100 font-medium max-w-2xl">{psych.finalCtaDesc || "وقع العريضة الذكية لتكون صوتاً للتغيير."}</p>
             <Link to="/petition" className="px-12 py-5 bg-zinc-950 text-white rounded-2xl font-black text-xl hover:scale-105 transition-transform flex items-center gap-3">
               سجل الآن <ArrowLeft size={24} />
             </Link>
          </div>
        </div>
      </section>

      {showVideo && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6 backdrop-blur-xl animate-in fade-in duration-300">
           <button onClick={() => setShowVideo(false)} className="absolute top-10 left-10 text-white p-4 hover:bg-zinc-800 rounded-full transition-colors z-[110]">
              <X size={40} />
           </button>
           <div className="w-full max-w-6xl">
              <ThreeDCard>
                <div className="aspect-video rounded-[3rem] overflow-hidden border border-zinc-800 shadow-[0_0_100px_rgba(220,38,38,0.2)] bg-black group relative">
                  <video ref={videoRef} controls autoPlay className="w-full h-full" src={hero.heroVideo} />
                </div>
              </ThreeDCard>
           </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
