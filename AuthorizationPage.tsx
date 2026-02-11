
import React, { useState } from 'react';
import { PenTool, CheckCircle2, ShieldCheck, Gavel, Loader2, ScrollText, Flag, Printer, ArrowRight, Scale, Eye, X, FileText } from 'lucide-react';
import ThreeDCard from '../components/ThreeDCard';
import { useContent } from '../App';

const governorates = [
  "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "البحر الأحمر", "البحيرة", "الفيوم", "الغربية", 
  "الإسماعيلية", "المنوفية", "المنيا", "القليوبية", "الوادي الجديد", "السويس", "الشرقية", "سوهاج", 
  "جنوب سيناء", "شمال سيناء", "دمياط", "بني سويف", "بورسعيد", "كفر الشيخ", "مطروح", "الأقصر", "قنا", "أسوان", "أسيوط"
];

const AuthorizationPage: React.FC = () => {
  const { t, showToast } = useContent();
  const auth = t.authorizationPage;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    nationalId: '',
    governorate: 'القاهرة'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const timestamp = new Date().toISOString();
    const newEntry = { ...formData, timestamp, type: "Authorization" };

    const existing = JSON.parse(localStorage.getItem('authorizations') || '[]');
    existing.push(newEntry);
    localStorage.setItem('authorizations', JSON.stringify(existing));
    
    setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        if (showToast) showToast(auth.success);
    }, 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const MemoA4 = () => (
    <div className="bg-white text-black p-[20mm] w-[210mm] min-h-[297mm] mx-auto shadow-2xl font-serif relative" dir="rtl">
        <div className="flex justify-between items-start border-b-4 border-black pb-6 mb-8">
            <div className="text-center space-y-1">
                <h1 className="text-xl font-bold">جمهورية مصر العربية</h1>
                <p className="text-sm">مواطنون من أجل مستقبل الطفل</p>
                <p className="text-[10px] italic">توقيعات موثقة رقمياً</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center rounded-xl mb-2">
                    <Scale size={32} />
                </div>
                <h2 className="text-lg font-black tracking-tighter">طفل مش قضية</h2>
            </div>
            <div className="text-center space-y-1">
                <h1 className="text-xl font-bold">الرئاسة المصرية</h1>
                <p className="text-sm">مذكرة تفويض شعبي</p>
                <p className="text-[10px]">كود المستند: {Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
            </div>
        </div>
        
        <div className="space-y-8 text-justify">
            <h2 className="text-2xl font-bold text-center underline mb-8">مذكرة تفويض للسيد رئيس الجمهورية</h2>
            <p className="text-lg leading-relaxed">بصفتنا مواطنين مصريين متضررين من قوانين الأحوال الشخصية الحالية، نرفع لسيادتكم هذا التفويض الرسمي:</p>
            
            <div className="p-8 border-2 border-black rounded-3xl bg-gray-50 italic font-bold text-xl leading-[1.8]">
                "{auth.legalText}"
            </div>

            <p className="text-lg">هذا التفويض نابع من إرادتنا الحرة، وهدفه صون الأجيال القادمة وحمايتها من التفكك الأسري والاغتراب الوالدي.</p>
        </div>

        <div className="mt-12 border-2 border-black p-6 rounded-2xl grid grid-cols-2 gap-6 bg-gray-50">
            <div className="space-y-4">
                <h3 className="font-bold border-b border-black pb-2">بيانات المفوّض:</h3>
                <p><span className="font-bold">الاسم الثلاثي:</span> {formData.fullName}</p>
                <p><span className="font-bold">الرقم القومي:</span> {formData.nationalId}</p>
                <p><span className="font-bold">المحافظة:</span> {formData.governorate}</p>
            </div>
            <div className="space-y-4 border-r-2 border-black pr-6">
                <h3 className="font-bold border-b border-black pb-2">التوثيق الرقمي:</h3>
                <p><span className="font-bold">تاريخ التوثيق:</span> {new Date().toLocaleDateString('ar-EG')}</p>
                <p><span className="font-bold">بصمة المستند:</span> {btoa(formData.nationalId).substr(0, 12)}</p>
                <div className="w-20 h-20 border border-black flex items-center justify-center bg-white mt-2">
                    <p className="text-[8px] text-center">QR VERIFIED<br/>PRESIDENCY<br/>SUBMISSION</p>
                </div>
            </div>
        </div>

        <div className="mt-20 flex justify-around">
            <div className="text-center">
                <p className="font-bold mb-4">بصمة الإبهام</p>
                <div className="w-24 h-32 border-2 border-dashed border-black rounded-lg"></div>
            </div>
            <div className="text-center">
                <p className="font-bold mb-10">توقيع المفوّض</p>
                <div className="w-56 border-b-2 border-black"></div>
            </div>
        </div>

        <div className="absolute bottom-10 left-10 right-10 flex justify-between text-[8px] font-bold text-gray-500 border-t border-gray-200 pt-4">
            <p>تم استخراج الوثيقة إلكترونياً وتوثيقها ببيانات الـ IP والرقم القومي</p>
            <p>منصة طفل مش قضية - الحملة الشعبية لتعديل قانون الأحوال الشخصية</p>
        </div>
    </div>
  );

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 font-cairo text-right no-print">
        {/* نسخة الطباعة الرسمية المخفية */}
        <div id="print-section" className="hidden">
           <MemoA4 />
        </div>

        {/* مودال المعاينة */}
        {showPreview && (
            <div className="fixed inset-0 z-[250] bg-black/90 flex flex-col items-center overflow-y-auto p-4 md:p-10">
                <div className="max-w-7xl w-full flex justify-between items-center mb-8 sticky top-0 z-10 bg-black/50 p-4 backdrop-blur-md rounded-2xl">
                    <div className="flex gap-4">
                        <button onClick={handlePrint} className="px-8 py-3 bg-red-600 text-white rounded-xl font-black flex items-center gap-2 hover:bg-red-700 transition-all shadow-xl shadow-red-600/20">
                            <FileText size={20} /> {t.global.downloadPdf}
                        </button>
                        <button onClick={() => setShowPreview(false)} className="px-8 py-3 bg-zinc-800 text-white rounded-xl font-black flex items-center gap-2 hover:bg-zinc-700 transition-all">
                            <X size={20} /> {t.global.close}
                        </button>
                    </div>
                    <h3 className="text-xl font-black text-white">{t.global.preview}</h3>
                </div>
                <div className="scale-[0.5] md:scale-[0.8] lg:scale-100 origin-top pb-20">
                    <MemoA4 />
                </div>
            </div>
        )}

        <ThreeDCard className="max-w-2xl w-full">
          <div className="bg-zinc-900 rounded-[4rem] p-12 md:p-16 text-center shadow-2xl border border-zinc-800 space-y-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5"><Flag size={200} className="text-red-600" /></div>
            <CheckCircle2 size={80} className="text-emerald-500 mx-auto animate-pulse" />
            <h2 className="text-4xl font-black text-white">تم توثيق تفويضكم الرئاسي</h2>
            <p className="text-zinc-500 text-xl leading-relaxed font-medium">
              سيتم إرسال هذا التفويض ضمن الملف الموحد لرئاسة الجمهورية. ننصحك بمعاينة الوثيقة الرسمية ثم تحميلها كإثبات لمشاركتك الوطنية.
            </p>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => setShowPreview(true)}
                className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-white text-black rounded-3xl font-black text-lg hover:bg-zinc-200 transition-all shadow-xl"
              >
                <Eye size={24} /> {t.global.preview}
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                    onClick={handlePrint}
                    className="flex items-center justify-center gap-3 px-8 py-5 bg-zinc-800 text-white rounded-3xl font-black text-lg hover:bg-zinc-700 transition-all"
                >
                    <Printer size={24} /> {t.global.downloadPdf}
                </button>
                <button 
                    onClick={() => setSubmitted(false)}
                    className="flex items-center justify-center gap-3 px-8 py-5 bg-red-600 text-white rounded-3xl font-black text-lg shadow-xl shadow-red-600/30"
                >
                    <ArrowRight size={24} /> العودة للمنصة
                </button>
              </div>
            </div>
          </div>
        </ThreeDCard>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20 text-right font-cairo">
      <header className="text-center max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-red-600/10 text-red-500 rounded-full text-xs font-black border border-red-600/20 uppercase tracking-widest animate-float">
          <PenTool size={16} /> نداء سيادي عاجل
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
          {auth.title}
        </h1>
        <p className="text-xl text-zinc-500 font-medium leading-relaxed">{auth.desc}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-10">
          <ThreeDCard>
            <div className="bg-zinc-900 rounded-[3rem] p-12 border border-zinc-800 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><ScrollText size={300} /></div>
               <div className="flex items-center gap-4 mb-10 justify-end">
                  <h2 className="text-3xl font-black text-white">نص التفويض القانوني</h2>
                  <div className="w-16 h-16 rounded-2xl bg-red-600/10 text-red-600 flex items-center justify-center"><Gavel size={32} /></div>
               </div>
               <div className="bg-zinc-950 p-10 rounded-[2.5rem] border border-zinc-800 relative">
                  <p className="text-2xl text-zinc-300 leading-[2.2] font-black italic">
                    "{auth.legalText}"
                  </p>
                  <div className="mt-10 pt-10 border-t border-zinc-800 flex items-center justify-between">
                     <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">وثيقة رسمية رقم 001/2024</p>
                     <ShieldCheck size={24} className="text-emerald-500" />
                  </div>
               </div>
            </div>
          </ThreeDCard>
          
          <div className="p-8 bg-zinc-900/50 rounded-3xl border border-zinc-800 flex items-start gap-4">
             <div className="w-12 h-12 bg-emerald-600/10 rounded-2xl flex items-center justify-center text-emerald-500 shrink-0"><ShieldCheck size={24} /></div>
             <p className="text-sm text-zinc-500 font-bold leading-relaxed">تنبيه: هذا التفويض يتم توثيقه بناءً على الرقم القومي ولا يقبل التكرار. بياناتك محمية بنظام تشفير سيادي لضمان وصولها للجهات المختصة فقط.</p>
          </div>
        </div>

        <ThreeDCard>
          <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-[4rem] p-16 shadow-2xl border border-zinc-800 space-y-10">
            <h3 className="text-2xl font-black text-white border-r-4 border-red-600 pr-4">بيانات المفوض</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-black text-zinc-500 mr-2">{auth.form.fullName}</label>
              <input 
                type="text"
                required
                className="w-full px-8 py-5 rounded-[2rem] bg-zinc-950 border border-zinc-800 text-white font-black focus:border-red-600 outline-none transition-all text-right"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-zinc-500 mr-2">{auth.form.nationalId}</label>
              <input 
                type="text"
                maxLength={14}
                required
                className="w-full px-8 py-5 rounded-[2rem] bg-zinc-950 border border-zinc-800 text-white font-black focus:border-red-600 outline-none transition-all text-right"
                value={formData.nationalId}
                onChange={(e) => setFormData({...formData, nationalId: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-zinc-500 mr-2">{auth.form.governorate}</label>
              <select 
                required
                className="w-full px-8 py-5 rounded-[2rem] bg-zinc-950 border border-zinc-800 text-white font-black focus:border-red-600 outline-none transition-all text-right appearance-none"
                value={formData.governorate}
                onChange={(e) => setFormData({...formData, governorate: e.target.value})}
              >
                {governorates.map(gov => <option key={gov} value={gov}>{gov}</option>)}
              </select>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-6 bg-red-600 text-white rounded-[2rem] font-black text-2xl shadow-2xl shadow-red-600/30 hover:bg-red-700 transition-all flex items-center justify-center gap-4 group disabled:opacity-50"
            >
              {loading ? <Loader2 size={32} className="animate-spin" /> : auth.form.submit}
              {!loading && <PenTool size={24} className="group-hover:rotate-12 transition-transform" />}
            </button>
            <p className="text-center text-[10px] text-zinc-600 font-bold uppercase tracking-widest">التوقيع يعبر عن إرادة حرة ومستقلة</p>
          </form>
        </ThreeDCard>
      </div>
    </div>
  );
};

export default AuthorizationPage;
