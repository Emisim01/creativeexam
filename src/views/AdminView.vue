<template>
  <!-- Vises kun hvis brugeren er admin -->
  <div v-if="isAdmin" class="mx-auto p-6">
    <h1 class="welcomeText text-center mb-10">Admin Panel</h1>

    <!-- Sektion for at tilføje/redigere en opskrift -->
    <div class="recipeMaker bg-white/10 p-6 rounded-lg shadow-lg !mb-12 border border-light-grass/40">
      <h2 class="text-2xl font-bold text-light-grass !mb-12">
        {{ editingRecipe ? 'Edit Recipe' : 'Add a New Recipe' }}
      </h2>

      <!-- Formularfelter (uændret fra før) -->
      <div class="!space-y-4">
        <!-- Titel -->
        <input
          type="text"
          placeholder="Recipe Title"
          v-model="newRecipe.recipeTitle"
          class="w-full p-3 bg-white/20 text-light-grass placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-light-grass"
        />

        <!-- Kategori og Sværhedsgrad (side om side) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select v-model="newRecipe.category" class="w-full p-3 bg-white/20 text-light-grass rounded-md focus:outline-none focus:ring-2 focus:ring-light-grass">
            <option disabled value="">Select a category</option>
            <option>Sewing</option>
            <option>Drawing</option>
            <option>Crochet</option>
            <option>Digital Design</option>
            <option>Embroidery</option>
          </select>
          <select v-model="newRecipe.difficulty" class="w-full p-3 bg-white/20 text-light-grass rounded-md focus:outline-none focus:ring-2 focus:ring-light-grass">
            <option disabled value="">Select difficulty</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        <!-- Materialer -->
        <textarea
          placeholder="Materials used (one item per line)"
          v-model="newRecipe.materialUsed"
          rows="4"
          class="w-full p-3 bg-white/20 text-light-grass placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-light-grass"
        ></textarea>

        <!-- Steps -->
        <textarea
          placeholder="Steps (one step per line)"
          v-model="newRecipe.steps"
          rows="6"
          class="w-full p-3 bg-white/20 text-light-grass placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-light-grass"
        ></textarea>

        <!-- Video Link -->
        <input
          type="text"
          placeholder="YouTube Video Link (optional)"
          v-model="newRecipe.videoLink"
          class="w-full p-3 bg-white/20 text-light-grass placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-light-grass"
        />

        <!-- Knapper -->
        <div class="flex gap-4">
          <button
            @click="saveRecipe"
            class="flex-1 bg-light-grass text-dark-grass font-bold px-4 py-2 rounded-md hover:bg-opacity-80 hover:scale-[1.02] transition"
          >
            {{ editingRecipe ? 'Update Recipe' : 'Add Recipe' }}
          </button>

          <!-- Cancel knap (kun vis hvis vi redigerer) -->
          <button
            v-if="editingRecipe"
            @click="cancelEdit"
            class="bg-gray-400 !text-white font-bold px-4 py-2 rounded-md hover:bg-opacity-80 hover:scale-[1.02] transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Sektion for at se og slette eksisterende opskrifter -->
    <div class="existingRecipeList">
      <h2 class="welcomeText text-center mb-10">Manage Recipes</h2>
      <ul class="!space-y-4">
        <li v-for="recipe in recipes" :key="recipe.id" class="bg-white/10 p-3 rounded-lg flex justify-between items-center shadow-md">
          <div>
            <span class="font-medium text-base text-light-grass">{{ recipe.recipeTitle }}</span>
            <span class="block text-xs text-light-grass/60">ID: {{ recipe.id }}</span>
          </div>

          <!-- Knapper til Edit og Delete -->
          <div class="knapper flex gap-2">
            <button
              @click="editRecipe(recipe)"
              class="bg-blue-500/70 !text-white px-2 py-1 rounded hover:bg-blue-500/90 transition-colors"
            >
              Edit
            </button>
            <button
              @click="deleteRecipe(recipe.id)"
              class="bg-red-500/70 !text-white px-2 py-1 rounded hover:bg-red-500/90 transition-colors"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <!-- Vises hvis brugeren IKKE er admin -->
  <div v-else class="text-center mt-20">
    <h2 class="text-3xl font-bold text-light-grass">Access Denied</h2>
    <p class="text-light-grass/80 mt-2">You do not have permission to view this page.</p>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useAdmin } from '@/composables/useAdmin.js'
import { useRecipes } from '../composables/useRecipes.js'

// Hent funktioner fra useRecipes
const { recipes, newRecipe, addRecipe, updateRecipe, deleteRecipe } = useRecipes()

// Hent bare isAdmin. Den opdaterer sig selv!
const { isAdmin } = useAdmin()

// State for redigering
const editingRecipe = ref(null)

// Funktion til at starte redigering af en opskrift
const editRecipe = async (recipe) => {
  editingRecipe.value = recipe

  // Fyld formularen med eksisterende data
  newRecipe.value = {
    recipeTitle: recipe.recipeTitle,
    category: recipe.category,
    difficulty: recipe.difficulty,
    materialUsed: Array.isArray(recipe.materialUsed) ? recipe.materialUsed.join('\n') : recipe.materialUsed,
    steps: Array.isArray(recipe.steps) ? recipe.steps.join('\n') : recipe.steps,
    videoLink: recipe.videoLink || ''
  }

  // Scroll op til formularen efter DOM er opdateret
  await nextTick()
  document.querySelector('.recipeMaker').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

// Funktion til at annullere redigering
const cancelEdit = () => {
  editingRecipe.value = null
  // Nulstil formularen
  newRecipe.value = {
    recipeTitle: '',
    category: '',
    difficulty: '',
    materialUsed: '',
    steps: '',
    videoLink: ''
  }
}

// Funktion til at gemme (både tilføje og opdatere)
const saveRecipe = async () => {
  if (editingRecipe.value) {
    // Opdater eksisterende opskrift
    await updateRecipe(editingRecipe.value.id, newRecipe.value)
    editingRecipe.value = null
  } else {
    // Tilføj ny opskrift
    await addRecipe()
  }
}
</script>

<style scoped>
.welcomeText {
  font-family: "Cherry Bomb One", system-ui;
  margin-top: 15px;
  font-size: 40px;
  color: var(--color-light-grass);
}

.recipeMaker {
  margin: 0 60px 50px 60px;
}

.existingRecipeList {
  margin: 0 60px 50px 60px;
}

.existingRecipeListHeader {
  font-family: "Cherry Bomb One", system-ui;
    font-size: 35px;

}

.knapper button {
  font-size: 20px;
}


</style>
