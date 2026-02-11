
import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Scale, Calculator, Loader2, Gavel, AlertTriangle, Printer, ArrowRight, Eye, X, FileText } from 'lucide-react';
import ThreeDCard from '../components/ThreeDCard';
import { useContent } from '../App';

const governorates = [
  "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "البحر الأحمر", "البحيرة", "الفيوم", "الغربية", 
  "الإسماعيلية", "المنوفية", "المنيا", "القليوبية", "الوادي الجديد", "السويس", "الشرقية", "سوهاج", 
  "جنوب سيناء", "شمال سيناء", "دمياط", "بني سويف", "بورسعيد", "كفر الشيخ", "مطروح", "الأقصر", "قنا", "أسوان", "أسيوط"
];

const PetitionPage: React.FC = () => {
  const { t, showToast } = useContent();
  const [submitted, setSubmitted] = useState(false);
  const [peiScore, setPeiScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  const [formData, setFormData] = useState({
    nationalId: '',
    caseNumber: '',
    governorate: 'القاهرة',
    filingYear: new Date().getFullYear().toString(),
    childrenCount: '1',
    exclusionYears: '0',
    lawsuitsCount: '0',
    role: 'أب متضرر',
    contactType: 'حرمان كلي'
  });

  useEffect(() => {
    const exclusion = parseInt(formData.exclusionYears) || 0;
    const children = parseInt(formData.childrenCount) || 1;
    const lawsuits = parseInt(formData.lawsuitsCount) || 0;
    
    const yearsFactor = exclusion * 12;
    const childrenFactor = children * 5;
    const lawsuitsFactor = lawsuits * 8;
    const contactFactor = formData.contactType === 'حرمان كلي' ? 35 : formData.contactType === 'رؤية مراكز' ? 20 : 10;
    
    const score = Math.min(100, yearsFactor + childrenFactor + lawsuitsFactor + contactFactor);
    setPeiScore(score);
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasAgreed) {
      if (showToast) showToast('يجب الموافقة على الشروط والإقرار أولاً', 'error');
      return;
    }
    setLoading(true);
    
    const timestamp = new Date().toISOString();
    const newEntry = { ...formData, timestamp, pei: peiScore, type: "Petition" };

    const existingSubmissions = JSON.parse(localStorage.getItem('petition_submissions') || '[]');
    existingSubmissions.push(newEntry);
    localStorage.setItem('petition_submissions', JSON.stringify(existingSubmissions));
    
    setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        if (showToast) showToast('تم إرسال العريضة بنجاح إلى قاعدة بيانات الإحصاء');
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  const PetitionA4 = () => (
    <div className="bg-white text-black p-[20mm] w-[210mm] min-h-[297mm] mx-auto shadow-2xl font-serif relative" dir="rtl">
        <div className="flex justify-between items-start border-b-4 border-black pb-6 mb-10">
            <div className="text-center">
                <h1 className="text-xl font-bold">تقرير رصد الأثر النفسي والاجتماعي</h1>
                <p className="text-sm italic">مؤشر الاغتراب الوالدي (PEI)</p>
            </div>
            <div className="flex flex-col items-center">
                <Scale size={40} className="mb-2" />
                <h2 className="text-lg font-black uppercase">طفل مش قضية</h2>
            </div>
        </div>

        <div className="space-y-10">
            <h2 className="text-2xl font-bold text-center underline">إقرار تضرر ومشاركة في العريضة المليونية</h2>
            
            <div className="border-2 border-black p-8 rounded-3xl space-y-6">
                <p className="text-lg leading-relaxed">أقر أنا الموقع أدناه، بصفتي <span className="font-bold underline">{formData.role}</span>، تضرري البالغ من القوانين الحالية للأحوال الشخصية، حيث أعاني من الحرمان الفعلي من أطفالي لمدة تصل إلى <span className="font-bold">{formData.exclusionYears} سنوات</span>.</p>
                
                <div className="grid grid-cols-2 gap-8 py-6 border-y border-gray-200">
                    <div className="space-y-2">
                        <p><span className="font-bold">عدد الأطفال المتضررين:</span> {formData.childrenCount}</p>
                        <p><span className="font-bold">نوع التواصل الحالي:</span> {formData.contactType}</p>
                        <p><span className="font-bold">عدد القضايا المرفوعة:</span> {formData.lawsuitsCount}</p>
                    </div>
                    <div className="text-left flex flex-col items-end">
                        <p className="font-bold mb-2">مؤشر الضرر (PEI)</p>
                        <div className="text-4xl font-black border-4 border-black p-4 rounded-xl">
                            {peiScore}%
                        </div>
                        <p className="text-[10px] mt-2 italic">مستوى الخطورة النفسية: {peiScore > 70 ? 'حرج جداً' : 'متوسط'}</p>
                    </div>
                </div>

                <p className="text-base italic">أطالب رسمياً الجهات التشريعية بسرعة التدخل لإنصاف الأطفال وضمان حقهم في الرعاية المشتركة (التخيير هو جريمة في حق توازن الطفل النفسي).</p>
            </div>

            <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4">
                    <p><span className="font-bold">الاسم/التوقيع:</span> ............................................</p>
                    <p><span className="font-bold">الرقم القومي:</span> {formData.nationalId}</p>
                    <p><span className="font-bold">المحافظة:</span> {formData.governorate}</p>
                </div>
                <div className="text-left space-y-2">
                    <p className="font-bold">رقم مرجع الإحصاء:</p>
                    <p className="text-sm font-mono">PET-{btoa(formData.nationalId).substr(0, 8).toUpperCase()}</p>
                    <p className="text-[10px] mt-4">التوقيع أعلاه يعد إقراراً بصحة البيانات المسجلة</p>
                </div>
            </div>
        </div>

        <div className="absolute bottom-10 left-10 right-10 text-center border-t border-black pt-4">
            <p className="text-xs font-bold">هذه الوثيقة صادرة عن النظام الإحصائي لحملة "طفل مش قضية" لتوثيق حالات الحرمان القسري.</p>
        </div>
    </div>
  );

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 font-cairo text-right">
        {/* نسخة طباعة العريضة المخفية (للطابعة فقط) */}
        <div id="print-section" className="hidden">
           <PetitionA4 />
        </div>

        {/* مودال المعاينة */}
        {showPreview && (
            <div className="fixed inset-0 z-[250] bg-black/90 flex flex-col items-center overflow-y-auto p-4 md:p-10 no-print">
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
                    <PetitionA4 />
                </div>
            </div>
        )}

        <ThreeDCard className="max-w-xl w-full">
          <div className="bg-zinc-900 rounded-[3rem] p-12 text-center shadow-2xl border border-zinc-800 space-y-8">
            <CheckCircle2 size={64} className="text-emerald-500 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-black text-white">تم تسجيل توقيعك بنجاح</h2>
            <p className="text-zinc-500 leading-relaxed font-medium">
              لقد سجلت موقفاً تاريخياً للدفاع عن أطفال مصر. يمكنك الآن معاينة إقرار الضرر الخاص بك أو تحميله بصيغة PDF.
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
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start text-right font-cairo">
      <div className="space-y-8 lg:sticky lg:top-32">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/10 text-red-500 rounded-full text-[10px] font-bold uppercase tracking-widest border border-red-600/20">
          <Scale size={12} /> {t.petition.title}
        </div>
        <h1 className="text-4xl md:text-7xl font-black text-white leading-tight">
          وقع لمصلحة <br /> <span className="text-red-600">الطفل والأسرة</span>
        </h1>
        <p className="text-lg text-zinc-500 leading-relaxed font-medium">
          {t.petition.desc}
        </p>
        
        <div className="p-8 rounded-[2.5rem] bg-zinc-900 text-white shadow-2xl space-y-6 relative overflow-hidden border border-zinc-800">
           <Calculator size={40} className="absolute top-4 left-4 opacity-10" />
           <div className="relative z-10">
             <h3 className="text-xl font-black mb-2">{t.petition.indicatorTitle}</h3>
             <p className="text-[10px] text-zinc-500 mb-6 font-medium">{t.petition.indicatorDesc}</p>
             <div className="space-y-4">
               <div className="flex justify-between text-sm font-black">
                 <span className={peiScore >= 70 ? 'text-red-500' : peiScore >= 40 ? 'text-orange-500' : 'text-emerald-500'}>
                   {peiScore}%
                 </span>
                 <span>مستوى الضرر الحالي</span>
               </div>
               <div className="h-4 bg-zinc-800 rounded-full overflow-hidden">
                 <div 
                   className={`h-full transition-all duration-700 ${peiScore >= 70 ? 'bg-red-600' : peiScore >= 40 ? 'bg-orange-500' : 'bg-emerald-500'}`}
                   style={{ width: `${peiScore}%` }}
                 />
               </div>
             </div>
           </div>
        </div>

        <div className="p-8 bg-amber-500/5 border border-amber-500/20 rounded-3xl flex gap-4">
            <AlertTriangle className="text-amber-500 shrink-0" size={24} />
            <p className="text-sm text-zinc-400 font-bold leading-relaxed">
                تنبيه: سيتم استخدام هذه البيانات لأغراض إحصائية وقانونية لخدمة القضية فقط. نحن نلتزم بأقصى معايير السرية لبياناتك الشخصية.
            </p>
        </div>
      </div>

      <ThreeDCard>
        <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-[3rem] p-10 shadow-2xl border border-zinc-800 space-y-8">
          <div className="space-y-2">
            <label className="text-xs font-black text-zinc-500 mr-1">{t.petition.form.nationalId}</label>
            <input 
              type="text"
              maxLength={14}
              required
              placeholder="29000000000000"
              className="w-full px-5 py-4 rounded-2xl bg-zinc-950 border border-zinc-800 focus:border-red-600 outline-none transition-all text-sm font-bold text-white placeholder:text-zinc-700"
              value={formData.nationalId}
              onChange={(e) => setFormData({...formData, nationalId: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-zinc-500 mr-1">{t.petition.form.governorate}</label>
              <select 
                required
                className="w-full px-5 py-4 rounded-2xl bg-zinc-950 border border-zinc-800 focus:border-red-600 outline-none transition-all text-sm font-bold text-white appearance-none"
                value={formData.governorate}
                onChange={(e) => setFormData({...formData, governorate: e.target.value})}
              >
                {governorates.map(gov => <option key={gov} value={gov}>{gov}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-zinc-500 mr-1">{t.petition.form.caseNumber}</label>
              <input 
                type="text"
                required
                placeholder="رقم القضية / السنة"
                className="w-full px-5 py-4 rounded-2xl bg-zinc-950 border border-zinc-800 focus:border-red-600 outline-none transition-all text-sm font-bold text-white placeholder:text-zinc-700"
                value={formData.caseNumber}
                onChange={(e) => setFormData({...formData, caseNumber: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-zinc-500 mr-1">{t.petition.form.childrenCount}</label>
              <input 
                type="number"
                required
                min="1"
                className="w-full px-5 py-4 rounded-2xl bg-zinc-950 border border-zinc-800 focus:border-red-600 outline-none transition-all text-sm font-bold text-white"
                value={formData.childrenCount}
                onChange={(e) => setFormData({...formData, childrenCount: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-zinc-500 mr-1">{t.petition.form.exclusionYears}</label>
              <input 
                type="number"
                required
                min="0"
                className="w-full px-5 py-4 rounded-2xl bg-zinc-950 border border-zinc-800 focus:border-red-600 outline-none transition-all text-sm font-bold text-white"
                value={formData.exclusionYears}
                onChange={(e) => setFormData({...formData, exclusionYears: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-zinc-500 mr-1 flex items-center gap-1">
              <Gavel size={14} className="text-red-500" />
              {t.petition.form.lawsuitsCount}
            </label>
            <input 
              type="number"
              required
              min="0"
              className="w-full px-5 py-4 rounded-2xl bg-zinc-950 border border-zinc-800 focus:border-red-600 outline-none transition-all text-sm font-bold text-white"
              value={formData.lawsuitsCount}
              onChange={(e) => setFormData({...formData, lawsuitsCount: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-zinc-500 mr-1">{t.petition.form.contactType}</label>
            <div className="grid grid-cols-2 gap-3">
              {['حرمان كلي', 'رؤية مراكز', 'هاتف فقط', 'رؤية محدودة'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({...formData, contactType: type})}
                  className={`py-3 rounded-xl text-xs font-black border transition-all ${
                    formData.contactType === type ? 'bg-red-600 text-white border-red-600' : 'bg-zinc-950 text-zinc-500 border-zinc-800'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div 
            className={`p-6 rounded-2xl border transition-all cursor-pointer flex gap-4 ${hasAgreed ? 'bg-red-600/5 border-red-600/30' : 'bg-zinc-950 border-zinc-800'}`}
            onClick={() => setHasAgreed(!hasAgreed)}
          >
             <div className={`w-6 h-6 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${hasAgreed ? 'bg-red-600 border-red-600 text-white' : 'border-zinc-700 bg-transparent'}`}>
                {hasAgreed && <CheckCircle2 size={16} />}
             </div>
             <p className={`text-xs font-bold leading-relaxed transition-colors ${hasAgreed ? 'text-zinc-200' : 'text-zinc-500'}`}>
                {t.petition.form.consentLabel}
             </p>
          </div>

          <button 
            type="submit"
            disabled={loading || !hasAgreed}
            className="w-full py-5 bg-red-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-red-600/20 hover:bg-red-700 transition-all flex items-center justify-center gap-3 group disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 size={24} className="animate-spin" /> : t.petition.form.submit}
            {!loading && <Send size={20} className="transition-transform group-hover:-translate-x-1 rotate-180" />}
          </button>
        </form>
      </ThreeDCard>
    </div>
  );
};

export default PetitionPage;
