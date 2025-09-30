<template>
  <div>
    <p class="welcomeText p-4 text-4xl font-bold text-white flex justify-center gap-4">Creative recipes!</p>
  </div>

    <!-- Dropdown til filtrering -->
    <div class="flex justify-center mb-6">
      <select
        v-model="selectedCategory"
        @change="filterRecipes"
        class="p-2 border rounded-lg">

        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">
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
    class="bg-white rounded-lg p-4 flex flex-col items-center cursor-pointer hover:scale-105 transition"
  >
    <img src="@/assets/heroImg.png" alt="" />
    <h2 class="text-xl font-bold mb-2">{{ recipe.title }}</h2>
    <p class="text-gray-700">{{ recipe.category }}</p>
    <p class="text-gray-700">{{ recipe.difficulty }}</p>
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

// Funktion til filtrering (valgfri, hvis du vil logge ændringer)
const filterRecipes = () => {
  console.log('Selected category:', selectedCategory.value)
}

const goToRecipe = (id) => {
  // Naviger til den enkelte opskrift ved hjælp af dens id
  router.push({ name: 'SingleRecipe', params: { id } })
}
</script>

<style scoped>
.welcomeText {
  font-family: 'Cherry Bomb One', system-ui;
}
</style>
