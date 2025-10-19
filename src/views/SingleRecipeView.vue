<template>
  <div class="min-h-screen px-4 py-6">
    <!-- Recipe Content -->
    <div v-if="recipe" class="recipeBox max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-light-grass to-light-grass/80 p-6 sm:p-8 text-center">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-dark-grass">{{ recipe.recipeTitle }}</h1>

        <!-- Kategori og sværhedsgrad -->
        <div class="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6">
          <span class="bg-white/20 px-4 py-2 rounded-full text-dark-grass font-semibold">
            🎨 {{ recipe.category }}
          </span>
          <span class="bg-white/20 px-4 py-2 rounded-full text-dark-grass font-semibold">
            ⭐ {{ recipe.difficulty }}
          </span>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6 sm:p-8 text-dark-grass">
        <!-- Materialer -->
        <div class="mb-8">
          <h2 class="text-2xl sm:text-3xl font-bold mb-4 text-center text-dark-grass flex items-center justify-center gap-2">
            🛠️ Materials Used
          </h2>
          <div class="bg-gray-50 rounded-xl p-4 sm:p-6">
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <li v-for="(material, index) in recipe.materialUsed" :key="index"
                  class="flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm">
                <span class="w-2 h-2 bg-light-grass rounded-full flex-shrink-0"></span>
                <span class="text-sm sm:text-base">{{ material }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Steps -->
        <div class="mb-8">
          <h2 class="text-2xl sm:text-3xl font-bold mb-4 text-center text-dark-grass flex items-center justify-center gap-2">
            📋 Steps
          </h2>
          <div class="space-y-4">
            <div v-for="(step, index) in recipe.steps" :key="index"
                 class="flex gap-4 p-4 bg-gray-50 rounded-xl">
              <div class="flex-shrink-0 w-8 h-8 bg-light-grass text-dark-grass rounded-full flex items-center justify-center font-bold text-sm">
                {{ index + 1 }}
              </div>
              <p class="text-sm sm:text-base leading-relaxed">{{ step }}</p>
            </div>
          </div>
        </div>

        <!-- Video Link -->
        <div v-if="recipe.videoLink" class="mb-8 text-center">
          <h2 class="text-2xl sm:text-3xl font-bold mb-4 text-dark-grass flex items-center justify-center gap-2">
            🎥 Video Tutorial
          </h2>
          <a
            :href="recipe.videoLink"
            target="_blank"
            class="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-lg"
          >
            <span>Watch on YouTube</span>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12l-4-4h8l-4 4z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="text-center py-20">
      <div class="animate-spin w-12 h-12 border-4 border-light-grass border-t-transparent rounded-full mx-auto mb-4"></div>
      <p class="text-light-grass text-lg">Loading recipe...</p>
    </div>

    <!-- Kommentarer Section -->
    <div class="commentSection max-w-4xl mx-auto mt-12">
      <h2 class="commentTextHeader text-center mb-4 sm:mb-8">💬 Comments</h2>

      <!-- Add Comment Form (hvis logget ind) -->
      <div v-if="user" class="theCommentSection mb-8 bg-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-sm border border-light-grass/20">
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 bg-light-grass rounded-full flex items-center justify-center flex-shrink-0">
            <span class="text-dark-grass font-bold text-sm">{{ user.email?.charAt(0).toUpperCase() }}</span>
          </div>
          <div class="flex-1">
            <textarea
              v-model="commentText"
              class="w-full p-3 sm:p-4 bg-white/20 text-light-grass placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-light-grass resize-none text-sm sm:text-base"
              placeholder="Share your thoughts about this recipe..."
              rows="3"
            ></textarea>

            <div class="flex justify-end mt-3">
              <button
                @click="addComment"
                :disabled="loading || !commentText.trim()"
                class="bg-light-grass text-dark-grass font-bold px-2 sm:px-3 py-1 sm:py-2 rounded-lg hover:bg-opacity-80 hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed !text-xl sm:text-sm"
              >
                {{ loading ? 'Posting...' : 'Post Comment' }}
              </button>
            </div>
          </div>
        </div>

        <p v-if="error" class="text-red-400 mt-3 text-sm">{{ error }}</p>
      </div>

      <!-- Login Prompt -->
      <div v-else class="mustBeLoggedIn mb-8 bg-white/10 rounded-2xl p-6 text-center backdrop-blur-sm border border-light-grass/20">
        <div class="text-4xl mb-4">🔒</div>
        <p class="text-light-grass/80 mb-4 text-sm sm:text-base">Join the conversation!</p>
        <RouterLink to="/login"
                    class="inline-block bg-light-grass text-dark-grass font-bold px-6 py-3 rounded-xl hover:bg-opacity-80 transition">
          Sign in to comment
        </RouterLink>
      </div>

      <!-- Comments List -->
      <div class="theCommentSectionBoxes space-y-4 sm:space-y-6">
        <div v-if="comments.length === 0" class="text-center py-12 text-light-grass/60">
          <div class="text-4xl mb-4">💭</div>
          <p class="text-sm sm:text-base">No comments yet. Be the first to share your thoughts!</p>
        </div>

        <div v-for="comment in comments" :key="comment.id"
             class="bg-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-sm border border-light-grass/20 hover:bg-white/15 transition-colors">
          <div class="flex items-start gap-4">
            <!-- Avatar -->
            <div class="w-10 h-10 bg-light-grass/30 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-light-grass font-bold text-sm">{{ comment.user?.charAt(0).toUpperCase() }}</span>
            </div>

            <!-- Comment Content -->
            <div class="flex-1 min-w-0">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
                <h4 class="font-bold text-light-grass text-sm sm:text-base">{{ comment.user }}</h4>
                <time class="text-xs sm:text-sm text-light-grass/70 flex items-center gap-1">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2C5.59 2 2 5.59 2 10s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
                    <path d="M10 6v4l3 2-1.5 1.5L8 11V6h2z"/>
                  </svg>
                  {{ comment.createdAt?.toDate?.().toLocaleString?.() }}
                </time>
              </div>
              <p class="text-light-grass/90 leading-relaxed text-sm sm:text-base break-words">{{ comment.text }}</p>
            </div>
          </div>
        </div>
      </div>
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
    const recipeId = route.params.id
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

<style scoped>
.commentTextHeader {
  font-family: "Cherry Bomb One", system-ui;
  font-size: 40px;
  color: var(--color-light-grass);
}

/* Mobil responsive for commentTextHeader */
@media (max-width: 640px) {
  .commentTextHeader {
    font-size: 28px;
  }
}

/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 6px;
}

textarea::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

</style>
