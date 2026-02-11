
import React from 'react';
import { Lock, EyeOff, ShieldCheck, Info } from 'lucide-react';
import { useContent } from '../App';

const PrivacyPage: React.FC = () => {
  const { t } = useContent();
  const privacy = t.privacyPage;

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-16 text-right font-cairo">
      <header className="space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-red-600/10 text-red-600 flex items-center justify-center">
          <Lock size={32} />
        </div>
        <h1 className="text-4xl font-black text-white">{privacy.title}</h1>
        <p className="text-lg text-zinc-500 font-medium">{privacy.desc}</p>
      </header>

      <section className="space-y-10">
        {privacy.sections.map((section: any, i: number) => (
          <div key={i} className="space-y-6">
            <h2 className="text-2xl font-black text-white flex items-center gap-3 justify-end">
              {section.title}
              {i === 0 ? <EyeOff size={24} className="text-red-500" /> : <ShieldCheck size={24} className="text-red-500" />}
            </h2>
            <p className="text-zinc-400 font-medium leading-relaxed">
              {section.desc}
            </p>
          </div>
        ))}

        <div className="p-8 rounded-3xl bg-zinc-900 border border-red-600/10 flex items-start gap-4">
           <div className="w-10 h-10 bg-red-600/20 text-red-600 rounded-full flex items-center justify-center shrink-0">
              <Info size={20} />
           </div>
           <p className="text-zinc-300 font-bold leading-relaxed">
             {privacy.note}
           </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
