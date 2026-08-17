import { ref, computed, watch } from 'vue';
import { RECIPES } from '../data/recipes';

const STORAGE_KEY = 'game_calc_state';

export function useCalculator() {
  const activeCategory = ref('bento');
  const targetItemId = ref('bento1');
  const targetQuantity = ref(1);

  // Restore session data if page reloads (clears automatically when tab closes)
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

  // Save changes to sessionStorage
  watch([activeCategory, targetItemId, targetQuantity], () => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
      category: activeCategory.value,
      itemId: targetItemId.value,
      quantity: targetQuantity.value
    }));
  }, { deep: true });

  // Calculation Breakdown
  const calculationResult = computed(() => {
    const rootItem = RECIPES.items[targetItemId.value];
    if (!rootItem) return { direct: [], raw: [], totalWeight: 0 };

    const qty = Math.max(0, Number(targetQuantity.value) || 0);
    const directIngredients = [];
    const rawMaterialsMap = {};

    function processIngredient(itemId, requiredQty, depth = 0) {
      const item = RECIPES.items[itemId];
      if (!item) return;

      const totalRequiredWeight = (item.weight || 0) * requiredQty;

      // Track direct tier-1 ingredients
      if (depth === 1) {
        directIngredients.push({
          ...item,
          requiredQty,
          totalWeight: totalRequiredWeight
        });
      }

      // If it has base ingredients, resolve them recursively
      if (item.ingredients && item.ingredients.length > 0) {
        const craftingCycles = Math.ceil(requiredQty / (item.yield || 1));
        
        item.ingredients.forEach(sub => {
          const subQtyNeeded = sub.quantity * craftingCycles;
          processIngredient(sub.itemId, subQtyNeeded, depth + 1);
        });
      } else if (depth > 0) {
        // Base Raw Material
        if (!rawMaterialsMap[itemId]) {
          rawMaterialsMap[itemId] = {
            ...item,
            requiredQty: 0,
            totalWeight: 0
          };
        }
        rawMaterialsMap[itemId].requiredQty += requiredQty;
        rawMaterialsMap[itemId].totalWeight += totalRequiredWeight;
      }
    }

    processIngredient(targetItemId.value, qty, 0);

    const rawMaterials = Object.values(rawMaterialsMap);
    const finalItemWeight = (rootItem.weight || 0) * qty;

    return {
      finalItem: { ...rootItem, requiredQty: qty, totalWeight: finalItemWeight },
      directIngredients,
      rawMaterials,
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