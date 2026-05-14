import React, { useState } from 'react';
import { ChevronRight, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import bottomTabImage from './assets/homepage/bottom-tab.png';
import headerImage from './assets/homepage/header.png';
import listImage from './assets/homepage/list.png';
import showcaseImage from './assets/homepage/showcase.png';

const IMAGE_FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220"><rect width="320" height="220" fill="#F5F5F5"/><rect x="24" y="24" width="272" height="172" rx="16" fill="#FAFAFA" stroke="#E5E5E5"/><path d="M98 142l34-38 26 29 28-24 36 33H98z" fill="#CCCCCC"/><circle cx="126" cy="88" r="18" fill="#E5E5E5"/><text x="160" y="190" text-anchor="middle" font-family="PingFang SC, Hiragino Sans GB, Noto Sans SC, Microsoft YaHei, Roboto, sans-serif" font-size="20" fill="#999999">No Image</text></svg>',
  );

const FEATURED_MERCHANT = {
  name: '老成都·盘飧市',
  image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=900',
  rating: 4.9,
  distance: '1.2km',
  sales: '月售1w+',
  deliveryFee: '免配送费',
  specialty: '主打招牌：正宗卤水拼盘、香酥蹄花',
  whyFamous: '百年老字号，成都人的味道记忆，适合白天边逛边点，吃得到经典川味也能兼顾轻松出行节奏。',
  specialtyDishes: ['老妈蹄花', '豌杂面'],
};

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
  sectionTitle: fluidType(36, 52),
  cardTitle: fluidType(28, 40),
  bodyStrong: fluidType(22, 36),
  tag: fluidType(20, 28),
  tooltip: fluidType(22, 36),
  numberMeta: numberType(20, 28),
  numberTag: numberType(20, 28),
};

const QUEUE_CARD_TYPE_STYLES = {
  title: fluidType(30, 40),
  subtitle: fluidType(26, 36),
  number: numberType(28, 40),
  numberCaption: TYPE_STYLES.bodyStrong,
  hot: numberType(16, 20),
};

function StaticModule({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="w-full h-auto" />;
}

export default function App() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {showTooltip && <div className="fixed inset-0 z-[180]" onClick={() => setShowTooltip(false)} />}

      <div className="mx-auto min-h-screen w-full max-w-[750px] bg-white shadow-[0_20px_60px_rgba(17,17,17,0.06)]">
        <div className="relative min-h-screen bg-white">
          <main className="relative z-10 w-full" style={{ paddingBottom: 'min(155px, calc(100vw * 155 / 750))' }}>
            <section>
              <StaticModule src={headerImage} alt="头部模块" />
            </section>

            <section className="px-4">
              <div className="mx-auto w-full max-w-[718px]">
                <div className="flex h-[398px] w-full flex-col overflow-hidden rounded-[24px] border border-[#E5E5E5] bg-white shadow-[0_12px_32px_rgba(17,17,17,0.06)]">
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
                        <div className="absolute left-3 top-3 rounded-[8px] bg-[#FFDD00] px-2 py-[2px] font-black text-[#111111] shadow-sm" style={TYPE_STYLES.tag}>
                          当地特色
                        </div>
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
                            <span>
                              {FEATURED_MERCHANT.specialty} {FEATURED_MERCHANT.whyFamous}
                            </span>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="-mt-[8px] flex flex-1 items-center px-4 py-1">
                    <motion.div
                      whileTap={{ scale: 0.985 }}
                      className="flex h-[61px] w-full items-center gap-2 rounded-[20px] border border-[#EDEDED] bg-white px-3 shadow-[0_10px_24px_rgba(17,17,17,0.05)]"
                    >
                      <div className="flex h-[45px] w-[72px] flex-shrink-0 flex-col justify-center rounded-[12px] bg-[#FAFAFA] px-2">
                        <div className="font-black tracking-tight text-[#FF8A34] tabular-nums" style={QUEUE_CARD_TYPE_STYLES.number}>
                          2368+
                        </div>
                        <div className="-mt-0.5 font-medium text-[#999999]" style={QUEUE_CARD_TYPE_STYLES.numberCaption}>
                          人排队中
                        </div>
                      </div>

                      <div className="min-w-0 flex-1 pr-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate font-black tracking-tight text-[#111111]" style={QUEUE_CARD_TYPE_STYLES.title}>
                            当地排队王
                          </span>
                          <span className="rounded-full bg-[#FF8A34] px-1 py-[1px] font-black text-white" style={QUEUE_CARD_TYPE_STYLES.hot}>
                            HOT
                          </span>
                        </div>
                        <p className="-mt-0.5 truncate font-medium tracking-tight text-[#888888]" style={QUEUE_CARD_TYPE_STYLES.subtitle}>
                          线下火爆名店 外卖一键直达
                        </p>
                      </div>

                      <div className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full border border-[#E5E5E5] bg-[#FAFAFA] text-[#999999] shadow-sm">
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <StaticModule src={showcaseImage} alt="橱窗模块" />
            </section>

            <section>
              <StaticModule src={listImage} alt="列表模块" />
            </section>
          </main>

          <div className="fixed inset-x-0 bottom-0 z-50">
            <div className="mx-auto w-full max-w-[750px] bg-white">
              <StaticModule src={bottomTabImage} alt="底tab模块" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
