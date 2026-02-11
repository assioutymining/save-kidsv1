
import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { 
  Home, Info, FileText, BarChart3, Users, MessageCircle, ShieldCheck, Scale, Settings, Menu, X, Video, 
  CheckCircle2, AlertCircle, Vote, PenTool, Rocket, Film
} from 'lucide-react';
import HomePage from './pages/HomePage';
import WhyChangePage from './pages/WhyChangePage';
import PetitionPage from './pages/PetitionPage';
import CampaignsPage from './pages/CampaignsPage';
import CinemaPage from './pages/CinemaPage';
import AuthorizationPage from './pages/AuthorizationPage';
import DashboardPage from './pages/DashboardPage';
import StoriesPage from './pages/StoriesPage';
import StoryDetailPage from './pages/StoryDetailPage';
import SupportPage from './pages/SupportPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import AdminPage from './pages/AdminPage';
import MediaPage from './pages/MediaPage';
import PollsPage from './pages/PollsPage';
import { defaultTranslations } from './translations';

const ContentContext = createContext<any>(undefined);
export const useContent = () => useContext(ContentContext);

const Toast = ({ message, type, isVisible, onClose }: { message: string, type: 'success' | 'error', isVisible: boolean, onClose: () => void }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-10 right-10 z-[200] animate-in slide-in-from-right-10 fade-in duration-500 font-cairo text-right">
      <div className={`glass-effect px-8 py-5 rounded-[2rem] border-2 ${type === 'success' ? 'border-emerald-500/30' : 'border-red-600/30'} shadow-2xl flex items-center gap-4 min-w-[300px]`}>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-600/10 text-red-600'}`}>
          {type === 'success' ? <CheckCircle2 size={28} /> : <AlertCircle size={28} />}
        </div>
        <div className="flex-1">
          <p className="text-white font-black text-lg">{message}</p>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useContent();
  const location = useLocation();
  const LogoIcon = (LucideIcons as any)[t?.global?.logoType || 'Scale'] || Scale;

  const navItems = useMemo(() => [
    { label: t?.nav?.home || 'الرئيسية', path: '/', icon: Home },
    { label: t?.nav?.why || 'لماذا؟', path: '/why', icon: Info },
    { label: t?.nav?.campaigns || 'الحملات', path: '/campaigns', icon: Rocket },
    { label: t?.nav?.cinema || 'السينما', path: '/cinema', icon: Film },
    { label: t?.nav?.petition || 'العريضة', path: '/petition', icon: FileText },
    { label: t?.nav?.authorization || 'التفويض', path: '/authorization', icon: PenTool },
    { label: t?.nav?.polls || 'الاستفتاءات', path: '/polls', icon: Vote },
    { label: t?.nav?.dashboard || 'المؤشرات', path: '/dashboard', icon: BarChart3 },
    { label: t?.nav?.stories || 'القصص', path: '/stories', icon: Users },
    { label: t?.nav?.media || 'الميديا', path: '/media', icon: Video },
    { label: t?.nav?.support || 'الدعم', path: '/support', icon: MessageCircle },
  ], [t]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-effect rounded-2xl px-6 py-3 shadow-2xl pointer-events-auto border border-red-600/10">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
            <LogoIcon className="text-white" size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">{t?.global?.siteName || 'طفل مش قضية'}</span>
        </Link>
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${location.pathname === item.path ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
            <Link to="/admin" className="p-2 text-zinc-500 hover:text-red-500"><Settings size={20} /></Link>
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-white">{isOpen ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden mt-2 glass-effect rounded-2xl p-4 shadow-2xl pointer-events-auto flex flex-col gap-2 overflow-y-auto max-h-[80vh]">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold transition-all ${location.pathname === item.path ? 'bg-red-600 text-white' : 'text-zinc-400 hover:bg-zinc-800'}`}>
              <item.icon size={20} /> {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

const App: React.FC = () => {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem('site_content');
      const parsed = saved ? JSON.parse(saved) : {};
      
      // Deep merge logic: Always start with defaults and override with parsed where available
      const merged = { ...defaultTranslations.ar };
      
      Object.keys(merged).forEach((key: string) => {
        if (parsed[key] !== undefined) {
          if (typeof (merged as any)[key] === 'object' && !Array.isArray((merged as any)[key]) && (merged as any)[key] !== null) {
             (merged as any)[key] = { ...(merged as any)[key], ...parsed[key] };
          } else {
             // For arrays and primitives, only override if parsed is not empty/null
             if (Array.isArray(parsed[key])) {
                if (parsed[key].length > 0) (merged as any)[key] = parsed[key];
             } else {
                (merged as any)[key] = parsed[key];
             }
          }
        }
      });
      
      return merged;
    } catch (e) {
      console.error("Content Load Error:", e);
      return defaultTranslations.ar;
    }
  });
  
  const [toast, setToast] = useState({ message: '', type: 'success' as 'success' | 'error', isVisible: false });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => setToast({ message, type, isVisible: true });
  
  const updateContent = (newContent: any) => {
    setContent(newContent);
    localStorage.setItem('site_content', JSON.stringify(newContent));
  };

  const resetContent = () => {
    setContent(defaultTranslations.ar);
    localStorage.removeItem('site_content');
    showToast('تمت إعادة ضبط المصنع بنجاح واستعادة المحتوى الأصلي');
  };

  return (
    <ContentContext.Provider value={{ t: content, updateContent, resetContent, showToast }}>
      <HashRouter>
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-cairo">
          <Navbar />
          <main className="pt-24 pb-12">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/why" element={<WhyChangePage />} />
              <Route path="/campaigns" element={<CampaignsPage />} />
              <Route path="/cinema" element={<CinemaPage />} />
              <Route path="/petition" element={<PetitionPage />} />
              <Route path="/authorization" element={<AuthorizationPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/polls" element={<PollsPage />} />
              <Route path="/stories" element={<StoriesPage />} />
              <Route path="/stories/:id" element={<StoryDetailPage />} />
              <Route path="/media" element={<MediaPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <Toast message={toast.message} type={toast.type} isVisible={toast.isVisible} onClose={() => setToast({ ...toast, isVisible: false })} />
          <footer className="bg-zinc-900 border-t border-zinc-800 py-24 text-right">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12">
              <div className="max-w-md space-y-4">
                <h4 className="text-3xl font-black text-white">{content?.global?.siteName || 'طفل مش قضية'}</h4>
                <p className="text-zinc-500 font-medium leading-relaxed">{content?.global?.footerDesc || 'منصة الدفاع عن حقوق الطفل والأسرة.'}</p>
              </div>
              <div className="flex gap-12">
                <div className="space-y-4">
                  <h4 className="font-black text-white text-xs uppercase tracking-widest">الموقع</h4>
                  <ul className="space-y-2">
                    {['home', 'why', 'campaigns', 'cinema', 'petition', 'polls', 'authorization'].map(key => (
                      <li key={key}><Link to={key === 'home' ? '/' : `/${key}`} className="text-zinc-500 hover:text-white transition-colors">{content?.nav?.[key] || key}</Link></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-zinc-800 text-center text-xs text-zinc-600 font-bold">
               {content?.global?.copyright || '© 2024 جميع الحقوق محفوظة'}
            </div>
          </footer>
        </div>
      </HashRouter>
    </ContentContext.Provider>
  );
};

export default App;
