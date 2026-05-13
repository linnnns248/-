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
  { name: '顺风外卖', icon: <UtensilsCrossed className="h-8 w-8 text-[#FF7700]" /> },
  { name: '甜点饮品', icon: <Coffee className="h-8 w-8 text-[#FF7700]" /> },
  { name: '超市便利', icon: <Store className="h-8 w-8 text-[#FF7700]" /> },
  { name: '新鲜水果', icon: <TrendingUp className="h-8 w-8 text-[#FF7700]" /> },
  { name: '全部分类', icon: <ChevronRight className="h-8 w-8 text-[#FF7700]" /> },
];

const FEATURED_MERCHANT = {
  name: '老成都·盘飧市',
  image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=900',
  rating: 4.9,
  distance: '1.2km',
  sales: '月售1w+',
  deliveryFee: '免配送费',
  specialty: '主打招牌：正宗卤水拼盘、香酥蹄花',
  whyFamous: '百年老字号，成都人的味道记忆，适合白天边逛边点，吃得到经典川味也能兼顾轻松出行节奏。',
  specialtyDishes: ['老妈蹄花', '豌杂面'],
};

const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: '陈记老牌牛肉粉 (总店)',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5fb6b?auto=format&fit=crop&q=80&w=480',
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
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=480',
    rating: 4.7,
    deliveryTime: '20',
    distance: '500m',
    tags: ['景点周边', '必点'],
    sales: '月售3000+',
    avgPrice: '¥35',
    deliveryFee: '¥1',
  },
  {
    id: '3',
    name: '宽窄巷子·川味小馆',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=480',
    rating: 4.9,
    deliveryTime: '28',
    distance: '1.3km',
    tags: ['游客友好', '特色菜'],
    sales: '月售4200+',
    avgPrice: '¥48',
    deliveryFee: '¥3',
  },
];

const QUEUE_AVATARS = [FEATURED_MERCHANT.image, ...RESTAURANTS.map((restaurant) => restaurant.image).slice(0, 2)];

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
  pageTitle: fluidType(40, 56),
  sectionTitle: fluidType(36, 52),
  cardTitle: fluidType(28, 40),
  body: fluidType(26, 40),
  bodyStrong: fluidType(22, 36),
  tag: fluidType(20, 28),
  meta: fluidType(20, 28),
  tooltip: fluidType(22, 36),
  numberMeta: numberType(20, 28),
  numberTag: numberType(20, 28),
};

