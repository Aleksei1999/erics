export type NavItem = { label: string; href: string };

export const site = {
  name: "Eric's",
  shortName: "Eric's",
  tagline: 'A neighbourhood bakery in East Dulwich',
  description:
    'Sourdough, croissants and focaccia from UK-grown wheat. Upland Road, SE22. Open Thursday to Saturday.',
  // домен без слеша на конце: нужен для canonical, sitemap и OG
  url: 'https://aleksei1999.github.io/erics',
  locale: 'en_GB',
  lang: 'en',
  ogImage: '/og.jpg',

  contacts: {
    email: 'hello@ericslondon.com',
    address: '20 Upland Road, London SE22 9EF',
    map: 'https://maps.google.com/?q=20+Upland+Road+London+SE22+9EF',
  },

  hours: [
    {
      day: 'Thursday',
      time: '8am – 5pm',
      note: 'Bread all day, sandwiches from 10:30. Not the full pastry counter.',
    },
    { day: 'Friday', time: '8am until sold out', note: 'Full selection of bread and pastries.' },
    { day: 'Saturday', time: '9am until sold out', note: 'Full selection of bread and pastries.' },
  ],

  nav: [
    { label: 'The counter', href: '/#counter' },
    { label: 'Thursday bread', href: '/#preorder' },
    { label: 'Helen', href: '/#helen' },
    { label: 'Visit', href: '/#visit' },
  ] satisfies NavItem[],

  cta: { label: 'Pre-order bread', href: '/#preorder' },
  shop: 'https://www.ericslondon.com/collections/shop-pre-order',

  socials: [{ label: 'Instagram', href: 'https://instagram.com/ericslondon/' }] satisfies NavItem[],

  legal: [{ label: 'Privacy', href: '/privacy/' }] satisfies NavItem[],

  forms: {
    endpoint: 'https://formsubmit.co/ajax/hello@ericslondon.com',
    subject: "Message from Eric's website",
  },
};

export type Site = typeof site;
