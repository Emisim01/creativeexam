<template>
  <div>
    <p class="welcomeText p-4 text-4xl font-bold flex justify-center gap-4">Creative recipes!</p>
  </div>
   <!-- Dropdown til filtrering -->
    <div class="flex justify-center items-center mb-8">
      <label for="category-filter" class="text-light-grass mr-3 font-semibold">Filter by:</label>
      <select
        id="category-filter"
        v-model="selectedCategory"
        class="categoryFilterBox bg-white/20 text-light-grass p-2 rounded-md border border-light-grass/30 focus:outline-none focus:ring-2 focus:ring-light-grass">
        <option value="" class="bg-dark-grass">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category" class="bg-dark-grass">
          {{ category }}
        </option>
      </select>
    </div>


    <!-- Opskrifter -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
  <div
    v-for="recipe in filteredRecipes"
    :key="recipe.id"
    @click="goToRecipe(recipe.id)"
    class="bg-white text-dark-grass rounded-lg p-4 flex flex-col items-center cursor-pointer hover:scale-105 transition"
  >
    <img src="@/assets/heroImg.png" alt="" />
    <h2 class="text-xl font-bold mb-2">{{ recipe.recipeTitle }}</h2>
    <p class="">{{ recipe.category }}</p>
    <p class="">{{ recipe.difficulty }}</p>
  </div>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router' // Importér useRouter
import { useRecipes } from '@/composables/useRecipes.js'

const { recipes } = useRecipes()
const router = useRouter() // Initialiser useRouter

// Reactive state for selected category
const selectedCategory = ref('')

// Computed property for unique categories
const categories = computed(() => {
  const allCategories = recipes.value.map(recipe => recipe.category)
  return [...new Set(allCategories)] // Fjern dubletter
})

// Computed property for filtrerede opskrifter
const filteredRecipes = computed(() => {
  if (!selectedCategory.value) {
    return recipes.value // Hvis ingen kategori er valgt, vis alle opskrifter
  }
  return recipes.value.filter(recipe => recipe.category === selectedCategory.value)
})

const goToRecipe = (id) => {
  // Naviger til den enkelte opskrift ved hjælp af dens id
  router.push({ name: 'SingleRecipe', params: { id } })
}
</script>

<style scoped>
.welcomeText {
  font-family: 'Cherry Bomb One', system-ui;
  color: var(--color-light-grass);
}

.categoryFilterBox {
margin-left: 10px;
}
</style>
