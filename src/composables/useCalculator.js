import { ref, computed, watch } from 'vue';
import { RECIPES } from '../data/recipes';

const STORAGE_KEY = 'game_calc_state';

export function useCalculator() {
  const activeCategory = ref('bento');
  const targetItemId = ref('bento1');
  const targetQuantity = ref(1);

  // Restore session data
  const savedState = sessionStorage.getItem(STORAGE_KEY);

  if (savedState) {
    try {
      const parsed = JSON.parse(savedState);

      activeCategory.value = parsed.category || 'bento';
      targetItemId.value = parsed.itemId || 'bento1';
      targetQuantity.value = parsed.quantity || 1;

    } catch (e) {
      console.error('Failed to parse session storage', e);
    }
  }

  // Save changes
  watch(
    [activeCategory, targetItemId, targetQuantity],
    () => {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          category: activeCategory.value,
          itemId: targetItemId.value,
          quantity: targetQuantity.value
        })
      );
    },
    { deep: true }
  );


  // =====================================================
  // CALCULATION
  // =====================================================

  const calculationResult = computed(() => {

    const rootItem = RECIPES.items[targetItemId.value];

    if (!rootItem) {
      return {
        finalItem: null,
        directIngredients: [],
        rawMaterials: [],
        totalWeight: 0,
        totalCost: 0
      };
    }

    const qty = Math.max(
      0,
      Number(targetQuantity.value) || 0
    );

    const directIngredients = [];
    const rawMaterialsMap = {};
    const currencyMap = {};


    function processIngredient(
      itemId,
      requiredQty,
      depth = 0
    ) {

      const item = RECIPES.items[itemId];

      if (!item) return;


      // ================================================
      // CURRENCY
      // ================================================

      if (item.type === 'currency') {

        if (!currencyMap[itemId]) {
          currencyMap[itemId] = {
            ...item,
            requiredQty: 0,
            totalWeight: 0
          };
        }

        currencyMap[itemId].requiredQty += requiredQty;

        return;
      }


      // ================================================
      // NORMAL WEIGHT
      // ================================================

      const totalRequiredWeight =
        (item.weight || 0) * requiredQty;


      // ================================================
      // DIRECT TIER 1
      // ================================================

      if (depth === 1) {

        directIngredients.push({
          ...item,
          requiredQty,
          totalWeight: totalRequiredWeight
        });
      }


      // ================================================
      // HAS SUB-INGREDIENTS
      // ================================================

      if (
        item.ingredients &&
        item.ingredients.length > 0
      ) {

        const craftingCycles =
          Math.ceil(
            requiredQty / (item.yield || 1)
          );


        item.ingredients.forEach(sub => {

          const subQtyNeeded =
            sub.quantity * craftingCycles;

          processIngredient(
            sub.itemId,
            subQtyNeeded,
            depth + 1
          );

        });

      }

      // ================================================
      // RAW MATERIAL
      // ================================================

      else if (depth > 0) {

        if (!rawMaterialsMap[itemId]) {

          rawMaterialsMap[itemId] = {
            ...item,
            requiredQty: 0,
            totalWeight: 0
          };

        }

        rawMaterialsMap[itemId].requiredQty +=
          requiredQty;

        rawMaterialsMap[itemId].totalWeight +=
          totalRequiredWeight;
      }
    }


    // Start calculation
    processIngredient(
      targetItemId.value,
      qty,
      0
    );


    const rawMaterials =
      Object.values(rawMaterialsMap);

    const currencies =
      Object.values(currencyMap);


    const finalItemWeight =
      (rootItem.weight || 0) * qty;


    const totalCost =
      currencies.reduce(
        (total, money) =>
          total + money.requiredQty,
        0
      );


    return {

      finalItem: {
        ...rootItem,
        requiredQty: qty,
        totalWeight: finalItemWeight
      },

      directIngredients,

      rawMaterials,

      currencies,

      totalCost,

      totalWeight: finalItemWeight
    };
  });


  return {
    activeCategory,
    targetItemId,
    targetQuantity,
    calculationResult
  };
}
