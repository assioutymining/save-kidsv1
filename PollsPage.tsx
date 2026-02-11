
import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, CheckCircle2, Globe, ShieldCheck, Loader2 } from 'lucide-react';
import ThreeDCard from '../components/ThreeDCard';
import { useContent } from '../App';

const PollsPage: React.FC = () => {
  const { t, showToast } = useContent();
  const p = t.polls;
  
  const [userIp, setUserIp] = useState<string>('');
  const [votedPolls, setVotedPolls] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setUserIp(data.ip);
        const savedVotes = JSON.parse(localStorage.getItem(`votes_${data.ip}`) || '[]');
        setVotedPolls(savedVotes);
        setLoading(false);
      })
      .catch(() => {
        setUserIp('127.0.0.1'); // Fallback local IP
        setLoading(false);
      });
  }, []);

  const handleVote = (pollId: string, choice: 'yes' | 'no') => {
    if (votedPolls.includes(pollId)) {
        if (showToast) showToast('لقد قمت بالتصويت مسبقاً في هذا الاستفتاء من هذا الجهاز.', 'error');
        return;
    }

    // Update User's device record
    const updatedUserVotes = [...votedPolls, pollId];
    setVotedPolls(updatedUserVotes);
    localStorage.setItem(`votes_${userIp}`, JSON.stringify(updatedUserVotes));

    // Update global poll records for Admin
    const globalPollData = JSON.parse(localStorage.getItem('poll_records') || '[]');
    globalPollData.push({
      pollId,
      choice,
      ip: userIp,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('poll_records', JSON.stringify(globalPollData));
    
    if (showToast) showToast(p.voteSuccess);
  };

  // Helper to calculate results from local records + base translations
  const getPollResult = (poll: any) => {
    const records = JSON.parse(localStorage.getItem('poll_records') || '[]');
    const pollRecords = records.filter((r: any) => r.pollId === poll.id);
    const yesCount = pollRecords.filter((r: any) => r.choice === 'yes').length;
    const noCount = pollRecords.filter((r: any) => r.choice === 'no').length;
    
    // Weighted percentages (base + actual)
    const totalActual = yesCount + noCount;
    if (totalActual === 0) return { yes: poll.yes, no: poll.no, total: poll.total };
    
    const combinedTotal = poll.total + totalActual;
    const combinedYes = Math.round(((poll.yes / 100 * poll.total) + yesCount) / combinedTotal * 100);
    const combinedNo = 100 - combinedYes;

    return { yes: combinedYes, no: combinedNo, total: combinedTotal };
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 font-cairo">
        <Loader2 className="animate-spin text-red-600" size={48} />
        <p className="text-zinc-500 font-bold">جاري التحقق من الهوية الرقمية...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20 text-right font-cairo">
      <header className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 text-red-500 text-xs font-black border border-red-600/20 uppercase tracking-widest">
           نظام التصويت المشفر بالـ IP
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
          {p.title}
        </h1>
        <p className="text-xl text-zinc-500 font-medium leading-relaxed">{p.desc}</p>
        
        <div className="inline-flex items-center gap-4 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl">
           <Globe size={18} className="text-emerald-500" />
           <p className="text-xs font-bold text-zinc-400">
             تم التعرف على عنوانك: <span className="text-white font-black">{userIp}</span>
           </p>
           <ShieldCheck size={18} className="text-emerald-500" />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {p.items.map((poll: any) => {
           const result = getPollResult(poll);
           const hasVoted = votedPolls.includes(poll.id);

           return (
             <ThreeDCard key={poll.id}>
               <div className="bg-zinc-900 rounded-[3rem] border border-zinc-800 overflow-hidden shadow-2xl flex flex-col h-full group transition-all hover:border-red-600/30 relative">
                  <div className="relative aspect-square overflow-hidden bg-zinc-950">
                    <img 
                      src={poll.image || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800"} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100" 
                      alt="Poll Subject" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent"></div>
                    {hasVoted && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                         <div className="px-6 py-3 bg-red-600 text-white rounded-2xl font-black shadow-2xl flex items-center gap-2 scale-110">
                            <CheckCircle2 size={24} /> تم تسجيل صوتك
                         </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-8 space-y-8 flex-1 flex flex-col">
                     <h3 className="text-xl font-black text-white leading-relaxed min-h-[6rem]">{poll.question}</h3>
                     
                     <div className="space-y-6 mt-auto">
                        {hasVoted ? (
                          <div className="space-y-4 animate-in fade-in duration-500">
                             <div className="space-y-2">
                                <div className="flex justify-between text-xs font-black text-white uppercase">
                                   <span>{result.yes}%</span>
                                   <span>موافق (نعم)</span>
                                </div>
                                <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                                   <div className="h-full bg-red-600 transition-all duration-1000" style={{ width: `${result.yes}%` }} />
                                </div>
                             </div>
                             <div className="space-y-2">
                                <div className="flex justify-between text-xs font-black text-zinc-500 uppercase">
                                   <span>{result.no}%</span>
                                   <span>معارض (لا)</span>
                                </div>
                                <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                                   <div className="h-full bg-zinc-700 transition-all duration-1000" style={{ width: `${result.no}%` }} />
                                </div>
                             </div>
                             <div className="pt-4 flex items-center justify-center gap-2 border-t border-zinc-800">
                                <p className="text-[10px] text-zinc-600 font-bold">إجمالي المشاركين: {result.total.toLocaleString()} صوت موثق</p>
                             </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-4">
                             <button 
                                onClick={() => handleVote(poll.id, 'yes')}
                                className="py-5 bg-zinc-950 border border-zinc-800 text-white rounded-2xl font-black flex flex-col items-center justify-center gap-2 hover:bg-red-600 hover:border-red-600 transition-all group/btn"
                             >
                                <ThumbsUp size={24} className="group-hover/btn:scale-110 transition-transform" />
                                <span className="text-xs">نعم، أؤيد</span>
                             </button>
                             <button 
                                onClick={() => handleVote(poll.id, 'no')}
                                className="py-5 bg-zinc-950 border border-zinc-800 text-zinc-500 rounded-2xl font-black flex flex-col items-center justify-center gap-2 hover:bg-zinc-800 hover:text-white transition-all group/btn"
                             >
                                <ThumbsDown size={24} className="group-hover/btn:scale-110 transition-transform" />
                                <span className="text-xs">لا، أعارض</span>
                             </button>
                          </div>
                        )}
                     </div>
                  </div>
                  
                  <div className="px-8 pb-8 text-center">
                     <p className="text-[9px] text-zinc-600 font-bold">
                       نظام الاستفتاء يمنع تكرار التصويت من نفس عنوان الـ IP لضمان الشفافية.
                     </p>
                  </div>
               </div>
             </ThreeDCard>
           );
         })}
      </div>
      
      <div className="bg-zinc-900 rounded-[4rem] p-16 text-center border border-zinc-800 shadow-2xl space-y-6">
         <h2 className="text-3xl font-black text-white">لماذا يهمنا رأيك؟</h2>
         <p className="text-zinc-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
           نتائج هذه الاستفتاءات تُعرض في التقارير الإحصائية الموجهة لصناع القرار في البرلمان ووسائل الإعلام لتوضيح حجم الغضب الشعبي والمطالبة بإصلاح حقيقي في مؤسسات الدولة والمنظومة التشريعية.
         </p>
      </div>
    </div>
  );
};

export default PollsPage;
