
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Lock, Save, RefreshCcw, Layout, Home, Info, Video, 
  Users, ShieldCheck, Plus, Trash2, Gavel, Settings, EyeOff, FileText, Activity, BarChart3, Globe, Brain, List, Calendar, MapPin, CheckCircle, Vote, Database, Share2,
  ThumbsUp, ThumbsDown, MessageSquare, Heart, AlertTriangle, Monitor, Image as ImageIcon, Type, Layers, Box, Terminal, Download, Inbox, PenTool, Rocket, Target, RotateCcw, Film, Tv
} from 'lucide-react';
import { useContent } from '../App';
import ThreeDCard from '../components/ThreeDCard';

// Shared Input Component for CMS
const AdminInput = ({ label, value, onChange, type = "text", placeholder = "" }: any) => (
  <div className="space-y-1.5 w-full group">
    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block group-hover:text-red-600 transition-colors">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea 
        className="w-full px-5 py-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-white font-medium focus:border-red-600 outline-none transition-all h-32 text-right text-sm scrollbar-hide"
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <input 
        type={type}
        className="w-full px-5 py-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-white font-bold focus:border-red-600 outline-none transition-all text-right text-sm"
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => onChange(type === "number" ? parseInt(e.target.value) : e.target.value)}
      />
    )}
  </div>
);

