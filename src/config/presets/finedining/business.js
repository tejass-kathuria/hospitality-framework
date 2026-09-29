export const businessConfig = {
  name: 'Nocturne Restaurant & Wine Cellar',
  shortName: 'Nocturne',
  tagline: 'Modern Gastronomy & Curated Terroir',
  description:
    'An intimate multi-course culinary experience celebrating seasonal heritage ingredients, wood-fired nuances, and biodynamic grand cru pairings in SoHo.',
  establishedYear: 2021,
  contact: {
    address: {
      street: '28 Mercer Street, SoHo',
      city: 'New York',
      state: 'NY',
      zip: '10013',
      country: 'USA',
      fullAddress: '28 Mercer Street, SoHo, New York, NY 10013',
    },
    phone: '+1 (212) 890-4420',
    email: 'reservations@nocturnerestaurant.com',
    googleMapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.6331904712497!2d-74.002244!3d40.720917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQzJzE1LjMiTiA3NMKwMDAnMDguMSJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus',
  },
  openingHours: [
    { days: 'Tuesday - Thursday', hours: '5:30 PM - 10:30 PM' },
    { days: 'Friday - Saturday', hours: '5:00 PM - 11:30 PM' },
    { days: 'Sunday', hours: '5:00 PM - 10:00 PM' },
    { days: 'Monday', hours: 'Private Cellar Tastings Only' },
  ],
  socialMedia: [
    {
      platform: 'Instagram',
      url: 'https://instagram.com',
      handle: '@nocturnerestaurant',
    },
    {
      platform: 'Michelin Guide',
      url: 'https://guide.michelin.com',
      handle: 'Nocturne NYC',
    },
    { platform: 'Resy', url: 'https://resy.com', handle: 'Nocturne' },
  ],
  hero: {
    headline: 'Culinary Artistry in SoHo.',
    subheadline:
      'Indulge in a curated nine-course tasting journey paired with rare vintage cellar reserves in an atmosphere of quiet luxury.',
    ctaPrimary: 'Reserve Table',
    ctaSecondary: 'Tasting Menu',
    bgImage:
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1920&auto=format&fit=crop',
  },
  about: {
    title: 'The Philosophy',
    subtitle: 'Precision, heritage terroir, and relentless curiosity.',
    content: [
      'Under the creative direction of Executive Chef Julian Vance, Nocturne explores the poetic intersection of classical French technique and contemporary Nordic minimalism.',
      'Our tasting menus evolve bi-weekly in response to micro-seasons, working in close concert with biodynamic Hudson Valley foragers, Maine diver scallop fishermen, and heritage Japanese purveyors.',
      'Complementing each course is a cellar of over 1,200 organic, low-intervention, and historic Grand Cru vintages curated by Head Sommelier Mireille Moreau.',
    ],
    image1:
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop',
    image2:
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop',
    stat1: { number: '3 Stars', label: 'Culinary Distinction' },
    stat2: { number: '1,200+', label: 'Cellar Labels' },
  },
}
