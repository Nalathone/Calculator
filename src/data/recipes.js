// Helper function to get correct image URL
const getImageUrl = (name) => {
  return new URL(`../assets/images/${name}`, import.meta.url).href;
};

export const RECIPES = {
  categories: [
    { id: 'bento', label: 'Bento Sets', icon: '🍱' },
    { id: 'tungsten', label: 'Tungsten Crafting', icon: '🪨' }
  ],

  items: {
    bento1: {
      id: 'bento1',
      name: 'Bento 1',
      category: 'bento',
      weight: 1.0,
      unit: 'pack',
      yield: 1,
      image: getImageUrl('bento1.jpg'), // <--- Use helper function
      ingredients: [
        { itemId: 'wood_pack', quantity: 2 },
        { itemId: 'sliced_pork_pack', quantity: 2 },
        { itemId: 'rice_pack', quantity: 2 },
        { itemId: 'milk_pack', quantity: 2 },
        { itemId: 'sauce', quantity: 1 }
      ]
    },
    bento2: {
      id: 'bento2',
      name: 'Bento 2',
      category: 'bento',
      weight: 1.2,
      unit: 'pack',
      yield: 1,
      image: getImageUrl('bento2.png'),
      ingredients: [
        { itemId: 'wood_pack', quantity: 3 },
        { itemId: 'sliced_pork_pack', quantity: 4 },
        { itemId: 'rice_pack', quantity: 2 }
      ]
    },
    wood_pack: {
      id: 'wood_pack',
      name: 'Wood Pack',
      weight: 0.2,
      unit: 'pack',
      yield: 2,
      image: getImageUrl('wood_pack.jpg'),
      ingredients: [{ itemId: 'normal_wood', quantity: 4 }]
    },
    sliced_pork_pack: {
      id: 'sliced_pork_pack',
      name: 'Sliced Pork Pack',
      weight: 0.3,
      unit: 'pack',
      yield: 1,
      image: getImageUrl('pork_pack.jpg'),
      ingredients: [{ itemId: 'raw_pork', quantity: 2 }]
    },
    rice_pack: {
      id: 'rice_pack',
      name: 'Rice Pack',
      weight: 0.2,
      unit: 'pack',
      yield: 1,
      image: getImageUrl('rice_pack.jpg'),
      ingredients: [{ itemId: 'raw_rice', quantity: 3 }]
    },
    milk_pack: {
      id: 'milk_pack',
      name: 'Milk Pack',
      weight: 0.1,
      unit: 'pack',
      yield: 1,
      image: getImageUrl('milk_pack.jpg'),
      ingredients: [{ itemId: 'raw_milk', quantity: 2 }]
    },
    sauce: {
      id: 'sauce',
      name: 'Sauce',
      weight: 0.05,
      unit: 'bottle',
      yield: 1,
      image: getImageUrl('sauce.jpg'),
      ingredients: []
    },
    normal_wood: {
      id: 'normal_wood',
      name: 'Normal Wood',
      weight: 0.05,
      unit: 'pcs',
      image: getImageUrl('normal_wood.jpg'),
      ingredients: []
    },
    raw_pork: {
      id: 'raw_pork',
      name: 'Raw Pork',
      weight: 0.1,
      unit: 'pcs',
      image: getImageUrl('raw_pork.jpg'),
      ingredients: []
    },
    raw_rice: {
      id: 'raw_rice',
      name: 'Raw Rice',
      weight: 0.05,
      unit: 'pcs',
      image: getImageUrl('raw_rice.jpg'),
      ingredients: []
    },
    raw_milk: {
      id: 'raw_milk',
      name: 'Raw Milk',
      weight: 0.05,
      unit: 'pcs',
      image: getImageUrl('raw_milk.jpg'),
      ingredients: []
    }
  }
};