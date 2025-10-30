<template>
  <div>
    <p class="welcomeText p-4 text-4xl font-bold flex justify-center gap-4">Creative recipes!</p>
  </div>
   <!-- Dropdown til filtrering -->
    <div class="flex justify-center items-center mb-8">

      <label for="category-filter" class="text-light-grass mr-3 font-semibold">Filter by:</label>

   <!-- KATEGORI DROPDOWN: Filtrerer opskrifter baseret på kategori -->
      <select
        id="category-filter"
        v-model="selectedCategory"
        class="categoryFilterBox bg-white/20 text-light-grass p-2 rounded-md border border-light-grass/30 focus:outline-none focus:ring-2 focus:ring-light-grass">
        <option value="" class="bg-dark-grass">All Categories</option>

        <!-- DYNAMISK DROPDOWN OPTIONS: Laver automatisk kategori valgmuligheder -->
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
    <img
      :src="recipe.imageUrl"
      :alt="recipe.recipeTitle"
      @error="handleImageError"
      class="w-full aspect-square object-cover rounded mb-2"
    >

    <!-- OPSKRIFT INFO: Titel, kategori og sværhedsgrad -->
      <h2 class="text-xl font-bold mb-2">{{ recipe.recipeTitle }}</h2>
      <p class="">{{ recipe.category }}</p>
      <p class="">{{ recipe.difficulty }}</p>
    </div>
</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useRecipes } from '@/composables/useRecipes.js'

const { recipes } = useRecipes()
const router = useRouter()
const route = useRoute()


// FILTER STATE: Hvilken kategori er valgt i dropdown
const selectedCategory = ref('')  // Tom streng = "All Categories"

// URL KATEGORI LÆSNING: Hvis brugeren kommer fra HomeView kategori link
onMounted(() => {
  // TJEK: Er der en kategori i URL'en? (fx: /recipes?category=Crochet)
  if (route.query.category) {
    // JA: Sæt dropdown til den kategori
    selectedCategory.value = route.query.category
  }
  // NEJ: Dropdown forbliver på "All Categories" (tom streng)
})

// Computed property for unique categories
const categories = computed(() => {
  const allCategories = recipes.value.map(recipe => recipe.category)
  return [...new Set(allCategories)] // Fjern dubletter
})

// FILTREREDE OPSKRIFTER: Vis kun opskrifter der matcher valgt kategori
const filteredRecipes = computed(() => {
  if (!selectedCategory.value) {
    return recipes.value // Hvis ingen kategori er valgt, vis alle opskrifter
  }

  // FILTER: Vis kun opskrifter der matcher valgt kategori
  return recipes.value.filter(recipe => recipe.category === selectedCategory.value)
})

// Error handling for billeder
const handleImageError = (event) => {
  event.target.src = '/src/assets/heroImg.png' // Fallback billede
}

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
