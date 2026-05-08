import React, { useState, useRef } from 'react';
import { 
  Search, 
  MapPin, 
  ChevronDown, 
  Bell, 
  Compass, 
  Clock, 
  Map, 
  ArrowRight, 
  Star, 
  UtensilsCrossed,
  Coffee,
  Store,
  ChevronRight,
  TrendingUp,
  CloudSun,
  MapIcon,
  Ticket,
  HelpCircle,
  Sun,
  Moon,
  Flame
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from './lib/utils';

// --- Types ---
interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  tags: string[];
  promo?: string;
  sales: string;
  avgPrice: string;
  deliveryFee: string;
}

// --- Mock Data ---
const CATEGORIES = [
  { name: '顺风外卖', icon: <UtensilsCrossed className="w-8 h-8 text-orange-500" /> },
  { name: '甜点饮品', icon: <Coffee className="w-8 h-8 text-brown-500" /> },
  { name: '超市便利', icon: <Store className="w-8 h-8 text-green-500" /> },
  { name: '新鲜水果', icon: <TrendingUp className="w-8 h-8 text-green-400" /> },
  { name: '全部分类', icon: <ChevronRight className="w-8 h-8 text-gray-400" /> },
];

const TRENDING_KEYWORDS = [
  { text: "烟火气最浓的抚琴夜市", desc: "本地人私藏，人均30吃到撑", image: "https://images.unsplash.com/photo-1546702482-1dd38f6d8995?auto=format&fit=crop&q=80&w=200", hot: true },
  { text: "土生土长本地人吃法", desc: "藏在居民楼，不排队吃不到", image: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=200", hot: false },
  { text: "只在成都吃三顿饭", desc: "蹄花-串串-火锅必走路线", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=200", hot: true },
  { text: "苍蝇馆子集合区", desc: "环境虽一般，味道一绝", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5fb6b?auto=format&fit=crop&q=80&w=200", hot: false }
];

const LOCAL_SPECIALTIES = [
  { name: '老妈蹄花', image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=200', score: '9.8', level: '耙到夹不起来' },
  { name: '冷锅串串', image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&q=80&w=200', score: '9.6', level: '串串居然不烫嘴' },
  { name: '蛋烘糕', image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=200', score: '9.9', level: '不是鸡蛋糕的糕' },
  { name: '跷脚牛肉', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=200', score: '9.4', level: '为啥翘着脚吃' },
  { name: '甜水面', image: 'https://images.unsplash.com/photo-1599321955726-e0484294ca2e?auto=format&fit=crop&q=80&w=200', score: '9.5', level: '成都独有甜口面' },
];

const FEATURED_MERCHANT = {
  name: '老成都·盘飧市',
  image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=600',
  rating: 4.9,
  distance: '1.2km',
  sales: '月售1w+',
  minOrder: '¥20',
  deliveryFee: '免配送费',
  coupon: '满100减25',
  tag: '必点榜',
  recommendation: '“百年老字号，成都人的味道记忆，卤味一绝”'
};

const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: '陈记老牌牛肉粉 (总店)',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5fb6b?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    deliveryTime: '25',
    distance: '800m',
    tags: ['地标店', '老字号'],
    sales: '月售2000+',
    avgPrice: '¥25',
    deliveryFee: '¥2'
  },
  {
    id: '2',
    name: '锦里味道 (传统小吃)',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    deliveryTime: '20',
    distance: '500m',
    tags: ['景点周边', '必点'],
    sales: '月售3000+',
    avgPrice: '¥35',
    deliveryFee: '¥1'
  }
];

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [isNight, setIsNight] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<'merchant' | 'specialty' | 'trending'>('merchant');

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollY(e.currentTarget.scrollTop);
  };

  return (
    <div className={cn("min-h-screen flex flex-col transition-colors duration-700", isNight ? "bg-[#0A0B14]" : "bg-white")}>
      {/* --- Global Content Area (Self-Adaptive Size) --- */}
      <div className="relative flex-1 flex flex-col w-full max-w-lg mx-auto overflow-hidden">
        
        {/* State Toggle - Floating & Semi-transparent */}
        <div className="fixed top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full shadow-lg border border-white/30 z-[210] transition-all duration-500">
          <span className={cn("text-[9px] font-black transition-colors tracking-tight", !isNight ? "text-orange-600" : "text-white/40")}>锦绣白昼</span>
          <button 
            onClick={() => setIsNight(!isNight)}
            className={cn(
              "w-10 h-5 rounded-full relative transition-colors duration-300",
              isNight ? "bg-indigo-600/60" : "bg-orange-400/60"
            )}
          >
            <motion.div 
              animate={{ x: isNight ? 22 : 2 }}
              className="absolute top-0.5 left-0 w-4 h-4 bg-white rounded-full shadow-sm flex items-center justify-center"
            >
              {isNight ? <Moon className="w-2 h-2 text-indigo-600" /> : <Sun className="w-2 h-2 text-orange-400" />}
            </motion.div>
          </button>
          <span className={cn("text-[9px] font-black transition-colors tracking-tight", isNight ? "text-indigo-400" : "text-gray-900/30")}>华灯初上</span>
        </div>
        {/* Tooltip Overlay */}
        {showTooltip && (
          <div 
            className="fixed inset-0 z-[200]" 
            onClick={() => setShowTooltip(false)}
          />
        )}

        {/* --- Scrollable Content Window --- */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="h-full overflow-y-auto no-scrollbar pb-28 relative scroll-smooth"
        >
          {/* --- Atmospheric Top Header (Integrated Scene with Landmark Animation) --- */}
          <div className="absolute top-0 left-0 right-0 h-[280px] pointer-events-none isolate overflow-hidden">
            <div className={cn(
              "absolute inset-0 transition-all duration-1000",
              isNight 
                ? "bg-gradient-to-b from-indigo-950 via-purple-900/40 to-white" 
                : "bg-gradient-to-b from-orange-100/60 via-white/40 to-white"
            )} />
            
            {/* Landmark Imagery (Right Side - With Fade In Appearance Effect) */}
            <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none overflow-hidden translate-x-12 -translate-y-8">
               <motion.div
                 key={isNight ? 'market' : 'panda'}
                 initial={{ opacity: 0, scale: 1.1, filter: 'blur(4px)' }}
                 animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                 transition={{ duration: 1.8, ease: "easeOut" }}
                 className="w-full h-full"
               >
                  {isNight ? (
                    <img 
                      src="https://images.unsplash.com/photo-1546702482-1dd38f6d8995?auto=format&fit=crop&q=80&w=400" 
                      className="w-full h-full object-cover opacity-40 mix-blend-screen"
                      style={{ maskImage: 'radial-gradient(circle at 50% 50%, black 10%, transparent 80%)', WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 10%, transparent 80%)' }}
                      alt="Night Market"
                    />
                  ) : (
                    <img 
                      src="https://images.unsplash.com/photo-1564349683136-77e08bef1ed1?auto=format&fit=crop&q=80&w=400" 
                      className="w-full h-full object-cover opacity-35 mix-blend-multiply"
                      style={{ maskImage: 'radial-gradient(circle at 50% 50%, black 10%, transparent 80%)', WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 10%, transparent 80%)' }}
                      alt="Panda"
                    />
                  )}
               </motion.div>
            </div>
            
            {/* Subtle Texture for Chengdu Vibe */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)', backgroundSize: '24px 24px'}} />
          </div>

          {/* --- Sticky Identity Header --- */}
          <header 
            className={cn(
              "sticky top-0 z-50 transition-all duration-300 px-5 pt-2 pb-1",
              scrollY > 20 ? (isNight ? "bg-gray-900/95" : "bg-white/95") + " backdrop-blur-md shadow-sm" : "bg-transparent"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 group cursor-pointer">
                <MapPin className={cn("w-3.5 h-3.5", isNight ? "text-purple-400" : "text-brand-secondary")} />
                <span className={cn("font-bold text-[11px] truncate max-w-[140px]", isNight ? "text-white" : "text-gray-900")}>成都市·春熙路</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </div>
              <div className="flex items-center gap-2.5">
                 <div className="flex flex-col items-center leading-none">
                    <CloudSun className="w-3.5 h-3.5 text-orange-400 mb-0.5" />
                    <span className={cn("text-[7px] font-black", isNight ? "text-gray-400" : "text-gray-500")}>22°C</span>
                 </div>
                 <div className="relative">
                    <Bell className={cn("w-4 h-4", isNight ? "text-white" : "text-gray-900")} />
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
                 </div>
              </div>
            </div>
          </header>

          <main className="relative z-10">
            {/* --- Hero Welcome --- */}
            <div className="px-5 mt-1 mb-2">
              <h1 className={cn("text-lg font-black tracking-tighter leading-tight transition-colors", isNight ? "text-white" : "text-gray-900")}>开启成都味觉之旅</h1>
              <p className={cn("text-[8px] font-bold tracking-tight opacity-70", isNight ? "text-gray-400" : "text-gray-500")}>
                结合你的偏好，为你选出最值得尝试的本地美味
              </p>
            </div>

            {/* --- Search Bar Section --- */}
            <div className="px-4 mb-2.5">
              <div className="bg-white rounded-full p-0.5 shadow-sm ring-1 ring-black/5 flex items-center px-3 py-1.5 gap-2">
                <Search className="w-3.5 h-3.5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="寻找巷子里的地道蹄花..." 
                  className="flex-1 bg-transparent text-[12px] font-medium focus:outline-none placeholder:text-gray-300"
                />
                <button className="bg-brand-primary text-[11px] font-black px-3 py-1 rounded-full shadow-sm">
                  搜索
                </button>
              </div>
            </div>

            {/* --- Category Grid --- */}
            <section className="px-4 mb-3">
              <div className="grid grid-cols-5 gap-y-3 text-center">
                {CATEGORIES.map((cat, i) => (
                  <motion.div 
                    key={i}
                    whileTap={{ scale: 0.9 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-50 relative group">
                      {React.cloneElement(cat.icon as React.ReactElement, { className: 'w-6 h-6 text-orange-500' })}
                    </div>
                    <span className="text-[9px] font-bold text-gray-600 tracking-tight">{cat.name}</span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* --- THE DISCOVERY HOLE: Traveler Exclusive --- */}
            <section className="px-4 mb-3">
              <div className="bg-white rounded-[24px] shadow-md border border-gray-50 overflow-hidden relative isolate">
                {/* Header Area */}
                <div className="bg-gradient-to-br from-orange-50 to-white/0 px-4 pt-3 pb-1">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 relative">
                        <div className="bg-orange-500 p-0.5 rounded-md">
                          <Compass className="w-3 h-3 text-white" />
                        </div>
                        <h2 className="font-extrabold text-[13px] text-gray-900 tracking-tight">成都寻味定制指南</h2>
                        <div className="relative group/help">
                          <HelpCircle 
                            className="w-3 h-3 text-gray-300 cursor-pointer hover:text-gray-500 transition-colors" 
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowTooltip(!showTooltip);
                            }}
                          />
                          {showTooltip && (
                            <div className="absolute top-5 left-[-20px] w-48 bg-gray-900/90 text-white text-[8px] p-2 rounded-lg backdrop-blur-sm z-50 shadow-xl ring-1 ring-white/10 animate-in fade-in zoom-in duration-200">
                              结合你的口味偏好与当地优质商家定制推荐
                              <div className="absolute -top-1 left-6 w-2 h-2 bg-gray-900/90 rotate-45" />
                            </div>
                          )}
                        </div>
                      </div>
                      <motion.button 
                        whileTap={{ scale: 0.9 }}
                        className="bg-brand-primary text-[8px] font-black px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 transition-transform"
                      >
                         <Ticket className="w-2.5 h-2.5" />
                         <span>领¥50券</span>
                      </motion.button>
                   </div>
                </div>

                {/* 1) Content Tabs Section (Replaces redundant horizontal bar for efficiency) */}
                <div className="mt-1">
                  {/* Tab Switcher */}
                  <div className="flex items-center justify-center gap-6 px-4 mb-3">
                    <button 
                      onClick={() => setActiveTab('merchant')}
                      className={cn(
                        "pb-1.5 text-[12px] font-black transition-all relative",
                        activeTab === 'merchant' ? "text-gray-900" : "text-gray-400"
                      )}
                    >
                      主推商家
                      {activeTab === 'merchant' && (
                        <motion.div 
                          layoutId="tab-underline"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-full" 
                        />
                      )}
                    </button>
                    <button 
                      onClick={() => setActiveTab('specialty')}
                      className={cn(
                        "pb-1.5 text-[12px] font-black transition-all relative",
                        activeTab === 'specialty' ? "text-gray-900" : "text-gray-400"
                      )}
                    >
                      特色菜
                      {activeTab === 'specialty' && (
                        <motion.div 
                          layoutId="tab-underline"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-full" 
                        />
                      )}
                    </button>
                    <button 
                      onClick={() => setActiveTab('trending')}
                      className={cn(
                        "pb-1.5 text-[12px] font-black transition-all relative",
                        activeTab === 'trending' ? "text-gray-900" : "text-gray-400"
                      )}
                    >
                      当地热点
                      {activeTab === 'trending' && (
                        <motion.div 
                          layoutId="tab-underline"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-full" 
                        />
                      )}
                    </button>
                  </div>
                
                  {/* List Content Container with Fixed Height for Stability */}
                  <div className="px-3 pb-3 flex flex-col">
                    <div className="h-[200px] overflow-hidden">
                      {activeTab === 'merchant' ? (
                        <div className="h-full flex flex-col">
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => window.location.href = 'https://landingpage-v1-7b3.pages.dev/'}
                            className="relative rounded-[24px] overflow-hidden shadow-md border border-gray-100 flex-1 group cursor-pointer"
                          >
                            <img 
                              src={FEATURED_MERCHANT.image} 
                              alt={FEATURED_MERCHANT.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-5 flex flex-col justify-end">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="text-white font-black text-[18px] leading-tight group-hover:text-brand-primary transition-colors">{FEATURED_MERCHANT.name}</h4>
                                <div className="bg-brand-primary text-black text-[8px] font-black px-2 py-0.5 rounded-full shadow-sm">
                                  {FEATURED_MERCHANT.tag}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3 text-[10px] font-bold text-white/90 mb-3">
                                <span className="text-orange-400 font-black">⭐ {FEATURED_MERCHANT.rating}</span>
                                <span className="opacity-40 text-[6px]">/</span>
                                <span>{FEATURED_MERCHANT.sales}</span>
                                <span className="opacity-40 text-[6px]">/</span>
                                <span>{FEATURED_MERCHANT.distance}</span>
                                <span className="ml-1 bg-red-500 text-white px-2 rounded-[4px] ring-1 ring-red-400/50 shadow-sm">{FEATURED_MERCHANT.coupon}</span>
                              </div>
                              
                              <p className="text-[11px] text-white/80 italic line-clamp-1 border-t border-white/10 pt-3 font-medium leading-relaxed">
                                {FEATURED_MERCHANT.recommendation}
                              </p>
                            </div>
                          </motion.div>
                        </div>
                      ) : activeTab === 'specialty' ? (
                        <div className="space-y-2.5 h-full">
                          {LOCAL_SPECIALTIES.slice(0, 2).map((spec, i) => (
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.1 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => window.location.href = 'https://landingpage-v1-7b3.pages.dev/'}
                              className="flex gap-3 bg-gray-50/40 p-3 rounded-2xl border border-gray-100 group cursor-pointer hover:bg-orange-50/50 transition-all h-[94px]"
                            >
                              <div className="w-20 h-full rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                                <img 
                                  src={spec.image} 
                                  alt={spec.name} 
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div className="flex-1 flex flex-col justify-center min-w-0">
                                <div className="flex items-center justify-between mb-1.5">
                                  <h4 className="font-black text-[15px] text-gray-900 truncate">{spec.name}</h4>
                                  <span className="text-[11px] font-black text-orange-500 shrink-0">评分 {spec.score}</span>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-[8px] font-black text-brand-secondary bg-orange-100/50 px-2 py-0.5 rounded-full border border-orange-200 uppercase tracking-tight">
                                    {spec.level}
                                  </span>
                                  <span className="text-[8px] font-bold text-gray-400"># 成都限定</span>
                                </div>
                                <p className="text-[10px] text-gray-400 font-bold truncate opacity-80 italic">“这个口感简直绝了，每次来必点”</p>
                              </div>
                              <div className="flex items-center text-gray-200">
                                 <ChevronRight className="w-4 h-4" />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-1.5 h-full">
                          {TRENDING_KEYWORDS.slice(0, 3).map((trend, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => window.location.href = 'https://landingpage-v1-7b3.pages.dev/'}
                              className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-100 cursor-pointer hover:shadow-sm transition-all group h-[62px]"
                            >
                              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-sm">
                                <img 
                                  src={trend.image} 
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                  alt={trend.text}
                                  referrerPolicy="no-referrer"
                                />
                                <div className={cn(
                                  "absolute top-0 left-0 w-5 h-5 flex items-center justify-center rounded-br-xl text-[10px] font-black shadow-sm",
                                  i === 0 ? "bg-red-500 text-white" : i === 1 ? "bg-orange-500 text-white" : "bg-gray-400 text-white"
                                )}>
                                  {i + 1}
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 mb-1">
                                  <span className="text-[13px] font-black text-gray-900 truncate group-hover:text-orange-600 transition-colors tracking-tight">{trend.text}</span>
                                  {trend.hot && (
                                    <div className="bg-red-50 px-1 py-0.2 rounded border border-red-100">
                                      <Flame className="w-2.5 h-2.5 text-red-500 fill-current animate-pulse" />
                                    </div>
                                  )}
                                </div>
                                <p className="text-[10px] text-gray-400 font-bold truncate leading-none mb-1 opacity-70">{trend.desc}</p>
                                <div className="flex items-center gap-3">
                                   <span className="text-[8px] font-black text-orange-500 tracking-tighter">热搜指数 {(3.5 - i * 0.5).toFixed(1)}W+</span>
                                </div>
                              </div>
                              <div className="shrink-0 p-1">
                                 <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight className="w-3 h-3 text-brand-secondary" />
                                 </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                
                    <div className="flex items-center justify-center mt-2.5">
                      <button 
                        onClick={() => window.location.href = 'https://landingpage-v1-7b3.pages.dev/'}
                        className="bg-white/80 backdrop-blur-sm px-10 py-1.5 rounded-full border border-gray-100 shadow-sm text-[11px] font-black text-gray-600 flex items-center gap-2 hover:bg-brand-primary hover:text-black hover:border-brand-primary hover:shadow-lg transition-all active:scale-95 duration-300"
                      >
                        {activeTab === 'merchant' ? '探索更多主推商家' : activeTab === 'specialty' ? '查看全部特色美味' : '掌握成都实时热点'}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* --- Standard Feed Section --- */}
            <section className="px-4 pb-8">
               <div className="flex items-center justify-between mb-2 px-0.5">
                  <h3 className="font-black text-base tracking-tighter">附近商家</h3>
                  <div className="flex gap-3 text-[9px] font-bold text-gray-400">
                     <span className="text-orange-600">综合</span>
                     <span>评分</span>
                  </div>
               </div>

               <div className="space-y-2">
                 {RESTAURANTS.map((res) => (
                   <div key={res.id} className="flex gap-2.5 bg-white p-2 rounded-xl border border-gray-50 group cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-50">
                        <img src={res.image} alt={res.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-0.2">
                        <div>
                          <h4 className="font-bold text-[13px] text-gray-900 leading-tight mb-0.5">{res.name}</h4>
                          <div className="flex items-center gap-1.5 text-[8px] font-bold text-gray-400 mb-1">
                            <span className="text-orange-500 font-black">⭐ {res.rating}</span>
                            <span>{res.sales}</span>
                            <span>{res.distance}</span>
                          </div>
                          <div className="flex gap-1">
                            {res.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="text-[7px] px-1 py-0.2 bg-gray-50 text-gray-500 font-bold rounded border border-gray-100">{tag}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-1 text-[8px] font-bold text-gray-400 opacity-70">
                              <span>人均{res.avgPrice}</span>
                              <span className="w-0.5 h-0.5 bg-gray-300 rounded-full" />
                              <span>配送{res.deliveryFee}</span>
                           </div>
                        </div>
                      </div>
                   </div>
                 ))}
               </div>
            </section>
          </main>
        </div>

        {/* --- Tab Bar (Bottom Pinned) --- */}
        <div className={cn(
          "fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg z-50 transition-all duration-500",
          isNight ? "bg-indigo-950/80 backdrop-blur-xl border-t border-white/5" : "bg-white/80 backdrop-blur-xl border-t border-gray-100"
        )}>
          <nav className="pt-2.5 pb-8 px-10 flex justify-between items-center">
             <div className="flex flex-col items-center gap-1 text-orange-500">
                <div className="p-1 rounded-xl bg-orange-50 ring-1 ring-orange-100 shadow-sm">
                  <UtensilsCrossed className="w-4.5 h-4.5 fill-current" />
                </div>
                <span className="text-[9px] font-black">外卖</span>
             </div>
             <div className={cn("flex flex-col items-center gap-1 group cursor-pointer transition-colors", isNight ? "text-white/40 hover:text-white" : "text-gray-400 hover:text-gray-900")}>
                <Compass className="w-4.5 h-4.5" />
                <span className="text-[9px] font-bold">寻味</span>
             </div>
             <div className={cn("flex flex-col items-center gap-1 group cursor-pointer transition-colors", isNight ? "text-white/40 hover:text-white" : "text-gray-400 hover:text-gray-900")}>
                <Clock className="w-4.5 h-4.5" />
                <span className="text-[9px] font-bold">订单</span>
             </div>
             <div className={cn("flex flex-col items-center gap-1 group cursor-pointer transition-colors", isNight ? "text-white/40 hover:text-white" : "text-gray-400 hover:text-gray-900")}>
                <div className="w-4.5 h-4.5 rounded-full bg-gray-100 border border-gray-300 ring-1 ring-white overflow-hidden shadow-sm">
                   <img src="https://i.pravatar.cc/100?u=me" alt="user" referrerPolicy="no-referrer" />
                </div>
                <span className="text-[9px] font-bold">我的</span>
             </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
