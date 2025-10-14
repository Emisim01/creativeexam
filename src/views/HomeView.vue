<template>
  <div>
<img
      src="@/assets/heroImg.png" alt="Hero" class="w-screen h-[80vw] min-h-[250px] max-h-[500px] object-cover block"
    />
  </div>
  <div>

      <p class="welcomeText p-4 font-bold flex justify-center gap-4">Find your next creative recipe here!</p>
  </div>

<div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 text-dark-grass">
  <div
    v-for="recipe in recipes.slice(0,3)"
    :key="recipe.id"
    @click="goToRecipe(recipe.id)"
    class="bg-white rounded-lg p-4 flex flex-col items-center cursor-pointer hover:scale-105 transition"
  >
    <img src="@/assets/heroImg.png" alt="">
    <h2 class="text-xl font-bold mb-2">{{ recipe.recipeTitle }}</h2>
    <p class="">{{ recipe.category }}</p>
    <p class="">{{ recipe.difficulty }}</p>
  </div>
</div>

    <div class="categoryShower grid md:grid-cols-5 gap-6 mb-8 rounded-lg p-6 text-dark-grass">
      <!-- Crochet -->
      <div class="flex flex-col items-center cursor-pointer hover:scale-105 transition">
        <img src="@/assets/icons/crochet.png" alt="Crochet" class="w-12 h-12 mb-2" />
        <p class=" text-2xl">Crochet</p>
      </div>

      <!-- Embroidery -->
    <div class="flex flex-col items-center cursor-pointer hover:scale-105 transition">
        <img src="@/assets/icons/embroidery.png" alt="Embroidery" class="w-12 h-12 mb-2" />
        <p class="text-2xl">Embroidery</p>
      </div>

      <!-- Drawing -->
    <div class="flex flex-col items-center cursor-pointer hover:scale-105 transition">
        <img src="@/assets/icons/drawing.png" alt="Drawing" class="w-12 h-12 mb-2" />
        <p class="text-2xl">Drawing</p>
      </div>

      <!-- Sewing -->
    <div class="flex flex-col items-center cursor-pointer hover:scale-105 transition">
        <img src="@/assets/icons/sewing.png" alt="Sewing" class="w-12 h-12 mb-2" />
        <p class="text-2xl">Sewing</p>
      </div>

      <!-- Digital Design -->
    <div class="flex flex-col items-center cursor-pointer hover:scale-105 transition">
        <img src="@/assets/icons/design.png" alt="Design" class="w-12 h-12 mb-2" />
        <p class=" text-2xl">Digital Design</p>
      </div>
      </div>

  <div>
  <p class="welcomeText p-4 font-bold text-white flex justify-center gap-4">This is how it works!</p>
</div>

<div class="guide flex items-center text-light-grass justify-center gap-16 my-16">
  <!-- Touchscreen Icon -->
  <div class="">
    <img src="@/assets/icons/touchscreen.png" alt="Touchscreen" class="w-32 h-32">
    <p class=" text-center mt-6 text-2xl">Find a Creative Recipe</p>
  </div>

  <!-- Arrow -->
  <img src="@/assets/icons/arrow.png" alt="Arrow" class="w-16 h-16">

  <!-- Steps Complete Icon -->
  <div class="flex flex-col items-center">
    <img src="@/assets/icons/stepsComplete.png" alt="Steps Complete" class="w-32 h-32">
    <p class=" text-center mt-6 text-2xl">Follow the Steps</p>
  </div>

  <!-- Arrow -->
  <img src="@/assets/icons/arrow.png" alt="Arrow" class="w-16 h-16">

  <!-- Comment Icon -->
  <div class="flex flex-col items-center">
    <img src="@/assets/icons/comment.png" alt="Comment" class="w-32 h-32">
    <p class=" text-center mt-6 text-2xl">Leave a Comment</p>
  </div>

  <!-- Arrow -->
  <img src="@/assets/icons/arrow.png" alt="Arrow" class="w-16 h-16">

  <!-- Share Icon -->
  <div class="flex flex-col items-center">
    <img src="@/assets/icons/share.png" alt="Share" class="w-32 h-32">
    <p class="text-center mt-6 text-2xl">Share with Your Friends</p>
  </div>
</div>


</template>

<script setup>
import { useRecipes } from '@/composables/useRecipes.js'
import { useRouter } from 'vue-router' // Importér useRouter

const router = useRouter() // Initialiser useRouter


const goToRecipe = (id) => {
  // Naviger til den enkelte opskrift ved hjælp af dens id
  router.push({ name: 'SingleRecipe', params: { id } })
}

const { recipes } = useRecipes()
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

</style>

