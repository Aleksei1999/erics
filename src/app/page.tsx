import { BakeHero } from '@/components/BakeHero';
import { Footer } from '@/components/blocks/Footer';
import { Header } from '@/components/blocks/Header';
import { Reveal } from '@/components/motion/Reveal';
import { StackOverlap } from '@/components/motion/StackOverlap';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Image } from '@/components/ui/Image';
import { Section } from '@/components/ui/Section';
import { site } from '@/site.config';

const COUNTER = [
  {
    title: 'Bread',
    items: [
      ['Oat porridge loaf', 'sourdough rolled in flaked grains'],
      ['White sourdough', ''],
      ['100% rye tin', ''],
      ['Seeded rolls', ''],
      ['Fruit loaf', ''],
      ['Topped focaccia', 'changes with the season'],
    ],
  },
  {
    title: 'Pastry',
    items: [
      ['Croissant', ''],
      ['Pain au chocolat', ''],
      ['Morning bun', ''],
      ['Doughnuts', ''],
    ],
  },
];

const PREORDER = [
  ['Oat porridge loaf', '£5.00'],
  ['White sourdough', '£4.50'],
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <BakeHero />

        <StackOverlap id="counter" className="py-[var(--section-y)]">
          <Container className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Heading size="h1" className="max-w-[10ch]">
                On the counter
              </Heading>
              <p className="mt-6 max-w-[38ch] text-muted">
                What we bake changes from day to day, so this is the usual line-up rather than a
                promise. The full pastry counter is on Fridays and Saturdays.
              </p>
              <Reveal className="mt-10 hidden md:block">
                <Image
                  src="/img/croissant.webp"
                  alt="A croissant with crisp, dark-baked layers"
                  ratio="1400/1260"
                  sizes="40vw"
                  className="rounded-md"
                />
              </Reveal>
            </div>
            <div className="grid gap-12 sm:grid-cols-2 md:col-span-6 md:col-start-7 md:pt-4">
              {COUNTER.map((group) => (
                <div key={group.title}>
                  <h3 className="border-b border-line pb-3 text-small font-medium text-muted">
                    {group.title}
                  </h3>
                  <ul>
                    {group.items.map(([name, note]) => (
                      <li key={name} className="border-b border-line py-4">
                        <span className="font-display text-h4">{name}</span>
                        {note && <span className="mt-1 block text-small text-muted">{note}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </StackOverlap>

        <Section theme="dark" id="preorder">
          <Container className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-6">
              <Heading size="h1" className="max-w-[12ch]">
                Thursday bread, put aside for you
              </Heading>
              <p className="mt-6 max-w-[40ch] text-muted">
                Order online and collect on Thursday between 8am and 5pm. Can’t make it? We keep
                your loaf until Saturday.
              </p>
              <div className="mt-10">
                <Button href={site.shop} size="lg">
                  Pre-order in our shop
                </Button>
              </div>
            </div>
            <ul className="self-end md:col-span-5 md:col-start-8">
              {PREORDER.map(([name, price]) => (
                <li
                  key={name}
                  className="flex items-baseline justify-between gap-6 border-b border-line py-5"
                >
                  <span className="font-display text-h3">{name}</span>
                  <span className="text-body tabular-nums text-muted">{price}</span>
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        <section data-theme="pink" id="helen" className="bg-bg py-[var(--section-y)] text-fg">
          <Container className="grid items-center gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <Image
                src="/img/box.webp"
                alt="A pink box of pastries: croissants, pain au chocolat and a cinnamon bun"
                ratio="1600/768"
                sizes="(min-width: 768px) 58vw, 100vw"
                className="rounded-md"
              />
            </Reveal>
            <div className="md:col-span-4 md:col-start-9">
              <Heading className="max-w-[12ch]">Helen’s bakery</Heading>
              <div className="mt-6 space-y-4 text-fg/80">
                <p>
                  Helen Evans has baked in Melbourne and Lima, and ran the bakery at Flor until it
                  closed in 2022. Eric’s is her own place, opened on Upland Road in April 2023.
                </p>
                <p>
                  It is a small corner shop with yellow tiles and ash-wood shelves, a few minutes’
                  walk from Peckham Rye park. Helen also teaches the odd class in croissants and
                  puff pastry.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section data-theme="sage" id="visit" className="bg-bg py-[var(--section-y)] text-fg">
          <Container className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Heading size="h1" className="max-w-[9ch]">
                Come early
              </Heading>
              <address className="mt-8 not-italic">
                <p className="font-display text-h3">20 Upland Road</p>
                <p className="mt-1 text-muted">East Dulwich, London SE22 9EF</p>
              </address>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                <Button href={site.contacts.map}>Open in Maps</Button>
                <Button href={`mailto:${site.contacts.email}`} variant="ghost">
                  {site.contacts.email}
                </Button>
              </div>
            </div>
            <dl className="md:col-span-6 md:col-start-7">
              {site.hours.map((h) => (
                <div
                  key={h.day}
                  className="grid gap-1 border-b border-line py-5 first:border-t sm:grid-cols-[9rem_1fr]"
                >
                  <dt className="font-medium">{h.day}</dt>
                  <dd>
                    <span className="font-display text-h4">{h.time}</span>
                    <span className="mt-1 block text-small text-muted">{h.note}</span>
                  </dd>
                </div>
              ))}
              <p className="pt-5 text-small text-muted">
                Closed Sunday to Wednesday. “Until sold out” usually means early afternoon.
              </p>
            </dl>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
