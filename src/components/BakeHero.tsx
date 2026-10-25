'use client';

import { motion, useTransform, type MotionValue } from 'framer-motion';
import type { ReactNode } from 'react';
import { ScrollSequence } from '@/components/motion/ScrollSequence';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/cn';
import { nb } from '@/lib/typo';
import { site } from '@/site.config';

const COUNT = 266;

// ролик из пяти переходов: мука (48), шоколад (96), лужа (158), коробка (203), полная коробка (265)
const KEYFRAMES: [number[], number[]] = [
  [0, 0.04, 0.15, 0.23, 0.33, 0.41, 0.5, 0.56, 0.63, 0.69, 0.87, 1],
  [0, 0, 48, 48, 96, 96, 158, 158, 203, 203, 265, 265],
];

// круассан правее центра кадра, коробка по центру: на телефоне ведём «камеру» за ними
const FOCUS: [number[], number[]] = [
  [0, 160, 203, 265],
  [0.62, 0.6, 0.5, 0.5],
];

// на телефоне кадр ниже текста; крем = фон ролика и --bg
const PORTRAIT = { scale: 1.9, y: 0.64, matte: '#f5e7dc' };

const STAGES = [
  { id: 'start', range: [0, 0.07] },
  { id: 'wheat', range: [0.13, 0.25] },
  { id: 'hand', range: [0.31, 0.43] },
  { id: 'dairy', range: [0.48, 0.58] },
  { id: 'box', range: [0.62, 0.72] },
  { id: 'end', range: [0.85, 1] },
] as const;

export function BakeHero() {
  return (
    <ScrollSequence
      frames={{ dir: '/bake', count: COUNT }}
      length={15}
      keyframes={KEYFRAMES}
      focus={FOCUS}
      portrait={PORTRAIT}
      theme="light"
      scrim={false}
      label="Eric's bakery"
    >
      {(p) => (
        <>
          <Intro progress={p} />

          <Stage progress={p} range={STAGES[1].range} title="Wheat grown in Britain">
            Our flour comes from UK farms working with low or no inputs, much of it organic. Some of
            it is grown one county over, in Essex.
          </Stage>
          <Stage progress={p} range={STAGES[2].range} title="Rolled and folded by hand">
            Croissants, pains au chocolat and morning buns are laminated in the bakery on Upland
            Road, then baked for the counter that morning.
          </Stage>
          <Stage progress={p} range={STAGES[3].range} title="Good things on the side">
            Butter from Ampersand Dairy and cheese from Neal’s Yard Dairy, on the shelf next to the
            bread.
          </Stage>
          <Stage progress={p} range={STAGES[4].range} title="Fill a box on your way home" narrow>
            Pick from whatever is left on the counter. On Fridays and Saturdays it goes quickly.
          </Stage>

          <Final progress={p} />
          <Dots progress={p} />
        </>
      )}
    </ScrollSequence>
  );
}

function useFade(progress: MotionValue<number>, [a, b]: readonly [number, number], hold = false) {
  const edge = (b - a) * 0.22;
  const opacity = useTransform(
    progress,
    hold ? [a, a + edge] : [a, a + edge, b - edge, b],
    hold ? [0, 1] : [0, 1, 1, 0],
  );
  const y = useTransform(progress, [a, a + edge], [24, 0]);
  return { opacity, y };
}

function Intro({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.05], [1, 0]);
  const y = useTransform(progress, [0, 0.05], [0, -50]);
  const hint = useTransform(progress, [0, 0.02], [1, 0]);
  return (
    <>
      <motion.div
        style={{ opacity, y }}
        className="absolute inset-x-0 top-[calc(var(--header-h)+1.5rem)] md:top-1/2 md:-translate-y-1/2"
      >
        <Container>
          <div className="max-w-[34rem]">
            <p className="text-small font-medium text-muted">Upland Road, East Dulwich</p>
            <h1 className="mt-4 font-display text-display [font-weight:var(--weight-display)]">
              {nb('Butter, flour and an early start')}
            </h1>
            <p className="mt-6 max-w-[34ch] text-body text-fg/80 max-md:hidden">
              {nb(
                'A neighbourhood bakery in SE22. Sourdough, croissants and focaccia every Friday and Saturday, until we sell out.',
              )}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 md:mt-8">
              <Button href={site.cta.href} size="lg">
                {site.cta.label}
              </Button>
              <Button href="/#visit" variant="ghost">
                Opening hours
              </Button>
            </div>
          </div>
        </Container>
      </motion.div>
      <motion.p
        style={{ opacity: hint }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-small text-muted"
      >
        Scroll to bake
      </motion.p>
    </>
  );
}

function Stage({
  progress,
  range,
  title,
  narrow,
  children,
}: {
  progress: MotionValue<number>;
  range: readonly [number, number];
  title: string;
  // на этапе с коробкой она стоит по центру: слева остаётся узкая колонка
  narrow?: boolean;
  children: ReactNode;
}) {
  const { opacity, y } = useFade(progress, range);
  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-x-0 top-[calc(var(--header-h)+1.5rem)] md:top-1/2 md:-translate-y-1/2"
    >
      <Container>
        <div className={cn('max-w-[26rem]', narrow && 'md:max-w-[19rem]')}>
          <h2 className="font-display text-h2 [font-weight:var(--weight-display)]">{nb(title)}</h2>
          <p className="mt-4 max-w-[36ch] text-body text-fg/80">{nb(children)}</p>
        </div>
      </Container>
    </motion.div>
  );
}

function Final({ progress }: { progress: MotionValue<number> }) {
  const { opacity, y } = useFade(progress, STAGES[5].range, true);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 bottom-[5svh] text-center">
      <Container>
        <p className="text-small font-medium text-muted">
          Friday from 8am · Saturday from 9am · until sold out
        </p>
        <p className="mx-auto mt-3 max-w-[16ch] font-display text-h1 [font-weight:var(--weight-display)]">
          {nb('A good morning, boxed')}
        </p>
      </Container>
    </motion.div>
  );
}

function Dots({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="absolute right-[var(--gutter)] top-1/2 hidden -translate-y-1/2 flex-col gap-3 md:flex">
      {STAGES.map((s) => (
        <Dot key={s.id} progress={progress} range={s.range} />
      ))}
    </div>
  );
}

function Dot({
  progress,
  range,
}: {
  progress: MotionValue<number>;
  range: readonly [number, number];
}) {
  const [a, b] = range;
  // анимация по скроллу идёт через WAAPI: точки должны лежать в 0..1
  const at = [Math.max(0, a - 0.02), a, b, Math.min(1, b + 0.02)];
  const scale = useTransform(progress, at, [1, 1.8, 1.8, 1]);
  const opacity = useTransform(progress, at, [0.3, 1, 1, 0.3]);
  return (
    <motion.span style={{ scale, opacity }} className="block h-1.5 w-1.5 rounded-full bg-fg" />
  );
}
