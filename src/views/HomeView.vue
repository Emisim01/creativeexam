<template>
  <div>
<img
      src="@/assets/heroImg.webp" alt="Hero" class="w-screen h-[80vw] min-h-[250px] max-h-[630px] object-cover block"
    />
  </div>
  <div>
      <p class="welcomeText p-2 sm:p-4 font-bold flex justify-center gap-4 text-2xl sm:text-4xl">Find your next creative recipe here!</p>
  </div>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6 text-dark-grass">
  <div
    v-for="recipe in recipes.slice(0,3)"
    :key="recipe.id"
    @click="goToRecipe(recipe.id)"
    class="bg-white rounded-lg p-3 sm:p-4 flex flex-col items-center cursor-pointer hover:scale-105 transition"
  >
<img
  :src="recipe.imageUrl"
  :alt="recipe.recipeTitle"
  @error="handleImageError"
  class="w-full aspect-square object-cover rounded mb-2"
>

<!-- OPSKRIFT INFO: Titel, kategori og sværhedsgrad -->
    <h2 class="text-lg sm:text-xl font-bold mb-2 text-center">{{ recipe.recipeTitle }}</h2>
    <p class="text-sm sm:text-base">{{ recipe.category }}</p>
    <p class="text-sm sm:text-base">{{ recipe.difficulty }}</p>
  </div>
</div>

    <div class="categoryShower grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 mb-8 rounded-lg p-4 sm:p-6 text-dark-grass mx-2 sm:mx-4">
      <!-- Crochet -->
      <div @click="goToCategory('Crochet')" class="flex flex-col items-center cursor-pointer hover:scale-105 transition p-2">
        <img src="@/assets/icons/crochet.png" alt="Crochet" class="w-8 h-8 sm:w-12 sm:h-12 mb-2" />
        <p class="text-lg sm:text-2xl text-center">Crochet</p>
      </div>

      <!-- Embroidery -->
      <div @click="goToCategory('Embroidery')" class="flex flex-col items-center cursor-pointer hover:scale-105 transition p-2">
        <img src="@/assets/icons/embroidery.png" alt="Embroidery" class="w-8 h-8 sm:w-12 sm:h-12 mb-2" />
        <p class="text-lg sm:text-2xl text-center">Embroidery</p>
      </div>

      <!-- Drawing -->
      <div @click="goToCategory('Drawing')" class="flex flex-col items-center cursor-pointer hover:scale-105 transition p-2">
        <img src="@/assets/icons/drawing.png" alt="Drawing" class="w-8 h-8 sm:w-12 sm:h-12 mb-2" />
        <p class="text-lg sm:text-2xl text-center">Drawing</p>
      </div>

      <!-- Sewing -->
      <div @click="goToCategory('Sewing')" class="flex flex-col items-center cursor-pointer hover:scale-105 transition p-2">
        <img src="@/assets/icons/sewing.png" alt="Sewing" class="w-8 h-8 sm:w-12 sm:h-12 mb-2" />
        <p class="text-lg sm:text-2xl text-center">Sewing</p>
      </div>

      <!-- Digital Design -->
      <div @click="goToCategory('Digital design')" class="flex flex-col items-center cursor-pointer hover:scale-105 transition p-2 col-span-2 sm:col-span-1">
        <img src="@/assets/icons/design.png" alt="Design" class="w-8 h-8 sm:w-12 sm:h-12 mb-2" />
        <p class="text-lg sm:text-2xl text-center">Digital Design</p>
      </div>
    </div>



