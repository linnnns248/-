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

const IMAGE_FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220"><rect width="320" height="220" fill="#F5F5F5"/><rect x="24" y="24" width="272" height="172" rx="16" fill="#FAFAFA" stroke="#E5E5E5"/><path d="M98 142l34-38 26 29 28-24 36 33H98z" fill="#CCCCCC"/><circle cx="126" cy="88" r="18" fill="#E5E5E5"/><text x="160" y="190" text-anchor="middle" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, Microsoft YaHei, Roboto, sans-serif" font-size="20" fill="#999999">No Image</text></svg>',
  );

const CATEGORIES = [
  { name: '顺风外卖', icon: <UtensilsCrossed className="w-8 h-8 text-[#FF7700]" /> },
  { name: '甜点饮品', icon: <Coffee className="w-8 h-8 text-[#FF7700]" /> },
  { name: '超市便利', icon: <Store className="w-8 h-8 text-[#FF7700]" /> },
  { name: '新鲜水果', icon: <TrendingUp className="w-8 h-8 text-[#FF7700]" /> },
  { name: '全部分类', icon: <ChevronRight className="w-8 h-8 text-[#FF7700]" /> },
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

function handleImageError(event: React.SyntheticEvent<HTMLImageElement>) {
  const target = event.currentTarget;
  if (target.src !== IMAGE_FALLBACK) {
    target.src = IMAGE_FALLBACK;
  }
}

function fluidType(fontSize: number, lineHeight: number): React.CSSProperties {
  return {
    fontSize: `clamp(${fontSize / 2}px, ${(fontSize / 750) * 100}vw, ${fontSize}px)`,
    lineHeight: `clamp(${lineHeight / 2}px, ${(lineHeight / 750) * 100}vw, ${lineHeight}px)`,
  };
}

function numberType(fontSize: number, lineHeight: number): React.CSSProperties {
  return {
    ...fluidType(fontSize, lineHeight),
    fontFamily: 'var(--font-number)',
  };
}

const TYPE_STYLES = {
  meta: fluidType(20, 28),
  body: fluidType(26, 40),
  bodyStrong: fluidType(22, 36),
  sectionTitle: fluidType(36, 52),
  pageTitle: fluidType(40, 56),
  cardTitle: fluidType(28, 40),
  tag: fluidType(20, 28),
  tooltip: fluidType(22, 36),
  numberMeta: numberType(20, 28),
  numberTag: numberType(20, 28),
};

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
    <div className="min-h-screen bg-[#F5F5F5]">
      {showTooltip && (
        <div className="fixed inset-0 z-[200]" onClick={() => setShowTooltip(false)} />
      )}

      <div className="mx-auto min-h-screen w-full max-w-[750px] bg-white shadow-[0_20px_60px_rgba(17,17,17,0.06)]">
        <div className="relative min-h-screen scroll-smooth">
          <div className="absolute top-0 left-0 right-0 h-[360px] pointer-events-none isolate overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#F5F5F5] via-[#FAFAFA] to-white" />

            <div className="absolute top-0 right-0 h-72 w-72 translate-x-12 -translate-y-8 overflow-hidden">
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
                  onError={handleImageError}
                />
              </motion.div>
            </div>

            <div
              className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, #111111 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />
          </div>

          <header
            className={cn(
              'sticky top-0 z-50 px-4 pt-4 pb-3 transition-all duration-300',
              scrollY > 20 ? 'border-b border-[#F0F0F0] bg-white backdrop-blur-md' : 'bg-transparent',
            )}
          >
            <div className="mx-auto flex w-full items-center justify-between">
              <div className="flex items-center gap-1 cursor-pointer">
                <MapPin className="h-5 w-5 text-[#FF7700]" />
                <span className="max-w-[200px] truncate font-semibold text-[#111111]" style={TYPE_STYLES.meta}>
                  成都市·春熙路
                </span>
                <ChevronDown className="h-4 w-4 text-[#999999]" />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center leading-none">
                  <CloudSun className="mb-1 h-5 w-5 text-[#FF7700]" />
                  <span className="font-semibold text-[#555555] tabular-nums" style={TYPE_STYLES.numberMeta}>
                    22°C
                  </span>
                </div>
                <div className="relative">
                  <Bell className="h-5 w-5 text-[#111111]" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-[8px] bg-[#FF2D19]" />
                </div>
              </div>
            </div>
          </header>

          <main className="relative z-10 mx-auto w-full pb-[144px]">
            <div className="px-4 pt-3 pb-4">
              <h1 className="font-black tracking-tight text-[#111111]" style={TYPE_STYLES.pageTitle}>
                开启成都味觉之旅
              </h1>
              <p className="mt-2 max-w-[560px] font-medium text-[#555555]" style={TYPE_STYLES.body}>
                结合你的偏好，为你选出最值得尝试的本地美味
              </p>
            </div>

            <div className="px-4 pb-4">
              <div className="flex items-center gap-3 rounded-[12px] border border-[#E5E5E5] bg-white px-4 py-3 shadow-sm">
                <Search className="h-5 w-5 text-[#999999]" />
                <input
                  type="text"
                  placeholder="寻找巷子里的地道蹄花..."
                  className="flex-1 bg-transparent font-medium text-[#111111] focus:outline-none placeholder:text-[#999999]"
                  style={TYPE_STYLES.tag}
                />
                <button className="rounded-[12px] bg-[#FFDD00] px-4 py-3 font-black text-[#111111] shadow-sm" style={TYPE_STYLES.tag}>
                  搜索
                </button>
              </div>
            </div>

            <section className="px-4 pb-5">
              <div className="grid grid-cols-5 gap-x-3 gap-y-4 text-center">
                {CATEGORIES.map((cat) => (
                  <motion.div
                    key={cat.name}
                    whileTap={{ scale: 0.94 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-[16px] border border-[#E5E5E5] bg-[#FAFAFA] shadow-sm">
                      {React.cloneElement(cat.icon as React.ReactElement, {
                        className: 'h-7 w-7 text-[#FF7700]',
                      })}
                    </div>
                    <span className="font-semibold tracking-tight text-[#555555]" style={TYPE_STYLES.tag}>
                      {cat.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </section>

            <div className="space-y-9 px-4">
              <section className="mx-auto w-full max-w-[718px]">
                <div className="relative isolate overflow-hidden rounded-[24px] border border-[#E5E5E5] bg-white shadow-[0_12px_32px_rgba(17,17,17,0.06)] min-[718px]:flex min-[718px]:h-[398px] min-[718px]:flex-col min-[718px]:justify-between">
                  <div className="bg-[#FAFAFA] px-4 pt-4 pb-2.5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="relative flex min-w-0 items-center gap-2">
                        <h2 className="truncate font-black tracking-tight text-[#111111]" style={TYPE_STYLES.sectionTitle}>
                          成都深夜食堂
                        </h2>
                        <div className="relative flex-shrink-0">
                          <HelpCircle
                            className="h-5 w-5 cursor-pointer text-[#999999] transition-colors hover:text-[#555555]"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowTooltip(!showTooltip);
                            }}
                          />
                          {showTooltip && (
                            <div className="absolute top-8 left-0 z-50 w-[280px] rounded-[12px] bg-[#111111] p-3 text-white shadow-xl" style={TYPE_STYLES.tooltip}>
                              结合你的口味偏好与当地优质商家定制推荐
                              <div className="absolute -top-1 left-6 h-2 w-2 rotate-45 bg-[#111111]" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-shrink-0 items-center justify-end gap-2 whitespace-nowrap">
                        <div className="rounded-[8px] border border-[#E5E5E5] bg-[#F7F7F7] px-2 py-1 font-black text-[#FF2D19] shadow-sm tabular-nums" style={TYPE_STYLES.numberTag}>
                          <span>最高满60-30</span>
                        </div>
                        <div className="rounded-[8px] border border-[#E5E5E5] bg-[#F7F7F7] px-2 py-1 font-black text-[#FF7700] shadow-sm" style={TYPE_STYLES.tag}>
                          <span>低至免配</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pb-3">
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className="group cursor-pointer overflow-hidden rounded-[16px] border border-[#E5E5E5] bg-white shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="relative h-[132px] overflow-hidden min-[718px]:h-[168px] min-[718px]:w-[248px] min-[718px]:flex-shrink-0">
                        <img
                          src={FEATURED_MERCHANT.image}
                          alt={FEATURED_MERCHANT.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                          onError={handleImageError}
                        />
                      </div>

                      <div className="p-3 min-[718px]:flex min-[718px]:min-w-0 min-[718px]:flex-1 min-[718px]:flex-col min-[718px]:justify-between">
                        <div className="mb-2 flex items-start gap-2.5">
                          <img
                            src={FEATURED_MERCHANT.logo}
                            alt="logo"
                            className="h-12 w-12 flex-shrink-0 rounded-[12px] border border-[#E5E5E5] object-cover"
                            referrerPolicy="no-referrer"
                            onError={handleImageError}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="mb-1.5 flex items-center gap-2">
                              <h3 className="truncate font-black tracking-tight text-[#111111]" style={TYPE_STYLES.cardTitle}>
                                {FEATURED_MERCHANT.name}
                              </h3>
                              <div className="flex-shrink-0 rounded-[8px] bg-[#FF2D19] px-2 py-1 font-black text-white tabular-nums" style={TYPE_STYLES.numberTag}>
                                {FEATURED_MERCHANT.coupon}
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-medium text-[#888888] tabular-nums" style={TYPE_STYLES.numberMeta}>
                              <span className="font-semibold text-[#FF7700]">⭐ {FEATURED_MERCHANT.rating}</span>
                              <span className="text-[#CCCCCC]">|</span>
                              <span>月售 {FEATURED_MERCHANT.sales}</span>
                              <span className="text-[#CCCCCC]">|</span>
                              <span>起送{FEATURED_MERCHANT.minOrder}</span>
                              <span className="text-[#CCCCCC]">|</span>
                              <span>{FEATURED_MERCHANT.distance}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-2 border-t border-[#F0F0F0] pt-2">
                          <div className="flex items-start gap-2">
                            <span className="flex-shrink-0 rounded-[8px] bg-[#F7F7F7] px-2 py-1 font-black text-[#FF7700]" style={TYPE_STYLES.tag}>
                              点评高分
                            </span>
                            <p className="font-medium tracking-tight text-[#555555]" style={TYPE_STYLES.bodyStrong}>
                              {FEATURED_MERCHANT.whyFamous}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="px-4 pb-4">
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                      {SPECIALTY_DISHES_ITEMS.map((item) => (
                        <motion.div
                          key={item.name}
                          whileTap={{ scale: 0.95 }}
                          className="group relative h-[64px] w-[164px] flex-shrink-0 cursor-pointer overflow-hidden rounded-[16px] border border-[#E5E5E5] shadow-sm"
                        >
                          <img
                            src={item.image}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            onError={handleImageError}
                          />
                          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#111111] via-[#111111]/35 to-transparent" />

                          <div className="absolute inset-0 flex flex-col items-center justify-center px-1.5">
                            <span className="font-black tracking-tight text-white drop-shadow-md" style={TYPE_STYLES.tag}>
                              {item.name}
                            </span>
                            <span className="mt-0.5 font-semibold text-[#FFDD00] drop-shadow-md" style={TYPE_STYLES.tag}>
                              {item.sub}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className="pb-8">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-black tracking-tight text-[#111111]" style={TYPE_STYLES.sectionTitle}>
                    附近商家
                  </h3>
                  <div className="flex gap-3 font-semibold text-[#999999]" style={TYPE_STYLES.tag}>
                    <span className="text-[#FF7700]">综合</span>
                    <span>评分</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {RESTAURANTS.map((res) => (
                    <div
                      key={res.id}
                      className="group flex cursor-pointer gap-4 rounded-[16px] border border-[#E5E5E5] bg-white p-4 transition-colors hover:bg-[#FAFAFA]"
                    >
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-[12px] border border-[#E5E5E5] bg-[#FAFAFA]">
                        <img
                          src={res.image}
                          alt={res.name}
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={handleImageError}
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h4 className="mb-2 font-bold text-[#111111]" style={TYPE_STYLES.cardTitle}>
                            {res.name}
                          </h4>
                          <div className="mb-3 flex flex-wrap items-center gap-2 font-medium text-[#888888] tabular-nums" style={TYPE_STYLES.numberMeta}>
                            <span className="font-semibold text-[#FF7700]">⭐ {res.rating}</span>
                            <span>{res.sales}</span>
                            <span>{res.distance}</span>
                            <span>{res.deliveryTime}分钟达</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {res.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-[8px] border border-[#E5E5E5] bg-[#F7F7F7] px-2 py-1 font-semibold text-[#555555]"
                                style={TYPE_STYLES.tag}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 font-medium text-[#999999] tabular-nums" style={TYPE_STYLES.numberTag}>
                          <span>人均{res.avgPrice}</span>
                          <span className="h-1 w-1 rounded-[8px] bg-[#CCCCCC]" />
                          <span>配送{res.deliveryFee}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </main>

          <div className="fixed inset-x-0 bottom-0 z-50">
            <div className="mx-auto w-full max-w-[750px] px-4">
              <nav className="flex items-center justify-between rounded-t-[24px] border border-[#E5E5E5] bg-white px-8 pt-4 pb-8 shadow-[0_-12px_32px_rgba(17,17,17,0.06)] backdrop-blur-xl">
                <div className="flex flex-col items-center gap-2 text-[#FF7700]">
                  <div className="rounded-[12px] bg-[#FFDD00] p-2">
                    <UtensilsCrossed className="h-5 w-5 fill-current" />
                  </div>
                  <span className="font-black" style={TYPE_STYLES.tag}>外卖</span>
                </div>
                <div className="group flex cursor-pointer flex-col items-center gap-2 text-[#999999]">
                  <Compass className="h-5 w-5 transition-colors group-hover:text-[#111111]" />
                  <span className="font-semibold transition-colors group-hover:text-[#111111]" style={TYPE_STYLES.tag}>
                    寻味
                  </span>
                </div>
                <div className="group flex cursor-pointer flex-col items-center gap-2 text-[#999999]">
                  <Clock className="h-5 w-5 transition-colors group-hover:text-[#111111]" />
                  <span className="font-semibold transition-colors group-hover:text-[#111111]" style={TYPE_STYLES.tag}>
                    订单
                  </span>
                </div>
                <div className="group flex cursor-pointer flex-col items-center gap-2 text-[#999999]">
                  <div className="h-5 w-5 overflow-hidden rounded-[8px] border border-[#CCCCCC] bg-[#F7F7F7] shadow-sm">
                    <img src="https://i.pravatar.cc/100?u=me" alt="user" referrerPolicy="no-referrer" onError={handleImageError} />
                  </div>
                  <span className="font-semibold transition-colors group-hover:text-[#111111]" style={TYPE_STYLES.tag}>
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
