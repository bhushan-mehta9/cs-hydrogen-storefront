/**
 * Fallback copy inspired by the Shopify Local theme (Krown Themes).
 * @see https://themes.shopify.com/themes/local/presets/local
 */
export const localThemeReference = {
  themeName: 'Local',
  designer: 'Krown Themes',
  tagline: 'The best Shopify theme for food, beverage, and local retail',
  themeUrl: 'https://themes.shopify.com/themes/local/presets/local',
};

export const aboutFallback = {
  title: 'About us',
  intro:
    'We are a neighborhood-first shop built for food, beverage, and local retail — the same audience the Local theme is designed for.',
  sections: [
    {
      heading: 'Local selling made easy',
      body: 'Whether you sell online, in-store, or both, we connect your community to fresh goods with pickup-friendly workflows and clear product storytelling.',
    },
    {
      heading: 'Rooted in quality',
      body: 'From farm partners to artisan makers, we highlight provenance, ingredients, and the people behind every product on our shelves.',
    },
    {
      heading: 'Headless + Shopify',
      body: 'This storefront loads catalog data from your Shopify store via the Storefront API and Hydrogen — customize the experience while keeping commerce on Shopify.',
    },
  ],
};

export const themeFeaturesFallback = {
  title: 'Theme features',
  intro:
    'Local includes 30+ sections and industry tools for food & drink merchants. This headless demo mirrors key ideas from the reference theme.',
  groups: [
    {
      title: 'Cart & checkout',
      items: [
        'Cart notes',
        'In-store pickups',
        'Quick buy',
        'Cart notifications',
        'Sticky cart summary',
      ],
    },
    {
      title: 'Marketing & conversion',
      items: [
        'Promo banners',
        'Product badges',
        'Cross-selling',
        'FAQ page',
        'Trust badges',
        'Countdown timer',
      ],
    },
    {
      title: 'Merchandising',
      items: [
        'Slideshow',
        'Product tabs',
        'Ingredients / nutritional info',
        'Image galleries & zoom',
        'Color swatches',
        'High-resolution images',
      ],
    },
    {
      title: 'Product discovery',
      items: [
        'Collections menu',
        'Sticky header',
        'Breadcrumbs',
        'Collection filters',
        'Enhanced search',
        'Recommended products',
      ],
    },
    {
      title: 'Local 4.2 highlight',
      items: [
        'Built-in events calendar — create, list, and sell tickets for in-person experiences (in the Liquid theme).',
      ],
    },
  ],
};

/** Shown when no Shopify FAQ page exists (accordion UI matches backup styling). */
export const faqFallback = [
  {
    question: 'How does local delivery work?',
    answer:
      'Orders over $50 qualify for free local delivery in participating neighborhoods. You’ll see available options at Shopify checkout.',
  },
  {
    question: 'Can I pick up my order in store?',
    answer:
      'Yes. Choose pickup at checkout when your store offers it. You’ll receive an email when your order is ready.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'Perishable goods may have limited returns. Packaged goods can usually be returned within 14 days if unopened. See your store policies for details.',
  },
  {
    question: 'How do I use a discount code?',
    answer:
      'Enter codes like BULKSAVE in the discount field at checkout. Promo codes from our announcement bar apply to eligible items only.',
  },
  {
    question: 'Where is my order?',
    answer:
      'After checkout you’ll get a confirmation email from Shopify with tracking when available. Contact the store if you need help with an order.',
  },
];

export const eventsFallback = [
  {
    id: 'fallback-1',
    title: 'Farmers market tasting',
    date: 'Every Saturday · 9am–1pm',
    excerpt:
      'Sample seasonal produce and meet local growers — inspired by Local’s community retail focus.',
    location: 'Main street pop-up',
  },
  {
    id: 'fallback-2',
    title: 'Coffee cupping night',
    date: 'First Friday · 6pm',
    excerpt:
      'Guided tasting with regional roasters. Tickets available at the door.',
    location: 'In-store event space',
  },
  {
    id: 'fallback-3',
    title: 'Bulk pantry workshop',
    date: 'Monthly · RSVP required',
    excerpt:
      'Learn storage tips and bundle deals — aligns with Local promo tools like BULKSAVE-style campaigns.',
    location: 'Online + pickup',
  },
];
