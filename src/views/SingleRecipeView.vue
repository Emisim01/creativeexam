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
<div class="commentSection !mt-10 text-light-grass ">
  <h2 class="commentTextHeader text-center mb-10">Comments</h2>

  <!-- Liste af kommentarer -->
  <ul class="theCommentSectionBoxes !space-y-4 ">
    <li v-for="comment in comments" :key="comment.id" class="bg-white/10 p-4 rounded-lg shadow-sm ">
      <div class="flex justify-between items-center mb-2">
        <div class="font-bold text-light-grass">{{ comment.user }}</div>
        <div class="text-xs text-light-grass/70">{{ comment.createdAt?.toDate?.().toLocaleString?.() }}</div>
      </div>
      <p class="text-light-grass/90">{{ comment.text }}</p>
    </li>
  </ul>

  <!-- Kun vis dette hvis man er logget ind -->
  <div v-if="user" class="theCommentSection !mb-8 !mt-8 !p-4 bg-white/10 rounded-md">
    <textarea
      v-model="commentText"
      class="w-full p-3 bg-white/20 text-light-grass placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-light-grass"
      placeholder="Write a comment..."
      rows="3"
    ></textarea>

   <!-- Post Comment knap-->
    <button
      @click="addComment"
      :disabled="loading || !commentText.trim()"
      class="w-full bg-light-grass text-dark-grass font-bold px-4 py-2 rounded-md hover:bg-opacity-80 hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {{ loading ? 'Posting...' : 'Post Comment' }}
    </button>

    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>

  </div>

  <!-- Hvis ikke logget ind, vis en pænere besked -->
  <div v-else class="mustBeLoggedIn !mb-8 !mt-8 !p-4 bg-white/10 rounded-md text-center text-light-grass/80">
    You must be <RouterLink to="/login" class="font-bold text-light-grass hover:underline">logged in</RouterLink> to comment.
  </div>

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
.commentTextHeader {
  font-family: "Cherry Bomb One", system-ui;
  margin-top: 15px;
  font-size: 40px;
  color: var(--color-light-grass);
}


.recipeBox {
  margin-top: 70px;
  margin-left: 50px;
  margin-right: 50px;
}

.theCommentSectionBoxes {
  margin-left: 50px;
  margin-right: 50px;
}

.mustBeLoggedIn {
  margin-left: 50px;
  margin-right: 50px;
}

.theCommentSection {
  margin-left: 50px;
  margin-right: 50px;
}


</style>
