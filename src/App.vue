<template>
  <div :class="['calculator-app', `theme-${currentTheme}`]">
    <!-- Top Navigation Bar -->
    <header class="top-nav">
      <div class="brand">
        <span class="logo-icon">⚔️</span>
        <h1>Crafting Calculator</h1>
      </div>

      <!-- Theme Switcher Buttons -->
      <div class="theme-selector">
        <button
          v-for="t in themes"
          :key="t.id"
          :class="['theme-badge', { active: currentTheme === t.id }]"
          @click="setTheme(t.id)"
        >
          {{ t.label }}
        </button>
      </div>

      <!-- Category Tabs -->
      <nav class="category-tabs">
        <button
          v-for="cat in categories"
          :key="cat.id"
          :class="['tab-btn', { active: activeCategory === cat.id }]"
          @click="selectCategory(cat.id)"
        >
          <span class="tab-icon">{{ cat.icon }}</span>
          <span class="tab-label">{{ cat.label }}</span>
        </button>
      </nav>
    </header>

    <!-- Main Workspace -->
    <main class="workspace">
      <!-- Item Selection & Target Setup -->
      <section class="control-panel card">
        <h2>Select Recipe</h2>
        <div class="item-selector">
          <button
            v-for="item in availableItems"
            :key="item.id"
            :class="['item-card', { selected: targetItemId === item.id }]"
            @click="targetItemId = item.id"
          >
            <div class="img-wrapper">
              <img :src="item.image" :alt="item.name" @error="handleImageError" />
            </div>
            <span class="item-name">{{ item.name }}</span>
          </button>
        </div>

        <div class="quantity-input-group">
          <label for="target-qty">Crafting Amount:</label>
          <div class="input-wrapper">
            <button @click="adjustQty(-1)">-</button>
            <input
              id="target-qty"
              type="number"
              v-model.number="targetQuantity"
              min="1"
            />
            <button @click="adjustQty(1)">+</button>
          </div>
        </div>
      </section>

      <!-- Calculation Output Displays -->
      <section class="results-panel">
        <!-- Target Item Summary -->
        <div class="summary-card card">
      <div class="summary-header">
  <h3>Output Goal</h3>

  <div class="summary-badges">

    <span class="weight-badge">
      Total Weight:
      {{ calculationResult.totalWeight.toFixed(2) }} kg
    </span>

    <span class="cost-badge">
      Cost:
      {{ calculationResult.totalCost.toFixed(0) }} KKD
    </span>

  </div>
</div>

          <div class="summary-detail">
            <img :src="calculationResult.finalItem?.image" class="result-img" @error="handleImageError" />
            <div>
              <span class="qty-highlight">{{ targetQuantity }}x</span>
              <span class="name">{{ calculationResult.finalItem?.name }}</span>
            </div>
          </div>
        </div>
  
        <!-- Tier 1 Component Direct Breakdown -->
        <div class="card">
  <div class="section-header">
    <h3>Direct Ingredients Needed</h3>

    <span class="weight-badge">
      Total Weight: {{ totalDirectIngredientWeight.toFixed(2) }} kg
    </span>
  </div>
          <div class="ingredient-grid">
            <div
              v-for="ing in calculationResult.directIngredients"
              :key="ing.id"
              class="ingredient-card"
            >
              <img :src="ing.image" :alt="ing.name" @error="handleImageError" />
              <div class="info">
                <span class="ing-name">{{ ing.name }}</span>
                <br>
                <div class="gap">
                <span class="ing-qty">{{ ing.requiredQty }} {{ ing.unit }}</span>
                
                <small class="ing-weight">{{ ing.totalWeight.toFixed(2) }} kg</small>
              </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tier 0 Raw Material Total Requirements -->
        <div class="card raw-materials-card">
          <div class="section-header">
            <h3>Total Raw Materials Required</h3>

    <span class="weight-badge">
      Total Weight: {{ totalRawIngredientWeight.toFixed(2) }} kg
    </span>
  </div>



          <div class="ingredient-grid">
            <div
              v-for="raw in calculationResult.rawMaterials"
              :key="raw.id"
              class="ingredient-card raw"
            >
              <img :src="raw.image" :alt="raw.name" @error="handleImageError" />
              <div class="info">
                <span class="ing-name">{{ raw.name }}</span>
                <br>
                <div class="gap">
                <span class="ing-qty highlight">{{ raw.requiredQty }} {{ raw.unit }}</span>
                <small class="ing-weight">{{ raw.totalWeight.toFixed(2) }} kg</small>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  </main>

    <footer class="app-footer">
      © 2026 Nalathone_SMNV. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { RECIPES } from './data/recipes';