const QUEUE_CARD_TYPE_STYLES = {
  title: {
    fontSize: 'clamp(20px, 3.73vw, 28px)',
    lineHeight: 'clamp(24px, 4.27vw, 32px)',
  },
  subtitle: {
    fontSize: '20px',
    lineHeight: '24px',
  },
  number: {
    fontSize: 'clamp(20px, 3.2vw, 24px)',
    lineHeight: 'clamp(22px, 3.73vw, 28px)',
    fontFamily: 'var(--font-number)',
  },
  numberCaption: {
    fontSize: '20px',
    lineHeight: '20px',
  },
  hot: {
    fontSize: '20px',
    lineHeight: '20px',
  },
  plus: {
    fontSize: '20px',
    lineHeight: '20px',
  },
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
      {showTooltip && <div className="fixed inset-0 z-[180]" onClick={() => setShowTooltip(false)} />}

      <div className="mx-auto min-h-screen w-full max-w-[750px] bg-white shadow-[0_20px_60px_rgba(17,17,17,0.06)]">
        <div className="relative min-h-screen">
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-[340px] overflow-hidden isolate">
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFF7D1]/80 via-[#FAFAFA] to-white" />
            <div className="absolute top-0 right-0 h-72 w-72 translate-x-10 -translate-y-6 overflow-hidden">
              <motion.div
                initial={{ opacity: 0, scale: 1.08, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
                className="h-full w-full"
              >
                <img
                  src="https://images.unsplash.com/photo-1564349683136-77e08bef1ed1?auto=format&fit=crop&q=80&w=500"
                  alt="成都城市氛围"
                  className="h-full w-full object-cover opacity-30 mix-blend-multiply"
                  style={{
                    maskImage: 'radial-gradient(circle at 50% 50%, black 14%, transparent 82%)',
                    WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 14%, transparent 82%)',
                  }}
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
              scrollY > 20 ? 'border-b border-[#F0F0F0] bg-white/96 backdrop-blur-md' : 'bg-transparent',
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex cursor-pointer items-center gap-1">
                <MapPin className="h-5 w-5 text-[#FF7700]" />
                <span className="max-w-[200px] truncate font-semibold text-[#111111]" style={TYPE_STYLES.meta}>
                  成都市·春熙路
                </span>
                <ChevronDown className="h-4 w-4 text-[#999999]" />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center leading-none">
                  <CloudSun className="mb-1 h-5 w-5 text-[#FF7700]" />
                  <span className="tabular-nums font-semibold text-[#555555]" style={TYPE_STYLES.numberMeta}>
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

          <main className="relative z-10 w-full pb-[152px]">
            <section className="px-4 pt-3 pb-3">
              <h1 className="font-black tracking-tight text-[#111111]" style={TYPE_STYLES.pageTitle}>
                开启成都白天寻味之旅
              </h1>
            </section>

            <section className="px-4 pb-3">
              <div className="flex items-center gap-2 rounded-[12px] border border-[#E5E5E5] bg-white px-3 py-1.5 shadow-sm">
                <Search className="h-4 w-4 text-[#999999]" />
                <input
                  type="text"
                  placeholder="寻找巷子里的地道蹄花..."
                  className="flex-1 bg-transparent font-medium text-[#111111] outline-none placeholder:text-[#999999]"
                  style={TYPE_STYLES.tag}
                />
                <button type="button" className="rounded-[10px] bg-[#FFDD00] px-3 py-1.5 font-black text-[#111111] shadow-sm" style={TYPE_STYLES.tag}>
                  搜索
                </button>
              </div>
            </section>

            <section className="px-4 pb-5">
              <div className="grid grid-cols-5 gap-x-3 gap-y-4 text-center">
                {CATEGORIES.map((category) => (
                  <motion.div key={category.name} whileTap={{ scale: 0.95 }} className="flex flex-col items-center gap-2">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[16px] border border-[#E5E5E5] bg-[#FAFAFA] shadow-sm">
                      {React.cloneElement(category.icon as React.ReactElement, { className: 'h-7 w-7 text-[#FF7700]' })}
                    </div>
                    <span className="font-semibold tracking-tight text-[#555555]" style={TYPE_STYLES.tag}>
                      {category.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </section>

            <div className="space-y-9 px-4">
              <section className="mx-auto w-full max-w-[718px]">
                <div className="flex h-[398px] w-full flex-col justify-between overflow-hidden rounded-[24px] border border-[#E5E5E5] bg-white shadow-[0_12px_32px_rgba(17,17,17,0.06)]">
                  <div className="bg-[#FAFAFA] px-4 pt-4 pb-2.5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="relative flex min-w-0 items-center gap-2">
                        <h2 className="truncate font-black tracking-tight text-[#111111]" style={TYPE_STYLES.sectionTitle}>
                          成都寻味指南
                        </h2>
                        <div className="relative flex-shrink-0">
                          <HelpCircle
                            className="h-5 w-5 cursor-pointer text-[#999999] transition-colors hover:text-[#555555]"
                            onClick={(event) => {
                              event.stopPropagation();
                              setShowTooltip(!showTooltip);
                            }}
                          />
                          {showTooltip && (
                            <div className="absolute top-8 left-0 z-50 w-[280px] rounded-[12px] bg-[#111111] p-3 text-white shadow-xl" style={TYPE_STYLES.tooltip}>
                              结合你的口味偏好、白天出行节奏和当地优质商家，为你定制更适合白天打开方式的成都寻味推荐。
                              <div className="absolute -top-1 left-6 h-2 w-2 rotate-45 bg-[#111111]" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-shrink-0 items-center gap-2 whitespace-nowrap">
                        <div className="rounded-[8px] border border-[#E5E5E5] bg-[#F7F7F7] px-2 py-1 font-black text-[#FF2D19] tabular-nums shadow-sm" style={TYPE_STYLES.numberTag}>
                          最高满60-30
                        </div>
                        <div className="rounded-[8px] border border-[#E5E5E5] bg-[#F7F7F7] px-2 py-1 font-black text-[#FF7700] shadow-sm" style={TYPE_STYLES.tag}>
                          低至免配
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pb-3">
                    <motion.div
                      whileTap={{ scale: 0.985 }}
                      className="group cursor-pointer overflow-hidden rounded-[16px] border border-[#E5E5E5] bg-white shadow-sm transition-all hover:shadow-md min-[718px]:flex min-[718px]:h-[168px]"
                    >
                      <div className="relative h-[120px] overflow-hidden min-[718px]:h-[168px] min-[718px]:w-[248px] min-[718px]:flex-shrink-0">
                        <img
                          src={FEATURED_MERCHANT.image}
                          alt={FEATURED_MERCHANT.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                          onError={handleImageError}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/55 via-transparent to-transparent" />
                      </div>

                      <div className="p-3 min-[718px]:flex min-[718px]:min-w-0 min-[718px]:flex-1 min-[718px]:flex-col min-[718px]:justify-between">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-[12px] border border-[#E5E5E5] bg-[#FAFAFA]">
                            <img
                              src={FEATURED_MERCHANT.image}
                              alt={`${FEATURED_MERCHANT.name} logo`}
                              className="h-full w-full object-cover"
                              referrerPolicy="no-referrer"
                              onError={handleImageError}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="truncate font-black tracking-tight text-[#111111]" style={TYPE_STYLES.cardTitle}>
                              {FEATURED_MERCHANT.name}
                            </h3>
                            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-medium text-[#888888] tabular-nums" style={TYPE_STYLES.numberMeta}>
                              <span className="font-semibold text-[#FF7700]">⭐ {FEATURED_MERCHANT.rating}</span>
                              <span className="text-[#CCCCCC]">|</span>
                              <span>{FEATURED_MERCHANT.sales}</span>
                              <span className="text-[#CCCCCC]">|</span>
                              <span>配送 {FEATURED_MERCHANT.deliveryFee}</span>
                              <span className="text-[#CCCCCC]">|</span>
                              <span>{FEATURED_MERCHANT.distance}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 border-t border-[#F0F0F0] pt-3">
                          <p
                            className="overflow-hidden font-medium tracking-tight text-[#555555]"
                            style={{
                              ...TYPE_STYLES.bodyStrong,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            {FEATURED_MERCHANT.specialtyDishes.map((dish) => (
                              <span
                                key={dish}
                                className="mb-1 mr-2 inline-block rounded-[8px] border border-[#E5E5E5] bg-[#F7F7F7] px-2 py-1 align-middle font-black text-[#FF7700]"
                                style={TYPE_STYLES.tag}
                              >
                                {dish}
                              </span>
                            ))}
                            <span>{FEATURED_MERCHANT.specialty} {FEATURED_MERCHANT.whyFamous}</span>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="px-4 pb-3">
                    <motion.div
                      whileTap={{ scale: 0.985 }}
                      className="flex items-center gap-2 rounded-[20px] border border-[#EDEDED] bg-white px-3 py-1.5 shadow-[0_10px_24px_rgba(17,17,17,0.05)]"
                    >
                      <div className="flex h-[68px] w-[68px] flex-shrink-0 flex-col rounded-[16px] bg-[#FAFAFA] px-1.5 py-1">
                        <div className="flex items-center justify-center">
                          {QUEUE_AVATARS.map((avatar, index) => (
                            <div
                              key={`${avatar}-${index}`}
                              className={cn(
                                'h-4 w-4 overflow-hidden rounded-full border border-white bg-[#F2F2F2]',
                                index > 0 ? '-ml-1' : '',
                              )}
                            >
                              <img src={avatar} alt={`排队头像${index + 1}`} className="h-full w-full object-cover" referrerPolicy="no-referrer" onError={handleImageError} />
                            </div>
                          ))}
                          <div
                            className="-ml-1 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-[#EAEAEA] font-black text-[#999999]"
                            style={QUEUE_CARD_TYPE_STYLES.plus}
                          >
                            +
                          </div>
                        </div>
                        <div className="mt-0.5 text-center">
                          <div className="font-black text-[#FF8A34] tabular-nums" style={QUEUE_CARD_TYPE_STYLES.number}>
                            2368+
                          </div>
                          <div className="font-medium text-[#999999]" style={QUEUE_CARD_TYPE_STYLES.numberCaption}>
                            人在排队
                          </div>
                        </div>
                      </div>

                      <div className="min-w-0 flex-1 pr-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate font-black tracking-tight text-[#111111]" style={QUEUE_CARD_TYPE_STYLES.title}>
                            周边排队热店
                          </span>
                          <span className="rounded-full bg-[#FF8A34] px-1.5 py-[1px] font-black text-white" style={QUEUE_CARD_TYPE_STYLES.hot}>
                            HOT
                          </span>
                        </div>
                        <p className="mt-0.5 font-medium text-[#999999]" style={QUEUE_CARD_TYPE_STYLES.subtitle}>
                          看看大家都在排哪家
                        </p>
                      </div>

                      <div className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full border border-[#E5E5E5] bg-[#FAFAFA] text-[#999999] shadow-sm">
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </motion.div>
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
                  {RESTAURANTS.map((restaurant) => (
                    <div
                      key={restaurant.id}
                      className="group flex cursor-pointer gap-3 rounded-[16px] border border-[#E5E5E5] bg-white p-3 transition-colors hover:bg-[#FAFAFA]"
                    >
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-[12px] border border-[#E5E5E5] bg-[#FAFAFA]">
                        <img
                          src={restaurant.image}
                          alt={restaurant.name}
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={handleImageError}
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start gap-2">
                            <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-[10px] border border-[#E5E5E5] bg-[#FAFAFA]">
                              <img
                                src={restaurant.image}
                                alt={`${restaurant.name} logo`}
                                className="h-full w-full object-cover"
                                referrerPolicy="no-referrer"
                                onError={handleImageError}
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="truncate font-black tracking-tight text-[#111111]" style={TYPE_STYLES.cardTitle}>
                                {restaurant.name}
                              </h4>
                              <div className="mt-1 flex flex-wrap items-center gap-2 font-medium text-[#888888] tabular-nums" style={TYPE_STYLES.numberMeta}>
                                <span className="font-semibold text-[#FF7700]">⭐ {restaurant.rating}</span>
                                <span>{restaurant.deliveryTime}分钟达</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center gap-2 overflow-hidden whitespace-nowrap font-medium text-[#888888] tabular-nums" style={TYPE_STYLES.numberMeta}>
                            <span>{restaurant.sales}</span>
                            <span className="h-1 w-1 rounded-[8px] bg-[#CCCCCC]" />
                            <span>配送 {restaurant.deliveryFee}</span>
                            <span className="h-1 w-1 rounded-[8px] bg-[#CCCCCC]" />
                            <span>{restaurant.distance}</span>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {restaurant.tags.map((tag) => (
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
                        <div className="mt-3 flex items-center gap-2 font-medium text-[#999999] tabular-nums" style={TYPE_STYLES.numberMeta}>
                          <span>人均 {restaurant.avgPrice}</span>
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
              <nav className="flex items-center justify-between rounded-t-[24px] border border-[#E5E5E5] bg-white px-8 pt-4 pb-[calc(32px+env(safe-area-inset-bottom))] shadow-[0_-12px_32px_rgba(17,17,17,0.06)] backdrop-blur-xl">
                <div className="flex flex-col items-center gap-2 text-[#FF7700]">
                  <div className="rounded-[12px] bg-[#FFDD00] p-2">
                    <UtensilsCrossed className="h-5 w-5 fill-current" />
                  </div>
                  <span className="font-black" style={TYPE_STYLES.tag}>
                    外卖
                  </span>
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
                    <img src="https://i.pravatar.cc/100?u=me" alt="用户头像" referrerPolicy="no-referrer" onError={handleImageError} />
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