<!-- ÉT RESPONSIVT "HOW IT WORKS" LAYOUT -->
<div>
  <!-- SECTION TITEL -->
  <p class="welcomeText p-2 sm:p-4 font-bold text-white flex justify-center gap-4 text-2xl sm:text-4xl">
    This is how it works!
  </p>

  <!-- RESPONSIV GUIDE: Stacked på mobil, horizontal på desktop -->
  <div class="mx-4 my-8 lg:my-16 lg:mx-auto lg:max-w-6xl">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-8 xl:gap-16 space-y-8 lg:space-y-0">

      <!-- STEP 1: Find Recipe -->
      <div class="flex items-center gap-4 lg:flex-col lg:text-center text-light-grass">
        <img src="@/assets/icons/touchscreen.png" alt="Touchscreen" class="w-16 h-16 sm:w-20 sm:h-20 lg:w-32 lg:h-32 flex-shrink-0">
        <p class="text-lg sm:text-xl lg:text-2xl lg:mt-6 font-semibold">Find a Creative Recipe</p>
      </div>

      <!-- ARROW 1: Kun synlig på desktop -->
      <img src="@/assets/icons/arrow.png" alt="Arrow" class="hidden lg:block w-12 h-12 xl:w-16 xl:h-16">

      <!-- STEP 2: Follow Steps -->
      <div class="flex items-center gap-4 lg:flex-col lg:text-center text-light-grass">
        <img src="@/assets/icons/stepsComplete.png" alt="Steps Complete" class="w-16 h-16 sm:w-20 sm:h-20 lg:w-32 lg:h-32 flex-shrink-0">
        <p class="text-lg sm:text-xl lg:text-2xl lg:mt-6 font-semibold">Follow the Steps</p>
      </div>

      <!-- ARROW 2: Kun synlig på desktop -->
      <img src="@/assets/icons/arrow.png" alt="Arrow" class="hidden lg:block w-12 h-12 xl:w-16 xl:h-16">

      <!-- STEP 3: Leave Comment -->
      <div class="flex items-center gap-4 lg:flex-col lg:text-center text-light-grass">
        <img src="@/assets/icons/comment.png" alt="Comment" class="w-16 h-16 sm:w-20 sm:h-20 lg:w-32 lg:h-32 flex-shrink-0">
        <p class="text-lg sm:text-xl lg:text-2xl lg:mt-6 font-semibold">Leave a Comment</p>
      </div>

      <!-- ARROW 3: Kun synlig på desktop -->
      <img src="@/assets/icons/arrow.png" alt="Arrow" class="hidden lg:block w-12 h-12 xl:w-16 xl:h-16">

      <!-- STEP 4: Share -->
      <div class="flex items-center gap-4 lg:flex-col lg:text-center text-light-grass">
        <img src="@/assets/icons/share.png" alt="Share" class="w-16 h-16 sm:w-20 sm:h-20 lg:w-32 lg:h-32 flex-shrink-0">
        <p class="text-lg sm:text-xl lg:text-2xl lg:mt-6 font-semibold">Share with Your Friends</p>
      </div>

    </div>
  </div>
</div>

</template>

<script setup>
import { useRecipes } from '@/composables/useRecipes.js'
import { useRouter } from 'vue-router' // Importér useRouter

// ROUTER SETUP: Til navigation mellem sider
const router = useRouter()

const { recipes } = useRecipes()


const goToRecipe = (id) => {
  // Naviger til den enkelte opskrift ved hjælp af dens id
  router.push({ name: 'SingleRecipe', params: { id } })
}


// Navigér til recipes siden med kategori-filter
const goToCategory = (category) => {
  router.push({
    name: 'Recipes',
    query: { category: category }
  })
}

// Error handling for billeder
const handleImageError = (event) => {
  event.target.src = '/src/assets/heroImg.png'
}

</script>

<style scoped>
.welcomeText {
  font-family: "Cherry Bomb One", system-ui;
  margin-top: 15px;
  font-size: 40px;
  color: var(--color-light-grass);
}

.guide {
  margin-bottom: 70px;
}

.categoryShower {
  font-family: "Cherry Bomb One", system-ui;
  margin: 70px 22px;
  background-color: #9BBF9B ;
}

/* Mobil version */
@media (max-width: 640px) {
  .welcomeText {
    font-size: 28px;
  }
}

</style>

