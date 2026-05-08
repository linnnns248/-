/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Search, 
  Star, 
  Share2, 
  ChevronRight,
  TrendingUp,
  Clock,
  Ticket,
  Info,
  Utensils,
  ThumbsUp,
  MapPin,
  Heart
} from 'lucide-react';

// --- Types ---
interface Merchant {
  id: string;
  name: string;
  rating: number;
  sales: string;
  deliveryTime: number;
  deliveryFee: string;
  minOrder: string;
  tags: string[];
  promo: string;
  image: string;
  description: string;
}

interface SpecialtyCategory {
  id: string;
  name: string;
  merchants: Merchant[];
}

// --- Mock Data ---
const QUALITY_MERCHANTS: Merchant[] = [
  {
    id: 'q1',
    name: '老成都·盘飧市',
    rating: 4.9,
    sales: '3000+',
    deliveryTime: 35,
    deliveryFee: '免配送费',
    minOrder: '¥20起送',
    tags: ['必点榜', '百年老店'],
    promo: '满100减25',
    image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800',
    description: '百年老字号，成都人的味道记忆，卤味一绝。'
  },
  {
    id: 'q2',
    name: '蜀大侠火锅 (春熙总店)',
    rating: 4.8,
    sales: '5000+',
    deliveryTime: 40,
    deliveryFee: '¥5配送费',
    minOrder: '¥50起送',
    tags: ['地道火锅', '高人气'],
    promo: '首单减15',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&q=80&w=800',
    description: '武侠风火锅，底料醇厚，菜品精致。'
  },
  {
    id: 'q3',
    name: '陈麻婆豆腐 (旗舰店)',
    rating: 4.7,
    sales: '4200+',
    deliveryTime: 30,
    deliveryFee: '免配送费',
    minOrder: '¥30起送',
    tags: ['川菜鼻祖', '麻辣鲜香'],
    promo: '满60减10',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&q=80&w=800',
    description: '创始于1862年，麻婆豆腐的正宗传人。'
  }
];

const SPECIALTY_CATEGORIES: SpecialtyCategory[] = [
  {
    id: 'c1',
    name: '老妈蹄花榜',
    merchants: [
      {
        id: 't1',
        name: '丁胖子老妈蹄花',
        rating: 4.8,
        sales: '1200+',
        deliveryTime: 25,
        deliveryFee: '免配送费',
        minOrder: '¥20起送',
        tags: ['必点榜', '肉质Q弹'],
        promo: '满30减5',
        image: 'https://images.unsplash.com/photo-1570701123784-2d41521a4d9b?auto=format&fit=crop&q=80&w=600',
        description: '蹄花炖得极烂，入口即化。'
      },
      {
        id: 't2',
        name: '明亮老妈蹄花',
        rating: 4.7,
        sales: '900+',
        deliveryTime: 30,
        deliveryFee: '¥2配送费',
        minOrder: '¥25起送',
        tags: ['深夜食堂'],
        promo: '满40减8',
        image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80&w=600',
        description: '汤头雪白醇厚，成都半夜慰藉。'
      }
    ]
  },
  {
    id: 'c2',
    name: '冷锅串串榜',
    merchants: [
      {
        id: 'cc1',
        name: '冒椒火辣 (魁星楼店)',
        rating: 4.9,
        sales: '6000+',
        deliveryTime: 45,
        deliveryFee: '¥6配送费',
        minOrder: '¥30起送',
        tags: ['排队王', '香辣诱人'],
        promo: '收藏送饮料',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=600',
        description: '每一个串串都浸透了红油的香。'
      }
    ]
  },
  {
    id: 'c3',
    name: '翘脚牛肉榜',
    merchants: [
      {
        id: 'bn1',
        name: '冯四娘翘脚牛肉',
        rating: 4.8,
        sales: '2500+',
        deliveryTime: 30,
        deliveryFee: '免配送费',
        minOrder: '¥25起送',
        tags: ['乐山名吃', '汤鲜肉嫩'],
        promo: '满50减10',
        image: 'https://images.unsplash.com/photo-1547928576-a4a33237ce35?auto=format&fit=crop&q=80&w=600',
        description: '牛肉鲜嫩无比，汤底有淡淡药材香。'
      }
    ]
  }
];

const LOCAL_POPULARITY = [
  { 
    title: '烟火气最浓的抚琴夜市', 
    emoji: '🔥',
    description: '抚琴夜市是成都西门最具市井气息的美食聚集地。不同于商业化景区，这里更多是本地人的深夜食堂，代表了成都最真实、最充满烟火气的深夜慰藉。' 
  },
  { 
    title: '苍蝇馆子集合区', 
    emoji: '🏚️',
    description: '“苍蝇馆子”是成都美食的灵魂。它们通常藏在老旧巷弄，不究装修，唯论味道。敢叫苍蝇馆子的店，都有着让本地食客心甘情愿排队的招牌绝活。' 
  }
];