const AdminPage: React.FC = () => {
  const { t, updateContent, resetContent, showToast } = useContent();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('reception');
  const [editableT, setEditableT] = useState(t);
  
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [pollLogs, setPollLogs] = useState<any[]>([]);
  const [authorizations, setAuthorizations] = useState<any[]>([]);

  useEffect(() => {
    setEditableT(t);
  }, [t]);

  useEffect(() => {
    const subs = JSON.parse(localStorage.getItem('petition_submissions') || '[]');
    setSubmissions(subs.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    
    const polls = JSON.parse(localStorage.getItem('poll_records') || '[]');
    setPollLogs(polls.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));

    const auths = JSON.parse(localStorage.getItem('authorizations') || '[]');
    setAuthorizations(auths.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
  }, [activeTab]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') setIsAuthenticated(true);
    else if (showToast) showToast('كلمة المرور غير صحيحة (admin123)', 'error');
  };

  const handleSave = () => {
    updateContent(editableT);
    if (showToast) showToast('تم تحديث المنصة بالكامل بنجاح');
  };

  const handleReset = () => {
    if (window.confirm('هل أنت متأكد من إعادة ضبط الموقع لإعداداته الأصلية؟ سيتم فقدان كافة التغييرات النصية.')) {
      resetContent();
      setEditableT(t);
    }
  };

  const updateField = useCallback((path: string, value: any) => {
    const keys = path.split('.');
    const newData = JSON.parse(JSON.stringify(editableT));
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setEditableT(newData);
  }, [editableT]);

  const addItem = (path: string, defaultValue: any) => {
    const keys = path.split('.');
    const newData = JSON.parse(JSON.stringify(editableT));
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    const array = current[keys[keys.length - 1]] || [];
    current[keys[keys.length - 1]] = [...array, defaultValue];
    setEditableT(newData);
  };

  const removeItem = (path: string, index: number) => {
    const keys = path.split('.');
    const newData = JSON.parse(JSON.stringify(editableT));
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]];
    current[keys[keys.length - 1]] = current[keys[keys.length - 1]].filter((_: any, i: number) => i !== index);
    setEditableT(newData);
  };

  const getFieldValue = (path: string) => {
    return path.split('.').reduce((obj, key) => obj?.[key], editableT);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-zinc-950 font-cairo text-right">
        <ThreeDCard className="max-w-md w-full">
          <form onSubmit={handleLogin} className="bg-zinc-900 rounded-[4rem] p-16 text-center shadow-2xl border border-zinc-800 space-y-10">
            <div className="w-24 h-24 bg-red-600/10 rounded-[2rem] flex items-center justify-center text-red-600 mx-auto">
              <Terminal size={48} />
            </div>
            <h2 className="text-4xl font-black text-white">نظام التحكم A-Z</h2>
            <input 
              type="password"
              placeholder="••••••••"
              className="w-full px-8 py-5 rounded-3xl bg-zinc-950 border border-zinc-800 text-center text-white font-black text-2xl tracking-[0.5em] focus:border-red-600 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full py-6 bg-red-600 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-red-600/20 active:scale-95 transition-all">دخول</button>
          </form>
        </ThreeDCard>
      </div>
    );
  }

  const sections = [
    { id: 'reception', icon: Inbox, label: 'مركز الاستقبال' },
    { id: 'global', icon: Globe, label: 'الهوية العالمية' },
    { id: 'home', icon: Home, label: 'الصفحة الرئيسية' },
    { id: 'campaigns_admin', icon: Rocket, label: 'إدارة البرامج' },
    { id: 'cinema_admin', icon: Film, label: 'سينما الوعي' },
    { id: 'polls_admin', icon: Vote, label: 'إدارة الاستفتاءات' },
    { id: 'docs_admin', icon: FileText, label: 'إعلانات المستندات' }
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-12 flex flex-col xl:flex-row gap-12 text-right font-cairo animate-in fade-in duration-700">
      <aside className="xl:w-80 space-y-4 shrink-0">
        <div className="p-8 bg-zinc-900 rounded-[3rem] border border-zinc-800 sticky top-32 shadow-2xl">
          <div className="flex items-center gap-3 mb-8 px-4">
             <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white"><Terminal size={20}/></div>
             <h3 className="text-white font-black text-sm uppercase">Site Control</h3>
          </div>
          <div className="space-y-1">
            {sections.map(section => (
              <button 
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`w-full flex items-center justify-between gap-4 px-6 py-4 rounded-2xl font-black text-sm transition-all duration-300 ${activeTab === section.id ? 'bg-red-600 text-white shadow-xl shadow-red-600/20' : 'text-zinc-500 hover:text-white hover:bg-zinc-800'}`}
              >
                <div className="flex items-center gap-4">
                  <section.icon size={18} /> {section.label}
                </div>
              </button>
            ))}
          </div>
          <div className="pt-8 space-y-3">
            <button onClick={handleSave} className="w-full py-5 bg-emerald-600 text-white rounded-[2rem] font-black shadow-xl flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all">
              <Save size={20} /> حفظ التغييرات
            </button>
            <button onClick={handleReset} className="w-full py-4 bg-zinc-800 text-zinc-400 rounded-[2rem] font-black text-xs flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all">
              <RotateCcw size={14} /> إعادة ضبط المصنع
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 space-y-10 min-w-0 pb-20">
        {activeTab === 'reception' && (
          <div className="space-y-12">
            <header className="flex flex-col md:flex-row items-center justify-between bg-zinc-900 p-10 rounded-[3.5rem] border border-zinc-800 shadow-xl gap-6">
               <h2 className="text-4xl font-black text-white">مركز الاستقبال المركزي</h2>
               <div className="flex flex-wrap gap-4">
                  <div className="px-8 py-4 bg-zinc-950 border border-zinc-800 rounded-3xl text-center min-w-[120px]">
                     <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">العرائض</p>
                     <p className="text-red-600 text-2xl font-black">{submissions.length}</p>
                  </div>
                  <div className="px-8 py-4 bg-zinc-950 border border-zinc-800 rounded-3xl text-center min-w-[120px]">
                     <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">التفويضات</p>
                     <p className="text-blue-500 text-2xl font-black">{authorizations.length}</p>
                  </div>
               </div>
            </header>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
               <div className="bg-zinc-900 p-10 rounded-[4rem] border border-zinc-800 space-y-8 shadow-2xl h-[500px] overflow-hidden flex flex-col">
                  <h3 className="text-2xl font-black text-white border-r-4 border-red-600 pr-4">أحدث العرائض المستلمة</h3>
                  <div className="space-y-4 overflow-y-auto pr-4 scrollbar-hide flex-1">
                     {submissions.length > 0 ? submissions.map((sub, i) => (
                       <div key={i} className="p-6 bg-zinc-950 rounded-3xl border border-zinc-800 flex justify-between items-center group hover:border-red-600/30 transition-all">
                          <div>
                            <p className="text-white font-black">{sub.nationalId}</p>
                            <p className="text-zinc-600 text-[10px] font-bold mt-1">{new Date(sub.timestamp).toLocaleString('ar-EG')}</p>
                          </div>
                          <div className="px-4 py-1.5 bg-red-600/10 text-red-500 text-[10px] font-black rounded-lg">
                            {sub.governorate}
                          </div>
                       </div>
                     )) : (
                       <div className="h-full flex items-center justify-center text-zinc-700 font-bold">لا توجد بيانات مستلمة بعد</div>
                     )}
                  </div>
               </div>

               <div className="bg-zinc-900 p-10 rounded-[4rem] border border-zinc-800 space-y-8 shadow-2xl h-[500px] overflow-hidden flex flex-col">
                  <h3 className="text-2xl font-black text-white border-r-4 border-blue-600 pr-4">سجل التفويضات السيادية</h3>
                  <div className="space-y-4 overflow-y-auto pr-4 scrollbar-hide flex-1">
                     {authorizations.length > 0 ? authorizations.map((auth, i) => (
                       <div key={i} className="p-6 bg-zinc-950 rounded-3xl border border-zinc-800 flex justify-between items-center group hover:border-blue-600/30 transition-all">
                          <div>
                            <p className="text-white font-black">{auth.fullName}</p>
                            <p className="text-zinc-600 text-[10px] font-bold mt-1">{auth.nationalId}</p>
                          </div>
                          <p className="text-zinc-500 text-xs font-bold">{auth.governorate}</p>
                       </div>
                     )) : (
                       <div className="h-full flex items-center justify-center text-zinc-700 font-bold">لا توجد تفويضات بعد</div>
                     )}
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'home' && (
          <div className="space-y-8">
            <div className="bg-zinc-900 p-12 rounded-[4rem] border border-zinc-800 space-y-12 shadow-2xl">
              <h2 className="text-4xl font-black text-white">محرر قسم الهيرو</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AdminInput label="شارة الهيرو" value={getFieldValue('hero.badge')} onChange={(v: any) => updateField('hero.badge', v)} />
                <AdminInput label="العنوان الرئيسي" value={getFieldValue('hero.title')} onChange={(v: any) => updateField('hero.title', v)} />
                <AdminInput label="التكملة المتدرجة" value={getFieldValue('hero.titleSpan')} onChange={(v: any) => updateField('hero.titleSpan', v)} />
                <AdminInput label="الوصف" value={getFieldValue('hero.desc')} onChange={(v: any) => updateField('hero.desc', v)} type="textarea" />
                <AdminInput label="رابط فيديو الهيرو" value={getFieldValue('hero.heroVideo')} onChange={(v: any) => updateField('hero.heroVideo', v)} />
                <AdminInput label="عنوان الفيديو" value={getFieldValue('hero.videoTitle')} onChange={(v: any) => updateField('hero.videoTitle', v)} />
              </div>
            </div>
            
            <div className="bg-zinc-900 p-12 rounded-[4rem] border border-zinc-800 space-y-12 shadow-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-4xl font-black text-white">رسائل الضغط النفسي المتغيرة</h2>
                <button onClick={() => addItem('messages.psych', 'رسالة جديدة')} className="p-3 bg-red-600 text-white rounded-2xl"><Plus size={20}/></button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {(getFieldValue('messages.psych') || []).map((msg: string, i: number) => (
                  <div key={i} className="flex gap-4 items-center">
                    <AdminInput label={`رسالة ${i+1}`} value={msg} onChange={(v: any) => {
                      const msgs = [...getFieldValue('messages.psych')];
                      msgs[i] = v;
                      updateField('messages.psych', msgs);
                    }} />
                    <button onClick={() => removeItem('messages.psych', i)} className="mt-5 p-4 bg-zinc-950 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={18}/></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'campaigns_admin' && (
          <div className="bg-zinc-900 p-12 rounded-[4rem] border border-zinc-800 space-y-12 shadow-2xl">
            <div className="flex justify-between items-center">
              <h2 className="text-4xl font-black text-white">إدارة الحملات والبرامج</h2>
              <button onClick={() => addItem('campaignsPage.items', { id: Math.random().toString(), title: 'حملة جديدة', desc: '', image: '', status: 'نشط', progress: 0, goal: '', link: '#' })} className="p-4 bg-red-600 text-white rounded-3xl flex items-center gap-2"><Plus size={24}/> إضافة حملة</button>
            </div>
            <div className="grid grid-cols-1 gap-12">
              {(getFieldValue('campaignsPage.items') || []).map((item: any, i: number) => (
                <div key={item.id} className="p-10 bg-zinc-950 rounded-[3rem] border border-zinc-800 space-y-8 relative">
                  <button onClick={() => removeItem('campaignsPage.items', i)} className="absolute top-10 left-10 p-3 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all"><Trash2 size={24}/></button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AdminInput label="عنوان الحملة" value={item.title} onChange={(v: any) => {
                      const items = [...getFieldValue('campaignsPage.items')];
                      items[i] = { ...items[i], title: v };
                      updateField('campaignsPage.items', items);
                    }} />
                    <AdminInput label="الحالة (مثلاً: نشط حالياً)" value={item.status} onChange={(v: any) => {
                      const items = [...getFieldValue('campaignsPage.items')];
                      items[i] = { ...items[i], status: v };
                      updateField('campaignsPage.items', items);
                    }} />
                    <AdminInput label="نسبة الإنجاز (0-100)" type="number" value={item.progress} onChange={(v: any) => {
                      const items = [...getFieldValue('campaignsPage.items')];
                      items[i] = { ...items[i], progress: v };
                      updateField('campaignsPage.items', items);
                    }} />
                    <AdminInput label="الهدف الإحصائي" value={item.goal} onChange={(v: any) => {
                      const items = [...getFieldValue('campaignsPage.items')];
                      items[i] = { ...items[i], goal: v };
                      updateField('campaignsPage.items', items);
                    }} />
                    <AdminInput label="رابط الحملة" value={item.link} onChange={(v: any) => {
                      const items = [...getFieldValue('campaignsPage.items')];
                      items[i] = { ...items[i], link: v };
                      updateField('campaignsPage.items', items);
                    }} />
                    <AdminInput label="رابط الصورة" value={item.image} onChange={(v: any) => {
                      const items = [...getFieldValue('campaignsPage.items')];
                      items[i] = { ...items[i], image: v };
                      updateField('campaignsPage.items', items);
                    }} />
                  </div>
                  <AdminInput label="وصف الحملة" value={item.desc} type="textarea" onChange={(v: any) => {
                    const items = [...getFieldValue('campaignsPage.items')];
                    items[i] = { ...items[i], desc: v };
                    updateField('campaignsPage.items', items);
                  }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cinema_admin' && (
          <div className="bg-zinc-900 p-12 rounded-[4rem] border border-zinc-800 space-y-12 shadow-2xl">
            <div className="flex justify-between items-center">
              <h2 className="text-4xl font-black text-white">إدارة سينما الوعي</h2>
              <button onClick={() => addItem('cinemaPage.items', { id: Math.random().toString(), type: 'movie', title: 'عمل جديد', desc: '', image: '', year: '2024', rating: '8.5', episodes: [] })} className="p-4 bg-red-600 text-white rounded-3xl"><Plus size={24}/></button>
            </div>
            <div className="grid grid-cols-1 gap-12">
               {(getFieldValue('cinemaPage.items') || []).map((item: any, i: number) => (
                 <div key={item.id} className="p-10 bg-zinc-950 rounded-[3rem] border border-zinc-800 space-y-8 relative">
                   <button onClick={() => removeItem('cinemaPage.items', i)} className="absolute top-10 left-10 p-3 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={24}/></button>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <AdminInput label="العنوان" value={item.title} onChange={(v: any) => {
                        const items = [...getFieldValue('cinemaPage.items')];
                        items[i] = { ...items[i], title: v };
                        updateField('cinemaPage.items', items);
                      }} />
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-zinc-500 uppercase">النوع</label>
                        <select className="w-full px-5 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-white" value={item.type} onChange={(e) => {
                          const items = [...getFieldValue('cinemaPage.items')];
                          items[i] = { ...items[i], type: e.target.value };
                          updateField('cinemaPage.items', items);
                        }}>
                          <option value="movie">فيلم</option>
                          <option value="series">مسلسل</option>
                        </select>
                      </div>
                      <AdminInput label="التقييم" value={item.rating} onChange={(v: any) => {
                        const items = [...getFieldValue('cinemaPage.items')];
                        items[i] = { ...items[i], rating: v };
                        updateField('cinemaPage.items', items);
                      }} />
                   </div>
                   <AdminInput label="الوصف الدرامي" value={item.desc} type="textarea" onChange={(v: any) => {
                        const items = [...getFieldValue('cinemaPage.items')];
                        items[i] = { ...items[i], desc: v };
                        updateField('cinemaPage.items', items);
                      }} />
                 </div>
               ))}
            </div>
          </div>
        )}

        {activeTab === 'polls_admin' && (
          <div className="bg-zinc-900 p-12 rounded-[4rem] border border-zinc-800 space-y-12 shadow-2xl">
            <h2 className="text-4xl font-black text-white">إدارة الاستفتاءات النشطة</h2>
            <div className="grid grid-cols-1 gap-8">
              {(getFieldValue('polls.items') || []).map((poll: any, i: number) => (
                <div key={poll.id} className="p-10 bg-zinc-950 rounded-[3rem] border border-zinc-800 space-y-8">
                  <AdminInput label="السؤال المطروح" value={poll.question} type="textarea" onChange={(v: any) => {
                    const items = [...getFieldValue('polls.items')];
                    items[i] = { ...items[i], question: v };
                    updateField('polls.items', items);
                  }} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AdminInput label="نسبة نعم الافتراضية" type="number" value={poll.yes} onChange={(v: any) => {
                      const items = [...getFieldValue('polls.items')];
                      items[i] = { ...items[i], yes: v };
                      updateField('polls.items', items);
                    }} />
                    <AdminInput label="إجمالي الأصوات الافتراضي" type="number" value={poll.total} onChange={(v: any) => {
                      const items = [...getFieldValue('polls.items')];
                      items[i] = { ...items[i], total: v };
                      updateField('polls.items', items);
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'docs_admin' && (
          <div className="bg-zinc-900 p-12 rounded-[4rem] border border-zinc-800 space-y-12 shadow-2xl">
            <div className="flex justify-between items-center">
              <h2 className="text-4xl font-black text-white">إدارة إعلانات المستندات</h2>
              <button onClick={() => addItem('documentAds', { id: Math.random().toString(), title: 'مستند جديد', desc: '', image: '', label: 'وثيقة' })} className="p-4 bg-red-600 text-white rounded-3xl"><Plus size={24}/></button>
            </div>
            <div className="grid grid-cols-1 gap-8">
               {(getFieldValue('documentAds') || []).map((ad: any, i: number) => (
                 <div key={ad.id} className="p-8 bg-zinc-950 rounded-[2.5rem] border border-zinc-800 flex gap-8 items-center relative">
                    <button onClick={() => removeItem('documentAds', i)} className="absolute top-6 left-6 text-red-600"><Trash2 size={20}/></button>
                    <div className="w-24 h-32 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shrink-0">
                      <img src={ad.image} className="w-full h-full object-cover" alt="Doc" />
                    </div>
                    <div className="flex-1 space-y-4">
                       <div className="grid grid-cols-2 gap-4">
                          <AdminInput label="العنوان" value={ad.title} onChange={(v: any) => {
                            const ads = [...getFieldValue('documentAds')];
                            ads[i] = { ...ads[i], title: v };
                            updateField('documentAds', ads);
                          }} />
                          <AdminInput label="نوع المستند" value={ad.label} onChange={(v: any) => {
                            const ads = [...getFieldValue('documentAds')];
                            ads[i] = { ...ads[i], label: v };
                            updateField('documentAds', ads);
                          }} />
                       </div>
                       <AdminInput label="وصف موجز" value={ad.desc} onChange={(v: any) => {
                            const ads = [...getFieldValue('documentAds')];
                            ads[i] = { ...ads[i], desc: v };
                            updateField('documentAds', ads);
                          }} />
                       <AdminInput label="رابط صورة المستند" value={ad.image} onChange={(v: any) => {
                            const ads = [...getFieldValue('documentAds')];
                            ads[i] = { ...ads[i], image: v };
                            updateField('documentAds', ads);
                          }} />
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminPage;
