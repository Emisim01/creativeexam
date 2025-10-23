<template>
    <!-- separation of concern (SOC) (THis shold nor be here its just a comment i need to remember) -->
    <!-- Single responsibility principle (SRP) -->

  <!-- Vises kun hvis brugeren er admin-->
  <div v-if="isAdmin" class="mx-auto p-4 sm:p-6">
    <h1 class="welcomeText text-center mb-6 sm:mb-10 text-2xl sm:text-4xl">Admin Panel</h1>

    <!-- Sektion for at tilføje/redigere en opskrift -->
    <div class="recipeMaker bg-white/10 p-4 sm:p-6 rounded-lg shadow-lg mb-8 sm:mb-12 border border-light-grass/40 mx-2 sm:mx-8 lg:mx-16">
      <h2 class="text-xl sm:text-2xl font-bold text-light-grass mb-6 sm:mb-12 text-center sm:text-left">
        {{ editingRecipe ? 'Edit Recipe' : 'Add a New Recipe' }}
      </h2>

      <!-- Formularfelter -->
      <div class="space-y-4">
        <!-- Titel -->
        <input
          type="text"
          placeholder="Recipe Title"
          v-model="formData.recipeTitle"
          class="w-full p-3 bg-white/20 text-light-grass placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-light-grass text-sm sm:text-base"
        />

          <!-- Image URL felt (nyt) -->
  <input
    type="url"
    placeholder="Image URL (link to recipe image)"
    v-model="formData.imageUrl"
    class="w-full p-3 bg-white/20 text-light-grass placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-light-grass text-sm sm:text-base"
  />

        <!-- Kategori og Sværhedsgrad (stacked på mobil, side om side på desktop) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select v-model="formData.category" class="w-full p-3 bg-white/20 text-light-grass rounded-md focus:outline-none focus:ring-2 focus:ring-light-grass text-sm sm:text-base">
            <option disabled value="">Select a category</option>
            <option>Sewing</option>
            <option>Drawing</option>
            <option>Crochet</option>
            <option>Digital Design</option>
            <option>Embroidery</option>
          </select>
          <select v-model="formData.difficulty" class="w-full p-3 bg-white/20 text-light-grass rounded-md focus:outline-none focus:ring-2 focus:ring-light-grass text-sm sm:text-base">
            <option disabled value="">Select difficulty</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        <!-- Materialer -->
        <textarea
          placeholder="Materials used (one item per line)"
          v-model="formData.materialUsed"
          rows="4"
          class="w-full p-3 bg-white/20 text-light-grass placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-light-grass text-sm sm:text-base resize-none"
        ></textarea>

        <!-- Steps -->
        <textarea
          placeholder="Steps (one step per line)"
          v-model="formData.steps"
          :rows="5"
          class="w-full p-3 bg-white/20 text-light-grass placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-light-grass text-sm sm:text-base resize-none sm:rows-6"
        ></textarea>

        <!-- Video Link -->
        <input
          type="text"
          placeholder="YouTube Video Link (optional)"
          v-model="formData.videoLink"
          class="w-full p-3 bg-white/20 text-light-grass placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-light-grass text-sm sm:text-base"
        />

        <!-- Knapper (stacked på mobil, side om side på desktop) -->
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            @click="saveRecipe"
            class="w-full sm:flex-1 bg-light-grass text-dark-grass font-bold px-4 py-3 sm:py-2 rounded-md hover:bg-opacity-80 hover:scale-[1.02] transition text-sm sm:text-base"
          >
            {{ editingRecipe ? 'Update Recipe' : 'Add Recipe' }}
          </button>

          <!-- Cancel knap (kun vis hvis vi redigerer) -->
          <button
            v-if="editingRecipe"
            @click="cancelEditing"
            class="w-full sm:w-auto bg-gray-400 !text-white font-bold px-4 py-3 sm:py-2 rounded-md hover:bg-opacity-80 hover:scale-[1.02] transition text-sm sm:text-base"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Sektion for at se og slette eksisterende opskrifter -->
    <div class="existingRecipeList mx-2 sm:mx-8 lg:mx-16">
      <h2 class="welcomeText text-center mb-6 sm:mb-10 text-2xl sm:text-4xl">Manage Recipes</h2>
      <ul class="!space-y-3 sm:!space-y-4">
        <li v-for="recipe in recipes" :key="recipe.id" class="bg-white/10 p-3 sm:p-4 rounded-lg shadow-md">
          <!-- Mobile Layout (stacked) -->
          <div class="sm:hidden">
            <div class="mb-3">
              <span class="font-medium text-sm text-light-grass block">{{ recipe.recipeTitle }}</span>
              <span class="text-xs text-light-grass/60">ID: {{ recipe.id }}</span>
            </div>
            <div class="knapper flex gap-2 justify-end">
              <button
                @click="editRecipe(recipe)"
                class="bg-blue-500/70 !text-white px-3 py-2 text-xs rounded hover:bg-blue-500/90 transition-colors"
              >
                Edit
              </button>
              <button
                @click="deleteRecipe(recipe.id)"
                class="bg-red-500/70 !text-white px-3 py-2 text-xs rounded hover:bg-red-500/90 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>

          <!-- Desktop Layout (side by side) -->
          <div class="hidden sm:flex justify-between items-center">
            <div>
              <span class="font-medium text-base text-light-grass">{{ recipe.recipeTitle }}</span>
              <span class="block text-xs text-light-grass/60">ID: {{ recipe.id }}</span>
            </div>
            <div class="knapper flex gap-2">
              <button
                @click="editRecipe(recipe)"
                class="bg-blue-500/70 !text-white px-2 py-1 text-xs rounded hover:bg-blue-500/90 transition-colors"
              >
                Edit
              </button>
              <button
                @click="deleteRecipe(recipe.id)"
                class="bg-red-500/70 !text-white px-2 py-1 text-xs rounded hover:bg-red-500/90 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <!-- Vises hvis brugeren IKKE er admin -->
  <div v-else class="text-center mt-10 sm:mt-20 px-4">
    <h2 class="text-2xl sm:text-3xl font-bold text-light-grass">Access Denied</h2>
    <p class="text-light-grass/80 mt-2 text-sm sm:text-base">You do not have permission to view this page.</p>
  </div>