const ALL_MERCHANTS = [...QUALITY_MERCHANTS, ...SPECIALTY_CATEGORIES.flatMap(c => c.merchants)];

export default function App() {
  const [activeTab, setActiveTab] = useState(2);
  const [activeSearchTerm, setActiveSearchTerm] = useState(LOCAL_POPULARITY[0].title);
  const [isCouponClaimed, setIsCouponClaimed] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleClaimCoupon = () => {
    setIsCouponClaimed(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 140; // Adjust based on sticky headers
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const tabs = ['优质商家', '特色菜', '当地热门'];

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#222] font-sans pb-24">
      {/* Header */}
      <header className="sticky top-0 z-[100] bg-white/95 backdrop-blur-sm border-b border-gray-100 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
          <h1 className="text-lg font-bold tracking-tight">成都寻味定制指南</h1>
          <Info className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex items-center gap-4">
          <Search className="w-5 h-5 text-gray-700" />
          <Share2 className="w-5 h-5 text-gray-700" />
        </div>
      </header>

      {/* 1. Voucher Section (Top) - Extremely Compact Style */}
      <section className="px-4 py-2 bg-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-gradient-to-r from-[#FF7E00] to-[#FF4500] rounded-xl px-4 py-2 shadow-sm overflow-hidden flex justify-between items-center"
        >
          <div className="relative z-10 flex items-center gap-3">
            <h2 className="text-xl font-black text-white italic tracking-tighter">¥50</h2>
            <div className="w-[1px] h-4 bg-white/30"></div>
            <div className="flex flex-col">
              <span className="text-white text-[10px] font-bold leading-tight">成都新客首单专享</span>
              <p className="text-white/70 text-[8px] leading-tight">全城100+家优质好店通用</p>
            </div>
          </div>
          <button 
            onClick={handleClaimCoupon}
            disabled={isCouponClaimed}
            className={`relative z-10 px-4 py-1 rounded-full text-xs font-bold transition-all transform active:scale-95 ${
              isCouponClaimed 
              ? 'bg-white/20 text-white cursor-default' 
              : 'bg-[#FFD700] text-[#804000]'
            }`}
          >
            {isCouponClaimed ? '已领取' : '立即领'}
          </button>
        </motion.div>
      </section>

      {/* 2. Main Tabs Navigation */}
      <div className="sticky top-[52px] z-[90] bg-white border-b border-gray-100">
        <div className="flex items-center px-4 gap-8 h-12">
          {tabs.map((tab, idx) => (
            <button
              key={tab}
              onClick={() => setActiveTab(idx)}
              className={`relative h-full flex items-center text-sm font-bold transition-colors ${
                activeTab === idx ? 'text-[#FF4500]' : 'text-gray-400'
              }`}
            >
              {tab}
              {activeTab === idx && (
                <motion.div 
                  layoutId="activeTab" 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF4500] rounded-full" 
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2.5 Secondary Sticky Nav for Specialty Category */}
      {activeTab === 1 && (
        <div className="sticky top-[100px] z-[85] bg-[#F7F8FA]/95 backdrop-blur-md px-4 py-2 border-b border-gray-100 flex overflow-x-auto no-scrollbar gap-2 shadow-sm">
          {SPECIALTY_CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              onClick={() => scrollToSection(cat.id)}
              className="px-4 py-1 rounded-full text-[11px] font-bold whitespace-nowrap bg-white text-gray-600 border border-gray-100 active:bg-orange-50 active:border-orange-200 transition-colors"
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* 3. Tab Content */}
      <div className="mt-4 px-4 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 0 && (
            <motion.div 
              key="quality"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {QUALITY_MERCHANTS.map((m) => (
                <div key={m.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-50">
                  <div className="relative aspect-[16/9]">
                    <img src={m.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1 font-bold">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" /> {m.rating}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="text-lg font-black">{m.name}</h4>
                       <div className="text-[10px] text-gray-400">已售 {m.sales}</div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {m.tags.map(t => (
                        <span key={t} className="bg-orange-50 text-orange-600 text-[10px] px-2 py-0.5 rounded-full font-bold">#{t}</span>
                      ))}
                      <span className="bg-[#FF4500] text-white text-[10px] px-2 py-0.5 rounded font-bold">{m.promo}</span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1 leading-relaxed mb-3">“ {m.description} ”</p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-50 text-[10px] text-gray-400">
                      <div className="flex items-center gap-3">
                        <span>{m.minOrder}</span>
                        <span>{m.deliveryFee}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 font-bold bg-gray-100 px-2 py-1 rounded-md">
                        <Clock className="w-3 h-3" /> {m.deliveryTime}分钟
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 1 && (
            <motion.div 
              key="specialty"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {/* Specialty Category Sections */}
              {SPECIALTY_CATEGORIES.map((category) => (
                <div key={category.id} id={category.id} className="scroll-mt-32">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-5 bg-orange-500 rounded-full"></div>
                    <h3 className="text-base font-black">{category.name}</h3>
                  </div>
                  <div className="space-y-4">
                    {category.merchants.map((m, idx) => (
                      <div key={m.id} className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-50 relative">
                        <div className="absolute top-0 left-0 bg-[#FFD700] text-[#804000] text-[10px] px-2 py-0.5 rounded-br-xl font-black z-10">TOP {idx + 1}</div>
                        <img src={m.image} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" referrerPolicy="no-referrer" />
                        <div className="flex flex-col justify-between flex-grow">
                          <div>
                            <h5 className="font-bold text-sm mb-1">{m.name}</h5>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="flex items-center gap-0.5 text-[10px] font-bold text-orange-500">
                                 <Star className="w-2.5 h-2.5 fill-current" /> {m.rating}
                              </span>
                              <span className="text-[10px] text-gray-400">月销 {m.sales}</span>
                            </div>
                            <div className="flex gap-2">
                               <span className="text-[#FF4500] text-[9px] font-bold">{m.promo}</span>
                               <span className="text-[9px] text-gray-400">· {m.deliveryTime}分钟 · {m.deliveryFee}</span>
                            </div>
                          </div>
                          <div className="text-[10px] text-gray-400 italic">“{m.description}”</div>
                        </div>
                        <ChevronRight className="w-4 h-4 self-center text-gray-300" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 2 && (
            <motion.div 
              key="localpop"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
                 {LOCAL_POPULARITY.map(item => (
                   <div
                    key={item.title}
                    className={`p-5 rounded-3xl border bg-white transition-all shadow-sm ${
                      activeSearchTerm === item.title 
                      ? 'border-[#FF4500] ring-1 ring-orange-100' 
                      : 'border-transparent'
                    }`}
                    onClick={() => setActiveSearchTerm(item.title)}
                   >
                     <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{item.emoji}</span>
                          <h4 className="text-base font-black">{item.title}</h4>
                        </div>
                        {activeSearchTerm === item.title && (
                          <div className="bg-[#FF4500] text-white text-[9px] px-2 py-0.5 rounded-full font-bold">精选必读</div>
                        )}
                     </div>
                     <p className="text-xs text-gray-500 leading-relaxed">
                        {item.description}
                     </p>
                     
                     {activeSearchTerm === item.title && (
                        <div className="mt-4 pt-4 border-t border-dashed border-gray-100 space-y-3">
                           {(item.title.includes('抚琴') ? ALL_MERCHANTS.slice(0, 2) : ALL_MERCHANTS.slice(2, 4)).map(m => (
                             <div key={m.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-xl transition-colors">
                                <div className="flex items-center gap-3">
                                   <img src={m.image} className="w-12 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                                   <div>
                                      <div className="text-xs font-bold">{m.name}</div>
                                      <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-1">
                                         <span className="text-orange-500 font-bold">{m.rating}分</span>
                                         <span>月销{m.sales}</span>
                                      </div>
                                   </div>
                                </div>
                                <button className="text-[10px] font-bold text-[#FF4500] bg-orange-50 px-3 py-1 rounded-md">进店</button>
                             </div>
                           ))}
                        </div>
                     )}
                   </div>
                 ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-28 left-1/2 -translate-x-1/2 bg-black/80 text-white px-6 py-3 rounded-full text-sm font-medium z-[200] shadow-2xl flex items-center gap-2"
          >
            <ThumbsUp className="w-4 h-4 text-yellow-400" />
            红包已存入【我的权益】
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Tab Bar */}
      <footer className="fixed bottom-0 left-0 right-0 h-18 bg-white/90 backdrop-blur-xl border-t border-gray-100 flex items-center justify-around pb-2 z-[100]">
        <div className="flex flex-col items-center gap-1 text-[#FF4500]">
          <MapPin className="w-6 h-6" />
          <span className="text-[10px] font-bold">寻味指南</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <Ticket className="w-6 h-6" />
          <span className="text-[10px]">领券中心</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <Utensils className="w-6 h-6" />
          <span className="text-[10px]">我的订单</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <Heart className="w-6 h-6" />
          <span className="text-[10px]">收藏</span>
        </div>
      </footer>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
