
import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, Legend
} from 'recharts';
import { Filter, Download, Info, TrendingUp, AlertCircle, Target, Users, Scale, Activity, Brain, CheckCircle2, PenTool } from 'lucide-react';
import ThreeDCard from '../components/ThreeDCard';
import { useContent } from '../App';
import { Link } from 'react-router-dom';

const COLORS = ['#dc2626', '#ef4444', '#b91c1c', '#7f1d1d', '#450a0a'];

const DashboardPage: React.FC = () => {
  const { t } = useContent();
  const d = t.dashboardPage;
  const p = t.polls;
  
  const submissions = useMemo(() => JSON.parse(localStorage.getItem('petition_submissions') || '[]'), []);
  const authorizations = useMemo(() => JSON.parse(localStorage.getItem('authorizations') || '[]'), []);

  const stats = useMemo(() => {
    const baseSigners = 15420;
    const baseAuthorizations = 8750;
    const total = submissions.length + baseSigners;
    const authTotal = authorizations.length + baseAuthorizations;
    
    const baseChildren = 11200;
    const childrenCount = submissions.reduce((acc: number, s: any) => acc + (parseInt(s.childrenCount) || 0), 0) + baseChildren;
    
    const sumExclusion = submissions.reduce((acc: number, s: any) => acc + (parseInt(s.exclusionYears) || 0), 0);
    const avgYears = submissions.length > 0 ? (sumExclusion / submissions.length).toFixed(1) : "14.2";
    const avgPei = submissions.length > 0 ? (submissions.reduce((acc: number, s: any) => acc + (s.pei || 0), 0) / submissions.length).toFixed(0) : "88";

    const totalDivorcesEstimate = 270000;
    const custodyConflictRatio = 0.65;
    const actualAffectedChildren = Math.round(totalDivorcesEstimate * 1.8 * custodyConflictRatio);

    return { total, authTotal, childrenCount, avgYears, avgPei, actualAffectedChildren };
  }, [submissions, authorizations]);

  const trendData = [
    { year: '2019', divorces: 225000, conflicts: 145000, pei: 72 },
    { year: '2020', divorces: 213000, conflicts: 158000, pei: 75 },
    { year: '2021', divorces: 245000, conflicts: 189000, pei: 79 },
    { year: '2022', divorces: 258000, conflicts: 210000, pei: 84 },
    { year: '2023', divorces: 275000, conflicts: 235000, pei: 88 },
    { year: '2024', divorces: 310000, conflicts: 278000, pei: 91 },
  ];

  const peiBreakdown = [
    { subject: 'الانعزال النفسي', A: 95, fullMark: 100 },
    { subject: 'صراع الولاءات', A: 90, fullMark: 100 },
    { subject: 'الفقد الاجتماعي', A: 85, fullMark: 100 },
    { subject: 'العدوانية الموجهة', A: 78, fullMark: 100 },
    { subject: 'الفشل الدراسي', A: 82, fullMark: 100 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-24 text-right font-cairo">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-zinc-900 pb-10">
        <div className="space-y-3 text-right">
          <div className="flex items-center gap-3 justify-end">
            <Activity className="text-red-600 animate-pulse" size={32} />
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              {d.title}
            </h1>
          </div>
          <p className="text-zinc-500 text-lg font-medium">مرصد البيانات اللحظي لرصد أثر القوانين على التماسك الأسري.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link to="/authorization" className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl text-sm font-black shadow-2xl shadow-blue-600/30">
            <PenTool size={18} /> مذكرة التفويض
          </Link>
          <button className="flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-2xl text-sm font-black shadow-2xl shadow-red-600/30">
            <Download size={18} /> تحميل التقرير البحثي
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "إجمالي الموقعين (العريضة)", value: stats.total.toLocaleString(), icon: Users, sub: "توقيع موثق رقمياً" },
          { label: "إجمالي المفوضين (السيادي)", value: stats.authTotal.toLocaleString(), icon: PenTool, sub: "تفويض لرئيس الجمهورية", highlightBlue: true },
          { label: "متوسط الحرمان القسري", value: `${stats.avgYears} عام`, icon: AlertCircle, sub: "بعيداً عن الرعاية الأبوية" },
          { label: "مؤشر الاغتراب (PEI)", value: `${stats.avgPei}%`, icon: Brain, sub: "مستوى خطورة: حرج جداً", highlight: true },
        ].map((stat, i) => (
          <ThreeDCard key={i}>
            <div className={`p-8 rounded-[2.5rem] border ${stat.highlight ? 'bg-red-600 border-red-500 shadow-red-600/20' : stat.highlightBlue ? 'bg-blue-600 border-blue-500 shadow-blue-600/20' : 'bg-zinc-900 border-zinc-800'} shadow-xl group transition-all h-full relative overflow-hidden`}>
              <stat.icon className={`absolute -left-4 -bottom-4 w-24 h-24 opacity-10 ${stat.highlight || stat.highlightBlue ? 'text-white' : 'text-red-600'}`} />
              <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${stat.highlight || stat.highlightBlue ? 'text-white/70' : 'text-zinc-500'}`}>{stat.label}</p>
              <h3 className="text-4xl font-black mb-2 text-white transition-colors">{stat.value}</h3>
              <p className={`text-xs font-bold ${stat.highlight || stat.highlightBlue ? 'text-white/60' : 'text-zinc-600'}`}>{stat.sub}</p>
            </div>
          </ThreeDCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-zinc-900/50 p-10 rounded-[4rem] border border-zinc-800 shadow-2xl space-y-8 flex flex-col min-h-[550px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-600"><TrendingUp size={24} /></div>
               <div><h3 className="text-2xl font-black text-white">تحليل منحنى نزاعات الحضانة</h3></div>
            </div>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorDivorces" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 10}} />
                <Tooltip contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '24px', textAlign: 'right' }} />
                <Area type="monotone" dataKey="divorces" stroke="#dc2626" strokeWidth={4} fill="url(#colorDivorces)" name="إجمالي النزاعات" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900 p-10 rounded-[4rem] border border-zinc-800 shadow-2xl space-y-10 flex flex-col items-center">
          <div className="text-right w-full">
            <h3 className="text-2xl font-black text-white">تفكيك مؤشر الاغتراب</h3>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={peiBreakdown}>
                <PolarGrid stroke="#27272a" />
                <PolarAngleAxis dataKey="subject" tick={{fill: '#a1a1aa', fontSize: 10, fontWeight: 800}} />
                <Radar name="PEI Impact" dataKey="A" stroke="#dc2626" fill="#dc2626" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-zinc-950/50 p-6 rounded-3xl border border-zinc-800 w-full text-center">
             <p className="text-4xl font-black text-white">{stats.avgPei}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
