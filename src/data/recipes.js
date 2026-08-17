// =====================================================
// IMAGE HELPER
// =====================================================

const getImageUrl = (name) => {
  return new URL(`../assets/images/${name}`, import.meta.url).href;
};


// =====================================================
// RECIPES
// =====================================================

export const RECIPES = {
  categories: [
    {
      id: 'bento',
      label: 'Bento Sets',
      icon: '🍱',
    },
  ],

  items: {

    // =====================================================
    // BENTO 1
    // =====================================================
    bento1: {
      id: 'bento1',
      name: 'Bento 1',
      category: 'bento',
      weight: 1.0,
      unit: 'pack',
      yield: 1,
      image: getImageUrl('bento1.webp'),

      ingredients: [
        { itemId: 'cash', quantity: 50 },

        { itemId: 'wood_pack', quantity: 2 },
        { itemId: 'sliced_pork_pack', quantity: 2 },
        { itemId: 'rice_pack', quantity: 2 },
        { itemId: 'milk_pack', quantity: 1 },
        { itemId: 'sauce', quantity: 1 },
      ]
    },


    // =====================================================
    // BENTO 2
    // =====================================================
    bento2: {
      id: 'bento2',
      name: 'Bento 2',
      category: 'bento',
      weight: 1.0,
      unit: 'pack',
      yield: 1,
      image: getImageUrl('bento2.webp'),

      ingredients: [
        { itemId: 'cash', quantity: 50 },

        { itemId: 'milk_pack', quantity: 1 },
        { itemId: 'grape_pack', quantity: 2 },
        { itemId: 'papaya_pack', quantity: 2 },
        { itemId: 'wood_pack', quantity: 2 },
        { itemId: 'sugar', quantity: 3 },
        { itemId: 'salt', quantity: 1 },
      ]
    },


    // =====================================================
    // BENTO 3
    // =====================================================
    bento3: {
      id: 'bento3',
      name: 'Bento 3',
      category: 'bento',
      weight: 1.0,
      unit: 'pack',
      yield: 1,
      image: getImageUrl('bento3.webp'),

      ingredients: [
        { itemId: 'cash', quantity: 50 },

        { itemId: 'sauce', quantity: 1 },
        { itemId: 'wood_pack', quantity: 2 },
         { itemId: 'milk_pack', quantity: 2 },
        { itemId: 'sugar', quantity: 1 },
        { itemId: 'crab_pack', quantity: 1 },
        { itemId: 'rice_pack', quantity: 2 },
      ]
    },


    // =====================================================
    // PACKS
    // =====================================================

    wood_pack: {
      id: 'wood_pack',
      name: 'Pack Wood',
      weight: 0.2,
      unit: 'pack',
      yield: 1,
      image: getImageUrl('wood_pack.webp'),

      ingredients: [
        { itemId: 'normal_wood', quantity: 2 }
      ]
    },

    sliced_pork_pack: {
      id: 'sliced_pork_pack',
      name: 'Pack Sliced Pork',
      weight: 0.2,
      unit: 'pack',
      yield: 1,
      image: getImageUrl('pork_pack.webp'),

      ingredients: [
        { itemId: 'raw_pork', quantity: 2 }
      ]
    },

    rice_pack: {
      id: 'rice_pack',
      name: 'Pack Rice',
      weight: 0.2,
      unit: 'pack',
      yield: 1,
      image: getImageUrl('rice_pack.webp'),

      ingredients: [
        { itemId: 'raw_rice', quantity: 2 }
      ]
    },

    milk_pack: {
      id: 'milk_pack',
      name: 'Pack Milk',
      weight: 0.2,
      unit: 'pack',
      yield: 1,
      image: getImageUrl('milk_pack.webp'),

      ingredients: [
        { itemId: 'raw_milk', quantity: 2 }
      ]
    },

    grape_pack: {
      id: 'grape_pack',
      name: 'Pack Grape',
      weight: 0.2,
      unit: 'pack',
      yield: 1,
      image: getImageUrl('packgrape.webp'),

      ingredients: [
        { itemId: 'raw_grape', quantity: 2 }
      ]
    },

    papaya_pack: {
      id: 'papaya_pack',
      name: 'Pack Papaya',
      weight: 0.2,
      unit: 'pack',
      yield: 1,
      image: getImageUrl('packpapaya.webp'),

      ingredients: [
        { itemId: 'raw_papaya', quantity: 2 }
      ]
    },

    crab_pack: {
      id: 'crab_pack',
      name: 'Pack Crab',
      weight: 0.2,
      unit: 'pack',
      yield: 1,
      image: getImageUrl('packcrab.webp'),

      ingredients: [
        { itemId: 'raw_crab', quantity: 2 }
      ]
    },


    // =====================================================
    // DIRECT ITEMS
    // =====================================================

    sauce: {
      id: 'sauce',
      name: 'Sauce',
      weight: 0.25,
      unit: 'bottle',
      yield: 1,
      image: getImageUrl('sauce.webp'),

      ingredients: []
    },

    sugar: {
      id: 'sugar',
      name: 'Sugar',
      weight: 0.1,
      unit: 'pcs',
      yield: 1,
      image: getImageUrl('sugar.webp'),

      ingredients: []
    },

    salt: {
      id: 'salt',
      name: 'Salt',
      weight: 0.1,
      unit: 'pcs',
      yield: 1,
      image: getImageUrl('salt.webp'),

      ingredients: []
    },


    // =====================================================
    // CASH
    // =====================================================

    cash: {
      id: 'cash',
      name: 'Cash',
      weight: 0,
      unit: 'KKD',
      yield: 1,
      type: 'currency',
      image: getImageUrl('cash.webp'),

      ingredients: []
    },


    // =====================================================
    // RAW MATERIALS
    // =====================================================

    normal_wood: {
      id: 'normal_wood',
      name: 'Wood',
      weight: 0.2,
      unit: 'pcs',
      yield: 1,
      image: getImageUrl('normal_wood.webp'),

      ingredients: []
    },

    raw_pork: {
      id: 'raw_pork',
      name: 'Pig',
      weight: 0.2,
      unit: 'pcs',
      yield: 1,
      image: getImageUrl('raw_pork.webp'),

      ingredients: []
    },

    raw_rice: {
      id: 'raw_rice',
      name: 'Rice',
      weight: 0.2,
      unit: 'pcs',
      yield: 1,
      image: getImageUrl('raw_rice.webp'),

      ingredients: []
    },

    raw_milk: {
      id: 'raw_milk',
      name: 'Milk',
      weight: 0.2,
      unit: 'pcs',
      yield: 1,
      image: getImageUrl('raw_milk.webp'),

      ingredients: []
    },

    raw_grape: {
      id: 'raw_grape',
      name: 'Grape',
      weight: 0.2,
      unit: 'pcs',
      yield: 1,
      image: getImageUrl('grape.webp'),

      ingredients: []
    },

    raw_papaya: {
      id: 'raw_papaya',
      name: 'Papaya',
      weight: 0.2,
      unit: 'pcs',
      yield: 1,
      image: getImageUrl('papaya.webp'),

      ingredients: []
    },

    raw_crab: {
      id: 'raw_crab',
      name: 'Crab',
      weight: 0.2,
      unit: 'pcs',
      yield: 1,
      image: getImageUrl('crab.webp'),

      ingredients: []
    }
  }
};
