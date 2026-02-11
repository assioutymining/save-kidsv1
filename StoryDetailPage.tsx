
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, User, Share2, Heart, MessageCircle, PlayCircle, ShieldAlert } from 'lucide-react';
import { useContent } from '../App';
import ThreeDCard from '../components/ThreeDCard';

const StoryDetailPage: React.FC = () => {
  const { id } = useParams();
  const { t, showToast } = useContent();
  const navigate = useNavigate();
  const story = t.storiesPage.items.find((s: any) => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleSupport = () => {
    if (showToast) showToast('تم تسجيل تضامنك مع هذه القصة بنجاح. شكراً لدعمك!', 'success');
  };

  const handleShare = async () => {
    // Ensuring a valid absolute URL for Web Share API
    let shareUrl = window.location.href;
    try {
      const url = new URL(window.location.href);
      // Remove hash if it's causing issues, or keep it for SPA routing
      shareUrl = url.origin + url.pathname + url.search + url.hash;
    } catch (e) {
      shareUrl = window.location.origin + window.location.pathname;
    }

    const shareData = {
      title: story?.title || t.nav.siteName,
      text: story?.excerpt || t.hero.desc,
      url: shareUrl,
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        throw new Error('Web Share not supported or invalid data');
      }
    } catch (err) {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        if (showToast) showToast('تم نسخ رابط القصة للحافظة بنجاح', 'success');
      } catch (clipboardErr) {
        if (showToast) showToast('حدث خطأ أثناء محاولة المشاركة', 'error');
      }
    }
  };

  if (!story) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6 font-cairo">
        <h2 className="text-4xl font-black text-white">القصة غير موجودة</h2>
        <Link to="/stories" className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold flex items-center gap-2">
          <ArrowRight size={20} /> العودة لقصص المجتمع
        </Link>
      </div>
    );
  }

  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    let videoId = '';
    if (url.includes('v=')) videoId = url.split('v=')[1].split('&')[0];
    else if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1].split('?')[0];
    else if (url.includes('embed/')) videoId = url.split('embed/')[1].split('?')[0];
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const embedUrl = getEmbedUrl(story.videoUrl);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-16 text-right font-cairo animate-in fade-in duration-700">
      <button 
        onClick={() => navigate('/stories')}
        className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-black group"
      >
        <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        العودة لمكتبة القصص
      </button>

      <section className="space-y-10">
        <div className="relative rounded-[3rem] overflow-hidden bg-zinc-900 border border-zinc-800 shadow-[0_50px_100px_-20px_rgba(220,38,38,0.15)] aspect-video">
          {embedUrl ? (
            <iframe 
              src={`${embedUrl}?autoplay=0&rel=0&modestbranding=1&showinfo=0`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={story.title}
            ></iframe>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center space-y-6 text-zinc-800 bg-zinc-950">
               <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <PlayCircle size={60} className="text-zinc-800" />
               </div>
               <p className="font-black text-xl text-zinc-700">لا يتوفر فيديو حالياً لهذه الشهادة</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4 text-zinc-500 text-sm font-black uppercase tracking-widest justify-end">
            <span className="flex items-center gap-1.5">{story.date} <Calendar size={16} className="text-red-600" /></span>
            <span className="flex items-center gap-1.5">{story.author} <User size={16} className="text-zinc-400" /></span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white leading-tight">
            {story.title}
          </h1>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <div className="prose prose-invert prose-red max-w-none">
            <p className="text-2xl text-zinc-300 leading-[1.8] font-medium whitespace-pre-wrap border-r-4 border-zinc-800 pr-6">
              {story.fullText || story.excerpt}
            </p>
          </div>

          <div className="p-10 rounded-[3rem] bg-zinc-900/40 border border-zinc-800 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldAlert size={100} className="text-red-600" />
             </div>
             <p className="relative z-10 text-xl text-white font-bold italic leading-relaxed">
               "إن هذه القصة ليست مجرد كلمات، بل هي توثيق لجريمة صامتة ترتكب في حق الطفولة كل يوم بسبب القوانين القاصرة."
             </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-10 border-t border-zinc-800">
             <button 
                onClick={handleSupport}
                className="flex items-center gap-3 px-10 py-5 bg-red-600 text-white rounded-2xl font-black shadow-2xl shadow-red-600/30 hover:scale-105 transition-transform"
             >
               <Heart size={24} fill="currentColor" /> أدعم هذه القضية
             </button>
             <button 
                onClick={handleShare}
                className="flex items-center gap-3 px-8 py-5 bg-zinc-900 border border-zinc-800 text-white rounded-2xl font-black hover:bg-zinc-800 transition-colors"
             >
               <Share2 size={24} /> مشاركة القصة
             </button>
          </div>
        </div>

        <aside className="space-y-10">
          <ThreeDCard>
            <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800 space-y-8 shadow-xl">
               <div className="space-y-2 text-right">
                 <h3 className="text-2xl font-black text-white">تضامن الآن</h3>
                 <p className="text-zinc-500 text-sm font-medium">اترك رسالة دعم لصاحب القصة</p>
               </div>
               <textarea 
                placeholder="اكتب كلماتك هنا..."
                className="w-full p-5 bg-zinc-950 border border-zinc-800 rounded-2xl text-white h-32 focus:border-red-600 outline-none transition-all placeholder:text-zinc-800 font-bold text-right"
               ></textarea>
               <button 
                onClick={() => showToast && showToast('سيتم مراجعة رسالتك ونشرها قريباً', 'success')}
                className="w-full py-5 bg-zinc-800 text-zinc-400 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-zinc-700 hover:text-white transition-all"
               >
                 <MessageCircle size={20} /> إرسال رسالة تضامن
               </button>
            </div>
          </ThreeDCard>

          <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-red-600/10 to-transparent border border-red-600/10 space-y-6 text-right">
             <h4 className="text-red-500 font-black text-lg">شارك قصتك أنت أيضاً</h4>
             <p className="text-zinc-500 text-sm leading-relaxed font-medium">
               هل تعاني من ظروف مشابهة؟ صوتك قد يكون المفتاح لتغيير قوانين الحضانة في مصر. نحن هنا لدعم الأب في الحصول على حقه الشرعي والقانوني.
             </p>
             <Link to="/petition" className="block text-center py-4 bg-zinc-900 text-white rounded-xl font-black border border-zinc-800 hover:border-red-600 transition-colors">سجل شهادتك الآن</Link>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default StoryDetailPage;
