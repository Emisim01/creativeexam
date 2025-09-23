<template>
  <div>
<img
      src="@/assets/heroImg.png" alt="Hero" class="w-screen h-[80vw] min-h-[250px] max-h-[500px] object-cover block"
    />
  </div>
  <div>

      <p class="welcomeText p-4 text-4xl font-bold text-white flex justify-center gap-4">Find your next creative recipe here!</p>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
    <div
      v-for="recipe in recipes"
      :key="recipe.id"
      class="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center"
    > <!-- Når du har alle dine opskrifter inde i firbase, så når du kun vil vise 3 på forsiden
    så skriver du ved din v-for "recipe in recipes.slice(0,3)" -->
      <h2 class="text-xl font-bold mb-2">{{ recipe.title }}</h2>
      <p class="text-gray-700">{{ recipe.category }}</p>
      <p class="text-gray-700">{{ recipe.difficulty }}</p>
      <!-- Tilføj evt. billede eller flere felter her -->
    </div>

  </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
    <div
      v-for="recipe in recipes"
      :key="recipe.id"
      class="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center"
    > <!-- Når du har alle dine opskrifter inde i firbase, så når du kun vil vise 3 på forsiden
    så skriver du ved din v-for "recipe in recipes.slice(0,3)" -->
      <h2 class="text-xl font-bold mb-2">{{ recipe.title }}</h2>
      <p class="text-gray-700">{{ recipe.category }}</p>
      <p class="text-gray-700">{{ recipe.difficulty }}</p>
      <!-- Tilføj evt. billede eller flere felter her -->
    </div>

  </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
    <div
      v-for="recipe in recipes"
      :key="recipe.id"
      class="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center"
    > <!-- Når du har alle dine opskrifter inde i firbase, så når du kun vil vise 3 på forsiden
    så skriver du ved din v-for "recipe in recipes.slice(0,3)" -->
      <h2 class="text-xl font-bold mb-2">{{ recipe.title }}</h2>
      <p class="text-gray-700">{{ recipe.category }}</p>
      <p class="text-gray-700">{{ recipe.difficulty }}</p>
      <!-- Tilføj evt. billede eller flere felter her -->
    </div>

  </div>
</template>

<script setup>
import { useRecipes } from '@/composables/useRecipes.js'

const { recipes } = useRecipes()
</script>

<style scoped>
.welcomeText {
  font-family: "Cherry Bomb One", system-ui;
  font-weight: 400;
  font-style: normal;
}


</style>

