
import React from 'react';
import { Gavel, FileText, Scale, MessageSquare, CheckCircle, ArrowLeft, HeartHandshake, ShieldAlert } from 'lucide-react';
import ThreeDCard from './ThreeDCard';
import { useContent } from './App';

const FlowStep = ({ icon: Icon, title, description, isLast = false }: any) => (
  <div className="flex flex-col items-center text-center space-y-4 relative group">
    <div className="w-24 h-24 rounded-[2rem] bg-zinc-900 border border-zinc-800 shadow-xl flex items-center justify-center text-red-600 group-hover:border-red-600 transition-all duration-500">
      <Icon size={32} />
    </div>
    <div className="space-y-2">
      <h3 className="font-black text-white text-lg">{title}</h3>
      <p className="text-xs text-zinc-500 max-w-[150px] font-medium leading-relaxed">{description}</p>
    </div>
    {!isLast && (
      <div className="hidden lg:block absolute top-12 -left-24 w-16 h-0.5 bg-zinc-800">
        <div className="absolute top-1/2 -left-1 transform -translate-y-1/2">
          <ArrowLeft size={14} className="text-zinc-600" />
        </div>
      </div>
    )}
  </div>
);

const SupportPage: React.FC = () => {
  const { t } = useContent();
  const support = t.supportPage;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-24 text-right font-cairo">
      <header className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 text-red-500 text-xs font-black border border-red-600/20 uppercase tracking-widest">
          <HeartHandshake size={14} /> {support.stepsTitle}
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
          {support.title}
        </h1>
        <p className="text-xl text-zinc-500 font-medium leading-relaxed">{support.desc}</p>
      </header>

      <section className="space-y-16">
        <div className="text-center">
          <h2 className="text-2xl font-black text-white inline-block px-10 py-4 bg-zinc-900 rounded-full border border-red-600/20 shadow-2xl">
            {support.stepsTitle}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-4 relative px-8">
          {support.steps.map((step: any, i: number) => {
            const icons = [FileText, MessageSquare, Scale, CheckCircle];
            return (
              <FlowStep 
                key={i}
                icon={icons[i] || FileText}
                title={step.title}
                description={step.description}
                isLast={i === support.steps.length - 1}
              />
            );
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ThreeDCard>
          <div className="bg-zinc-900 rounded-[3rem] p-12 shadow-2xl border border-zinc-800 h-full relative overflow-hidden group hover:border-red-600/40 transition-all">
            <div className="absolute top-0 left-0 p-8 opacity-5">
              <Gavel size={150} className="text-red-600" />
            </div>
            <div className="flex items-center gap-4 mb-8 justify-end">
              <h2 className="text-3xl font-black text-white">{support.tipsTitle}</h2>
              <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-xl">
                <ShieldAlert size={28} />
              </div>
            </div>
            <ul className="space-y-6">
              {support.tips.map((tip: any, idx: number) => (
                <li key={idx} className="flex gap-4 justify-end">
                  <div className="text-right">
                    <h4 className="font-black text-white text-base">{tip.title}</h4>
                    <p className="text-zinc-500 text-sm mt-1 leading-relaxed font-medium">{tip.desc}</p>
                  </div>
                  <div className="mt-1 w-6 h-6 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-red-600 text-xs font-black shrink-0">
                    {idx + 1}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </ThreeDCard>

        <ThreeDCard>
          <div className="bg-red-600 rounded-[3rem] p-12 shadow-2xl text-white h-full relative overflow-hidden flex flex-col justify-center">
            <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <h2 className="text-4xl font-black mb-10 leading-tight">{support.officeTitle}</h2>
            <div className="space-y-6 relative z-10">
              {support.officeServices.map((service: any, i: number) => (
                <div key={i} className="p-8 rounded-3xl bg-zinc-950/20 backdrop-blur-md border border-white/10 hover:bg-zinc-950/30 transition-all">
                  <h4 className="font-black text-xl mb-2">{service.title}</h4>
                  <p className="text-red-50 text-base font-medium">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ThreeDCard>
      </div>
    </div>
  );
};

export default SupportPage;
