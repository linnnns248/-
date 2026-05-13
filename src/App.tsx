import React, { useEffect, useState } from 'react';
import {
  Search,
  MapPin,
  ChevronDown,
  Bell,
  Compass,
  Clock,
  UtensilsCrossed,
  Coffee,
  Store,
  ChevronRight,
  TrendingUp,
  CloudSun,
  Ticket,
  HelpCircle,
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from './lib/utils';

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

const CATEGORIES = [
  { name: '顺风外卖', icon: <UtensilsCrossed className="w-8 h-8 text-orange-500" /> },
  { name: '甜点饮品', icon: <Coffee className="w-8 h-8 text-orange-500" /> },
  { name: '超市便利', icon: <Store className="w-8 h-8 text-orange-500" /> },
  { name: '新鲜水果', icon: <TrendingUp className="w-8 h-8 text-orange-500" /> },
  { name: '全部分类', icon: <ChevronRight className="w-8 h-8 text-orange-500" /> },
];

const FEATURED_MERCHANT = {
  name: '霸道·绝味小龙虾 (春熙路店)',
  logo: 'https://images.unsplash.com/photo-1621510456681-23a016df242c?auto=format&fit=crop&q=80&w=100',
  image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&q=80&w=600',
  rating: 4.9,
  distance: '0.8km',
  sales: '月售5000+',
  minOrder: '¥50',
  deliveryFee: '免配送费',
  coupon: '满100减30',
  tag: '深夜必吃',
  specialty: '主打招牌：麻辣小龙虾、极品蒜泥虾',
  whyFamous: '只选活虾，只用好料，深夜里那一口爽辣的成都记忆',
  specialtyDishes: ['麻辣小龙虾', '蒜泥小龙虾'],
};

const SPECIALTY_DISHES_ITEMS = [
  { name: '老妈蹄花', sub: '耙到夹不起来', image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=300' },
  { name: '冷锅串串', sub: '串串居然不烫嘴', image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&q=80&w=300' },
  { name: '蛋烘糕', sub: '不是鸡蛋糕的糕', image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=300' },
  { name: '跷脚牛肉', sub: '为啥叫跷脚?', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5fb6b?auto=format&fit=crop&q=80&w=300' },
];

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
    deliveryFee: '¥2',
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
    deliveryFee: '¥1',
  },
];

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      {showTooltip && (
        <div className="fixed inset-0 z-[200]" onClick={() => setShowTooltip(false)} />
      )}

      <div className="mx-auto min-h-screen w-full bg-white lg:max-w-[1200px] lg:shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="relative min-h-screen scroll-smooth">
          <div className="absolute top-0 left-0 right-0 h-[320px] pointer-events-none isolate overflow-hidden sm:h-[360px]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFF1D6] via-white/85 to-white" />

            <div className="absolute top-0 right-0 h-72 w-72 translate-x-10 -translate-y-6 overflow-hidden sm:h-80 sm:w-80 sm:translate-x-16">
              <motion.div
                initial={{ opacity: 0, scale: 1.08, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="h-full w-full"
              >
                <img
                  src="https://images.unsplash.com/photo-1546702482-1dd38f6d8995?auto=format&fit=crop&q=80&w=500"
                  className="h-full w-full object-cover opacity-28 mix-blend-multiply"
                  style={{
                    maskImage: 'radial-gradient(circle at 50% 50%, black 12%, transparent 82%)',
                    WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 12%, transparent 82%)',
                  }}
                  alt="Night Market"
                />
              </motion.div>
            </div>

            <div
              className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />
          </div>

          <header
            className={cn(
              'sticky top-0 z-50 px-4 pt-4 pb-3 transition-all duration-300 sm:px-6 lg:px-8',
              scrollY > 20 ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent',
            )}
          >
            <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between">
              <div className="flex items-center gap-1 group cursor-pointer">
                <MapPin className="h-4 w-4 text-brand-secondary" />
                <span className="max-w-[160px] truncate text-xs font-bold text-gray-900 sm:max-w-none sm:text-sm">
                  成都市·春熙路
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex flex-col items-center leading-none">
                  <CloudSun className="mb-0.5 h-4 w-4 text-orange-400 sm:h-5 sm:w-5" />
                  <span className="text-[9px] font-black text-gray-500 sm:text-[10px]">22°C</span>
                </div>
                <div className="relative">
                  <Bell className="h-4 w-4 text-gray-900 sm:h-5 sm:w-5" />
                  <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full border border-white bg-red-500" />
                </div>
              </div>
            </div>
          </header>

          <main className="relative z-10 mx-auto w-full max-w-[1120px] pb-36">
            <div className="px-4 pt-2 pb-3 sm:px-6 lg:px-8 lg:pt-4">
              <h1 className="text-2xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-[2.75rem]">
                开启成都味觉之旅
              </h1>
              <p className="mt-2 max-w-2xl text-sm font-medium text-gray-500 sm:text-base">
                结合你的偏好，为你选出最值得尝试的本地美味
              </p>
            </div>

            <div className="px-4 pb-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-sm ring-1 ring-black/5 sm:px-5 sm:py-3">
                <Search className="h-4 w-4 text-gray-400 sm:h-5 sm:w-5" />
                <input
                  type="text"
                  placeholder="寻找巷子里的地道蹄花..."
                  className="flex-1 bg-transparent text-sm font-medium text-gray-700 focus:outline-none placeholder:text-gray-300 sm:text-base"
                />
                <button className="rounded-full bg-brand-primary px-4 py-1.5 text-xs font-black shadow-sm sm:px-5 sm:py-2 sm:text-sm">
                  搜索
                </button>
              </div>
            </div>

            <section className="px-4 pb-5 sm:px-6 lg:px-8">
              <div className="grid grid-cols-5 gap-3 text-center sm:gap-4">
                {CATEGORIES.map((cat) => (
                  <motion.div
                    key={cat.name}
                    whileTap={{ scale: 0.94 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5 sm:h-14 sm:w-14">
                      {React.cloneElement(cat.icon as React.ReactElement, {
                        className: 'h-6 w-6 text-orange-500 sm:h-7 sm:w-7',
                      })}
                    </div>
                    <span className="text-[10px] font-bold tracking-tight text-gray-600 sm:text-xs">
                      {cat.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </section>

            <div className="space-y-4 px-4 sm:px-6 lg:px-8">
              <section>
                <div className="relative isolate overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                  <div className="bg-gradient-to-br from-orange-50 to-white/0 px-4 pt-4 pb-2 sm:px-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 relative">
                        <div className="rounded-md bg-orange-500 p-1">
                          <Compass className="h-3.5 w-3.5 text-white" />
                        </div>
                        <h2 className="text-[15px] font-extrabold tracking-tight text-gray-900 sm:text-lg">
                          成都深夜食堂
                        </h2>
                        <div className="relative group/help">
                          <HelpCircle
                            className="h-3.5 w-3.5 cursor-pointer text-gray-300 transition-colors hover:text-gray-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowTooltip(!showTooltip);
                            }}
                          />
                          {showTooltip && (
                            <div className="absolute top-6 left-[-20px] z-50 w-52 rounded-lg bg-gray-900/90 p-2 text-[10px] text-white shadow-xl ring-1 ring-white/10 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
                              结合你的口味偏好与当地优质商家定制推荐
                              <div className="absolute -top-1 left-6 h-2 w-2 rotate-45 bg-gray-900/90" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-end gap-1.5">
                        <div className="flex items-center gap-1 rounded border border-red-100 bg-red-50 px-2 py-1 text-[10px] font-black text-red-500 shadow-sm sm:text-xs">
                          <Ticket className="h-3 w-3" />
                          <span>最高满60-30</span>
                        </div>
                        <div className="rounded border border-orange-100 bg-orange-50 px-2 py-1 text-[10px] font-black text-orange-600 shadow-sm sm:text-xs">
                          <span>低至免配</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-3 pb-3 sm:px-4">
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="relative h-[170px] overflow-hidden sm:h-[220px] lg:h-[240px]">
                        <img
                          src={FEATURED_MERCHANT.image}
                          alt={FEATURED_MERCHANT.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="p-3 sm:p-4">
                        <div className="mb-2 flex items-center gap-3">
                          <img
                            src={FEATURED_MERCHANT.logo}
                            alt="logo"
                            className="h-10 w-10 flex-shrink-0 rounded-xl object-cover ring-2 ring-gray-100"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="mb-1 flex items-center gap-2">
                              <h3 className="truncate text-base font-black leading-tight tracking-tight text-gray-900 sm:text-lg">
                                {FEATURED_MERCHANT.name}
                              </h3>
                              <div className="flex-shrink-0 rounded-sm bg-red-500 px-1.5 py-0.5 text-[9px] font-black text-white ring-1 ring-red-400/50 sm:text-[10px]">
                                {FEATURED_MERCHANT.coupon}
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-bold text-gray-500 sm:text-xs">
                              <span className="text-orange-500">⭐ {FEATURED_MERCHANT.rating}</span>
                              <span className="opacity-40">|</span>
                              <span>月售 {FEATURED_MERCHANT.sales}</span>
                              <span className="opacity-40">|</span>
                              <span>起送{FEATURED_MERCHANT.minOrder}</span>
                              <span className="opacity-40">|</span>
                              <span>{FEATURED_MERCHANT.distance}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-2 border-t border-gray-50 py-2">
                          <div className="flex items-center gap-2">
                            <span className="flex-shrink-0 rounded bg-orange-100 px-2 py-1 text-[10px] font-black text-orange-600 sm:text-xs">
                              点评高分
                            </span>
                            <p className="truncate text-xs font-bold tracking-tight text-gray-500 sm:text-sm">
                              {FEATURED_MERCHANT.whyFamous}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="px-3 pb-4 sm:px-4 sm:pb-5">
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                      {SPECIALTY_DISHES_ITEMS.map((item) => (
                        <motion.div
                          key={item.name}
                          whileTap={{ scale: 0.95 }}
                          className="group relative h-[56px] w-[138px] flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-gray-100 shadow-sm sm:h-[72px] sm:w-[180px]"
                        >
                          <img
                            src={item.image}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            alt={item.name}
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity group-hover:from-black/70" />

                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xs font-black leading-none tracking-tight text-white drop-shadow-md sm:text-sm">
                              {item.name}
                            </span>
                            <div className="mt-1 px-1.5">
                              <span className="whitespace-nowrap text-[8px] font-bold leading-none text-[#FFD700] drop-shadow-md sm:text-[10px]">
                                {item.sub}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className="pb-8">
                <div className="mb-3 flex items-center justify-between px-0.5">
                  <h3 className="text-lg font-black tracking-tight text-gray-900 sm:text-2xl">
                    附近商家
                  </h3>
                  <div className="flex gap-3 text-[11px] font-bold text-gray-400 sm:text-sm">
                    <span className="text-orange-600">综合</span>
                    <span>评分</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {RESTAURANTS.map((res) => (
                    <div
                      key={res.id}
                      className="group flex cursor-pointer gap-3 rounded-2xl border border-gray-100 bg-white p-3 transition-colors hover:bg-gray-50"
                    >
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-gray-50 bg-gray-100 sm:h-24 sm:w-24">
                        <img
                          src={res.image}
                          alt={res.name}
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between py-0.5">
                        <div>
                          <h4 className="mb-1 text-sm font-bold leading-tight text-gray-900 sm:text-base">
                            {res.name}
                          </h4>
                          <div className="mb-2 flex flex-wrap items-center gap-2 text-[10px] font-bold text-gray-400 sm:text-xs">
                            <span className="font-black text-orange-500">⭐ {res.rating}</span>
                            <span>{res.sales}</span>
                            <span>{res.distance}</span>
                            <span>{res.deliveryTime}分钟达</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {res.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="rounded border border-gray-100 bg-gray-50 px-1.5 py-0.5 text-[9px] font-bold text-gray-500 sm:text-[10px]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-gray-400 opacity-80 sm:text-xs">
                          <span>人均{res.avgPrice}</span>
                          <span className="h-0.5 w-0.5 rounded-full bg-gray-300" />
                          <span>配送{res.deliveryFee}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </main>

          <div className="fixed bottom-0 left-0 right-0 z-50">
            <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
              <nav className="flex items-center justify-between rounded-t-[24px] border border-white/70 bg-white/95 px-8 pt-3 pb-7 shadow-[0_-15px_40px_rgba(0,0,0,0.06)] ring-1 ring-black/5 backdrop-blur-xl">
                <div className="flex flex-col items-center gap-1 text-orange-500">
                  <div className="rounded-xl bg-orange-50 p-1.5 ring-1 ring-orange-100 shadow-sm">
                    <UtensilsCrossed className="h-4.5 w-4.5 fill-current" />
                  </div>
                  <span className="text-[10px] font-black sm:text-xs">外卖</span>
                </div>
                <div className="group flex cursor-pointer flex-col items-center gap-1 text-gray-400">
                  <Compass className="h-4.5 w-4.5 transition-colors group-hover:text-gray-900" />
                  <span className="text-[10px] font-bold transition-colors group-hover:text-gray-900 sm:text-xs">
                    寻味
                  </span>
                </div>
                <div className="group flex cursor-pointer flex-col items-center gap-1 text-gray-400">
                  <Clock className="h-4.5 w-4.5 transition-colors group-hover:text-gray-900" />
                  <span className="text-[10px] font-bold transition-colors group-hover:text-gray-900 sm:text-xs">
                    订单
                  </span>
                </div>
                <div className="group flex cursor-pointer flex-col items-center gap-1 text-gray-400">
                  <div className="h-4.5 w-4.5 overflow-hidden rounded-full border border-gray-300 bg-gray-100 ring-1 ring-white shadow-sm">
                    <img src="https://i.pravatar.cc/100?u=me" alt="user" referrerPolicy="no-referrer" />
                  </div>
                  <span className="text-[10px] font-bold transition-colors group-hover:text-gray-900 sm:text-xs">
                    我的
                  </span>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
