<template>
  <div v-if="recipe" class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
    <!-- Titel -->
    <h1 class="text-5xl font-bold mb-6 text-center">{{ recipe.title }}</h1>

    <!-- Kategori og sværhedsgrad -->
    <div class="flex justify-between items-center mb-6">
      <p class="text-lg font-semibold text-gray-700">Category: {{ recipe.category }}</p>
      <p class="text-lg font-semibold text-gray-700">Difficulty: {{ recipe.difficulty }}</p>
    </div>

    <!-- Materialer -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold mb-2">Materials Used</h2>
      <p class="text-gray-700">{{ recipe.materialUsed }}</p>
    </div>

    <!-- Steps -->
<div class="mb-6">
  <h2 class="text-2xl font-bold mb-2">Steps</h2>
  <ul class="list-none text-gray-700"> <!-- Fjern punkttegn med list-none -->
    <li v-for="(step, index) in recipe.steps" :key="index">
      <span class="font-semibold">Step {{ index + 1 }}:</span> {{ step }}
    </li>
  </ul>
</div>

    <!-- Video Link -->
    <div v-if="recipe.videoLink" class="mb-6">
      <h2 class="text-2xl font-bold mb-2">Video Tutorial</h2>
      <a
        :href="recipe.videoLink"
        target="_blank"
        class="text-blue-500 hover:underline"
      >
        Watch Video
      </a>
    </div>
  </div>

  <div v-else>
    <p class="text-red-500 text-center mt-6">Loading recipe or recipe not found...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '@/composables/firebase.js'
import { doc, getDoc } from 'firebase/firestore'

const route = useRoute()
const recipe = ref(null)

onMounted(async () => {
  try {
    const recipeId = route.params.id // Hent id fra ruteparameteren
    const recipeDoc = await getDoc(doc(db, 'recipes', recipeId))
    if (recipeDoc.exists()) {
      recipe.value = { id: recipeDoc.id, ...recipeDoc.data() }
    } else {
      console.error('Recipe not found')
    }
  } catch (error) {
    console.error('Error fetching recipe:', error)
  }
})
</script>

<style>
</style>
