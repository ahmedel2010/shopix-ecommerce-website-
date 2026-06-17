import { useEffect, useRef, type Ref } from 'react';
import { Star } from 'lucide-react';

const ITEMS = [
  'Limited Time: Free Shipping on Orders Over $150',
  'New Members: Use WELCOME10 for 10% Off $25+',
  'Tech Gallery — TECH20 Saves 20%',
  'Orders Over $150: SAVE25 at Checkout',
  'Premium Classic Wear Collection',
  'Established Excellence Since 1995',
];

function MarqueeStrip({
  stripId,
  stripRef,
  hidden,
}: {
  stripId: string;
  stripRef?: Ref<HTMLDivElement>;
  hidden?: boolean;
}) {
  return (
    <div
      ref={stripRef}
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {ITEMS.map((item, idx) => (
        <div
          key={`${stripId}-${idx}`}
          className="flex items-center shrink-0 px-10 md:px-16"
        >
          <span className="text-[11px] md:text-[14px] font-black uppercase text-black whitespace-nowrap">
            {item}
          </span>
          <Star className="ml-10 md:ml-16 w-3.5 h-3.5 fill-current text-black opacity-40 shrink-0" />
        </div>
      ))}
    </div>
  );
}

export default function AnnouncementBar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const strip = stripRef.current;
    if (!track || !strip) return;

    const speed = 55;
    let raf = 0;

    const tick = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = (time - lastTimeRef.current) / 1000;
        offsetRef.current += speed * delta;

        const stripWidth = strip.offsetWidth;
        if (stripWidth > 0 && offsetRef.current >= stripWidth) {
          offsetRef.current -= stripWidth;
        }

        track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }
      lastTimeRef.current = time;
      raf = requestAnimationFrame(tick);
    };

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');

    const start = () => {
      lastTimeRef.current = null;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      cancelAnimationFrame(raf);
      lastTimeRef.current = null;
    };

    if (!media.matches) start();

    const onChange = () => {
      if (media.matches) {
        stop();
        track.style.transform = '';
      } else {
        start();
      }
    };

    media.addEventListener('change', onChange);
    return () => {
      stop();
      media.removeEventListener('change', onChange);
    };
  }, []);

  return (
    <div className="bg-[#fbbf24] py-2.5 overflow-hidden border-y border-black/10 select-none relative z-20 w-full">
      <div ref={trackRef} className="flex w-max will-change-transform">
        <MarqueeStrip stripId="a" stripRef={stripRef} />
        <MarqueeStrip stripId="b" hidden />
        <MarqueeStrip stripId="c" hidden />
      </div>
    </div>
  );
}
