<template>
  <div v-if="recipe" class="recipeBox p-6 bg-white rounded-lg text-dark-grass">
    <!-- Titel -->
    <h1 class="text-5xl font-bold mb-6 text-center">{{ recipe.recipeTitle }}</h1>

    <!-- Kategori og sværhedsgrad -->
    <div class="">
      <p class="text-lg font-semibold ">Category: {{ recipe.category }}</p>
      <p class="text-lg font-semibold ">Difficulty: {{ recipe.difficulty }}</p>
    </div>

    <!-- Materialer -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold mb-2">Materials Used</h2>
      <ul>
        <li v-for="(material, index) in recipe.materialUsed" :key="index">
          {{ material }}
        </li>
      </ul>
    </div>

    <!-- Steps -->
<div class="mb-6">
  <h2 class="text-2xl font-bold mb-2">Steps</h2>
  <ul class="list-none ">
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
        class="text-blue-800 hover:underline"
      >
        Watch Video
      </a>
    </div>
  </div>

  <div v-else>
    <p class="text-light-grass text-center mt-6">Loading recipe...</p>
  </div>

<!-- Kommentarer -->
<div class="commentSection mt-10 text-light-grass">
  <h2 class="text-2xl font-bold mb-4">Comments</h2>

  <!-- Kun vis dette hvis man er logget ind -->
  <div v-if="user">
    <textarea
      v-model="commentText"
      class="w-full border rounded-lg p-2 mb-2"
      placeholder="Write a comment..."
      rows="3"
    ></textarea>
    <button
      @click="addComment"
      :disabled="loading || !commentText.trim()"
      class="bg-purple-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
    >
      {{ loading ? 'Posting...' : 'Post Comment' }}
    </button>
    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
  </div>
  <!-- Hvis ikke logget ind, vis kun denne tekst -->
  <div v-else class="mb-4 text-light-grass">
    You must be logged in to comment.
  </div>

  <!-- Denne del vises altid, uanset login -->
  <ul>
    <li v-for="comment in comments" :key="comment.id" class="mb-4 border-2 border-white text-light-grass pb-2">
      <div class="font-semibold">{{ comment.user }}</div>
      <div>{{ comment.text }}</div>
      <div class="text-xs ">{{ comment.createdAt?.toDate?.().toLocaleString?.() }}</div>
    </li>
  </ul>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '@/composables/firebase.js'
import { doc, getDoc } from 'firebase/firestore'
import { useComments } from '@/composables/useComments.js'


const route = useRoute()
const recipe = ref(null)

onMounted(async () => {
  try {
    const recipeId = route.params.id // Hent id fra ruteparameteren
    const recipeDoc = await getDoc(doc(db, 'recipes', recipeId))
    if (recipeDoc.exists()) {
      recipe.value = { id: recipeDoc.id, ...recipeDoc.data() }
      fetchComments()
    } else {
      console.error('Recipe not found')
    }
  } catch (error) {
    console.error('Error fetching recipe:', error)
  }
})

const {
  comments,
  commentText,
  addComment,
  fetchComments,
  loading,
  error,
  user
} = useComments(route.params.id)
</script>

<style>

.recipeBox {
  margin-top: 70px;
  margin-left: 50px;
  margin-right: 50px;
}

.commentSection {
  max-width: 750px;
  margin: 0 auto;

}
</style>
