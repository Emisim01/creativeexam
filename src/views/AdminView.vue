<template>
 <!-- Vises kun hvis brugeren er admin -->
  <div v-if="isAdmin" class=" mx-auto p-6">
    <h1 class="welcomeText text-center mb-10">Admin Panel</h1>

    <!-- Sektion for at tilføje en ny opskrift -->
    <div class="recipeMaker bg-white/10 p-6 rounded-lg shadow-lg !mb-12">
      <h2 class="text-2xl font-bold text-light-grass !mb-12">Add a New Recipe</h2>

      <!-- Formularfelter -->
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

        <!-- Knap -->
          <button
          @click="addRecipe"
          class="w-full bg-light-grass text-dark-grass font-bold px-4 py-2 rounded-md hover:bg-opacity-80 hover:scale-[1.02] transition"
        >
          Add Recipe
        </button>
      </div>
    </div>

    <!-- Sektion for at se og slette eksisterende opskrifter (uændret) -->
    <div class="existingRecipeList">
      <h2 class="welcomeText text-center mb-10">Manage Recipes</h2>
      <ul class="!space-y-4">
        <li v-for="recipe in recipes" :key="recipe.id" class="bg-white/10 p-3 rounded-lg flex justify-between items-center shadow-md">
          <div>
            <span class="font-medium text-base text-light-grass">{{ recipe.recipeTitle }}</span>
            <span class="block text-xs text-light-grass/60">ID: {{ recipe.id }}</span>
          </div>
          <button @click="deleteRecipe(recipe.id)" class="bg-red-600 text-white font-semibold px-3 py-1 !text-lg rounded-md hover:bg-red-700 transition-colors">
            Delete
          </button>
        </li>
      </ul>
    </div>
  </div>

  <!-- Vises hvis brugeren IKKE er admin (uændret) -->
  <div v-else class="text-center mt-20">
    <h2 class="text-3xl font-bold text-light-grass">Access Denied</h2>
    <p class="text-light-grass/80 mt-2">You do not have permission to view this page.</p>
  </div>
</template>

<script setup>
import { useAdmin } from '@/composables/useAdmin.js'
import { useRecipes } from '../composables/useRecipes.js'

// Hent det nye 'newRecipe'-objekt
const { recipes, newRecipe, addRecipe, deleteRecipe } = useRecipes();

// Hent bare isAdmin. Den opdaterer sig selv!
const { isAdmin } = useAdmin()
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


</style>
