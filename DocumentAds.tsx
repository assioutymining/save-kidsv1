
import React from 'react';
import { FileText, ExternalLink, ShieldCheck } from 'lucide-react';
import { useContent } from './App';
import ThreeDCard from './ThreeDCard';

const DocumentAds: React.FC = () => {
  const { t } = useContent();
  const ads = t.documentAds || [];

  return (
    <section className="max-w-7xl mx-auto px-6 space-y-12">
      <div className="flex items-center gap-4 border-r-4 border-red-600 pr-6">
        <h2 className="text-3xl font-black text-white">وثائق وملفات حاسمة</h2>
        <span className="text-zinc-600 text-sm font-bold">إعلانات توعوية</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {ads.map((ad: any) => (
          <ThreeDCard key={ad.id}>
            <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-8 flex gap-8 items-center group hover:border-red-600/30 transition-all cursor-pointer">
              <div className="w-32 h-40 bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shrink-0 shadow-2xl relative">
                <img src={ad.image} className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all" alt={ad.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2">
                   <ShieldCheck size={16} className="text-emerald-500" />
                </div>
              </div>
              <div className="space-y-4 flex-1">
                <div className="px-3 py-1 bg-red-600/10 text-red-500 text-[10px] font-black rounded-full inline-block border border-red-600/20 uppercase">
                  {ad.label}
                </div>
                <h3 className="text-xl font-black text-white leading-tight">{ad.title}</h3>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">{ad.desc}</p>
                <div className="flex items-center gap-2 text-red-600 font-black text-xs hover:underline">
                  معاينة المستند <ExternalLink size={14} />
                </div>
              </div>
            </div>
          </ThreeDCard>
        ))}
      </div>
    </section>
  );
};

export default DocumentAds;
