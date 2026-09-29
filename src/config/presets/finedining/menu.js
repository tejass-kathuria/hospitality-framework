export const menuConfig = {
  title: 'Tasting Experience',
  subtitle:
    'A nine-course progressive journey through seasonal terroir and artisanal technique.',
  categories: [
    { id: 'tasting', name: 'Autumn Tasting Menu' },
    { id: 'supplement', name: 'Reserve Supplements' },
    { id: 'pairing', name: 'Curated Pairings' },
    { id: 'digestif', name: 'Digestifs & Rare Teas' },
  ],
  items: [
    {
      id: 'fd1',
      name: 'Hokkaido Scallop & White Truffle',
      category: 'tasting',
      price: '$285 Prix Fixe',
      description:
        'Pan-seared live scallop, dashi-steeped turnip velouté, Alba white truffle shavings, and brown butter emulsion.',
      dietary: ['Gluten-Free'],
      featured: true,
      image:
        'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'fd2',
      name: 'A5 Miyazaki Wagyu Tenderloin',
      category: 'tasting',
      price: 'Included',
      description:
        'Bincho-tan charcoal grilled Wagyu beef, charred maitake mushroom, smoked bone marrow bordelaise, and black garlic glaze.',
      dietary: ['Gluten-Free'],
      featured: true,
      image:
        'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'fd3',
      name: 'Brittany Turbot & Caviar',
      category: 'tasting',
      price: 'Included',
      description:
        'Butter-poached wild turbot, Kaluga Imperial caviar, sea lettuce crisp, and vin jaune reduction.',
      dietary: ['Gluten-Free', 'Pescatarian'],
      featured: true,
      image:
        'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'fd4',
      name: 'Royal Osetra Caviar Service',
      category: 'supplement',
      price: '$120 Supplement',
      description:
        '30g Royal Osetra caviar, buckwheat blinis, cultured Normandy crème fraîche, and cured egg yolk confit.',
      dietary: ['Pescatarian'],
      featured: true,
      image:
        'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'fd5',
      name: 'Grand Cru Sommelier Wine Pairing',
      category: 'pairing',
      price: '$195 / Guest',
      description:
        'Six pours featuring biodynamic grower Champagne, Premier Cru Burgundy, and historic Barolo reserves.',
      dietary: ['Vegan', 'Gluten-Free'],
      featured: false,
      image:
        'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'fd6',
      name: 'Valrhona Guanaja 70% Soufflé',
      category: 'tasting',
      price: 'Included',
      description:
        'Warm dark chocolate soufflé, Madagascar bourbon vanilla bean gelato, and 25-year aged balsamic drizzle.',
      dietary: ['Vegetarian'],
      featured: true,
      image:
        'https://images.unsplash.com/photo-1579372786545-d24232daf58c?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'fd7',
      name: 'Vintage Chartreuse & Single-Estate Tea',
      category: 'digestif',
      price: '$45 / Flight',
      description:
        'Rare 1980s V.E.P. Yellow Chartreuse served alongside high-mountain Taiwanese Oolong ceremonial brew.',
      dietary: ['Vegan', 'Gluten-Free'],
      featured: false,
      image:
        'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=600&auto=format&fit=crop',
    },
  ],
}