import { useCalculator } from './composables/useCalculator';

const categories = RECIPES.categories;
const { activeCategory, targetItemId, targetQuantity, calculationResult } = useCalculator();

// --- Theme Switcher Logic ---
const currentTheme = ref(sessionStorage.getItem('game_calc_theme') || 'kawaii');

const themes = [
  { id: 'kawaii', label: '🌸 Kawaii' },
  { id: 'mint', label: '🍃 Minty' },
  { id: 'sunset', label: '🌅 Sunset' },
  { id: 'dark', label: '🌙 Dark Mode' }
];



function setTheme(themeId) {
  currentTheme.value = themeId;
  sessionStorage.setItem('game_calc_theme', themeId);
}

const availableItems = computed(() => {
  return Object.values(RECIPES.items).filter(
    item => item.category === activeCategory.value
  );
});

const totalDirectIngredientWeight = computed(() => {
  return calculationResult.value.directIngredients.reduce(
    (total, ing) => total + Number(ing.totalWeight || 0),
    0
  );
});

const totalRawIngredientWeight = computed(() => {
  return calculationResult.value.rawMaterials.reduce(
    (total, raw) => total + Number(raw.totalWeight || 0),
    0
  );
});



function selectCategory(catId) {
  activeCategory.value = catId;
  const firstInCat = Object.values(RECIPES.items).find(i => i.category === catId);
  if (firstInCat) targetItemId.value = firstInCat.id;
}

function adjustQty(amount) {
  targetQuantity.value = Math.max(1, targetQuantity.value + amount);
}

function handleImageError(e) {
  e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="%23ccc"><rect width="24" height="24" fill="%23eee"/></svg>';
}
</script>

<style scoped>
/* --- THEME 1: KAWAII PINK --- */
.calculator-app.theme-kawaii {
  --bg-main: #fdf0f5;
  --dot-color: #f4c2c2;
  --bg-card: #ffffff;
  --accent-primary: #ff85a2;
  --accent-secondary: #b39ddb;
  --accent-light: #fff0f5;
  --text-main: #4a3e4e;
  --text-sub: #8d7a93;
  --border-color: #f8d7da;
  --badge-bg: #ffe082;
  --badge-text: #5d4037;
  --ing-bg: #e0f2f1;
  --ing-border: #80cbc4;
  --raw-bg: #fff8e1;
  --raw-border: #ffe082;
}

/* --- THEME 2: MINTY PASTEL --- */
.calculator-app.theme-mint {
  --bg-main: #e0f2f1;
  --dot-color: #b2dfdb;
  --bg-card: #ffffff;
  --accent-primary: #009688;
  --accent-secondary: #80cbc4;
  --accent-light: #e0f2f1;
  --text-main: #004d40;
  --text-sub: #00796b;
  --border-color: #b2dfdb;
  --badge-bg: #80cbc4;
  --badge-text: #004d40;
  --ing-bg: #e8f5e9;
  --ing-border: #a5d6a7;
  --raw-bg: #fffde7;
  --raw-border: #fff59d;
}

/* --- THEME 3: CYBER SUNSET --- */
.calculator-app.theme-sunset {
  --bg-main: #fff3e0;
  --dot-color: #ffe0b2;
  --bg-card: #ffffff;
  --accent-primary: #ff7043;
  --accent-secondary: #ffb74d;
  --accent-light: #fff3e0;
  --text-main: #4e2714;
  --text-sub: #8d4e2a;
  --border-color: #ffcc80;
  --badge-bg: #ffb74d;
  --badge-text: #4e2714;
  --ing-bg: #ffe0b2;
  --ing-border: #ffb74d;
  --raw-bg: #fbe9e7;
  --raw-border: #ffab91;
}

/* --- THEME 4: DARK GAMER --- */
.calculator-app.theme-dark {
  --bg-main: #18122b;
  --dot-color: #393053;
  --bg-card: #201a35;
  --accent-primary: #ff79c6;
  --accent-secondary: #bd93f9;
  --accent-light: #2b2146;
  --text-main: #f8f8f2;
  --text-sub: #bd93f9;
  --border-color: #443c68;
  --badge-bg: #bd93f9;
  --badge-text: #18122b;
  --ing-bg: #2b2146;
  --ing-border: #ff79c6;
  --raw-bg: #342854;
  --raw-border: #bd93f9;
}

/* Base Styles */
.calculator-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  background-color: var(--bg-main);
  background-image: radial-gradient(var(--dot-color) 1.5px, transparent 1.5px);
  background-size: 24px 24px;
  color: var(--text-main);
  font-family: 'Fredoka', 'Quicksand', system-ui, sans-serif;
  padding-bottom: 2rem;
  transition: all 0.3s ease;
}

