<template>
  <div v-if="recipe">
    <h1 class="text-4xl font-bold">{{ recipe.title }}</h1>
    <p class="text-gray-700">{{ recipe.category }}</p>
    <p class="text-gray-700">{{ recipe.difficulty }}</p>
    <p class="text-gray-700">{{ recipe.materialUsed}}</p>
    <p class="text-gray-700">{{ recipe.steps }}</p>
    <p class="text-gray-700">{{ recipe.videoLink }}</p>
  </div>
  <div v-else>
    <p class="text-red-500">Loading recipe or recipe not found...</p>
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
