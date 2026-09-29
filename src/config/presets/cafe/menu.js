export const menuConfig = {
  title: 'Our Menu',
  subtitle: 'Thoughtfully crafted beverages and fresh artisanal baked goods.',
  categories: [
    { id: 'espresso', name: 'Espresso & Milk' },
    { id: 'filter', name: 'Single Origin Filter' },
    { id: 'specialty', name: 'Signature Brews' },
    { id: 'pastry', name: 'Bakery & Brunch' },
  ],
  items: [
    {
      id: 'm1',
      name: 'Double Espresso',
      category: 'espresso',
      price: '$4.00',
      description:
        'Rich, velvety double shot of our house seasonal blend with notes of dark chocolate and stone fruit.',
      dietary: ['Vegan', 'Gluten-Free'],
      featured: true,
      image:
        'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'm2',
      name: 'Oat Milk Flat White',
      category: 'espresso',
      price: '$5.50',
      description:
        'Silky micro-foamed organic oat milk poured over a ristretto espresso shot.',
      dietary: ['Vegan', 'Dairy-Free'],
      featured: true,
      image:
        'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'm3',
      name: 'Yirgacheffe Pour-Over',
      category: 'filter',
      price: '$6.50',
      description:
        'Ethiopian heirloom single origin via V60. Delicate jasmine floral aroma with bergamot and lemon zest.',
      dietary: ['Vegan', 'Gluten-Free'],
      featured: true,
      image:
        'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'm4',
      name: 'Matcha Tonic',
      category: 'specialty',
      price: '$6.50',
      description:
        'Ceremonial grade Uji matcha layered over artisanal tonic water and fresh Yuzu citrus.',
      dietary: ['Vegan', 'Gluten-Free'],
      featured: true,
      image:
        'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'm5',
      name: 'Cardamom Cold Brew',
      category: 'specialty',
      price: '$6.00',
      description:
        '24-hour slow steeped cold brew infused with green cardamom pods and a touch of agave nectar.',
      dietary: ['Vegan', 'Gluten-Free'],
      featured: false,
      image:
        'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'm6',
      name: 'Almond Butter Croissant',
      category: 'pastry',
      price: '$5.00',
      description:
        'Flaky 81-layer butter croissant filled with house-made roasted almond cream and toasted flakes.',
      dietary: ['Vegetarian'],
      featured: true,
      image:
        'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'm7',
      name: 'Avocado & Sourdough Toast',
      category: 'pastry',
      price: '$12.00',
      description:
        'Smashed Hass avocado, heirloom cherry tomatoes, dukkah spice, and microgreens on wild sourdough.',
      dietary: ['Vegan'],
      featured: false,
      image:
        'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?q=80&w=600&auto=format&fit=crop',
    },
  ],
}