.workspace {
  flex: 1;

  max-width: 1200px;
  width: 100%;
  box-sizing: border-box;
  margin: 1.5rem auto;
  padding: 0 1rem;

  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 1.5rem;
}

/* Top Nav */
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: var(--bg-card);
  border-bottom: 3px solid var(--accent-primary);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand h1 {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--accent-primary);
  margin: 0;
}

.logo-icon {
  font-size: 1.6rem;
}

/* Theme Switcher Badges */
.theme-selector {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.theme-badge {
  background: var(--bg-main);
  border: 2px solid var(--border-color);
  color: var(--text-main);
  padding: 0.3rem 0.7rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-badge:hover {
  transform: translateY(-2px);
}

.theme-badge.active {
  background: var(--accent-primary);
  color: #ffffff;
  border-color: var(--accent-primary);
}

/* Category Tabs */
.category-tabs {
  display: flex;
  gap: 0.6rem;
}

.tab-btn {
  background: var(--accent-light);
  border: 2px solid var(--border-color);
  color: var(--text-sub);
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  transform: translateY(-2px);
  border-color: var(--accent-primary);
}

.tab-btn.active {
  background: var(--accent-primary);
  color: #ffffff;
  border-color: var(--accent-primary);
}

/* Main Workspace */
.workspace {
  max-width: 1200px;
  margin: 1.5rem auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 1.5rem;
}

.card {
  background: var(--bg-card);
  border: 3px solid var(--border-color);
  border-radius: 20px;
  padding: 1.25rem;
  margin-bottom: 1rem;
}

.card h2,
.card h3 {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--accent-primary);
}

/* Items */
.item-selector {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(95px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.item-card {
  background: var(--bg-main);
  border: 2.5px solid var(--border-color);
  border-radius: 16px;
  padding: 0.6rem;
  color: var(--text-main);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s ease;
}

.item-card:hover {
  transform: scale(1.05);
}

.item-card.selected {
  border-color: var(--accent-primary);
  background: var(--accent-light);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
}

.img-wrapper img, .result-img, .ingredient-card img {
  width: 52px;
  height: 52px;
  object-fit: contain;
  border-radius: 12px;
  background: var(--bg-card);
  padding: 4px;
  border: 1.5px solid var(--border-color);
}

.item-name {
  font-size: 0.85rem;
  font-weight: 700;
  text-align: center;
}

/* Inputs */
.quantity-input-group label {
  font-weight: 700;
  color: var(--text-sub);
}

.input-wrapper {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid var(--border-color);
}

.input-wrapper button {
  background: var(--accent-secondary);
  color: #ffffff;
  border: none;
  width: 44px;
  height: 44px;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
}

.input-wrapper input {
  width: 100%;
  height: 44px;
  background: var(--bg-card);
  border: none;
  color: var(--text-main);
  text-align: center;
  font-size: 1.2rem;
  font-weight: 800;
}

/* Results */
.summary-badges {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cost-badge {
  background: #ffe082;
  color: #5d4037;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 800;
}
.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
}

.section-header h3 {
  margin: 0;
}

.weight-badge {
  background: var(--badge-bg);
  color: var(--badge-text);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 800;
  white-space: nowrap;
}

.summary-detail {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.75rem;
  background: var(--accent-light);
  padding: 0.8rem;
  border-radius: 16px;
  border: 2px dashed var(--accent-primary);
}

.qty-highlight {
  font-size: 1.6rem;
  font-weight: 900;
  color: var(--accent-primary);
  margin-right: 0.4rem;
}

.ingredient-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 0.75rem;
}

.ingredient-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--ing-bg);
  padding: 0.75rem;
  border-radius: 16px;
  border: 2px solid var(--ing-border);
}

.ingredient-card.raw {
  background: var(--raw-bg);
  border-color: var(--raw-border);
}

.ing-name {
  font-weight: 700;
  color: var(--text-main);
}

.ing-qty {
  font-weight: 800;
  color: var(--accent-primary);
}

.gap {
  display: flex;
  gap: 5px;
  align-items: center;
}

.ing-weight {
  color: var(--text-sub);
  font-size: 0.8rem;
}

.app-footer {
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  padding: 1.5rem 1rem;
  margin-top: auto;

  color: var(--text-sub);
  font-size: 0.85rem;
  font-weight: 600;

  border-top: 2px solid var(--border-color);
}
/* Responsive */
@media (max-width: 900px) {
  .workspace {
    grid-template-columns: 1fr;
  }

  .top-nav {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
}
</style>