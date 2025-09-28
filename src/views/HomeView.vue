<template>
  <div>
<img
      src="@/assets/heroImg.png" alt="Hero" class="w-screen h-[80vw] min-h-[250px] max-h-[500px] object-cover block"
    />
  </div>
  <div>

      <p class="welcomeText p-4 text-4xl font-bold text-white flex justify-center gap-4">Find your next creative recipe here!</p>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 ">
    <div
      v-for="recipe in recipes.slice(0,3)" :key="recipe.id"
      class="bg-white rounded-lg p-4 flex flex-col items-center cursor-pointer hover:scale-105 transition">

      <img src="@/assets/heroImg.png " alt="">
      <h2 class="text-xl font-bold mb-2">{{ recipe.title }}</h2>
      <p class="text-gray-700">{{ recipe.category }}</p>
      <p class="text-gray-700">{{ recipe.difficulty }}</p>
    </div>

  </div>

    <div class="categoryShower grid md:grid-cols-4 gap-6 mb-8 rounded-lg p-6">
      <!-- Crochet -->
      <div class="flex flex-col items-center cursor-pointer hover:scale-105 transition">
        <img src="@/assets/icons/crochet.png" alt="Crochet" class="w-12 h-12 mb-2" />
        <p class="text-white text-2xl">Crochet</p>
      </div>

      <!-- Embroidery -->
    <div class="flex flex-col items-center cursor-pointer hover:scale-105 transition">
        <img src="@/assets/icons/embroidery.png" alt="Embroidery" class="w-12 h-12 mb-2" />
        <p class="text-white text-2xl">Embroidery</p>
      </div>

      <!-- Drawing -->
    <div class="flex flex-col items-center cursor-pointer hover:scale-105 transition">
        <img src="@/assets/icons/drawing.png" alt="Drawing" class="w-12 h-12 mb-2" />
        <p class="text-white text-2xl">Drawing</p>
      </div>

      <!-- Sewing -->
    <div class="flex flex-col items-center cursor-pointer hover:scale-105 transition">
        <img src="@/assets/icons/sewing.png" alt="Sewing" class="w-12 h-12 mb-2" />
        <p class="text-white text-2xl">Sewing</p>
      </div>
    </div>

  <div>
      <p class="welcomeText p-4 text-4xl font-bold text-white flex justify-center gap-4">This is how it works!</p>
  </div>


 <div class="random-task-generator bg-white text-center p-6 rounded-lg shadow-lg">
  <!-- Overskrift -->
  <p class="welcomeText p-4 text-4xl font-bold text-gray-800">Don't know what to do? Try this!</p>

  <!-- Knappen -->
  <button
    @click="generateRandomTask"
    class="generatorBox bg-purple-500 text-white px-6 py-3 rounded-lg"
  >
    Generate Random Task
  </button>

  <!-- Random Task Output -->
  <p v-if="randomTask" class="mt-6 text-2xl font-bold text-gray-800">
    {{ randomTask.title }} - {{ randomTask.category }}
  </p>
</div>



</template>

<script setup>
import { useRecipes } from '@/composables/useRecipes.js'
import { ref, onMounted } from 'vue'
import { useTasks } from '@/composables/useTasks.js'

const { tasks, fetchTasks } = useTasks()
const randomTask = ref(null)

// Fetch tasks from Firebase when the component is mounted
onMounted(() => {
  fetchTasks()
  console.log(tasks.value) // Tjek om tasks bliver fyldt med data fra Firebase

})

// Function to generate a random task
const generateRandomTask = () => {
  if (tasks.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * tasks.value.length)
    randomTask.value = tasks.value[randomIndex]
  }
}

const { recipes } = useRecipes()
</script>

<style scoped>
.welcomeText {
  font-family: "Cherry Bomb One", system-ui;
}

.categoryShower {
  font-family: "Cherry Bomb One", system-ui;
  margin: 0 22px;
  background-color: #a9d193 ;
}

.generatorBox {
  background-color: #f064ac ;
}

</style>

