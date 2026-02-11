
import React from 'react';
import { Brain, Users, TrendingUp, Scale, CheckCircle2, Globe, ArrowDownRight } from 'lucide-react';
import ThreeDCard from '../components/ThreeDCard';
import { useContent } from '../App';

const ComparisonBox = ({ label, current, proposed }: any) => (
  <ThreeDCard>
    <div className="p-6 rounded-[2.5rem] bg-zinc-900 border border-zinc-800 shadow-xl space-y-4 h-full">
      <h4 className="text-xl font-black text-white">{label}</h4>
      <div className="flex items-end gap-4">
        <div className="flex-1 space-y-1">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">الوضع الحالي</span>
          <div className="h-12 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-center font-black text-zinc-500">
            {current} سنة
          </div>
        </div>
        <div className="flex-1 space-y-1">
          <span className={`text-[10px] font-bold text-red-500 uppercase tracking-widest`}>المقترح</span>
          <div className={`h-16 bg-red-600 text-white rounded-xl flex items-center justify-center font-black text-2xl shadow-lg shadow-red-600/20`}>
            {proposed} سنوات
          </div>
        </div>
      </div>
    </div>
  </ThreeDCard>
);

const WhyChangePage: React.FC = () => {
  const { t } = useContent();
  const why = t.whyPage;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-32 text-right font-cairo">
      <header className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest border border-red-600/20">
          <Scale size={14} /> رؤية تشريعية جديدة
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
          {why.title}
        </h1>
        <p className="text-xl text-zinc-500 font-medium leading-relaxed">{why.desc}</p>
      </header>

      {/* Comparison Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-8">
          <h2 className="text-3xl font-black text-white">الأرقام المقترحة للتعديل</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ComparisonBox label="حضانة الولد" current={why.boyCurrent} proposed={why.boyProposed} />
            <ComparisonBox label="حضانة البنت" current={why.girlCurrent} proposed={why.girlProposed} />
          </div>
          <ThreeDCard>
            <div className="p-10 rounded-[3rem] bg-red-600/5 border border-red-600/20 space-y-4 shadow-2xl">
              <div className="flex items-center gap-3 text-red-600">
                <CheckCircle2 size={24} />
                <h3 className="text-xl font-black">{why.choiceTitle}</h3>
              </div>
              <p className="text-zinc-400 font-medium leading-relaxed">{why.choiceDesc}</p>
            </div>
          </ThreeDCard>
        </div>
        <ThreeDCard>
          <div className="relative group rounded-[3rem] overflow-hidden shadow-2xl border-4 border-zinc-900 aspect-square lg:aspect-auto h-full">
            <img 
              src={why.mainImage} 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
              alt="Main Why"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent"></div>
          </div>
        </ThreeDCard>
      </section>

      {/* Global Comparison Table */}
      <section className="space-y-16">
         <div className="flex flex-col items-center text-center space-y-4">
           <Globe size={48} className="text-red-600" />
           <h2 className="text-4xl font-black text-white">{why.comparisonTitle}</h2>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {why.comparisonItems.map((item: any, i: number) => (
              <ThreeDCard key={i}>
                <div className={`p-10 rounded-[3.5rem] border border-zinc-800 ${item.color} shadow-2xl space-y-6 relative overflow-hidden group h-full`}>
                   <div className="absolute top-0 left-0 p-6 opacity-10 pointer-events-none"><Globe size={100} /></div>
                   <h3 className="text-3xl font-black text-white">{item.country}</h3>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60">سن انتهاء الحضانة</p>
                      <p className="text-2xl font-black text-white">{item.age}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60">النظام المطبق</p>
                      <p className="text-xl font-black text-white">{item.system}</p>
                   </div>
                   <div className="pt-6 border-t border-white/10 text-[10px] font-black uppercase tracking-widest opacity-80">
                     {i === 0 ? "نظام إقصائي للأب" : "نظام تشاركي عادل"}
                   </div>
                </div>
              </ThreeDCard>
            ))}
         </div>
      </section>

      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-white">{why.impactSectionTitle}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {why.impactItems.map((item: any, i: number) => {
            const Icon = i === 0 ? Brain : i === 1 ? Users : TrendingUp;
            return (
              <ThreeDCard key={i}>
                <div className="bg-zinc-900 p-10 rounded-[3rem] shadow-xl border border-zinc-800 h-full space-y-6 hover:border-red-600 transition-all duration-500 group">
                  <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="text-2xl font-black text-white">{item.title}</h3>
                  <p className="text-zinc-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </ThreeDCard>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default WhyChangePage;
