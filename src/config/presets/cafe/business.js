export const businessConfig = {
  name: 'Aura Coffee Roasters',
  shortName: 'Aura',
  tagline: 'Artisan Coffee & Mindful Atmosphere',
  description:
    'A contemporary specialty coffee shop and micro-roastery dedicated to ethically sourced beans, minimalist aesthetics, and community connection.',
  establishedYear: 2022,
  contact: {
    address: {
      street: '454 Artisan Alley, Design District',
      city: 'New York',
      state: 'NY',
      zip: '10013',
      country: 'USA',
      fullAddress: '454 Artisan Alley, Design District, New York, NY 10013',
    },
    phone: '+1 (555) 234-5678',
    email: 'hello@auracoffee.com',
    googleMapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6173590740884!2d-73.985130!3d40.748817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU1LjciTiA3M8KwNTknMDYuNSJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus',
  },
  openingHours: [
    { days: 'Monday - Friday', hours: '7:00 AM - 6:00 PM' },
    { days: 'Saturday', hours: '8:00 AM - 7:00 PM' },
    { days: 'Sunday', hours: '8:00 AM - 5:00 PM' },
  ],
  socialMedia: [
    {
      platform: 'Instagram',
      url: 'https://instagram.com',
      handle: '@auracoffeeroasters',
    },
    {
      platform: 'Facebook',
      url: 'https://facebook.com',
      handle: 'auracoffeeroasters',
    },
    { platform: 'X', url: 'https://x.com', handle: '@auracoffee' },
  ],
  hero: {
    headline: 'Crafted with Intention.',
    subheadline:
      'Experience precision-brewed single origin coffees in a space designed for quiet clarity.',
    ctaPrimary: 'Explore Menu',
    ctaSecondary: 'Visit Us',
    bgImage:
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1920&auto=format&fit=crop',
  },
  about: {
    title: 'Our Story',
    subtitle: 'Sourced with integrity, roasted with care.',
    content: [
      'Founded in 2022, Aura Coffee Roasters was created to bring mindfulness and craftsmanship back to the daily coffee ritual.',
      'We work directly with smallholder farmers across Ethiopia, Colombia, and Guatemala to source micro-lots produced with environmentally sustainable practices.',
      'Every bean is small-batch roasted in-house to highlight its native terroir, floral notes, and natural sweetness.',
    ],
    image1:
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop',
    image2:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
    stat1: { number: '100%', label: 'Direct Trade Beans' },
    stat2: { number: '12+', label: 'Single Origins' },
  },
}
