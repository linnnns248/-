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
  { text: "烟火气最浓的抚琴夜市", hot: true },
  { text: "土生土长本地人吃法", hot: false },
  { text: "只在成都吃三顿饭", hot: true },
  { text: "苍蝇馆子集合区", hot: false }
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

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollY(e.currentTarget.scrollTop);
  };

  const handleAISearch = (keyword: string) => {
    alert(`正在为您通过全网AI搜索: ${keyword}\n探索地道成都风味中...`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F0F2F5] p-4 lg:p-10 gap-6">
      {/* --- Mobile Platform (Simulated 16:9) --- */}
      <div className="relative w-full max-w-[375px] h-[812px] bg-white rounded-[48px] shadow-[0_40px_100_rgba(0,0,0,0.2)] overflow-hidden border-[10px] border-gray-900 ring-4 ring-white/20">
        {/* Mobile-Integrated Toggle for Day/Night Mode (Semi-transparent & Pinned) */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full shadow-sm border border-white/30 z-[210] transition-all duration-500">
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

                {/* 1) Descriptive AI Trends (Hot search style) */}
                <div className="px-4 mb-2">
                   <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                      {TRENDING_KEYWORDS.map((word, i) => (
                        <motion.button
                          key={i} 
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAISearch(word.text)}
                          className="whitespace-nowrap px-2.5 py-1 bg-gray-50 text-[9px] font-black text-gray-600 rounded-lg border border-gray-100 flex items-center gap-1 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          <span className="text-orange-500">#</span>{word.text}
                          {word.hot && <Flame className="w-2.5 h-2.5 text-red-500 fill-current" />}
                        </motion.button>
                      ))}
                   </div>
                </div>

                {/* 2) Primary Card: Featured Merchant */}
                <div className="px-3 mb-2">
                  <motion.div 
                    whileTap={{ scale: 0.98 }}
                    className="relative rounded-xl overflow-hidden shadow-sm border border-gray-50 aspect-[2.4/1] group cursor-pointer"
                  >
                    <img 
                      src={FEATURED_MERCHANT.image} 
                      alt={FEATURED_MERCHANT.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-2.5 flex flex-col justify-end">
                       <div className="flex items-center gap-1.5 mb-1">
                          <h3 className="text-white font-bold text-[14px] leading-tight">{FEATURED_MERCHANT.name}</h3>
                          <div className="bg-brand-primary text-black text-[7px] font-black px-1.5 py-0.2 rounded shadow-sm">
                             {FEATURED_MERCHANT.tag}
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-2 text-[7px] font-bold text-white/90 mb-1">
                          <span className="text-orange-400">⭐ {FEATURED_MERCHANT.rating}</span>
                          <span className="opacity-60">|</span>
                          <span>起送 {FEATURED_MERCHANT.minOrder}</span>
                          <span className="opacity-60">|</span>
                          <span>配送 {FEATURED_MERCHANT.deliveryFee}</span>
                          <span className="opacity-60">|</span>
                          <span className="bg-red-500 text-white px-1 rounded-sm ring-1 ring-red-400/50">{FEATURED_MERCHANT.coupon}</span>
                       </div>
                       
                       <p className="text-[8px] text-white/70 italic line-clamp-1 border-t border-white/10 pt-1">
                         {FEATURED_MERCHANT.recommendation}
                       </p>
                    </div>
                  </motion.div>
                </div>

                {/* 3) Specialty Carousel with Scores - Local Specialty */}
                <div className="px-3 pb-3">
                   <div className="flex items-center justify-between mb-1.5 px-0.5">
                      <span className="text-[11px] font-extrabold text-gray-900 border-l-2 border-brand-primary pl-1.5 uppercase tracking-tighter">当地特色</span>
                      <span className="text-[8px] text-gray-300 font-bold flex items-center gap-0.5 tracking-tighter">更多 <ChevronRight className="w-2.5 h-2.5" /></span>
                   </div>
                   <div className="flex gap-2.5 overflow-x-auto no-scrollbar snap-x px-0.5">
                      {LOCAL_SPECIALTIES.map((spec, i) => (
                        <div key={i} className="flex flex-col gap-1 min-w-[122px] snap-center">
                           <div className="h-11 rounded-xl overflow-hidden relative border border-gray-100 bg-gray-50 flex-shrink-0">
                              <img 
                                src={spec.image} 
                                alt={spec.name} 
                                className="w-full h-full object-cover opacity-80"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-2">
                                 <h4 className="text-[11px] font-black text-white text-center leading-none mb-1 shadow-sm">{spec.name}</h4>
                                 <span className="text-[8px] font-bold text-brand-primary uppercase tracking-tight px-1.5 py-0.5 rounded bg-black/30 border border-white/5">
                                   {spec.level}
                                 </span>
                              </div>
                           </div>
                        </div>
                      ))}
                      <div className="flex items-center justify-center min-w-[40px] h-11 rounded-xl bg-gray-50 border border-dashed border-gray-200 flex-shrink-0">
                         <ArrowRight className="w-4 h-4 text-gray-300" />
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

        {/* --- Tab Bar (Frame Pinned) --- */}
        <div className="absolute bottom-0 left-0 right-0 z-50">
          <nav className="bg-white/95 backdrop-blur-xl border-t border-gray-100 pt-2.5 pb-7 px-10 flex justify-between items-center shadow-[0_-15px_40px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
             <div className="flex flex-col items-center gap-1 text-orange-500">
                <div className="p-1 rounded-xl bg-orange-50 ring-1 ring-orange-100 shadow-sm">
                  <UtensilsCrossed className="w-4.5 h-4.5 fill-current" />
                </div>
                <span className="text-[9px] font-black">外卖</span>
             </div>
             <div className="flex flex-col items-center gap-1 text-gray-400 group cursor-pointer">
                <Compass className="w-4.5 h-4.5 group-hover:text-gray-900 transition-colors" />
                <span className="text-[9px] font-bold group-hover:text-gray-900 transition-colors">寻味</span>
             </div>
             <div className="flex flex-col items-center gap-1 text-gray-400 group cursor-pointer">
                <Clock className="w-4.5 h-4.5 group-hover:text-gray-900 transition-colors" />
                <span className="text-[9px] font-bold group-hover:text-gray-900 transition-colors">订单</span>
             </div>
             <div className="flex flex-col items-center gap-1 text-gray-400 group cursor-pointer">
                <div className="w-4.5 h-4.5 rounded-full bg-gray-100 border border-gray-300 ring-1 ring-white overflow-hidden shadow-sm">
                   <img src="https://i.pravatar.cc/100?u=me" alt="user" referrerPolicy="no-referrer" />
                </div>
                <span className="text-[9px] font-bold group-hover:text-gray-900 transition-colors">我的</span>
             </div>
          </nav>
        </div>

        {/* --- Dynamic Island Mock --- */}
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-[100] shadow-sm" />
      </div>
    </div>
  );
}
