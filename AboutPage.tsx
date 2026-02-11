
import React from 'react';
import { Heart, ShieldCheck, Scale, Users } from 'lucide-react';
import ThreeDCard from './ThreeDCard';
import { useContent } from './App';

const AboutPage: React.FC = () => {
  const { t } = useContent();
  const about = t.aboutPage;

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-32 text-right font-cairo">
      <header className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-5xl md:text-7xl font-black text-white">{about.title}</h1>
        <p className="text-xl text-zinc-500 leading-relaxed font-medium">{about.desc}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-12">
          <section className="space-y-4">
             <div className="flex items-center gap-3 text-red-600 justify-end">
                <h2 className="text-3xl font-black">{about.visionTitle}</h2>
                <Heart size={32} />
             </div>
             <p className="text-lg text-zinc-400 leading-relaxed font-medium">
                {about.visionDesc}
             </p>
          </section>

          <section className="space-y-4">
             <div className="flex items-center gap-3 text-red-600 justify-end">
                <h2 className="text-3xl font-black">{about.principlesTitle}</h2>
                <ShieldCheck size={32} />
             </div>
             <ul className="space-y-4">
                {about.principles.map((item: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-300 font-bold justify-end">
                    {item}
                    <div className="w-2 h-2 rounded-full bg-red-600" />
                  </li>
                ))}
             </ul>
          </section>
        </div>

        <ThreeDCard>
          <div className="bg-zinc-900 rounded-[3rem] p-12 shadow-2xl border border-zinc-800 space-y-8">
             <div className="aspect-video rounded-3xl overflow-hidden bg-zinc-950 flex items-center justify-center">
                <Users size={80} className="text-zinc-800" />
             </div>
             <div className="space-y-4">
                <h3 className="text-2xl font-black text-white">{about.messageTitle}</h3>
                <p className="text-zinc-500 font-medium italic">"{about.messageDesc}"</p>
             </div>
          </div>
        </ThreeDCard>
      </div>
    </div>
  );
};

export default AboutPage;