</template>

<script setup>
import { useAdmin } from '@/composables/useAdmin.js'
import { useRecipes } from '@/composables/useRecipes.js'
import { useAdminForm } from '@/composables/useAdminForm.js'

// Admin authentication
const { isAdmin } = useAdmin()

// Recipe operations
const { recipes, addRecipe, updateRecipe, deleteRecipe } = useRecipes()

// Form management
const {
  editingRecipe,
  formData,
  startEditing,
  cancelEditing,
  resetForm,
} = useAdminForm()

const saveRecipe = async () => {
  try {
    if (editingRecipe.value) {
      await updateRecipe(editingRecipe.value.id, formData.value)
      cancelEditing()
    } else {
      await addRecipe(formData.value)
      resetForm()
    }
  } catch (error) {
    console.error('Error saving recipe:', error)
  }
}

// Edit recipe (simplified)
const editRecipe = async (recipe) => {
  await startEditing(recipe)
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

/* Responsiv margin for containere */
@media (max-width: 640px) {
  .recipeMaker,
  .existingRecipeList {
    margin-left: 8px !important;
    margin-right: 8px !important;
  }
}

@media (min-width: 640px) {
  .recipeMaker,
  .existingRecipeList {
    margin-left: 32px !important;
    margin-right: 32px !important;
  }
}

@media (min-width: 1024px) {
  .recipeMaker,
  .existingRecipeList {
    margin-left: 64px !important;
    margin-right: 64px !important;
  }
}
</style>
